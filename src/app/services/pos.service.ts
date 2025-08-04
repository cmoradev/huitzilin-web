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

// Tipo que representa los parámetros para agregar un concepto
export type AddConceptParams = {
  description: string;
  branchID: string;
  studentID: string;
  withTax: boolean;
  unitPrice: number;
  quantity: number;
  debitId: string | null;
  dueDate: string | null;
  discounts: Array<Omit<DiscountPartsFragment, '__typename'>>;
};

// Tipo que representa un concepto en el punto de venta
export type Concept = Omit<AddConceptParams, 'branchID' | 'studentID'> & {
  amount: number;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class PosService {
  // Inyección de dependencias
  private readonly _snackBar = inject(MatSnackBar);

  // Señales reactivas para el estado interno
  private readonly _branchID = signal<string | null>(null);
  private readonly _studentIDs = signal<string[]>([]);
  private readonly _concepts = signal<Concept[]>([]);

  // Computed: Determina si los conceptos tienen impuestos
  public withTax = computed(() => {
    const [first] = this._concepts();
    return first?.withTax ?? false;
  });

  // Computed: Calcula el monto total de los conceptos
  private readonly _amount = computed(() =>
    this._concepts().reduce(
      (accumulated, debit) => accumulated.plus(debit.amount),
      new Decimal(0)
    )
  );

  // Computed: Calcula el descuento total de los conceptos
  private readonly _discount = computed(() =>
    this._concepts().reduce(
      (accumulated, debit) => accumulated.plus(debit.discount),
      new Decimal(0)
    )
  );

  // Computed: Calcula el subtotal (monto - descuento)
  private readonly _subtotal = computed(() =>
    this._amount().minus(this._discount())
  );

  // Señales para impuestos y total
  private readonly _taxes = signal<Decimal>(new Decimal(0));
  private readonly _total = signal<Decimal>(new Decimal(0));

  constructor() {
    // Efecto: Actualiza impuestos y total cuando cambian los conceptos o el impuesto
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

    // Efecto: Limpia branch y estudiantes si no hay conceptos
    effect(() => {
      if (!this._concepts().length) {
        this.branchID = null;
        this.studentIDs = [];
      }
    });
  }

  // Setters y getters para branchID y studentIDs
  set studentIDs(value: string[]) {
    this._studentIDs.set(value);
  }
  set branchID(value: string | null) {
    this._branchID.set(value);
  }
  get branchID() {
    return this._branchID();
  }
  get studentIDs() {
    return this._studentIDs();
  }

  // Getters para conceptos y cálculos
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

  // Verifica si un adeudo está seleccionado
  public checkIsSelected(value: DebitPartsFragment): boolean {
    return this.concepts.some((concept) => concept.debitId === value.id);
  }

  // Agrega un estudiante al listado, evitando duplicados
  public addStudent(value: string): boolean {
    const setIDs = new Set([...this.studentIDs, value]);
    this.studentIDs = Array.from(setIDs);
    return true;
  }

  // Agrega un adeudo como concepto, validando impuestos y sucursal
  public addConcept(value: AddConceptParams): boolean {
    const canAdd = this._canAddDebit(value);

    if (canAdd) {
      const { description, withTax, discounts, debitId, dueDate } = value;
      // Calcula montos y descuentos
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

      // Agrega el concepto
      this._concepts.update((previous) => [
        ...previous,
        {
          description,
          unitPrice,
          quantity,
          amount,
          discount,
          subtotal,
          taxes,
          total,
          withTax,
          discounts,
          debitId,
          dueDate,
        },
      ]);

      this.branchID = value.branchID;
      this.addStudent(value.studentID);

      return true;
    }

    return false;
  }

  // Elimina un adeudo de los conceptos
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

  // Valida si se puede agregar un adeudo (misma sucursal y tipo de impuesto)
  private _canAddDebit(value: AddConceptParams): boolean {
    const isEqualBranchOrEmpty =
      this.branchID === null || this.branchID === value.branchID;

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

  // Limpia todos los conceptos y resetea impuestos y total
  public clearConcepts() {
    this._concepts.set([]);
    this._taxes.set(new Decimal(0));
    this._total.set(new Decimal(0));
  }
}
