import { NgClass } from '@angular/common';
import {
  AfterContentInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GetUsersPageGQL, UserFilter, UserPartsFragment } from '@graphql';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-users',
  imports: [
    NgClass,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent implements AfterContentInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public searchControl = new FormControl('');

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource<UserPartsFragment>([]);

  public loading = signal<boolean>(false);
  public totalCount = signal<number>(0);

  private readonly dialog = inject(MatDialog);
  private readonly _usersPageGQL = inject(GetUsersPageGQL);

  ngAfterContentInit(): void {}

  public refresh() {
    const limit: number = this.paginator.pageSize;
    const offset: number = this.paginator.pageIndex * limit;

    const filter: UserFilter = {
      or: [
        { email: { iLike: `%${this.searchControl.value}%` } },
        { username: { iLike: `%${this.searchControl.value}%` } },
      ],
    };

    this._usersPageGQL
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
          const { nodes, totalCount } = data.users;

          this.dataSource.data = nodes;

          this.loading.set(loading);
          this.totalCount.set(totalCount);
        },
      });
  }
}
