import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, effect, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DebitPartsFragment } from '@graphql';
import { Concept, PosService } from '@services';
import { NgScrollbar } from 'ngx-scrollbar';
import { ChargeDialogComponent } from '../charge-dialog/charge-dialog.component';
import { ClipChargeDialogComponent } from '../clip-charge-dialog/clip-charge-dialog.component';

@Component({
  selector: 'app-sale-details',
  imports: [
    MatTableModule,
    MatButtonModule,
    NgScrollbar,
    CurrencyPipe,
    NgClass,
  ],
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss'],
})
export class SaleDetailsComponent {
  private readonly _pos = inject(PosService);
  private readonly _dialog = inject(MatDialog);

  public refresh = output<void>();

  public displayedColumns = [
    'description',
    'amount',
    'discount',
    'subtotal',
    'taxes',
    'total',
  ];
  public dataSource = new MatTableDataSource<Concept>([]);
  public expandedElement: DebitPartsFragment | null = null;

  public amount = computed(() => this._pos.amount);
  public discount = computed(() => this._pos.discount);
  public subtotal = computed(() => this._pos.subtotal);
  public taxes = computed(() => this._pos.taxes);
  public total = computed(() => this._pos.total);

  constructor() {
    effect(() => {
      this.dataSource.data = this._pos.concepts;
    });
  }

  public openClipChargeDialog() {
    const dislog$ = this._dialog.open(ClipChargeDialogComponent, {
      width: '30rem',
    });

    dislog$.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this._pos.clearConcepts();
          this.refresh.emit();
        }
      },
    });
  }

  public openChargeDialog() {
    const dislog$ = this._dialog.open(ChargeDialogComponent, {
      width: '30rem',
    });

    dislog$.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this._pos.clearConcepts();
          this.refresh.emit();
        }
      },
    });
  }

  /** Checks whether an element is expanded. */
  public isExpanded(element: DebitPartsFragment) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  public toggle(element: DebitPartsFragment) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
