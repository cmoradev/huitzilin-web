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
  SchedulePartsFragment,
  GetSchedulesPageQueryVariables,
  GetSchedulesPageGQL,
} from '@graphql';
import {
  FormToolsService,
  GlobalStateService,
  LevelToolsService,
  PackageToolsService,
  PeriodToolsService,
} from '@services';
import { defaultDate, enrollmentStates } from '@utils/contains';
import { debounceTime, filter, map, merge, startWith } from 'rxjs';
import { CalendarWithScheduleSelectDialogComponent } from '../calendar-with-schedule-select-dialog/calendar-with-schedule-select-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { differenceInHours } from 'date-fns';
import { Discipline } from '../../../../graphql/generated';

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
    MatTooltipModule,
  ],
  templateUrl: './enrollment-form-dialog.component.html',
  styles: ``,
})
export class EnrollmentFormDialogComponent implements AfterViewInit {
  public readonly formTools = inject(FormToolsService);
  private readonly _dialog = inject(MatDialog);

  public loading = signal(false);
  public data: EnrollmentFormDialogData = inject(MAT_DIALOG_DATA);
  public schedules = signal<SchedulePartsFragment[]>([]);

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
  private readonly _gettSchedulesPage = inject(GetSchedulesPageGQL);

  public levelTools = inject(LevelToolsService);
  public packageTools = inject(PackageToolsService);
  public periodTools = inject(PeriodToolsService);

  public disciplineCount = signal<number>(0);
  public hoursCount = signal<number>(0);

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
        state: this.data.state,
        period: this.data.period,
        level: this.data.level,
      });

      this._fetchAllSchedules();
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
          width: '80rem',
          maxWidth: '95vw',
          data: { period, level, selected: this.schedules() },
          disableClose: true,
        }
      );

      $dialog.afterClosed().subscribe({
        next: (schedules) => {
          this.schedules.set(Array.from(schedules));
          this._updateCountSchedules();
        },
      });
    }
  }

  private _updateCountSchedules() {
    const disciplineIds = this.schedules().map(
      (schedule) => schedule.discipline?.id ?? ''
    );
    const disciplines = new Set<string>(disciplineIds);

    const hours = this.schedules().reduce((acc, schedule) => {
      const start = new Date(`${defaultDate}T${schedule.start}`);
      const end = new Date(`${defaultDate}T${schedule.end}`);

      return acc + differenceInHours(end, start);
    }, 0);

    this.disciplineCount.set(disciplines.size);
    this.hoursCount.set(hours * 4);
  }

  private _update(values: FormValues) {
    return this._updateOneEnrollment
      .mutate({
        id: this.data!.id,
        update: {
          details: values.details,
          state: values.state,
          packageId: values.package.id,
          levelId: values.level.id,
          periodId: values.period.id,
          hours: this.hoursCount(),
          diciplines: this.disciplineCount(),
          schedules: this.schedules().map((schedule) => ({ id: schedule.id })),
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
          hours: this.hoursCount(),
          diciplines: this.disciplineCount(),
          schedules: this.schedules().map((schedule) => ({ id: schedule.id })),
          order: 0,
        },
      })
      .pipe(map((value) => value.data?.createOneEnrollment));
  }

  private _fetchAllSchedules(accumulared: SchedulePartsFragment[] = []): void {
    if (!!this.data?.id) {
      const limit = 50;
      const offset = accumulared.length;

      const variables: GetSchedulesPageQueryVariables = {
        filter: { enrollments: { id: { eq: this.data.id } } },
        limit,
        offset,
      };

      const fetch$ = this._gettSchedulesPage.watch(variables, {
        fetchPolicy: 'cache-and-network', // Usa cache primero, solo pide a la API si no hay datos en cache
        nextFetchPolicy: 'cache-and-network', // Mantiene la política de cache en siguientes peticiones
        notifyOnNetworkStatusChange: false, // No notifica cambios de red para evitar refetch innecesario
      }).valueChanges;

      fetch$.pipe(map((resp) => resp.data.schedules)).subscribe({
        next: ({ nodes, totalCount }) => {
          const allItems = accumulared.concat(nodes);
          if (allItems.length >= totalCount) {
            this.schedules.set(allItems);
            this.loading.set(false);
            this._updateCountSchedules();
            return; // No more fees to fetch
          }
          this._fetchAllSchedules(allItems);
        },
        error: (error) => {
          console.error('Error fetching disciplines', error);
        },
      });
    }
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
