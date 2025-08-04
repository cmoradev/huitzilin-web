import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AccountsReceivablePartsFragment,
  DebitPartsFragment,
  DebitState,
  GetAccountsReceivableGQL,
} from '@graphql';
import { FolioPipe, MethodPipe } from '@pipes';
import { PosService } from '@services';
import Decimal from 'decimal.js';

type CompletePaymentDialogData = {
  debit: DebitPartsFragment;
  branchID: string;
  studentID: string;
};

@Component({
  selector: 'app-complete-payment-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    FolioPipe,
    MethodPipe,
    CurrencyPipe,
  ],
  templateUrl: './complete-payment-dialog.component.html',
  styles: ``,
})
export class CompletePaymentDialogComponent implements OnInit {
  private readonly _pos = inject(PosService);
  private readonly _dialogRef = inject(
    MatDialogRef<CompletePaymentDialogComponent>
  );
  private readonly _getAccountsReceivable = inject(GetAccountsReceivableGQL);

  public loading = signal<boolean>(false);
  public accountsReceivable = signal<AccountsReceivablePartsFragment | null>(
    null
  );

  ngOnInit(): void {
    this.fetchAccountsReceivable();
  }

  public data = inject<CompletePaymentDialogData>(MAT_DIALOG_DATA);

  public addConcepts() {
    if (this.accountsReceivable()) {
      // this._pos.clearConcepts();

      // const concepts = this.accountsReceivable()!.concepts.filter((concept) =>
      //   new Decimal(concept.pendingPayment).greaterThan(0)
      // );

      // let added = true;

      // concepts.forEach((concept) => {
      //   const { description, withTax, pendingPayment } = concept;

      //   const branchID = this.data.branchID;
      //   const studentID = this.data.studentID;

      //   added = added && this._pos.addConcept({
      //     description,
      //     withTax,
      //     branchID,
      //     studentID,
      //     unitPrice: pendingPayment,
      //     quantity: 1,
      //     debitId: null,
      //     dueDate: null,
      //     discounts: [],
      //   });
      // });

      // this._dialogRef.close(added);
    }
  }

  private fetchAccountsReceivable() {
    if (this.data?.debit.id) {
      this.loading.set(true);
      this._getAccountsReceivable
        .fetch({
          input: {
            debitId: this.data!.debit.id,
          },
        })
        .subscribe({
          next: ({ data }) => {
            data.getAccountsReceivable;
            this.loading.set(false);
            this.accountsReceivable.set(data.getAccountsReceivable);
          },
          error: (error) => {
            // Handle any errors
          },
        });
    }
  }
}
