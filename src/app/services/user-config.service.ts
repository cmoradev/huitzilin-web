import { Injectable, signal } from '@angular/core';
import { BranchPartsFragment } from '@graphql';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para gestionar el estado de la sucursal (branch) en la aplicación.
 *
 * Esta clase proporciona un mecanismo para almacenar y acceder al estado actual
 * de una sucursal utilizando un objeto `signal`. Permite obtener y actualizar
 * el estado de la sucursal de manera reactiva.
 *
 * @class UserConfigService
 * @property {BranchPartsFragment | null} branch - Obtiene o establece el estado actual de la sucursal.
 */
export class UserConfigService {
  private readonly _branch= signal<BranchPartsFragment | null>(null);

  /**
   * Obtiene el estado actual de la sucursal.
   *
   * @returns {BranchPartsFragment | null} El estado actual de la sucursal o `null` si no está definido.
   */
  get branch() {
    return this._branch();
  }

  /**
   * Establece el estado actual de la sucursal.
   *
   * @param {BranchPartsFragment | null} branch - El nuevo estado de la sucursal o `null` para restablecerlo.
   */
  set branch(branch: BranchPartsFragment | null) {
    this._branch.set(branch);
  }
}
