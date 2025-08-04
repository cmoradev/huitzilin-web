import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormToolsService } from '@services';
import {
  CreatePayment,
  PaymentMethod,
} from '@graphql';

import { CurrencyPipe } from '@angular/common';
import { ChargeFormComponent } from '../charge-form/charge-form.component';
import { debounceTime } from 'rxjs';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Decimal from 'decimal.js';
import { MatError } from '@angular/material/form-field';
import { paymentIcons, paymentNames } from '@utils/contains';

@Component({
  selector: 'app-charge-dialog',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    ChargeFormComponent,
    MatError,
  ],
  templateUrl: './charge-dialog.component.html',
  styles: ``,
})
export class ChargeDialogComponent implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef<ChargeDialogComponent>);

  public formTools = inject(FormToolsService);
  public total = inject<number>(MAT_DIALOG_DATA);
  public loading = signal<boolean>(false);
  public remainingAmount = signal<number>(0);

  public paymentNames: any = paymentNames;

  public paymentIcons: any = paymentIcons;

  public paymentsForm = this.formTools.builder.group(
    {
      payments: this.formTools.builder.array([
        this.createPaymentForm(PaymentMethod.Transfer),
        this.createPaymentForm(PaymentMethod.Card),
        this.createPaymentForm(PaymentMethod.Cash),
      ]),
    },
    {
      validators: [
        (form: FormGroup) => {
          if (this.remainingAmount() < 0) {
            return { totalExceeded: true };
          }
          return null;
        },
      ],
    }
  );

  public get payments(): FormArray<FormGroup> {
    return this.paymentsForm.get('payments') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.paymentsForm.valueChanges.subscribe({
      next: () => {
        const payments = this.filterPaymentRecived();

        const recived = payments.reduce((acc, current) => {
          return acc.add(current.amount);
        }, new Decimal(0));

        this.remainingAmount.set(this.total - recived.toNumber());
      },
    });
  }

  public submit() {
    this.paymentsForm.markAllAsTouched();

    if (this.paymentsForm.valid) {
      const recived = this.filterPaymentRecived();

      if (!!recived.length) {
        this.loading.set(true);

        const payments: CreatePayment[] = recived.map((payment) => ({
          method: payment.method,
          amount: payment.amount,
          date: payment.date,
          transaction: payment.transaction,
          bank: payment.bank,
        }));

        this._dialogRef.close(payments);
      }
    }
  }

  private createPaymentForm(method: PaymentMethod): FormGroup {
    const form = this.formTools.builder.group({
      method: this.formTools.builder.control<PaymentMethod>(method, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      amount: this.formTools.builder.control<number>(0, {
        nonNullable: true,
      }),
      date: this.formTools.builder.control<Date>(new Date(), {
        nonNullable: true,
      }),
      transaction: this.formTools.builder.control<string>('', {
        nonNullable: true,
      }),
      bank: this.formTools.builder.control<string>('', {
        nonNullable: true,
      }),
    });

    form
      .get('amount')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe({
        next: (value) => {
          if (!!value) {
            form.get('amount')?.setValidators([Validators.required]);
            form.get('date')?.setValidators([Validators.required]);

            if (form.get('method')?.value !== PaymentMethod.Cash) {
              form.get('transaction')?.setValidators([Validators.required]);
              form.get('bank')?.setValidators([Validators.required]);
            }
          } else {
            form.get('amount')?.clearValidators();
            form.get('date')?.clearValidators();
            form.get('transaction')?.clearValidators();
            form.get('bank')?.clearValidators();
          }

          form.get('amount')?.updateValueAndValidity();
          form.get('date')?.updateValueAndValidity();
          form.get('transaction')?.updateValueAndValidity();
          form.get('bank')?.updateValueAndValidity();
        },
      });

    return form;
  }

  private filterPaymentRecived() {
    return this.payments.value.filter((payment) => !!payment.amount);
  }
}
