import { Pipe, PipeTransform } from '@angular/core';
import { PackageKind } from '@graphql';

@Pipe({
  name: 'packageKind',
})
export class PackageKindPipe implements PipeTransform {
  transform(value: string | PackageKind): string {
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
