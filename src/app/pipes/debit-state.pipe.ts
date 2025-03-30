import { Pipe, PipeTransform } from '@angular/core';
import { DebitState } from '@graphql';

@Pipe({
  name: 'debitState',
})
export class DebitStatePipe implements PipeTransform {
  transform(value: string | DebitState): unknown {
    switch (value) {
      case DebitState.Canceled:
        return 'Cancelado (no pagado)';
      case DebitState.Condoned:
        return 'Condonado (no pagado)';
      case DebitState.Debt:
        return 'Adeudado (no pagado)';
      case DebitState.Paid:
        return 'Pagado (pagado)';
      case DebitState.PartiallyPaid:
        return 'Abonado (parcialmente pagado)';
      default:
        return value;
    }
  }
}
