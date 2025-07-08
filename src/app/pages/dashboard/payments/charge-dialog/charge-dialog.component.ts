import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormToolsService, PosService } from '@services';
import { PaymentMethod } from '@graphql';

import { CurrencyPipe } from '@angular/common';
import { ChargeFormComponent } from '../charge-form/charge-form.component';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-charge-dialog',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    ChargeFormComponent,
  ],
  templateUrl: './charge-dialog.component.html',
  styles: ``,
})
export class ChargeDialogComponent {
  private readonly formTools = inject(FormToolsService);
  private readonly pos = inject(PosService);

  public loading = signal<boolean>(false);
  public total = computed(() => this.pos.total);
  public remainingAmount = signal<number>(0);

  public paymentForm = this.formTools.builder.group({
    payments: this.formTools.builder.array([
      // this.createPaymentForm()
    ]),
  });

  private createPaymentForm(method: PaymentMethod): FormGroup {
    const form = this.formTools.builder.group({
      method: this.formTools.builder.control<PaymentMethod>(method, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      amount: this.formTools.builder.control<number>(0, {
        validators: [Validators.required, Validators.min(0.01)],
        nonNullable: true,
      }),
      date: this.formTools.builder.control<Date>(new Date(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      transaction: this.formTools.builder.control<string | null>(null, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      bank: this.formTools.builder.control<string | null>(null, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    if (method !== PaymentMethod.Card) {
      // form.get('transactionCode').addValidators(Validators.required);
      // form.get('bank').addValidators(Validators.required);
    }

    return form;
  }
}
