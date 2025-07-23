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
    path: 'debits',
    loadComponent: () =>
      import('./debits/debits.component').then((m) => m.DebitsComponent),
  },
  {
    path: 'statement-account',
    loadComponent: () =>
      import('./statement-account/statement-account.component').then(
        (m) => m.StatementAccountComponent
      ),
  },
];
