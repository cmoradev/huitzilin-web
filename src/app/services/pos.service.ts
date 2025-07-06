import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { calculateTotalFromBaseAndTax, TaxEnum } from '@calculations';
import { DebitPartsFragment } from '@graphql';
import Decimal from 'decimal.js';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _debits = signal<DebitPartsFragment[]>([]);

  public withTax = computed(() => {
    const [first] = this._debits();

    return first?.withTax ?? false;
  });

  private readonly _amount = computed(() => {
    return this._debits().reduce(
      (accumulated, debit) => accumulated.plus(debit.amount),
      new Decimal(0)
    );
  });

  private readonly _discount = computed(() => {
    return this._debits().reduce(
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

  get debits(): DebitPartsFragment[] {
    return this._debits();
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

  public checkIsSelected(debit: DebitPartsFragment): boolean {
    return this._debits().some((d) => d.id === debit.id);
  }

  public addDebit(value: DebitPartsFragment): boolean {
    const canAdd = this._canAddDebit(value);

    if (canAdd) {
      this._debits.update((previous) => {
        const debits = [...previous];

        debits.push(value);

        return debits;
      });

      return true;
    }

    return false;
  }

  public removeDebit(value: DebitPartsFragment) {
    this._debits.update((previous) => {
      const debits = [...previous];

      const index = debits.findIndex((debit) => debit.id === value.id);

      if (index !== -1) {
        debits.splice(index, 1);
      }

      return debits;
    });
  }

  private _canAddDebit(value: DebitPartsFragment): boolean {
    // Revisa si el nuevo adeudo tiene diferencia de impuestos
    const diferenceTaxes = this.debits.some(
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
}
