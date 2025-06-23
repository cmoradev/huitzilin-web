import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CalendarComponent } from '@components/calendar/calendar.component';
import {
  GetSchedulesPageGQL,
  GetSchedulesPageQueryVariables,
  LevelPartsFragment,
  PeriodPartsFragment,
  SchedulePartsFragment,
} from '@graphql';
import { GlobalStateService } from '@services';
import { map } from 'rxjs';

type Params = {
  period?: PeriodPartsFragment;
  level?: LevelPartsFragment;
  selected?: SchedulePartsFragment[];
};

@Component({
  selector: 'app-calendar-with-schedule-select-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    CalendarComponent,
  ],
  templateUrl: './calendar-with-schedule-select-dialog.component.html',
  styles: ``,
})
export class CalendarWithScheduleSelectDialogComponent implements OnInit {
  private readonly _globalState = inject(GlobalStateService);
  private readonly _gettSchedulesPage = inject(GetSchedulesPageGQL);

  private readonly _dialogRef = inject(MatDialogRef<CalendarWithScheduleSelectDialogComponent>)

  public params: Params = inject(MAT_DIALOG_DATA);
  public schedules = signal<SchedulePartsFragment[]>([]);
  public loading = signal<boolean>(false);

  private _selected = signal<SchedulePartsFragment[]>([]);

  ngOnInit(): void {
    this._fetchAllSchedules();

    if (this.params.selected) this._selected.set(this.params.selected);
  }

  public isScheduleSelected(scheduleId: string): boolean {
    return this._selected().some(
      (schedule) => schedule.id === scheduleId
    );
  }

  public onDaySelection(event: MatChipListboxChange) {
    this._selected.update(prev => {
      return [...prev, event.value]
    });
  }

  public submit() {
    this._dialogRef.close(this._selected());
  }

  private _fetchAllSchedules(accumulared: SchedulePartsFragment[] = []): void {
    if (
      !!this._globalState.branch?.id &&
      !!this.params.period &&
      !!this.params.level
    ) {
      this.loading.set(true);

      const limit = 50;
      const offset = accumulared.length;

      const variables: GetSchedulesPageQueryVariables = {
        filter: {
          branchId: { eq: this._globalState.branch!.id },
          periodId: { eq: this.params.period.id },
          levels: {
            id: { eq: this.params.level.id },
          },
        },
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
