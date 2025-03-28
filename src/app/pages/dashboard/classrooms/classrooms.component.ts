import { NgClass } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatPrefix } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import {
  ClassroomFilter,
  ClassroomPartsFragment,
  GetClassroomsPageGQL,
} from '@graphql';
import { debounceTime, merge, startWith } from 'rxjs';
import { ClassroomDeleteDialogComponent } from './classroom-delete-dialog/classroom-delete-dialog.component';
import { ClassroomFormDialogComponent } from './classroom-form-dialog/classroom-form-dialog.component';

@Component({
  selector: 'app-classrooms',
  imports: [
    NgClass,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatIconButton,
    MatIcon,
    MatPrefix,
    MatTooltip,
    MatTableModule,
    MatPaginator,
    ReactiveFormsModule,
  ],
  templateUrl: './classrooms.component.html',
  styles: ``,
})
export class ClassroomsComponent {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public searchControl = new FormControl('');

  public displayedColumns: string[] = ['name', 'actions'];

  public dataSource = new MatTableDataSource<ClassroomPartsFragment>([]);

  public loading = signal(false);
  public totalCount = signal(0);

  private readonly dialog = inject(MatDialog);
  private readonly _classroomsPageGQL = inject(GetClassroomsPageGQL);

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.searchControl.valueChanges)
      .pipe(debounceTime(300), startWith({}))
      .subscribe({
        next: () => {
          this.refresh();
        },
      });
  }

  public openFormDialog(
    value: ClassroomPartsFragment | undefined = undefined
  ): void {
    const $dialog = this.dialog.open(ClassroomFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (branch) => {
        if (branch) this.refresh();
      },
    });
  }

  public openDeleteDialog(value: ClassroomPartsFragment): void {
    const $dialog = this.dialog.open(ClassroomDeleteDialogComponent, {
      data: value,
      width: '30rem',
    });

    $dialog.afterClosed().subscribe({
      next: (branch) => {
        if (branch) this.refresh();
      },
    });
  }

  public refresh() {
    const limit: number = this.paginator.pageSize;
    const offset: number = this.paginator.pageIndex * limit;

    const filter: ClassroomFilter = {
      name: { iLike: `%${this.searchControl.value}%` },
    };

    this._classroomsPageGQL
      .watch(
        { limit, offset, filter },
        {
          fetchPolicy: 'cache-and-network',
          nextFetchPolicy: 'cache-and-network',
          notifyOnNetworkStatusChange: true,
        }
      )
      .valueChanges.subscribe({
        next: ({ data, loading }) => {
          const { nodes, totalCount } = data.classrooms;

          this.dataSource.data = nodes;

          this.loading.set(loading);
          this.totalCount.set(totalCount);
        },
      });
  }
}
