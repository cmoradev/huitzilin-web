import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./students/students.component').then((m) => m.StudentsComponent),
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payments/payments.component').then((m) => m.PaymentsComponent),
  },
  {
    path: 'enrollments',
    loadComponent: () =>
      import('./enrollments/enrollments.component').then(
        (m) => m.EnrollmentsComponent
      ),
  },
  {
    path: 'cycles',
    loadComponent: () =>
      import('./cycles/cycles.component').then((m) => m.CyclesComponent),
  },
  {
    path: 'levels',
    loadComponent: () =>
      import('./levels/levels.component').then((m) => m.LevelsComponent),
  },
  {
    path: 'prices',
    loadComponent: () =>
      import('./prices/prices.component').then((m) => m.PricesComponent),
  },
  {
    path: 'disciplines',
    loadChildren: () =>
      import('./disciplines/disciplines.routes').then(
        (m) => m.DisciplinesRoutes
      ),
  },
  {
    path: 'discounts',
    loadComponent: () =>
      import('./discounts/discounts.component').then(
        (m) => m.DiscountsComponent
      ),
  },
  {
    path: 'branches',
    loadComponent: () =>
      import('./branches/branches.component').then((m) => m.BranchsComponent),
  },
];
