import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatHint,
  MatError,
  MatLabel,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
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
import { PackageKindPipe } from '@pipes';
import {
  FormToolsService,
  GlobalStateService,
  LevelToolsService,
  PackageToolsService,
} from '@services';
import { enrollmentStates } from '@utils/contains';
import { debounceTime, filter, map, merge, startWith } from 'rxjs';

type EnrollmentFormDialogData = EnrollmentPartsFragment | null;

@Component({
  selector: 'app-enrollment-form-dialog',
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    PackageKindPipe,
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

  public levelTools = inject(LevelToolsService);
  public packagesTools = inject(PackageToolsService);

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
      this.formGroup.get('package')!.valueChanges,
      this.formGroup.get('level')!.valueChanges
    )
      .pipe(filter((value) => typeof value === 'object'))
      .subscribe(() => {
        const packageName = this.formGroup.get('package')?.value?.name ?? '';
        const levelAbbrevation =
          this.formGroup.get('level')?.value?.abbreviation ?? '';

        this.formGroup
          .get('details')
          ?.setValue(`${levelAbbrevation} - ${packageName}`);
      });
  }

  ngAfterViewInit(): void {
    this.formGroup
      .get('package')
      ?.valueChanges.pipe(
        filter((value) => typeof value === 'string'),
        debounceTime(300),
        startWith('')
      )
      .subscribe({
        next: (value) => this.packagesTools.fetch(value),
      });

    this.formGroup
      .get('level')
      ?.valueChanges.pipe(
        filter((value) => typeof value === 'string'),
        debounceTime(300),
        startWith('')
      )
      .subscribe({
        next: (value) => this.levelTools.fetch(value),
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

  public displayFn(value: PackagePartsFragment): string {
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
}

type FormValues = {
  details: string;
  state: EnrollmentState;
  package: PackagePartsFragment;
  level: LevelPartsFragment;
  parentId: string | null;
};
