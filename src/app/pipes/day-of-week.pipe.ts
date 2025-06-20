import { Pipe, PipeTransform } from '@angular/core';
import { daysOfWeekMap } from '@utils/contains';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: string): string {
    if (!!daysOfWeekMap.has(value)) {
      return daysOfWeekMap.get(value) ?? 'Desconocido';
    }

    return 'Desconocido';
  }
}
