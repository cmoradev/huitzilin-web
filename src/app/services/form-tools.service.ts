import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ERROR_MESSAGES } from '@utils/messages';

@Injectable({
  providedIn: 'root',
})
export class FormToolsService {
  public readonly builder: FormBuilder = inject<FormBuilder>(FormBuilder);

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
    }

    return '';
  }
}
