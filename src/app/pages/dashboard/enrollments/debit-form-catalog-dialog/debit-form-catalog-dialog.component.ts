import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  CreateDebit,
  CreateManyDebitsGQL,
  DebitState,
  FeePartsFragment,
  Frequency,
  GetFeePageGQL,
} from '@graphql';
import { GlobalStateService } from '@services';
import { debounceTime, startWith } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-debit-form-catalog-dialog',
  imports: [
    MatAutocompleteModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon,
    CurrencyPipe,
  ],
  templateUrl: './debit-form-catalog-dialog.component.html',
  styles: ``,
})
export class DebitFormCatalogDialogComponent implements AfterViewInit {
  public loading = signal<boolean>(false);

  public loadingFees = signal<boolean>(false);
  public fees = signal<FeePartsFragment[]>([]);
  private readonly _feesPageGQL = inject(GetFeePageGQL);
  private readonly _createManyDebits = inject(CreateManyDebitsGQL);

  public feeControl = new FormControl<FeePartsFragment | string>('');

  private readonly _globalStateService = inject(GlobalStateService);

  private readonly _dialogRef = inject(MatDialogRef<DebitFormCatalogDialogComponent>);

  public debits = signal<CreateDebit[]>([]);

  ngAfterViewInit(): void {
    this.feeControl.valueChanges
      .pipe(debounceTime(300), startWith(''))
      .subscribe({
        next: (value) => {
          if (!!value && typeof value === 'object') {
            this.generateDebits(value);
          } else if (typeof value === 'string') {
            this._fetchFees(value);
          }
        },
      });
  }

  public displayFn(value: FeePartsFragment): string {
    return value?.name ?? '';
  }

  public save(): void {
    if (this.debits().length > 0) {
      this.loading.set(true);

      this._createManyDebits
        .mutate({
          debits: this.debits(),
        })
        .subscribe({
          next: (debit) => {
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

  private generateDebits(value: FeePartsFragment) {
    if (
      this._globalStateService.enrollment?.id &&
      this._globalStateService.cycle?.id
    ) {
      const startCycle = this._globalStateService.cycle.start;
      const endCycle = this._globalStateService.cycle.end;

      switch (value.frequency) {
        case Frequency.Monthly:
          const debits: CreateDebit[] = [];

          let currentDate = new Date(startCycle);

          while (currentDate <= new Date(endCycle)) {
            currentDate.setDate(1)
            
            // debits.push({
            //   description: value.name,
            //   value: value.price,
            //   frequency: value.frequency,
            //   state: DebitState.Debt,
            //   enrollmentId: this._globalStateService.enrollment!.id,
            //   quantity: 1,
            //   paymentDate: null,
            //   dueDate: format(new Date(currentDate), 'yyyy-MM-dd'),
            // });

            currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate.setDate(1);
          }

          this.debits.set(debits);

          break;
        default:
          // this.debits.set([
          //   {
          //     description: value.name,
          //     value: value.price,
          //     frequency: value.frequency,
          //     state: DebitState.Debt,
          //     enrollmentId: this._globalStateService.enrollment!.id,
          //     quantity: 1,
          //     paymentDate: null,
          //     dueDate: format(new Date(), 'yyyy-MM-dd'),
          //   },
          // ]);
          break;
      }
    }
  }

  private _fetchFees(value: string): void {
    if (this._globalStateService.enrollment?.activity!.id) {
      this.loadingFees.set(true);

      // TODO: Cambiar el limit a 10 y usar un fetchMore scroll infinito
      this._feesPageGQL
        .watch(
          {
            limit: 100,
            offset: 0,
            filter: {
              name: { iLike: `%${value}%` },
              activityId: { eq: this._globalStateService.enrollment?.activity!.id },
            },
          },
          {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
          }
        )
        .valueChanges.subscribe({
          next: ({ loading, data }) => {
            this.loadingFees.set(loading);

            this.fees.set(data?.fees.nodes ?? []);
          },
        });
    } else {
      this.loadingFees.set(false);
      this.fees.set([]);
    }
  }
}
