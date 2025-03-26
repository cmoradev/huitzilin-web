import { inject, Injectable, signal } from '@angular/core';
import {
  BranchPartsFragment,
  SessionPartsFragment,
  SignInGQL,
  SignInInput,
} from '@graphql';
import { map, tap } from 'rxjs';

const SESSION_KEY = 'session';
const BRANCH_KEY = 'branch';
const USERNAME_KEY = 'username';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _session = signal<SessionPartsFragment | null>(null);
  private readonly _branch = signal<BranchPartsFragment | null>(null);
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
          this._session.set(session);
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
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
    sessionStorage.removeItem(SESSION_KEY);
    this._session.set(null);
    sessionStorage.removeItem(BRANCH_KEY);
    this._branch.set(null);
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

    if (session) this._session.set(JSON.parse(session));
    if (branch) this._branch.set(JSON.parse(branch));
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

  /**
   * Obtiene el nombre de usuario almacenado en el almacenamiento local.
   *
   * @returns El nombre de usuario como una cadena de texto, o una cadena vacía si no se encuentra almacenado.
   */
  public get branch(): BranchPartsFragment | null {
    return this._branch();
  }

  /**
   * Establece el nombre de usuario en el almacenamiento local.
   *
   * @param email - El nombre de usuario que se desea almacenar.
   */
  public set branch(branch: BranchPartsFragment) {
    this._branch.set(branch);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(branch));
  }
}
