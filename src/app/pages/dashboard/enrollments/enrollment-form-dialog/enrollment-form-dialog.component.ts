import { DatePipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CalendarComponent } from '@components/calendar/calendar.component';
import {
  PackagePartsFragment,
  CreateOneEnrollmentGQL,
  EnrollmentPartsFragment,
  EnrollmentState,
  UpdateOneEnrollmentGQL,
  LevelPartsFragment,
  PeriodPartsFragment,
} from '@graphql';
import {
  FormToolsService,
  GlobalStateService,
  LevelToolsService,
  PackageToolsService,
  PeriodToolsService,
} from '@services';
import { enrollmentStates } from '@utils/contains';
import { debounceTime, filter, map, merge, startWith } from 'rxjs';
import { CalendarWithScheduleSelectDialogComponent } from '../calendar-with-schedule-select-dialog/calendar-with-schedule-select-dialog.component';

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
    MatChipsModule,
  ],
  templateUrl: './enrollment-form-dialog.component.html',
  styles: ``,
})
export class EnrollmentFormDialogComponent implements AfterViewInit {
  public readonly formTools = inject(FormToolsService);
  private readonly _dialog = inject(MatDialog);

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
    period: this.formTools.builder.control<PeriodPartsFragment | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneEnrollment = inject(CreateOneEnrollmentGQL);
  private readonly _updateOneEnrollment = inject(UpdateOneEnrollmentGQL);

  public levelTools = inject(LevelToolsService);
  public packageTools = inject(PackageToolsService);
  public periodTools = inject(PeriodToolsService);

  public enrollmentStates = enrollmentStates;

  private readonly _dialogRef = inject(
    MatDialogRef<EnrollmentFormDialogComponent>
  );

  ngOnInit(): void {
    this.periodTools.fetchAll();

    if (!!this.data?.id) {
      this.formGroup.patchValue({
        details: this.data.details,
        package: this.data.package,
        period: this.data.period,
        level: this.data.level,
      });
    }

    merge(
      this.formGroup.get('package')!.valueChanges,
      this.formGroup.get('period')!.valueChanges
    )
      .pipe(filter((value) => typeof value === 'object'))
      .subscribe(() => {
        const packageName = this.formGroup.get('package')?.value?.name ?? '';
        const periodName = this.formGroup.get('period')?.value?.name ?? '';

        this.formGroup
          .get('details')
          ?.setValue(`${periodName} - ${packageName}`);
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
        next: (value) => this.packageTools.fetch(value),
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

  public openCalendar() {
    const period = this.formGroup.get('period')?.value;
    const level = this.formGroup.get('level')?.value;

    if (!!period?.id && !!level?.id) {
      const $dialog = this._dialog.open(
        CalendarWithScheduleSelectDialogComponent,
        {
          width: '56rem',
          maxWidth: '95vw',
          data: { period, level },
        }
      );

      $dialog.afterClosed().subscribe({
        next: (schedules) => {
          console.log('SCHEDULES: ', schedules);
        },
      });
    }
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
          periodId: values.period.id,
          start: values.period.start,
          end: values.period.end,
          details: values.details,
          state: values.state,
          hours: 0,
          diciplines: 0,
          order: 0,
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
  period: PeriodPartsFragment;
  parentId: string | null;
};
