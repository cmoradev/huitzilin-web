import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CreateDebit,
  CreateManyDebitsGQL,
  DebitState,
  FeePartsFragment,
  Frequency,
  GetFeePageGQL,
  GetFeePageQueryVariables,
} from '@graphql';
import { FrequencyPipe } from '@pipes';
import { FormToolsService, GlobalStateService } from '@services';
import {
  addMonths,
  format,
  isBefore,
  startOfMonth,
  endOfMonth,
  setDate,
  constructNow,
} from 'date-fns';
import Decimal from 'decimal.js';
import { map } from 'rxjs';

const defaultDueDate = `${format(
  addMonths(new Date(), 1),
  'yyyy-MM'
)}-05T12:00:00`;

@Component({
  selector: 'app-debit-form-catalog-dialog',
  imports: [
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    FrequencyPipe,
  ],
  templateUrl: './debit-form-catalog-dialog.component.html',
  styles: ``,
})
export class DebitFormCatalogDialogComponent implements OnInit {
  private readonly _formTools = inject(FormToolsService);
  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _createManyDebits = inject(CreateManyDebitsGQL);
  private readonly _feesPageGQL = inject(GetFeePageGQL);
  private readonly _dialogRef = inject(
    MatDialogRef<DebitFormCatalogDialogComponent>
  );

  public loading = signal<boolean>(false);
  public fees = signal<FeePartsFragment[]>([]);

  public formGroup = this._formTools.builder.group({
    fee: this._formTools.builder.control<FeePartsFragment | null>(null, {
      nonNullable: false,
    }),
    debits: this._formTools.builder.array([]),
  });

  ngOnInit(): void {
    this._fetchAllFees();

    this.formGroup.get('fee')!.valueChanges.subscribe((value) => {
      if (value) {
        this.generateDebits(value);
      }
    });
  }

  public addDebit(
    initialValues: Omit<
      CreateDebit,
      'enrollmentId' | 'paymentDate' | 'discount'
    >
  ): void {
    const {
      description,
      unitPrice,
      quantity,
      dueDate,
      state,
      withTax,
      frequency,
    } = initialValues;

    const unitPriceDecimal = new Decimal(unitPrice);
    const quantityDecimal = new Decimal(quantity);

    const amount = Number(unitPriceDecimal.times(quantityDecimal).toFixed(2));

    const debitFormGroup = this._formTools.builder.group({
      description: this._formTools.builder.control<string>(description, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      unitPrice: this._formTools.builder.control<number>(unitPrice, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true,
      }),
      quantity: this._formTools.builder.control<number>(quantity, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true,
      }),
      amount: this._formTools.builder.control<number>(amount, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true,
      }),
      discount: this._formTools.builder.control<number>(0, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true,
      }),
      withTax: this._formTools.builder.control<boolean>(withTax, {
        nonNullable: true,
      }),
      state: this._formTools.builder.control<DebitState>(state, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      frequency: this._formTools.builder.control<Frequency>(frequency, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      dueDate: this._formTools.builder.control<string>(dueDate, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.debits.push(debitFormGroup);
  }

  public get debits(): FormArray {
    return this.formGroup.get('debits') as FormArray;
  }

  public removeDebit(index: number): void {
    this.debits.removeAt(index);
  }

  public submit(): void {
    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue();

      console.log(values);
    }
  }

  private generateDebits(value: FeePartsFragment) {
    this.formGroup.get('fee')!.setValue(null);

    switch (value.frequency) {
      case Frequency.Monthly:
        if (
          !!this._globalStateService?.cycle?.start &&
          !!this._globalStateService?.cycle?.end
        ) {
          const startCycle = startOfMonth(
            this._globalStateService!.cycle!.start
          );
          const endCycle = endOfMonth(this._globalStateService!.cycle!.end);

          let currentDate = startCycle;

          while (isBefore(currentDate, endCycle)) {
            currentDate = setDate(currentDate, 5);

            const description = `${value.name} - ${format(
              currentDate,
              'MMMM'
            )}`;

            this.addDebit({
              description,
              unitPrice: value.price,
              quantity: 1,
              state: DebitState.Debt,
              dueDate: format(new Date(currentDate), 'yyyy-MM-dd'),
              withTax: value.withTax,
              frequency: Frequency.Single,
            });

            currentDate = addMonths(currentDate, 1);
          }
        }

        break;

      default:
        this.addDebit({
          description: value.name,
          unitPrice: value.price,
          quantity: 1,
          state: DebitState.Debt,
          dueDate: defaultDueDate,
          withTax: value.withTax,
          frequency: Frequency.Single,
        });
        break;
    }
  }

  private _fetchAllFees(accumulared: FeePartsFragment[] = []): void {
    if (!!this._globalStateService.enrollment?.activity!.id) {
      const limit = 50;
      const offset = accumulared.length;

      const params: GetFeePageQueryVariables = {
        filter: {
          activityId: { eq: this._globalStateService.enrollment?.activity!.id },
        },
        limit,
        offset,
      };

      const getFees$ = this._feesPageGQL.watch(params, {
        fetchPolicy: 'cache-first', // Usa cache primero, solo pide a la API si no hay datos en cache
        nextFetchPolicy: 'cache-first', // Mantiene la política de cache en siguientes peticiones
        notifyOnNetworkStatusChange: false, // No notifica cambios de red para evitar refetch innecesario
      }).valueChanges;

      getFees$.pipe(map((resp) => resp.data.fees)).subscribe({
        next: ({ nodes, totalCount }) => {
          const allItems = accumulared.concat(nodes);

          if (allItems.length >= totalCount) {
            this.fees.set(allItems);
            return; // No more fees to fetch
          }

          this._fetchAllFees(allItems);
        },
        error: (error) => {
          console.error('Error fetching fees', error);
        },
      });
    } else {
      this.fees.set([]);
    }
  }
}
