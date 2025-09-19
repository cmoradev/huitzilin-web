import { Routes } from '@angular/router';

export const ReportsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reports.component').then((m) => m.ReportsComponent),
  },
  {
    path: 'incomes',
    loadComponent: () =>
      import('./incomes/incomes.component').then((m) => m.IncomesComponent),
  },
  {
    path: 'incomes-by-discipline',
    loadComponent: () =>
      import('./incomes-by-discipline/incomes-by-discipline.component').then(
        (m) => m.IncomesByDisciplineComponent
      ),
  },
];
