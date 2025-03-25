import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { AvatarComponent } from '@components/avatar/avatar.component';
import {
  CompanyFilter,
  CompanyPartsFragment,
  GetCompaniesPageGQL,
} from '@graphql';
import { debounceTime, merge, startWith } from 'rxjs';
import { CompanyDeleteDialogComponent } from './company-delete-dialog/company-delete-dialog.component';
import { CompanyFormDialogComponent } from './company-form-dialog/company-form-dialog.component';

@Component({
  selector: 'app-business',
  imports: [
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
    MatProgressBar,
  ],
  templateUrl: './business.component.html',
  styles: ``,
})
export class BusinessComponent implements AfterViewInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public searchControl = new FormControl('');

  public displayedColumns: string[] = ['name', 'address', 'actions'];
  public dataSource = new MatTableDataSource<CompanyPartsFragment>([]);

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

  public openCreateDialog(): void {
    const $dialog = this.dialog.open(CompanyFormDialogComponent, {
      width: '35rem',
    });

    $dialog.afterClosed().subscribe({
      next: (company) => {
        if (company) {
          this.refresh();
        }
      },
    });
  }

  public openUpdateDialog(company: CompanyPartsFragment): void {
    const $dialog = this.dialog.open(CompanyFormDialogComponent, {
      width: '35rem',
      data: company,
    });

    $dialog.afterClosed().subscribe({
      next: (company) => {
        if (company) {
          this.refresh();
        }
      },
    });
  }

  public openDeleteDialog(company: CompanyPartsFragment): void {
    const $dialog = this.dialog.open(CompanyDeleteDialogComponent, {
      data: company,
    });

    $dialog.afterClosed().subscribe({
      next: (company) => {
        if (company) {
          this.refresh();
        }
      },
    });
  }

  public refresh() {
    const limit: number = this.paginator.pageSize;
    const offset: number = this.paginator.pageIndex * limit;

    const filter: CompanyFilter = {
      name: { iLike: `%${this.searchControl.value}%` },
    };

    this._companiesPageGQL
      .watch(
        { limit, offset, filter },
        {
          fetchPolicy: 'cache-and-network',
          nextFetchPolicy: 'cache-and-network',
        }
      )
      .valueChanges.subscribe({
        next: ({ data, loading }) => {
          const { nodes, pageInfo, totalCount } = data.companies;

          this.dataSource.data = nodes;

          this.loading.set(loading);
          this.totalCount.set(totalCount);
        },
      });
  }
}
