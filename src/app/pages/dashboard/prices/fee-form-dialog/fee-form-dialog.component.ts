import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {
  CreateOneFeeGQL,
  FeePartsFragment,
  Frequency,
  UpdateOneFeeGQL,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { frequencies } from '@utils/contains';
import { map } from 'rxjs';

@Component({
  selector: 'app-fee-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    MatOption,
    MatInput,
    MatHint,
    MatError,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatSelect,
  ],
  templateUrl: './fee-form-dialog.component.html',
  styles: ``,
})
export class FeeFormDialogComponent implements OnInit {
  public readonly formTools = inject(FormToolsService);

  public loading = signal(false);
  public data: FeePartsFragment | null = inject(MAT_DIALOG_DATA);

  public frequencies = frequencies;

  public formGroup = this.formTools.builder.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
    price: [0, [Validators.required, Validators.min(1)]],
    frequency: ['', [Validators.required]],
  });

  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createOneFee = inject(CreateOneFeeGQL);
  private readonly _updateOneFee = inject(UpdateOneFeeGQL);

  private readonly _dialogRef = inject(MatDialogRef<FeeFormDialogComponent>);

  ngOnInit(): void {
    if (!!this.data?.id) {
      this.formGroup.patchValue({
        name: this.data.name,
        price: this.data.price,
        frequency: this.data.frequency,
      });
    }

    this.formGroup.get('frequency')?.valueChanges.subscribe((value) => {
      if (!!value) {
        this.formGroup
          .get('name')
          ?.setValue(
            `${this._globalStateService.activity!.name} - ${this.getFrequencyName(
              value as Frequency
            )}`
          );
      }
    });
  }

  public async submit(): Promise<void> {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue() as any;

      if (!!this.data?.id) {
        this._update(values).subscribe({
          next: (fee) => {
            this._dialogRef.close(fee);
          },
          error: (err) => {
            console.error('UPDATE FEE ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      } else if (this._globalStateService.activity!.id) {
        this._save(values).subscribe({
          next: (branch) => {
            this._dialogRef.close(branch);
          },
          error: (err) => {
            console.error('CREATE FEE ERROR: ', err);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }

  private _update(values: FormValues) {
    return this._updateOneFee
      .mutate({
        id: this.data!.id,
        update: { ...values } as any,
      })
      .pipe(map((value) => value.data?.updateOneFee));
  }

  private _save(values: FormValues) {
    return this._createOneFee
      .mutate({
        fee: {
          ...values,
          activityId: this._globalStateService.activity!.id,
        },
      })
      .pipe(map((value) => value.data?.createOneFee));
  }

  private getFrequencyName(value: Frequency): string {
    switch (value) {
      case Frequency.Monthly:
        return 'Mensualidad';
      case Frequency.Single:
        return 'Pago único';
      case Frequency.Weekly:
        return 'Semanal';
      case Frequency.Daily:
        return 'Diario';
      case Frequency.Hourly:
        return 'Por hora';
      default:
        return value;
    }
  }
}

type FormValues = {
  name: string;
  price: number;
  frequency: Frequency;
};
