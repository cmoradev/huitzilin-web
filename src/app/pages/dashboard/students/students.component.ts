import { NgClass } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { AvatarComponent } from '@components/avatar/avatar.component';
import {
  GetStudentsPageGQL,
  StudentFilter,
  StudentPartsFragment,
} from '@graphql';
import { debounceTime, merge, startWith } from 'rxjs';
import { StudentDeleteDialogComponent } from './student-delete-dialog/student-delete-dialog.component';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { StudentDocumentsDialogComponent } from './student-documents-dialog/student-documents-dialog.component';

@Component({
  selector: 'app-students',
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
    AvatarComponent,
    ReactiveFormsModule,
    CdkCopyToClipboard,
  ],
  templateUrl: './students.component.html',
  styles: ``,
})
export class StudentsComponent {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public searchControl = new FormControl('');

  public displayedColumns: string[] = ['name', 'details', 'actions'];
  public dataSource = new MatTableDataSource<StudentPartsFragment>([]);

  public loading = signal(false);
  public totalCount = signal(0);

  private readonly dialog = inject(MatDialog);
  private readonly _companiesPageGQL = inject(GetStudentsPageGQL);

  ngAfterViewInit(): void {
    merge(
      this.paginator.page,
      this.searchControl.valueChanges,
    )
      .pipe(debounceTime(300), startWith({}))
      .subscribe({
        next: () => {
          this.refresh();
        },
      });
  }

  public openDoucumentsDialog(value: StudentPartsFragment): void {
    this.dialog.open(StudentDocumentsDialogComponent, {
      width: '42rem',
      data: value,
    });
  }

  public openFormDialog(
    value: StudentPartsFragment | undefined = undefined
  ): void {
    const $dialog = this.dialog.open(StudentFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (student) => {
        if (student) this.refresh();
      },
    });
  }

  public openDeleteDialog(value: StudentPartsFragment): void {
    const $dialog = this.dialog.open(StudentDeleteDialogComponent, {
      data: value,
      width: '30rem',
    });

    $dialog.afterClosed().subscribe({
      next: (student) => {
        if (student) this.refresh();
      },
    });
  }

  public refresh() {
    const limit: number = this.paginator.pageSize;
    const offset: number = this.paginator.pageIndex * limit;

    const filter: StudentFilter = {
      fullname: { iLike: `%${this.searchControl.value}%` },
    };

    this._companiesPageGQL
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
          const { nodes, totalCount } = data.students;

          this.dataSource.data = nodes.map((node) => {
            return {
              ...node,
            };
          });

          this.loading.set(loading);
          this.totalCount.set(totalCount);
        },
      });
  }
}
