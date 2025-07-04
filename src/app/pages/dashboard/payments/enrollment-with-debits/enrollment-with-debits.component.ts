import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DebitPartsFragment, DebitState, EnrollmentPartsFragment, GetDebitsPageGQL, GetDebitsPageQueryVariables } from '@graphql';
import { EnrollmentCalendarComponent } from '../../enrollments/enrollment-calendar/enrollment-calendar.component';
import { map } from 'rxjs';
import { ConceptOptionComponent } from '../concept-option/concept-option.component';

@Component({
  selector: 'app-enrollment-with-debits',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, ConceptOptionComponent],
  templateUrl: './enrollment-with-debits.component.html',
  styleUrls: ['./enrollment-with-debits.component.scss'],
})
export class EnrollmentWithDebitsComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _getDebitsPage = inject(GetDebitsPageGQL);

  public enrollment = input.required<EnrollmentPartsFragment>();

  public expanded = signal<boolean>(false);
  public loading = signal<boolean>(false);
  public debits = signal<DebitPartsFragment[]>([]);

  ngOnInit(): void {
    this._fetchAllDebits();
  }

  public openEnrollmentCalendarDialog(evet: MouseEvent): void {
    evet.stopPropagation();

    this._dialog.open(EnrollmentCalendarComponent, {
      width: '56rem',
      maxWidth: '95vw',
      data: this.enrollment(),
    });
  }

  public toggleExpanded(): void {
    this.expanded.update((current) => !current);
  }

  private _fetchAllDebits(
    accumulared: DebitPartsFragment[] = []
  ): void {
    if (!!this.enrollment().id) {
      this.loading.set(true);

      const limit = 50;
      const offset = accumulared.length;

      const params: GetDebitsPageQueryVariables = {
        filter: {
          enrollmentId: { eq: this.enrollment().id  },
          state: { in: [DebitState.Debt, DebitState.PartiallyPaid] }
        },
        limit,
        offset,
      };

      const getDebits$ = this._getDebitsPage.watch(params, {
        fetchPolicy: 'cache-and-network', // Usa cache primero, solo pide a la API si no hay datos en cache
        nextFetchPolicy: 'cache-and-network', // Mantiene la política de cache en siguientes peticiones
        notifyOnNetworkStatusChange: false, // No notifica cambios de red para evitar refetch innecesario
      }).valueChanges;

      getDebits$.pipe(map((resp) => resp.data.debits)).subscribe({
        next: ({ nodes, totalCount }) => {
          const allItems = accumulared.concat(nodes);

          if (allItems.length >= totalCount) {
            this.debits.set(allItems);
            this.loading.set(false);
            return; // No more enrollments to fetch
          }

          this._fetchAllDebits(allItems);
        },
        error: (error) => {
          console.error('Error fetching enrollments', error);
        },
      });
    }
  }
}
