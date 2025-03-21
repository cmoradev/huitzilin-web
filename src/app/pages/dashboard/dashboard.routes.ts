import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'business',
    loadComponent: () =>
      import('./business/business.component').then((m) => m.BusinessComponent),
  },
];
