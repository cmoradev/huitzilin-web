import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AccountsReceivablePartsFragment,
  AddPaymentToIncomeGQL,
  CreatePayment,
  DebitPartsFragment,
  DebitState,
  GetAccountsReceivableGQL,
} from '@graphql';
import { FolioPipe, MethodPipe } from '@pipes';
import { PosService } from '@services';
import Decimal from 'decimal.js';
import { ChargeDialogComponent } from '../charge-dialog/charge-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private readonly _dialog = inject(MatDialog);
  private readonly _getAccountsReceivable = inject(GetAccountsReceivableGQL);
  private readonly _addPaymentToIncome = inject(AddPaymentToIncomeGQL);
  private readonly _snackBar = inject(MatSnackBar);

  public loading = signal<boolean>(false);
  public accountsReceivable = signal<AccountsReceivablePartsFragment | null>(
    null
  );

  ngOnInit(): void {
    this.fetchAccountsReceivable();
  }

  public data = inject<CompletePaymentDialogData>(MAT_DIALOG_DATA);

  public openChargeDialog() {
    if (
      this.accountsReceivable() &&
      this.accountsReceivable()!.pendingPayment > 0
    ) {
      const $dislog = this._dialog.open<
        ChargeDialogComponent,
        number,
        CreatePayment[]
      >(ChargeDialogComponent, {
        width: '30rem',
        data: this.accountsReceivable()!.pendingPayment,
      });

      $dislog.afterClosed().subscribe({
        next: (payments) => {
          if (!!payments && !!payments.length) {
            this._addPaymentToIncome
              .mutate({
                input: {
                  incomeID: this.accountsReceivable()!.id,
                  payments,
                },
              })
              .subscribe({
                next: ({ data }) => {
                  this.loading.set(false);
                  this._snackBar.open(
                    'Se ha agregado el pago correctamente',
                    'Cerrar',
                    {
                      duration: 3000,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom',
                    }
                  );
                  this._pos.clearConcepts();
                  this._dialogRef.close(data?.addPaymentToIncome);
                },
                error: (error) => {
                  this.loading.set(false);
                },
              });
          }
        },
      });
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
