import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '@services';
import { permissionMap } from '@utils/permissions.data';

export const permissionGuard: CanActivateChildFn = (route, state) => {
  const auth = inject(AuthService);

  const username = auth.username;

  if (permissionMap.has(username)) {
    const permissions = permissionMap.get(username) || [];
    
    const hasPermission = permissions.some(permission => permission.route === state.url);

    return hasPermission;
  }

  return false;
};
