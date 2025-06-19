export const DisciplinesRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./disciplines.component').then((m) => m.DisciplinesComponent),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./calendar/calendar.component').then((m) => m.CalendarComponent),
  },
];
