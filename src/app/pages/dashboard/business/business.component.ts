import { Component, inject, OnInit } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { CompanyPartsFragment, GetCompaniesPageGQL } from '@graphql'
import { FormDialogComponent } from './form-dialog/form-dialog.component';

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
    MatPaginator
  ],
  templateUrl: './business.component.html',
  styles: ``,
})
export class BusinessComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'address', 'actions'];
  public dataSource = new MatTableDataSource<CompanyPartsFragment>([]);

  private readonly dialog = inject(MatDialog) 

  private readonly _companiesPageGQL = inject(GetCompaniesPageGQL);

  ngOnInit(): void {
    this._companiesPageGQL.fetch().subscribe({
      next: ({ data }) => {
        const { nodes, pageInfo, totalCount } = data.companies;

        this.dataSource.data = nodes;
      },
    })
  }

  public openCreateDialog(): void {
    this.dialog.open(FormDialogComponent, {
      width: '35rem',
    });
  }
}
