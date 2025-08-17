import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendarComponent } from '@components/calendar/calendar.component';
import {
  EnrollmentPartsFragment,
  GetSchedulesPageGQL,
  GetSchedulesPageQueryVariables,
  SchedulePartsFragment,
} from '@graphql';
import { map } from 'rxjs';

@Component({
  selector: 'app-enrollment-calendar',
  imports: [
    MatDialogModule,
    MatButtonModule,
    CalendarComponent,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './enrollment-calendar.component.html',
  styles: ``,
})
export class EnrollmentCalendarComponent implements OnInit {
  private readonly _getSchedulesPage = inject(GetSchedulesPageGQL);

  public params: EnrollmentPartsFragment = inject(MAT_DIALOG_DATA);
  public schedules = signal<SchedulePartsFragment[]>([]);
  public loading = signal<boolean>(true);

  ngOnInit(): void {
    this._fetchAllSchedules();
  }

  private _fetchAllSchedules(accumulared: SchedulePartsFragment[] = []): void {
    if (!!this.params?.id) {
      const limit = 50;
      const offset = accumulared.length;

      const variables: GetSchedulesPageQueryVariables = {
        filter: { enrollments: { id: { eq: this.params!.id } } },
        limit,
        offset,
      };

      const fetch$ = this._getSchedulesPage.watch(variables, {
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
