import { CurrencyPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DebitPartsFragment, DebitState } from '@graphql';
import { isAfter } from 'date-fns';
import { PosService } from '../../../../services/pos.service';
import { MatDialog } from '@angular/material/dialog';
import { CompletePaymentDialogComponent } from '../complete-payment-dialog/complete-payment-dialog.component';

@Component({
  selector: 'app-concept-option',
  imports: [
    MatCheckboxModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule,
    CurrencyPipe,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './concept-option.component.html',
  styleUrls: ['./concept-option.component.scss'],
})
export class ConceptOptionComponent implements OnInit {
  private readonly pos = inject(PosService);

  private readonly _dialog = inject(MatDialog);

  public debit = input.required<DebitPartsFragment>();
  public branchID = input.required<string>();
  public studentID = input.required<string>();
  public refresh = output<void>();

  public isDebit = computed(() => this.debit().state === DebitState.Debt);
  public isDebitPartiallyPaid = computed(
    () => this.debit().state === DebitState.PartiallyPaid
  );
  public isDebitWithDelay = computed(() => {
    const dueDate = new Date(this.debit().dueDate);

    return this.isDebit() && isAfter(new Date(), dueDate);
  });

  public nametag = computed(() => {
    if (this.isDebitWithDelay()) {
      return 'Con retraso';
    } else if (this.isDebitPartiallyPaid()) {
      return 'Parcialmente Pagado';
    } else if (this.isDebit()) {
      return 'Deuda';
    }
    return 'Desconocido';
  });

  public optionControl = new FormControl<boolean>(false);

  public stateTag = computed(() => {
    const dueDate = new Date(this.debit().dueDate);
    const isOverdue = isAfter(new Date(), dueDate);

    if (isOverdue) {
      return 'Vencido';
    }

    if (this.debit().state === DebitState.Debt) {
      return 'Deuda';
    } else if (this.debit().state === DebitState.PartiallyPaid) {
      return 'Parcialmente Pagado';
    }

    return 'Desconocido';
  });

  ngOnInit(): void {
    this.optionControl.setValue(this.pos.checkIsSelected(this.debit()));

    this.optionControl.valueChanges.subscribe({
      next: (value) => this.toggleDebit(!!value),
    });
  }

  public select(event: MouseEvent): void {
    event.stopPropagation();

    this.optionControl.setValue(!this.optionControl.value);
  }

  public toggleDebit(active: boolean): void {
    if (active) {
      if (this.debit().state === DebitState.PartiallyPaid) {
        const $dialog = this._dialog.open(CompletePaymentDialogComponent, {
          width: '30rem',
          data: {
            debit: this.debit(),
            branchID: this.branchID(),
            studentID: this.studentID(),
          },
        });

        $dialog.afterClosed().subscribe({
          next: (added) => {
            if (added) {
              this.refresh.emit();
            }

            this.optionControl.setValue(false);
          },
        });
      } else {
        const {
          id,
          description,
          unitPrice,
          quantity,
          discounts,
          withTax,
          dueDate,
        } = this.debit();

        const branchID = this.branchID();
        const studentID = this.studentID();

        const added = this.pos.addConcept({
          debitId: id,
          description,
          unitPrice,
          quantity,
          discounts,
          withTax,
          dueDate,
          branchID,
          studentID,
        });

        if (!added) this.optionControl.setValue(false);
      }
    } else {
      this.pos.removeDebit(this.debit());
    }
  }
}
