import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { merge, startWith } from 'rxjs';
import { endOfDay, startOfDay } from 'date-fns';
import { ReportsData, ReportsService } from '@services';
import { FolioPipe, MethodPipe } from '@pipes';

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
    FolioPipe,
    MethodPipe,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './incomes.component.html',
  styles: ``,
})
export class IncomesComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') public paginator!: MatPaginator;

  public loading = signal<boolean>(false);
  public total = signal<number>(0);
  public displayedColumns: string[] = [
    'branchName',
    'studentNames',
    'incomeFolio',
    'paymentFolio',
    'paymentMethod',
    'paymentDate',
    'paymentAmount',
  ];

  public dataSource = new MatTableDataSource<ReportsData>([]);

  private readonly reportsService = inject(ReportsService);

  public startDateControl = new FormControl<Date>(startOfDay(new Date()));
  public endDateControl = new FormControl<Date>(endOfDay(new Date()));

  ngOnInit(): void {
    merge(this.startDateControl.valueChanges, this.endDateControl.valueChanges)
      .pipe(startWith(null))
      .subscribe({
        next: () => {
          this.refresh();
        },
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public refresh() {
    this.loading.set(true);

    if (!!this.startDateControl?.value && this.endDateControl.value) {
      const start = startOfDay(this.startDateControl.value).toISOString();
      const end = endOfDay(this.endDateControl.value).toISOString();

      this.reportsService.incomes(start, end).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.total.set(response.total);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching incomes:', error);
          this.loading.set(false);
        },
      });
    }
  }
}
