import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
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
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { AvatarComponent } from '@components/avatar/avatar.component';
import {
  BranchFilter,
  BranchPartsFragment,
  GetCompaniesPageGQL,
} from '@graphql';
import { debounceTime, merge, startWith } from 'rxjs';
import { BranchDeleteDialogComponent } from './branch-delete-dialog/branch-delete-dialog.component';
import { BranchFormDialogComponent } from './branch-form-dialog/branch-form-dialog.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-business',
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
  ],
  templateUrl: './branches.component.html',
  styles: ``,
})
export class BranchsComponent implements AfterViewInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public searchControl = new FormControl('');

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource<BranchPartsFragment>([]);

  public loading = signal(false);
  public totalCount = signal(0);

  private readonly dialog = inject(MatDialog);
  private readonly _companiesPageGQL = inject(GetCompaniesPageGQL);

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.searchControl.valueChanges)
      .pipe(debounceTime(300), startWith({}))
      .subscribe({
        next: () => {
          this.refresh();
        },
      });
  }

  public openFormDialog(branch: BranchPartsFragment | undefined = undefined): void {
    const $dialog = this.dialog.open(BranchFormDialogComponent, {
      width: '35rem',
      data: branch,
    });

    $dialog.afterClosed().subscribe({
      next: (branch) => {
        if (branch) this.refresh();
      },
    });
  }

  public openDeleteDialog(branch: BranchPartsFragment): void {
    const $dialog = this.dialog.open(BranchDeleteDialogComponent, {
      data: branch,
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

    const filter: BranchFilter = {
      name: { iLike: `%${this.searchControl.value}%` },
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
          const { nodes, totalCount } = data.branches;

          this.dataSource.data = nodes;

          this.loading.set(loading);
          this.totalCount.set(totalCount);
        },
      });
  }
}
