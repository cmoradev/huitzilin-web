import { CurrencyPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  CreateConcept,
  CreateIncomesGQL,
  CreatePayment,
  DebitPartsFragment,
} from '@graphql';
import { Concept, PosService } from '@services';
import { NgScrollbar } from 'ngx-scrollbar';
import { ChargeDialogComponent } from '../charge-dialog/charge-dialog.component';
import { ClipChargeDialogComponent } from '../clip-charge-dialog/clip-charge-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _createIncomes = inject(CreateIncomesGQL);

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
  public loading = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.dataSource.data = this._pos.concepts;
    });
  }

  public openClipChargeDialog() {
    const dislog$ = this._dialog.open(ClipChargeDialogComponent, {
      width: '32rem',
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
    const $dislog = this._dialog.open<
      ChargeDialogComponent,
      number,
      CreatePayment[]
    >(ChargeDialogComponent, {
      width: '32rem',
      data: this.total(),
    });

    $dislog.afterClosed().subscribe({
      next: (payments) => {
        if (!!payments && !!payments.length) {
          const concepts: CreateConcept[] = this._pos.concepts.map(
            (concept) => ({
              description: concept.description,
              debitId: concept.debitId,
              quantity: concept.quantity,
              unitPrice: concept.unitPrice,
              withTax: concept.withTax,
              branchID: concept.branchID,
              discounts: concept.discounts.map((discount) => ({
                id: discount.id,
              })),
            })
          );

          const studentIDs = this._pos.studentIDs;

          if (!!studentIDs.length && !!concepts.length) {
            this._createIncomes
              .mutate({
                input: {
                  studentIDs,
                  payments,
                  concepts,
                },
              })
              .subscribe({
                next: () => {
                  this.loading.set(false);
                  this._snackBar.open(
                    'Se han creado los ingresos correctamente',
                    'Cerrar',
                    {
                      duration: 3000,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom',
                    }
                  );
                  this._pos.clearConcepts();
                  this.refresh.emit();
                },
                error: (error) => {
                  this.loading.set(false);
                  // console.error('Error creating incomes:', error);
                },
              });
          }
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
