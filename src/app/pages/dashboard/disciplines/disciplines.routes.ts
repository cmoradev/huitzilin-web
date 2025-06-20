export const DisciplinesRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./disciplines.component').then((m) => m.DisciplinesComponent),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./calendar-page/calendar-page.component').then((m) => m.CalendarPageComponent),
  },
];
