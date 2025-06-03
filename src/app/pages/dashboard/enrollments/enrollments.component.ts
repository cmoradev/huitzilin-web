import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatDivider, MatNavList } from '@angular/material/list';
import { StudentStateComponent } from '@components/student-state/student-state.component';
import {
  DebitPartsFragment,
  EnrollmentPartsFragment,
  GetDebitsPageGQL,
  GetEnrollmentsPageGQL,
  SetOrderInput,
  SetOrderEnrollmentsGQL,
} from '@graphql';
import { GlobalStateService } from '@services';
import { NgScrollbar } from 'ngx-scrollbar';
import { debounceTime, merge } from 'rxjs';
import { DebitDeleteDialogComponent } from './debit-delete-dialog/debit-delete-dialog.component';
import { DebitFormDialogComponent } from './debit-form-dialog/debit-form-dialog.component';
import { EnrollmentDeleteDialogComponent } from './enrollment-delete-dialog/enrollment-delete-dialog.component';
import { EnrollmentFormDialogComponent } from './enrollment-form-dialog/enrollment-form-dialog.component';
import { EnrollmentItemComponent } from './enrollment-item/enrollment-item.component';
import { DebitItemComponent } from './debit-item/debit-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { DebitFormCatalogDialogComponent } from './debit-form-catalog-dialog/debit-form-catalog-dialog.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-enrollments',
  imports: [
    NgClass,
    MatCard,
    MatIcon,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatNavList,
    MatDivider,
    NgScrollbar,
    MatFormField,
    MatIconButton,
    MatInput,
    StudentStateComponent,
    ReactiveFormsModule,
    EnrollmentItemComponent,
    DebitItemComponent,
    MatMenuModule,
    DragDropModule,
  ],
  templateUrl: './enrollments.component.html',
  styles: ``,
})
export class EnrollmentsComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _globalStateService = inject(GlobalStateService);

  public enrollment = computed(() => this._globalStateService.enrollment);
  public student = computed(() => this._globalStateService.student);
  public branch = computed(() => this._globalStateService.branch);
  public cycle = computed(() => this._globalStateService.cycle);

  private readonly _setOrderEnrollmentsGQL = inject(SetOrderEnrollmentsGQL);

  private readonly _enrollmentsPageGQL = inject(GetEnrollmentsPageGQL);
  private readonly _debitsPageGQL = inject(GetDebitsPageGQL);

  public enrollments = signal<EnrollmentPartsFragment[]>([]);
  public enrollmentsLoading = signal<boolean>(false);
  public enrollmentsTotalCount = signal<number>(0);

  public debits = signal<DebitPartsFragment[]>([]);
  public debitsLoading = signal<boolean>(false);
  public debitsTotalCount = signal<number>(0);

  public searchControl = new FormControl('');

  ngOnInit(): void {
    merge(
      this._globalStateService.branch$,
      this._globalStateService.cycle$,
      this._globalStateService.student$,
      this.searchControl.valueChanges
    )
      .pipe(debounceTime(300))
      .subscribe({
        next: () => {
          this.refreshEnrollments();
        },
      });

    this._globalStateService.enrollment$.subscribe({
      next: () => {
        this.refreshDebits();
      },
    });
  }

  public openEnrollmentFormDialog(
    value: EnrollmentPartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(EnrollmentFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (enrollment) => {
        if (enrollment) this.refreshEnrollments();
      },
    });
  }

  public openEnrollmentDeleteDialog(value: EnrollmentPartsFragment): void {
    const $dialog = this._dialog.open(EnrollmentDeleteDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (enrollment) => {
        if (enrollment) this.refreshEnrollments();
      },
    });
  }

  public openDebitCatalogDialog(
    value: DebitPartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(DebitFormCatalogDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (debit) => {
        if (debit) this.refreshDebits();
      },
    });
  }

  public openDebitFormDialog(
    value: DebitPartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(DebitFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (debit) => {
        if (debit) this.refreshDebits();
      },
    });
  }

  public openDebitDeleteDialog(value: DebitPartsFragment): void {
    const $dialog = this._dialog.open(DebitDeleteDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (debit) => {
        if (debit) this.refreshDebits();
      },
    });
  }

  public refreshEnrollments(): void {
    if (
      !!this._globalStateService.branch?.id &&
      !!this._globalStateService.cycle?.id &&
      !!this._globalStateService.student?.id
    ) {
      this.enrollmentsLoading.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._enrollmentsPageGQL
        .watch(
          {
            filter: {
              branchId: { eq: this._globalStateService.branch!.id },
              studentId: { eq: this._globalStateService.student!.id },
              cycleId: { eq: this._globalStateService.cycle!.id },
              details: { iLike: `%${this.searchControl.value}%` },
            },
            limit: 100,
            offset: 0,
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ data, loading }) => {
            const { nodes, totalCount } = data.enrollments;

            this.enrollments.set(nodes);
            this.enrollmentsLoading.set(loading);
            this.enrollmentsTotalCount.set(totalCount);
          },
        });
    }
  }

  public refreshDebits(): void {
    if (!!this._globalStateService.enrollment?.id) {
      this.debitsLoading.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._debitsPageGQL
        .watch(
          {
            filter: {
              enrollmentId: { eq: this._globalStateService.enrollment!.id },
            },

            limit: 100,
            offset: 0,
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ data, loading }) => {
            const { nodes, totalCount } = data.debits;

            this.debits.set(nodes);
            this.debitsLoading.set(loading);
            this.debitsTotalCount.set(totalCount);
          },
        });
    } else {
      this.debits.set([]);
      this.debitsLoading.set(false);
      this.debitsTotalCount.set(0);
    }
  }

  public dropEnrollment(event: CdkDragDrop<EnrollmentPartsFragment[]>) {
    this.enrollments.update((previous) => {
      const values = [...previous];
      moveItemInArray(values, event.previousIndex, event.currentIndex);
      return values;
    });

    this.updateOrderEnrollments();
  }

  private updateOrderEnrollments(): void {
    const payload: SetOrderInput[] = this.enrollments().map(
      (item, index) => ({
        id: item.id,
        order: index + 1,
      })
    );

    this._setOrderEnrollmentsGQL
      .mutate({
        payload,
      })
      .subscribe({
        next: () => {
          console.log('Order enrollments updated successfully');
        },
        error: (error) => {
          console.error('Error updating order enrollments', error);
        },
      });
  }
}
