import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  calculateAmount,
  calculateSubtotalAndDiscount,
  calculateTotalFromBaseAndTax,
  TaxEnum,
} from '@calculations';
import {
  DebitPartsFragment,
  DebitState,
  DiscountPartsFragment,
} from '@graphql';
import Decimal from 'decimal.js';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  private readonly _snackBar = inject(MatSnackBar);

  private readonly _branchID = signal<string | null>(null);
  private readonly _studentIDs = signal<string[]>([]);
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

    effect(() => {
      if (!this._concepts().length) {
        this.branchID = null;
        this.studentIDs = [];
      }
    });
  }

  set studentIDs(value: string[]) {
    this._studentIDs.set(value);
  }

  set branchID(value: string | null) {
    this._branchID.set(value);
  }

  get branchID() {
    return this._branchID();
  }

  get concepts(): Concept[] {
    return this._concepts();
  }

  get studentIDs() {
    return this._studentIDs();
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

  public addStudent(value: string): boolean {
    const setIDs = new Set([...this.studentIDs, value]);
    this.studentIDs = Array.from(setIDs);
    return true;
  }

  public addDebit(
    value: Pick<
      DebitPartsFragment,
      'withTax' | 'state' | 'unitPrice' | 'quantity' | 'discounts' | 'dueDate' | 'id' | 'description'
    >,
    branchID: string,
    studentID: string
  ): boolean {
    const canAdd = this._canAddDebit(value, branchID);

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

      this.branchID = branchID;
      this.addStudent(studentID);

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

  private _canAddDebit(
    value: Pick<DebitPartsFragment, 'withTax' | 'state'>,
    branchID: string
  ): boolean {
    const isEqualBranchOrEmpty =
      this.branchID === null || this.branchID === branchID;

    if (!isEqualBranchOrEmpty) {
      this._snackBar.open(
        'No se puede mezclar adeudos de diferentes sucursales',
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
    }

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

    return !diferenceTaxes && isEqualBranchOrEmpty;
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
