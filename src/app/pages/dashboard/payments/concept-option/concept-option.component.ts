import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DebitPartsFragment, DebitState } from '@graphql';
import { isAfter } from 'date-fns'
import { PosService } from '../../../../services/pos.service';

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

  public debit = input.required<DebitPartsFragment>();
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
      next: (value) => this.toggleDebit(!!value)
    });
  }

  public select(event: MouseEvent): void {
    event.stopPropagation();

    this.optionControl.setValue(!this.optionControl.value);
  }

  public toggleDebit(active: boolean): void {
    if (active) {
      const added = this.pos.addDebit(this.debit());

      if (!added) this.optionControl.setValue(false);
    } else {
      this.pos.removeDebit(this.debit());
    }
  }
}
