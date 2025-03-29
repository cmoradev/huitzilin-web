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
  CoursePartsFragment,
  FeePartsFragment,
  GetCoursePageGQL,
  GetFeePageGQL,
} from '@graphql';
import { GlobalStateService } from '@services';
import { debounceTime, merge } from 'rxjs';
import { CourseFormDialogComponent } from './course-form-dialog/course-form-dialog.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseDeleteDialogComponent } from './course-delete-dialog/course-delete-dialog.component';
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
    CourseItemComponent,
    FeeItemComponent,
  ],
  templateUrl: './prices.component.html',
  styles: ``,
})
export class PricesComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _globalStateService = inject(GlobalStateService);

  public course = computed(() => this._globalStateService.course);

  private readonly _coursesPageGQL = inject(GetCoursePageGQL);
  private readonly _feesPageGQL = inject(GetFeePageGQL);

  public courses = signal<CoursePartsFragment[]>([]);
  public coursesLoading = signal<boolean>(false);
  public coursesTotalCount = signal<number>(0);

  public fees = signal<FeePartsFragment[]>([]);
  public feesLoading = signal<boolean>(false);
  public feesTotalCount = signal<number>(0);

  public searchControl = new FormControl('');

  ngOnInit(): void {
    merge(this._globalStateService.branch$, this.searchControl.valueChanges)
      .pipe(debounceTime(300))
      .subscribe({
        next: () => {
          this.refreshCourses();
        },
      });

    this._globalStateService.course$.subscribe({
      next: () => {
        this.refreshFees();
      },
    });
  }

  public openCourseFormDialog(
    value: CoursePartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(CourseFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (course) => {
        if (course) this.refreshCourses();
      },
    });
  }

  public openCourseDeleteDialog(value: CoursePartsFragment): void {
    const $dialog = this._dialog.open(CourseDeleteDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (course) => {
        if (course) this.refreshCourses();
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

  public refreshCourses(): void {
    if (!!this._globalStateService.branch?.id) {
      this.coursesLoading.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._coursesPageGQL
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
            const { nodes, totalCount } = data.courses;

            this.courses.set(nodes);
            this.coursesLoading.set(loading);
            this.coursesTotalCount.set(totalCount);
          },
        });
    }
  }

  public refreshFees(): void {
    if (!!this._globalStateService.course?.id) {
      this.feesLoading.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._feesPageGQL
        .watch(
          {
            filter: {
              courseId: { eq: this._globalStateService.course!.id },
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
