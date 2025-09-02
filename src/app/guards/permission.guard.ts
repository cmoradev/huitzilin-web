import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService, GlobalStateService } from '@services';
import { permissionMap } from '@utils/permissions.data';
import { setDefaultOptions } from 'date-fns';

export const permissionGuard: CanActivateChildFn = (route, state) => {
  const globalState = inject(GlobalStateService);

  const username = globalState.session?.username;
  console.log(username);

  // if (username && permissionMap.has(username)) {
  //   const permissions = permissionMap.get(username) || [];
        
  //   const hasPermission = permissions.some(permission => permission.route === state.url);

  //   return hasPermission;
  // }

  return true;
};
