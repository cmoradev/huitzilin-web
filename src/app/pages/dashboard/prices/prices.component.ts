import { Component, inject, OnInit, signal } from '@angular/core';
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
import { CoursePartsFragment, GetCoursePageGQL } from '@graphql';
import { GlobalStateService } from '@services';
import { debounceTime, merge } from 'rxjs';
import { CourseFormDialogComponent } from './course-form-dialog/course-form-dialog.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseDeleteDialogComponent } from './course-delete-dialog/course-delete-dialog.component';
import { NgClass } from '@angular/common';

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
    MatLabel,
    MatFormField,
    MatIconButton,
    MatInput,
    CourseItemComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './prices.component.html',
  styles: ``,
})
export class PricesComponent implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _coursesPageGQL = inject(GetCoursePageGQL);
  public courses = signal<CoursePartsFragment[]>([]);
  public coursesLoading = signal<boolean>(false);
  public coursesTotalCount = signal<number>(0);

  public searchControl = new FormControl('');

  ngOnInit(): void {
    merge(this._globalStateService.branch$, this.searchControl.valueChanges)
      .pipe(debounceTime(300))
      .subscribe({
        next: () => {
          this.refreshCourses();
        },
      });
  }

  public openCourseFormDialog(
    branch: CoursePartsFragment | undefined = undefined
  ): void {
    const $dialog = this._dialog.open(CourseFormDialogComponent, {
      width: '35rem',
      data: branch,
    });

    $dialog.afterClosed().subscribe({
      next: (course) => {
        if (course) this.refreshCourses();
      },
    });
  }

  public openCourseDeleteDialog(branch: CoursePartsFragment): void {
    const $dialog = this._dialog.open(CourseDeleteDialogComponent, {
      width: '35rem',
      data: branch,
    });

    $dialog.afterClosed().subscribe({
      next: (course) => {
        if (course) this.refreshCourses();
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
              branchId: { eq: this._globalStateService.branch?.id },
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
            const { nodes, pageInfo, totalCount } = data.courses;

            this.courses.set(nodes);
            this.coursesLoading.set(loading);
            this.coursesTotalCount.set(totalCount);
          },
        });
    }
  }
}
