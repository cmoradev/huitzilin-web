import { inject, Injectable } from '@angular/core';
import { SignInGQL, SignInInput } from '@graphql';
import { map, tap } from 'rxjs';
import {
  BRANCH_KEY,
  COURSE_KEY,
  GlobalStateService,
  SESSION_KEY,
} from './global-state.service';

export const USERNAME_KEY = 'username';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _globalStateService = inject(GlobalStateService);
  private readonly _signInGQL = inject(SignInGQL);

  /**
   * Inicia sesión en la aplicación utilizando las credenciales proporcionadas.
   *
   * @param input - Un objeto de tipo `SignInInput` que contiene las credenciales de inicio de sesión.
   * @returns Un observable que emite la sesión iniciada (`SessionPartsFragment`) o `null` si no se pudo iniciar sesión.
   *
   * @remarks
   * Este método utiliza un servicio GraphQL para autenticar al usuario y almacena la sesión en el almacenamiento de sesión del navegador.
   */
  public signIn(input: SignInInput) {
    return this._signInGQL.mutate({ input }).pipe(
      map(({ data }) => data?.signIn),
      tap((session) => {
        if (session) {
          this._globalStateService.session = session;
        }
      })
    );
  }

  /**
   * Cierra la sesión del usuario actual.
   *
   * Este método realiza las siguientes acciones:
   * - Limpia la sesión actual estableciendo su valor a `null`.
   * - Elimina del almacenamiento de sesión (`sessionStorage`) las claves relacionadas con la sesión
   *   y la sucursal, identificadas por `SESSION_KEY` y `BRANCH_KEY`.
   *
   * @returns {void} No retorna ningún valor.
   */
  public signOut() {
    this._globalStateService.session = null;
    this._globalStateService.branch = null;
  }

  /**
   * Restaura la sesión del usuario desde el almacenamiento de sesión del navegador.
   *
   * @remarks
   * Este método verifica si existe una sesión almacenada en el almacenamiento de sesión del navegador.
   * Si encuentra una sesión válida, la deserializa y la establece en el estado interno del servicio.
   */
  public restoreSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    const branch = sessionStorage.getItem(BRANCH_KEY);
    const course = sessionStorage.getItem(COURSE_KEY);

    if (session) this._globalStateService.session = JSON.parse(session);
    if (branch) this._globalStateService.branch = JSON.parse(branch);
    if (course) this._globalStateService.course = JSON.parse(course);
  }

  /**
   * Obtiene el nombre de usuario almacenado en el almacenamiento local.
   *
   * @returns El nombre de usuario como una cadena de texto, o una cadena vacía si no se encuentra almacenado.
   */
  public get username(): string {
    return localStorage.getItem(USERNAME_KEY) ?? '';
  }

  /**
   * Establece el nombre de usuario en el almacenamiento local.
   *
   * @param email - El nombre de usuario que se desea almacenar.
   */
  public set username(username: string) {
    localStorage.setItem(USERNAME_KEY, username);
  }
}
