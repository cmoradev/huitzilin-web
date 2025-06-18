import { Pipe, PipeTransform } from '@angular/core';
import { DebitState, PackageKind } from '@graphql';

@Pipe({
  name: 'packageKind',
})
export class PackageKindPipe implements PipeTransform {
  transform(value: string | PackageKind): unknown {
    switch (value) {
      case PackageKind.Hours:
        return 'Por horas';
      case PackageKind.Quantity:
        return 'Por cantidad';
      case PackageKind.Unlimited:
        return 'Ilimitado';
      default:
        return value;
    }
  }
}
