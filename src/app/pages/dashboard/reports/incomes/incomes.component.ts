import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-incomes',
  imports: [
    NgClass,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  templateUrl: './incomes.component.html',
  styles: ``,
})
export class IncomesComponent {
  public loading = signal<boolean>(false);
  public totalCount = signal<number>(0);
  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource<any>([]);

  public refresh() {
    this.loading.set(true);
    // Simulate an API call
  }

}
