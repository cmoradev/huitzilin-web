import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDivider, MatNavList } from '@angular/material/list';
import { StudentStateComponent } from '@components/student-state/student-state.component';
import {
  DebitPartsFragment,
  EnrollmentPartsFragment,
  GetDebitsPageGQL,
  SetOrderInput,
  SetOrderEnrollmentsGQL,
  GetEnrollmentsPageQueryVariables,
} from '@graphql';
import {
  EnrollmentDataSource,
  EnrollmentFlatTreeService,
  GlobalStateService,
} from '@services';
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
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FlatNode } from '@models';

@Component({
  selector: 'app-enrollments',
  imports: [
    MatIconModule,
    MatCardModule,
    MatNavList,
    MatDivider,
    NgScrollbar,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    DragDropModule,
    MatTooltipModule,
    StudentStateComponent,
    CdkTreeModule,
    DebitItemComponent,
    EnrollmentItemComponent,
  ],
  templateUrl: './enrollments.component.html',
  styles: ``,
})
export class EnrollmentsComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _snackBar = inject(MatSnackBar);

  public enrollment = computed(() => this._globalStateService.enrollment);
  public student = computed(() => this._globalStateService.student);
  public branch = computed(() => this._globalStateService.branch);
  public cycle = computed(() => this._globalStateService.cycle);

  private readonly _debitsPageGQL = inject(GetDebitsPageGQL);

  private readonly _enrollmentFlatTree = inject(EnrollmentFlatTreeService);
  public enrollmentsDataSource = new EnrollmentDataSource(
    this._enrollmentFlatTree
  );
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
    value: FlatNode<EnrollmentPartsFragment> | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(EnrollmentFormDialogComponent, {
      width: '30rem',
      data: value?.item,
    });

    $dialog.afterClosed().subscribe({
      next: (enrollment) => {
        if (enrollment) this.refreshEnrollments();
      },
    });
  }

  public createChildEnrollmentFormDialog(
    value: FlatNode<EnrollmentPartsFragment>
  ) {
    const $dialog = this._dialog.open(EnrollmentFormDialogComponent, {
      width: '30rem',
      data: {
        parentId: value?.item.id,
      },
    });

    $dialog.afterClosed().subscribe({
      next: (enrollment) => {
        if (enrollment) this.refreshEnrollments();
      },
    });
  }

  public openEnrollmentDeleteDialog(
    value: FlatNode<EnrollmentPartsFragment>
  ): void {
    const $dialog = this._dialog.open(EnrollmentDeleteDialogComponent, {
      width: '30rem',
      data: value.item,
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
      width: '42rem',
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
      width: '42rem',
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

  public refreshEnrollments(
    accumulared: FlatNode<EnrollmentPartsFragment>[] = []
  ): void {
    if (
      !!this._globalStateService.branch?.id &&
      !!this._globalStateService.cycle?.id &&
      !!this._globalStateService.student?.id
    ) {
      const limit = 50;
      const offset = accumulared.length;

      const params: GetEnrollmentsPageQueryVariables = {
        limit,
        offset,
        filter: {
          branchId: { eq: this._globalStateService.branch!.id },
          studentId: { eq: this._globalStateService.student!.id },
          cycleId: { eq: this._globalStateService.cycle!.id },
          parentId: { is: null },
          details: { iLike: `%${this.searchControl.value}%` },
        },
      };

      this.enrollmentsLoading.set(true);

      this._enrollmentFlatTree.loadRoots(params).subscribe({
        next: ({ nodes, totalCount }) => {
          const allItems = accumulared.concat(nodes);

          if (allItems.length >= totalCount) {
            this.enrollmentsDataSource.data = allItems;
            this.enrollmentsLoading.set(false);
            this.enrollmentsTotalCount.set(totalCount);
            return; // No more activities to fetch
          }

          this.refreshEnrollments(allItems);
        },
        error: (error) => {
          console.error('Error fetching activities', error);
          this.enrollmentsLoading.set(false);
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

}
