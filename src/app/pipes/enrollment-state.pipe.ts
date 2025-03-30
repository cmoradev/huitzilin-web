import { Pipe, PipeTransform } from '@angular/core';
import { EnrollmentState } from '@graphql';

@Pipe({
  name: 'enrollmentState',
})
export class EnrollmentStatePipe implements PipeTransform {
  transform(value: string | EnrollmentState): unknown {
    switch (value) {
      case EnrollmentState.Active:
        return 'Activo';
      case EnrollmentState.Inactive:
        return 'Inactivo';
      case EnrollmentState.Paused:
        return 'Pausado';
      default:
        return value;
    }
  }
}
