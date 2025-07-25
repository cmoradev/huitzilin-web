import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
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
import { ReportsData, ReportsGrouped, ReportsService } from '@services';
import { FolioPipe, MethodPipe } from '@pipes';
import { init } from 'echarts';
import { PaymentMethod } from '@graphql';

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
export class IncomesComponent implements AfterViewInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  @ViewChild('branchsChart')
  public branchsChartElement!: ElementRef<HTMLDivElement>;
  @ViewChild('methodsChart')
  public methodsChartElement!: ElementRef<HTMLDivElement>;

  public loading = signal<boolean>(false);
  public total = signal<number>(0);
  public incomeBranchs = signal<ReportsGrouped[]>([]);
  public incomeMethods = signal<ReportsGrouped[]>([]);
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    merge(this.startDateControl.valueChanges, this.endDateControl.valueChanges)
      .pipe(startWith(null))
      .subscribe({
        next: () => {
          this.refresh();
        },
      });
  }

  public refresh() {
    this.loading.set(true);

    if (!!this.startDateControl?.value && this.endDateControl.value) {
      const start = startOfDay(this.startDateControl.value).toISOString();
      const end = endOfDay(this.endDateControl.value).toISOString();

      this.reportsService.incomes(start, end).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.incomeBranchs.set(response.groupedByBranch);
          this.incomeMethods.set(response.groupedByMethod);
          this.total.set(response.total);
          this.loading.set(false);
          this.drawCharts();
        },
        error: (error) => {
          console.error('Error fetching incomes:', error);
          this.loading.set(false);
        },
      });
    }
  }

  private drawCharts() {
    if (this.branchsChartElement.nativeElement) {
      const branchsChart = init(this.branchsChartElement.nativeElement);

      const branchsData = this.incomeBranchs().map((grouped) => ({
        value: grouped.count,
        name: grouped.name,
      }));

      branchsChart.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Ingresos por sucursal',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: branchsData,
          },
        ],
      });
    }

    if (this.methodsChartElement.nativeElement) {
      const methodsChart = init(this.methodsChartElement.nativeElement);

      const paymentNames: any = {
        [PaymentMethod.Card]: 'Tarjeta',
        [PaymentMethod.Cash]: 'Efectivo',
        [PaymentMethod.Transfer]: 'Transferencia',
        [PaymentMethod.Clip]: 'Clip',
      };

      const methodsData = this.incomeMethods().map((grouped) => ({
        value: grouped.count,
        name: paymentNames[grouped.id.toUpperCase()],
      }));

      methodsChart.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Ingresos por método',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: methodsData,
          },
        ],
      });
    }
  }
}
