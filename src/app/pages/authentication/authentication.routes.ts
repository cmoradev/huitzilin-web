import { Routes } from '@angular/router';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./forgot/forgot.component').then((m) => m.ForgotComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];