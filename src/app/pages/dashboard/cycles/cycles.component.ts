import { NgClass } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { CycleFilter, CyclePartsFragment, GetCyclesPageGQL } from '@graphql';
import { debounceTime, merge, startWith } from 'rxjs';
import { CycleFormDialogComponent } from './cycle-form-dialog/cycle-form-dialog.component';
import { CycleDeleteDialogComponent } from './cycle-delete-dialog/cycle-delete-dialog.component';
import { GlobalStateService } from '@services';

@Component({
  selector: 'app-cycles',
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
  templateUrl: './cycles.component.html',
  styles: ``,
})
export class CyclesComponent {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public searchControl = new FormControl('');

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource<CyclePartsFragment>([]);

  public loading = signal(false);
  public totalCount = signal(0);

  private readonly dialog = inject(MatDialog);
  private readonly _cyclesPageGQL = inject(GetCyclesPageGQL);
  private readonly _globalStateService = inject(GlobalStateService);

  ngAfterViewInit(): void {
    merge(
      this.paginator.page,
      this.searchControl.valueChanges,
      this._globalStateService.branch$
    )
      .pipe(debounceTime(300), startWith({}))
      .subscribe({
        next: () => {
          this.refresh();
        },
      });
  }

  public openFormDialog(
    value: CyclePartsFragment | undefined = undefined
  ): void {
    const $dialog = this.dialog.open(CycleFormDialogComponent, {
      width: '30rem',
      data: value,
    });

    $dialog.afterClosed().subscribe({
      next: (cycle) => {
        if (cycle) this.refresh();
      },
    });
  }

  public openDeleteDialog(value: CyclePartsFragment): void {
    const $dialog = this.dialog.open(CycleDeleteDialogComponent, {
      data: value,
      width: '30rem',
    });

    $dialog.afterClosed().subscribe({
      next: (cycle) => {
        if (cycle) this.refresh();
      },
    });
  }

  public refresh() {
    if (this._globalStateService.branch?.id) {
      const limit: number = this.paginator.pageSize;
      const offset: number = this.paginator.pageIndex * limit;

      const filter: CycleFilter = {
        name: { iLike: `%${this.searchControl.value}%` },
        branchId: { eq: this._globalStateService.branch!.id },
      };

      this._cyclesPageGQL
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
            const { nodes, totalCount } = data.cycles;

            this.dataSource.data = nodes;

            this.loading.set(loading);
            this.totalCount.set(totalCount);
          },
        });
    }
  }
}
