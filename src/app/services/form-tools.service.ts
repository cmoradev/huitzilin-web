import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidatorFn,
} from '@angular/forms';
import { FetchStudentGQL } from '@graphql';
import { ERROR_MESSAGES } from '@utils/messages';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormToolsService {
  public readonly builder: FormBuilder = inject<FormBuilder>(FormBuilder);
  private readonly _fetchStudentPage = inject(FetchStudentGQL);

  /**
   * Busca el error y retorna una descripción
   * @param control - Controlador
   * @returns string - Descripción del error
   * */
  public checkForErrorsIn(control: AbstractControl | null): string {
    if (control instanceof AbstractControl) {
      if (control.hasError('required')) {
        return ERROR_MESSAGES['required']();
      }

      if (control.hasError('minlength')) {
        const error = control.getError('minlength');

        return ERROR_MESSAGES['minLength'](`${error['requiredLength']}`);
      }

      if (control.hasError('maxlength')) {
        const error = control.getError('maxlength');

        return ERROR_MESSAGES['maxLength'](`${error['requiredLength']}`);
      }

      if (control.hasError('min')) {
        const error = control.getError('min');

        return ERROR_MESSAGES['min'](`${error['min']}`);
      }

      if (control.hasError('max')) {
        const error = control.getError('max');

        return ERROR_MESSAGES['max'](`${error['max']}`);
      }

      if (control.hasError('email')) {
        return ERROR_MESSAGES['email']();
      }

      if (control.hasError('notAvailable')) {
        return ERROR_MESSAGES['notAvailable']();
      }

      if (control.hasError('unauthenticated')) {
        return ERROR_MESSAGES['unauthenticated']();
      }

      if (control.hasError('userNotFound')) {
        return ERROR_MESSAGES['userNotFound']();
      }

      if (control.hasError('endDateInvalid')) {
        return ERROR_MESSAGES['endDateInvalid']();
      }

      if (control.hasError('studentNotFound')) {
        return ERROR_MESSAGES['studentNotFound']();
      }
      
      if (control.hasError('dniIsExists')) {
        return ERROR_MESSAGES['dniIsExists']();
      }

      if (control.hasError('totalExceeded')) {
        return ERROR_MESSAGES['totalExceeded']();
      }
    }

    return '';
  }

  /**
   * @todo - Revisar con el  filtro branchs: { id: { neq: branchId } }.
   */
  public get isStudentCodeValid(): AsyncValidatorFn {
    return (control) => {
      return this._fetchStudentPage
        .fetch(
          {
            filter: {
              or: [
                { code: { eq: control.value } },
                { dni: { eq: control.value } },
              ],
            },
          },
          { fetchPolicy: 'network-only' }
        )
        .pipe(
          map((resp) => {
            const student = resp.data.students.nodes.find((value) => value.id);

            return student ? null : { studentNotFound: true };
          })
        );
    };
  }

  public get isDniStudentValid(): AsyncValidatorFn {
    return (control) =>
      this._fetchStudentPage
        .fetch(
          {
            filter: {
              dni: { eq: control.value },
            },
          },
          { fetchPolicy: 'network-only' }
        )
        .pipe(
          map((resp) => {
            const student = resp.data.students.nodes.find((value) => value?.id);

            return student ? { dniIsExists: true } : null;
          })
        );
  }

  public get isEndDateAfterStartDate(): ValidatorFn {
    return (group) => {
      const start = group.get('start')?.value;
      const end = group.get('end')?.value;

      if (start && end && new Date(start) >= new Date(end)) {
        group.get('end')?.setErrors({ endDateInvalid: true });
      }

      return null;
    };
  }
}
