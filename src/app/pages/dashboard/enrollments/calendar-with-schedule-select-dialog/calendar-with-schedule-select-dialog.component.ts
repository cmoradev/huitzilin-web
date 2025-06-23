import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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

  public params: Params = inject(MAT_DIALOG_DATA);
  public schedules = signal<SchedulePartsFragment[]>([]);
  public loading = signal<boolean>(false);

  ngOnInit(): void {
    this.fetchAllSchedules();
  }

  public fetchAllSchedules(accumulared: SchedulePartsFragment[] = []): void {
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
        fetchPolicy: 'cache-first', // Usa cache primero, solo pide a la API si no hay datos en cache
        nextFetchPolicy: 'cache-first', // Mantiene la política de cache en siguientes peticiones
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

          this.fetchAllSchedules(allItems);
        },
        error: (error) => {
          console.error('Error fetching disciplines', error);
        },
      });
    }
  }
}
