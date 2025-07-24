import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from '@graphql';

@Pipe({
  name: 'method',
})
export class MethodPipe implements PipeTransform {
  transform(value: string | PaymentMethod): string {
    switch (value.toUpperCase()) {
      case PaymentMethod.Card:
        return 'Tarjeta';
      case PaymentMethod.Transfer:
        return 'Transferencia';
      case PaymentMethod.Cash:
        return 'Efectivo';
      case PaymentMethod.Clip:
        return 'Clip';
      default:
        return value;
    }
  }
}
