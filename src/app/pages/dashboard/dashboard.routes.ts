import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
];