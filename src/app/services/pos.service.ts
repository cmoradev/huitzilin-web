import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  calculateAmount,
  calculateSubtotalAndDiscount,
  calculateTotalFromBaseAndTax,
  TaxEnum,
} from '@calculations';
import { DebitPartsFragment, DiscountPartsFragment } from '@graphql';
import Decimal from 'decimal.js';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _concepts = signal<Concept[]>([]);

  public withTax = computed(() => {
    const [first] = this._concepts();

    return first?.withTax ?? false;
  });

  private readonly _amount = computed(() => {
    return this._concepts().reduce(
      (accumulated, debit) => accumulated.plus(debit.amount),
      new Decimal(0)
    );
  });

  private readonly _discount = computed(() => {
    return this._concepts().reduce(
      (accumulated, debit) => accumulated.plus(debit.discount),
      new Decimal(0)
    );
  });

  private readonly _subtotal = computed(() => {
    return this._amount().minus(this._discount());
  });

  private readonly _taxes = signal<Decimal>(new Decimal(0));

  private readonly _total = signal<Decimal>(new Decimal(0));

  constructor() {
    effect(() => {
      const withTax = this.withTax();
      const subtotal = this._subtotal().toNumber();

      const { taxes, total } = calculateTotalFromBaseAndTax(
        subtotal,
        withTax ? TaxEnum.Sixteen : TaxEnum.Zero
      );

      this._taxes.set(new Decimal(taxes));
      this._total.set(new Decimal(total));
    });
  }

  get concepts(): Concept[] {
    return this._concepts();
  }

  get amount() {
    return this._amount().toNumber();
  }

  get discount() {
    return this._discount().toNumber();
  }

  get subtotal() {
    return this._subtotal().toNumber();
  }

  get taxes() {
    return this._taxes().toNumber();
  }

  get total() {
    return this._total().toNumber();
  }

  public checkIsSelected(value: DebitPartsFragment): boolean {
    return this.concepts.some((concept) => concept.debitId === value.id);
  }

  public addDebit(value: DebitPartsFragment): boolean {
    const canAdd = this._canAddDebit(value);

    if (canAdd) {
      const { unitPrice, quantity, amount } = calculateAmount(
        value.unitPrice,
        value.quantity
      );

      const { discount, subtotal } = calculateSubtotalAndDiscount(
        amount,
        value.discounts
      );

      const { taxes, total } = calculateTotalFromBaseAndTax(
        subtotal,
        value.withTax ? TaxEnum.Sixteen : TaxEnum.Zero
      );

      this._concepts.update((previous) => {
        const debits = [...previous];

        debits.push({
          description: value.description,
          unitPrice,
          quantity,
          amount,
          discount,
          subtotal,
          taxes,
          total,
          withTax: value.withTax,
          dueDate: value.dueDate,
          debitId: value.id,
          discounts: value.discounts || [],
        });

        return debits;
      });

      return true;
    }

    return false;
  }

  public removeDebit(value: DebitPartsFragment) {
    this._concepts.update((previous) => {
      const concepts = [...previous];

      const index = concepts.findIndex(
        (concept) => concept.debitId === value.id
      );

      if (index !== -1) {
        concepts.splice(index, 1);
      }

      return concepts;
    });
  }

  private _canAddDebit(value: DebitPartsFragment): boolean {
    // Revisa si el nuevo adeudo tiene diferencia de impuestos
    const diferenceTaxes = this.concepts.some(
      (debit) => debit.withTax !== value.withTax
    );

    if (diferenceTaxes) {
      this._snackBar.open(
        'No se puede agregar un adeudo con impuestos diferentes a los ya seleccionados.',
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
    }

    return !diferenceTaxes;
  }

  public clearConcepts() {
    this._concepts.set([]);
    this._taxes.set(new Decimal(0));
    this._total.set(new Decimal(0));
  }
}

export type Concept = {
  description: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
  withTax: boolean;
  dueDate: string;
  debitId: string;
  discounts: DiscountPartsFragment[];
};
