import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  CreateOneScheduleGQL,
  DisciplinePartsFragment,
  GetDisciplinesPageGQL,
  GetDisciplinesPageQueryVariables,
  SchedulePartsFragment,
  UpdateOneScheduleGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { daysOfWeek } from '@utils/contains';
import { map } from 'rxjs';

@Component({
  selector: 'app-schedule-form-dialog',
  imports: [
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './schedule-form-dialog.component.html',
  styles: ``,
})
export class ScheduleFormDialogComponent {
  public readonly formTools = inject(FormToolsService);

  public loading = signal<boolean>(false);
  public data: SchedulePartsFragment | null = inject(MAT_DIALOG_DATA);

  public days = daysOfWeek;

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneSchedule = inject(CreateOneScheduleGQL);
  private readonly _updateOneSchedule = inject(UpdateOneScheduleGQL);
  private readonly _getDisciplinesPage = inject(GetDisciplinesPageGQL);

  private readonly _snackBar = inject(MatSnackBar);
  private readonly _dialogRef = inject(
    MatDialogRef<ScheduleFormDialogComponent>
  );

  public disciplines = signal<DisciplinePartsFragment[]>([]);

  public formGroup = this.formTools.builder.group({
    day: this.formTools.builder.control<string>('', {
      validators: [Validators.required, Validators.maxLength(32)],
      nonNullable: true,
    }),
    start: this.formTools.builder.control<Date>(new Date(2025, 5, 15, 8, 0), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    end: this.formTools.builder.control<Date>(new Date(2025, 5, 15, 20, 0), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    disciplineId: this.formTools.builder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this._fetchAllDisciplines();

    if (!!this.data?.day)
      this.formGroup.patchValue({ day: this.data.day.toFixed() });
    if (!!this.data?.start)
      this.formGroup.patchValue({ start: new Date(this.data.start) });
    if (!!this.data?.end)
      this.formGroup.patchValue({ end: new Date(this.data.end) });

    if (!!this.data?.id) {
      this.formGroup.patchValue({
        disciplineId: this.data.discipline.id,
      });
    }
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue();

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (cycle) => {
            this._dialogRef.close(cycle);
            this._snackBar.open('Se ha actualizado correctamente', 'Cerrar', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            console.error('UPDATE SCHEDULE ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else if (this._globalStateService.branch?.id) {
        this._save(values).subscribe({
          next: (cycle) => {
            this._dialogRef.close(cycle);
            this._snackBar.open('Se ha creado correctamente', 'Cerrar', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            console.error('CREATE SCHEDULE ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOneSchedule
      .mutate({
        id: this.data!.id,
        update: {},
      })
      .pipe(map((value) => value.data?.updateOneSchedule));
  }

  private _save(values: FormValues) {
    return this._createOneSchedule
      .mutate({
        schedule: {
          day: parseInt(values.day, 10),
          start: values.start.toTimeString().slice(0, 5),
          end: values.end.toTimeString().slice(0, 5),
          disciplineId: values.disciplineId,
          periodId: this._globalStateService.period!.id,
          branchId: this._globalStateService.branch!.id,
        },
      })
      .pipe(map((value) => value.data?.createOneSchedule));
  }

  private _fetchAllDisciplines(
    accumulared: DisciplinePartsFragment[] = []
  ): void {
    if (!!this._globalStateService.branch?.id) {
      const limit = 50;
      const offset = accumulared.length;

      const params: GetDisciplinesPageQueryVariables = {
        filter: { branchId: { eq: this._globalStateService.branch!.id } },
        limit,
        offset,
      };

      const getDiscipline$ = this._getDisciplinesPage.watch(params, {
        fetchPolicy: 'cache-first', // Usa cache primero, solo pide a la API si no hay datos en cache
        nextFetchPolicy: 'cache-first', // Mantiene la política de cache en siguientes peticiones
        notifyOnNetworkStatusChange: false, // No notifica cambios de red para evitar refetch innecesario
      }).valueChanges;

      getDiscipline$.pipe(map((resp) => resp.data.disciplines)).subscribe({
        next: ({ nodes, totalCount }) => {
          const allItems = accumulared.concat(nodes);

          if (allItems.length >= totalCount) {
            this.disciplines.set(allItems);
            return; // No more fees to fetch
          }

          this._fetchAllDisciplines(allItems);
        },
        error: (error) => {
          console.error('Error fetching disciplines', error);
        },
      });
    } else {
      this.disciplines.set([]);
    }
  }
}

type FormValues = {
  day: string;
  start: Date;
  end: Date;
  disciplineId: string;
};
