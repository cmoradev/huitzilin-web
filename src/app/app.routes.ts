import { Routes } from '@angular/router';
import { BlankComponent } from '@components/blank/blank.component';
import { FullComponent } from '@components/full/full.component';
import { isAuthGuard } from '@guards';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  {
    path: 'authentication',
    component: BlankComponent,
    loadChildren: () =>
      import('./pages/authentication/authentication.routes').then(
        (m) => m.AuthenticationRoutes
      ),
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [isAuthGuard],
    canActivateChild: [permissionGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (m) => m.DashboardRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/authentication/login',
  },
];
