import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'folio',
})
export class FolioPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().padStart(6, '0');
  }
}
