import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatHint,
  MatError,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
  PackagePartsFragment,
  CreateOneEnrollmentGQL,
  EnrollmentPartsFragment,
  EnrollmentState,
  GetPackagePageGQL,
  UpdateOneEnrollmentGQL,
  GetLevelsPageGQL,
  LevelPartsFragment,
  PackageFilter,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { enrollmentStates } from '@utils/contains';
import { debounceTime, filter, map, merge, startWith } from 'rxjs';

type EnrollmentFormDialogData = EnrollmentPartsFragment | null;

@Component({
  selector: 'app-enrollment-form-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    MatInput,
    MatHint,
    MatError,
    MatLabel,
    MatOption,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatIconButton,
    MatIcon,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './enrollment-form-dialog.component.html',
  styles: ``,
})
export class EnrollmentFormDialogComponent implements AfterViewInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: EnrollmentFormDialogData = inject(MAT_DIALOG_DATA);

  public formGroup = this.formTools.builder.group({
    details: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(128)],
    ],
    state: [EnrollmentState.Active, [Validators.required]],
    package: ['' as any, [Validators.required]],
    level: ['' as any, [Validators.required]],
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneEnrollment = inject(CreateOneEnrollmentGQL);
  private readonly _updateOneEnrollment = inject(UpdateOneEnrollmentGQL);

  public loadingActivities = signal<boolean>(false);
  public activities = signal<PackagePartsFragment[]>([]);
  private readonly _packagesPageGQL = inject(GetPackagePageGQL);

  public loadingLevels = signal<boolean>(false);
  public levels = signal<LevelPartsFragment[]>([]);
  private readonly _levelsPageGQL = inject(GetLevelsPageGQL);

  public enrollmentStates = enrollmentStates;

  private readonly _dialogRef = inject(
    MatDialogRef<EnrollmentFormDialogComponent>
  );

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        details: this.data.details,
        package: this.data.package,
        level: this.data.level,
      });
    }
    // @todo - Check this event rename details enrollment
    merge(
      this.formGroup.get('Package')!.valueChanges,
      this.formGroup.get('level')!.valueChanges
    )
      .pipe(filter((value) => typeof value === 'object'))
      .subscribe(() => {
        const packageName = this.formGroup.get('package')?.value?.name ?? '';
        const levelAbbrevation =
          this.formGroup.get('level')?.value?.abbreviation ?? '';

        this.formGroup
          .get('details')
          ?.setValue(
            `${levelAbbrevation} - ${packageName}`
          );
      });
  }

  ngAfterViewInit(): void {
    this.formGroup
      .get('activity')

      ?.valueChanges.pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (typeof value === 'string') {
            this._fetchActivities(value);
          }
        },
      });

    this.formGroup
      .get('level')
      ?.valueChanges.pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (typeof value === 'string') {
            this._fetchLevels(value);
          }
        },
      });
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('UPDATE ENROLLMENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else if (
        this._globalStateService.student!.id &&
        this._globalStateService.branch!.id &&
        this._globalStateService.cycle!.id
      ) {        
        this._save(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('CREATE ENROLLMENT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  public displayFn(
    value: PackagePartsFragment
  ): string {
    return value?.name ?? '';
  }

  private _update(values: FormValues) {
    return this._updateOneEnrollment
      .mutate({
        id: this.data!.id,
        update: {
          packageId: values.package.id,
          details: values.details,
          state: values.state,
        },
      })
      .pipe(map((value) => value.data?.updateOneEnrollment));
  }

  private _save(values: FormValues) {
    return this._createOneEnrollment
      .mutate({
        enrollment: {
          studentId: this._globalStateService.student!.id,
          branchId: this._globalStateService.branch!.id,
          cycleId: this._globalStateService.cycle!.id,
          packageId: values.package.id,
          levelId: values.level.id,
          details: values.details,
          state: values.state,
          order: 1,
        },
      })
      .pipe(map((value) => value.data?.createOneEnrollment));
  }

  private _fetchActivities(value: string): void {
    if (this._globalStateService.branch!.id) {
      this.loadingActivities.set(true);

      const filter: PackageFilter = {
        name: { iLike: `%${value}%` },
        branchId: { eq: this._globalStateService.branch!.id },
      };

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._packagesPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter,
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ loading, data }) => {
            this.loadingActivities.set(loading);

            this.activities.set(data?.packages.nodes ?? []);
          },
        });
    } else {
      this.loadingActivities.set(false);
      this.activities.set([]);
    }
  }

  private _fetchLevels(value: string): void {
    if (this._globalStateService.branch!.id) {
      this.loadingLevels.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._levelsPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              or: [
                { name: { iLike: `%${value}%` } },
                { abbreviation: { iLike: `%${value}%` } },
              ],
              branchId: { eq: this._globalStateService.branch!.id },
            },
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ loading, data }) => {
            this.loadingLevels.set(loading);

            this.levels.set(data?.levels.nodes ?? []);
          },
        });
    } else {
      this.loadingLevels.set(false);
      this.levels.set([]);
    }
  }
}

type FormValues = {
  details: string;
  state: EnrollmentState;
  package: PackagePartsFragment;
  level: LevelPartsFragment;
  parentId: string | null;
};
