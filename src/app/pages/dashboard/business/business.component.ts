import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CompanyPartsFragment, GetCompaniesPageGQL } from '@graphql';
import { CompanyFormDialogComponent } from './company-form-dialog/company-form-dialog.component';
import { CompanyDeleteDialogComponent } from './company-delete-dialog/company-delete-dialog.component';
import { AvatarComponent } from '@components/avatar/avatar.component';


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
    AvatarComponent
  ],
  templateUrl: './business.component.html',
  styles: ``,
})
export class BusinessComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'address', 'actions'];
  public dataSource = new MatTableDataSource<CompanyPartsFragment>([]);

  public loading = signal(false);

  private readonly dialog = inject(MatDialog);
  private readonly _companiesPageGQL = inject(GetCompaniesPageGQL);


  ngOnInit(): void {
    this._fetch();
  }

  public openCreateDialog(): void {
    const $dialog = this.dialog.open(CompanyFormDialogComponent, {
      width: '35rem',
    });

    $dialog.afterClosed().subscribe({
      next: (company) => {
        if (company) {
          this._fetch();
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
          this._fetch();
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
          this._fetch();
        }
      },
    });
  }

  private _fetch() {
    this._companiesPageGQL
      .watch(
        {},
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
        },
      });
  }
}
