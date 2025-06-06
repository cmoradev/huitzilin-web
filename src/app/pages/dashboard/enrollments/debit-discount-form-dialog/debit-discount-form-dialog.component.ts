import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  DiscountBy,
  DiscountPartsFragment,
  GetDiscountsPageGQL,
  GetDiscountsPageQueryVariables,
} from '@graphql';
import { FormToolsService, GlobalStateService } from '@services';
import { discountTypes } from '@utils/contains';
import { map } from 'rxjs';

@Component({
  selector: 'app-debit-discount-form-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './debit-discount-form-dialog.component.html',
  styles: ``,
})
export class DebitDiscountFormDialogComponent implements OnInit {
  private readonly _globalState = inject(GlobalStateService);
  public readonly formTools = inject(FormToolsService);

  private readonly _dialogRef = inject(
    MatDialogRef<DebitDiscountFormDialogComponent>
  );

  public discountTypes = discountTypes;

  public discounts = signal<DiscountPartsFragment[]>([]);
  public loading = signal(false);

  public formGroup = this.formTools.builder.group({
    value: this.formTools.builder.control<number>(0, {
      validators: [Validators.required, Validators.min(1), Validators.max(100)],
      nonNullable: true,
    }),
    type: this.formTools.builder.control<DiscountBy>(DiscountBy.Percentage, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {}

  public submit(): void {
    if (this.formGroup.valid) {
      this.loading.set(true);

      const values = this.formGroup.getRawValue();

      this._dialogRef.close(values);
    }
  }
}
