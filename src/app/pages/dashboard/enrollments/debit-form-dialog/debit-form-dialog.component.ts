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
import {
  CreateOneDebitGQL,
  DebitPartsFragment,
  DebitState,
  Frequency,
  UpdateOneDebitGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { debitStates } from '@utils/contains';
import { map } from 'rxjs';

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
  ],
  templateUrl: './debit-form-dialog.component.html',
  styles: ``,
})
export class DebitFormDialogComponent {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: DebitPartsFragment | null = inject(MAT_DIALOG_DATA);

  public states = debitStates.filter(
    (state) =>
      state.value !== DebitState.Paid &&
      state.value !== DebitState.PartiallyPaid
  );

  public formGroup = this.formTools.builder.group({
    description: ['', [Validators.required]],
    value: [0, [Validators.required, Validators.min(1)]],
    state: [DebitState.Debt, [Validators.required]],
    dueDate: ['', [Validators.required]],
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneDebit = inject(CreateOneDebitGQL);
  private readonly _updateOneDebit = inject(UpdateOneDebitGQL);

  private readonly _dialogRef = inject(MatDialogRef<DebitFormDialogComponent>);

  ngOnInit(): void {
    if (!!this.data?.id) {
      // this.formGroup.patchValue({
      //   description: this.data.description,
      //   value: this.data.value,
      //   state: this.data.state,
      //   dueDate: `${this.data.dueDate}T12:00:00`,
      // });
    }
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (debit) => {
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
        // this._save(values).subscribe({
        //   next: (debit) => {
        //     this._dialogRef.close(debit);
        //   },
        //   error: (err) => {
        //     console.error('CREATE FEE ERROR: ', err);
        //   },
        //   complete: () => {
        //     this.loading.set(false);
        //   },
        // });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOneDebit
      .mutate({
        id: this.data!.id,
        update: { ...values },
      })
      .pipe(map((value) => value.data?.updateOneDebit));
  }

  // private _save(values: FormValues) {
  //   return this._createOneDebit
  //     .mutate({
  //       debit: {
  //         ...values,
  //         frequency: Frequency.Single,
  //         quantity: 1,
  //         paymentDate: null,
  //         enrollmentId: this._globalStateService.enrollment!.id,
  //       },
  //     })
  //     .pipe(map((value) => value.data?.createOneDebit));
  // }
}

type FormValues = {
  description: string;
  dueDate: string;
  state: DebitState;
  value: number;
};
