import { Routes } from '@angular/router';
import { BlankComponent } from '@components/blank/blank.component';

export const routes: Routes = [
  {
    path: 'authentication',
    component: BlankComponent,
    loadChildren: () => import('./pages/authentication/authentication.routes').then((m) => m.AuthenticationRoutes),
  },
  {
    path: '',
    component: BlankComponent,
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.DashboardRoutes),
  },
  {
    path: '**',
    redirectTo: '/authentication/login',
  },
];
