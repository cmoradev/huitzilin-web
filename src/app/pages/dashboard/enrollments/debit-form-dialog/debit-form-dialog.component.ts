import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CreateDebit,
  CreateOneDebitGQL,
  DebitPartsFragment,
  DebitState,
  Frequency,
  UpdateDebit,
  UpdateOneDebitGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { debitStates } from '@utils/contains';
import { map, merge } from 'rxjs';
import { addMonths, format } from 'date-fns';
import { calculateAmountFromUnitPriceAndQuantity } from '@calculations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

const defaultDueDate = `${format(
  addMonths(new Date(), 1),
  'yyyy-MM'
)}-05T12:00:00`;

@Component({
  selector: 'app-debit-form-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatOption,
    MatSuffix,
    MatSelect,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './debit-form-dialog.component.html',
  styles: ``,
})
export class DebitFormDialogComponent {
  public readonly formTools = inject(FormToolsService);
  private readonly _snackBar = inject(MatSnackBar);

  public loading = signal(false);
  public data: DebitPartsFragment | null = inject(MAT_DIALOG_DATA);

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneDebit = inject(CreateOneDebitGQL);
  private readonly _updateOneDebit = inject(UpdateOneDebitGQL);

  private readonly _dialogRef = inject(MatDialogRef<DebitFormDialogComponent>);

  public states = debitStates.filter(
    (state) =>
      state.value !== DebitState.Paid &&
      state.value !== DebitState.PartiallyPaid
  );

  public formGroup = this.formTools.builder.group({
    description: this.formTools.builder.control<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    unitPrice: this.formTools.builder.control<number>(0, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    quantity: this.formTools.builder.control<number>(1, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    amount: this.formTools.builder.control<number>(0, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    withTax: this.formTools.builder.control<boolean>(
      this._globalStateService.activity?.withTax ?? false,
      {
        nonNullable: true,
      }
    ),
    state: this.formTools.builder.control<DebitState>(DebitState.Debt, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    dueDate: this.formTools.builder.control<string>(defaultDueDate, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.formGroup.get('amount')?.disable();

    if (!!this.data?.id) {
      this.formGroup.patchValue({
        description: this.data.description,
        unitPrice: this.data.unitPrice,
        quantity: this.data.quantity,
        amount: this.data.amount,
        withTax: this.data.withTax,
        state: this.data.state,
        dueDate: `${this.data.dueDate}T12:00:00`,
      });
    }

    merge(
      this.formGroup.get('unitPrice')!.valueChanges,
      this.formGroup.get('quantity')!.valueChanges
    ).subscribe({
      next: () => {
        const unitPrice = this.formGroup.get('unitPrice')!.value;
        const quantity = this.formGroup.get('quantity')!.value;

        if (unitPrice !== null && quantity === null) {
          const amount = calculateAmountFromUnitPriceAndQuantity(
            unitPrice,
            quantity
          );

          this.formGroup.get('amount')!.setValue(amount);
        }
      },
    });
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue();

      const { amount: _, ...payload } = values;

      if (!!this.data?.id) {
        this._update(payload).subscribe({
          next: (debit) => {
            this._snackBar.open(
              'Se ha actualizado un adeudo correctamente',
              'Cerrar',
              {
                duration: 1000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
            this._dialogRef.close(debit);
          },
          error: (err) => {
            console.error('UPDATE DEBIT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else if (this._globalStateService.activity!.id) {
        this._save(payload).subscribe({
          next: (debit) => {
            this._snackBar.open(
              'Se ha creado un adeudo correctamente',
              'Cerrar',
              {
                duration: 1000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
            this._dialogRef.close(debit);
          },
          error: (err) => {
            console.error('CREATE DEBIT ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: UpdateDebit) {
    return this._updateOneDebit
      .mutate({
        id: this.data!.id,
        update: { ...values },
      })
      .pipe(map((value) => value.data?.updateOneDebit));
  }

  private _save(
    values: Omit<
      CreateDebit,
      'frequency' | 'enrollmentId' | 'discount' | 'paymentDate'
    >
  ) {
    return this._createOneDebit
      .mutate({
        debit: {
          ...values,
          discount: 0,
          paymentDate: null,
          frequency: Frequency.Single,
          enrollmentId: this._globalStateService.enrollment!.id,
        },
      })
      .pipe(map((value) => value.data?.createOneDebit));
  }
}
