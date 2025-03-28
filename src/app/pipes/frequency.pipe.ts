import { Pipe, PipeTransform } from '@angular/core';
import { Frequency } from '@graphql';

@Pipe({
  name: 'frequency',
})
export class FrequencyPipe implements PipeTransform {
  transform(value: string | Frequency): unknown {
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
