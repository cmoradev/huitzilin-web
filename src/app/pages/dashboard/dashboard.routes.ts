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
    path: 'enrollments',
    loadComponent: () =>
      import('./enrollments/enrollments.component').then((m) => m.EnrollmentsComponent),
  },
  {
    path: 'prices',
    loadComponent: () =>
      import('./prices/prices.component').then((m) => m.PricesComponent),
  },
  {
    path: 'cycles',
    loadComponent: () =>
      import('./cycles/cycles.component').then((m) => m.CyclesComponent),
  },
  {
    path: 'branches',
    loadComponent: () =>
      import('./branches/branches.component').then((m) => m.BranchsComponent),
  },
];
