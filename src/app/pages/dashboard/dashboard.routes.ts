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
    path: 'classrooms',
    loadComponent: () =>
      import('./classrooms/classrooms.component').then((m) => m.ClassroomsComponent),
  },
  {
    path: 'prices',
    loadComponent: () =>
      import('./prices/prices.component').then((m) => m.PricesComponent),
  },
    {
    path: 'discounts',
    loadComponent: () =>
      import('./discounts/discounts.component').then((m) => m.DiscountsComponent),
  },
  {
    path: 'branches',
    loadComponent: () =>
      import('./branches/branches.component').then((m) => m.BranchsComponent),
  },
];
