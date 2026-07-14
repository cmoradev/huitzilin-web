import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { GlobalStateService } from '@services';

export const permissionGuard: CanActivateChildFn = (route, state) => {
  const globalState = inject(GlobalStateService);

  // const username = globalState.session?.username;
  // if (username && permissionMap.has(username)) {
  //   const permissions = permissionMap.get(username) || [];
  //   const hasPermission = permissions.some(permission => permission.route === state.url);
  //   return hasPermission;
  // }

  return true;
};
