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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatDivider, MatNavList } from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  ActivityPartsFragment,
  FeePartsFragment,
  GetActivityPageGQL,
  GetFeePageGQL,
} from '@graphql';
import { GlobalStateService } from '@services';
import { debounceTime, merge } from 'rxjs';
import { ActivityFormDialogComponent } from './activity-form-dialog/activity-form-dialog.component';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { ActivityDeleteDialogComponent } from './activity-delete-dialog/activity-delete-dialog.component';
import { NgClass } from '@angular/common';
import { FeeItemComponent } from './fee-item/fee-item.component';
import { FeeDeleteDialogComponent } from './fee-delete-dialog/fee-delete-dialog.component';
import { FeeFormDialogComponent } from './fee-form-dialog/fee-form-dialog.component';
import { Branch } from '../../../graphql/generated';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-prices',
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
    ReactiveFormsModule,
    ActivityItemComponent,
    FeeItemComponent,
  ],
  templateUrl: './prices.component.html',
  styles: ``,
})
export class PricesComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _globalStateService = inject(GlobalStateService);

  public activity = computed(() => this._globalStateService.activity);

  private readonly _activitiesPageGQL = inject(GetActivityPageGQL);
  private readonly _feesPageGQL = inject(GetFeePageGQL);

  public activities = signal<ActivityPartsFragment[]>([]);
  public activitiesLoading = signal<boolean>(false);
  public activitiesTotalCount = signal<number>(0);

  public fees = signal<FeePartsFragment[]>([]);
  public feesLoading = signal<boolean>(false);
  public feesTotalCount = signal<number>(0);

  public searchControl = new FormControl('');

  ngOnInit(): void {
    merge(this._globalStateService.branch$, this.searchControl.valueChanges)
      .pipe(debounceTime(300))
      .subscribe({
        next: () => {
          this.refreshActivities();
        },
      });

    this._globalStateService.activity$.subscribe({
      next: () => {
        this.refreshFees();
      },
    });
  }

  public openActivityFormDialog(
    value: ActivityPartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(ActivityFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (activity) => {
        if (activity) this.refreshActivities();
      },
    });
  }

  public openActivityDeleteDialog(value: ActivityPartsFragment): void {
    const $dialog = this._dialog.open(ActivityDeleteDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (activity) => {
        if (activity) this.refreshActivities();
      },
    });
  }

  public openFeeFormDialog(
    value: FeePartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(FeeFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (fee) => {
        if (fee) this.refreshFees();
      },
    });
  }

  public openFeeDeleteDialog(value: FeePartsFragment): void {
    const $dialog = this._dialog.open(FeeDeleteDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (fee) => {
        if (fee) this.refreshFees();
      },
    });
  }

  public refreshActivities(): void {
    if (!!this._globalStateService.branch?.id) {
      this.activitiesLoading.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._activitiesPageGQL
        .watch(
          {
            filter: {
              branchId: { eq: this._globalStateService.branch!.id },
              name: { iLike: `%${this.searchControl.value}%` },
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
            const { nodes, totalCount } = data.activities;

            this.activities.set(nodes);
            this.activitiesLoading.set(loading);
            this.activitiesTotalCount.set(totalCount);
          },
        });
    }
  }

  public refreshFees(): void {
    if (!!this._globalStateService.activity?.id) {
      this.feesLoading.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._feesPageGQL
        .watch(
          {
            filter: {
              activityId: { eq: this._globalStateService.activity!.id },
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
            const { nodes, totalCount } = data.fees;

            this.fees.set(nodes);
            this.feesLoading.set(loading);
            this.feesTotalCount.set(totalCount);
          },
        });
    }  else {
      this.fees.set([]);
      this.feesLoading.set(false);
      this.feesTotalCount.set(0);
    }
  }
}
