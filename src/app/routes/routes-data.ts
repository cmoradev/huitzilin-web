import { NavigationEnum, RouteItem } from './types';

// Panel de control
export const PANEL_CONTROL_ROUTE: RouteItem = {
  displayName: 'Panel de control',
  showInSidebar: true,
  iconName: 'view-dashboard-outline',
  route: '/',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: [],
};

// Estudiantes
export const STUDENTS_ROUTE: RouteItem = {
  displayName: 'Estudiantes',
  showInSidebar: true,
  iconName: 'account-school-outline',
  route: '/students',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: [
    'create:students',
    'read:students',
    'update:students',
    'delete:students',
    'select:documents',
  ],
};

// Inscripciones
export const ENROLLMENTS_ROUTE: RouteItem = {
  displayName: 'Inscripciones',
  showInSidebar: true,
  iconName: 'tag-text-outline',
  route: '/enrollments',
  section: NavigationEnum.OPERATIONS,
  isGlobal: false,
  permissions: [
    'create:enrollments',
    'read:enrollments',
    'update:enrollments',
    'delete:enrollments',
    'select:periods',
    'create:debits',
    'read:debits',
    'update:debits',
    'delete:debits',
  ],
};

// Cobranza
export const PAYMENTS_ROUTE: RouteItem = {
  displayName: 'Cobranza',
  showInSidebar: true,
  iconName: 'point-of-sale',
  route: '/payments',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: [
    'select:students',
    'select:debits',
    'select:periods',
    'create:incomes',
  ],
};

// Reportes
export const REPORTS_ROUTE: RouteItem = {
  displayName: 'Reportes',
  showInSidebar: true,
  iconName: 'database',
  route: '/reports',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: [
    'reports:incomes',
    'reports:debits',
    'reports:statement-account',
  ],
};

// Reporte de ingresos
export const REPORTS_INCOMES_ROUTE: RouteItem = {
  displayName: 'Reporte de ingresos',
  showInSidebar: false,
  iconName: 'database',
  route: '/reports/incomes',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: ['reports:chart', 'reports:data'],
};

// Reporte de adeudos
export const REPORTS_DEBITS_ROUTE: RouteItem = {
  displayName: 'Reporte de adeudos',
  showInSidebar: false,
  iconName: 'database',
  route: '/reports/debits',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: ['reports:chart', 'reports:data'],
};

// Reporte de estados de cuenta
export const REPORTS_STATEMENT_ACCOUNT_ROUTE: RouteItem = {
  displayName: 'Reporte de estados de cuenta',
  showInSidebar: false,
  iconName: 'database',
  route: '/reports/statement-account',
  section: NavigationEnum.OPERATIONS,
  isGlobal: true,
  permissions: ['reports:chart', 'reports:data'],
};

// Niveles
export const LEVELS_ROUTE: RouteItem = {
  displayName: 'Niveles',
  showInSidebar: true,
  iconName: 'magic-staff',
  route: '/levels',
  section: NavigationEnum.ADMINISTRATION,
  isGlobal: false,
  permissions: [
    'create:levels',
    'read:levels',
    'update:levels',
    'delete:levels',
  ],
};

// Disciplinas
export const DISCIPLINES_ROUTE: RouteItem = {
  displayName: 'Disciplinas',
  showInSidebar: true,
  iconName: 'basketball',
  route: '/disciplines',
  section: NavigationEnum.ADMINISTRATION,
  isGlobal: false,
  permissions: [
    'create:disciplines',
    'read:disciplines',
    'update:disciplines',
    'delete:disciplines',
  ],
};

// Disciplinas
export const TEACHERS_ROUTE: RouteItem = {
  displayName: 'Docentes',
  showInSidebar: true,
  iconName: 'human-male-board',
  route: '/teachers',
  section: NavigationEnum.ADMINISTRATION,
  isGlobal: false,
  permissions: [
    'create:teachers',
    'read:teachers',
    'update:teachers',
    'delete:teachers',
  ],
};

// Calendario
export const CALENDARS_ROUTE: RouteItem = {
  displayName: 'Calendario',
  showInSidebar: true,
  iconName: 'calendar-multiselect',
  route: '/calendars',
  section: NavigationEnum.ADMINISTRATION,
  isGlobal: false,
  permissions: [
    'create:periods',
    'read:periods',
    'update:periods',
    'delete:periods',
    'create:schedules',
    'read:schedules',
    'update:schedules',
    'delete:schedules',
  ],
};

// Precios
export const PRICES_ROUTE: RouteItem = {
  displayName: 'Precios',
  showInSidebar: true,
  iconName: 'currency-usd',
  route: '/prices',
  section: NavigationEnum.ADMINISTRATION,
  isGlobal: false,
  permissions: [
    'create:price-lists',
    'read:price-lists',
    'update:price-lists',
    'delete:price-lists',
    'create:fees',
    'read:fees',
    'update:fees',
    'delete:fees',
  ],
};

// Descuentos
export const DISCOUNTS_ROUTE: RouteItem = {
  displayName: 'Descuentos',
  showInSidebar: true,
  iconName: 'percent',
  route: '/discounts',
  section: NavigationEnum.ADMINISTRATION,
  isGlobal: false,
  permissions: [
    'create:discounts',
    'read:discounts',
    'update:discounts',
    'delete:discounts',
  ],
};

// Negocios
export const BRANCHES_ROUTE: RouteItem = {
  displayName: 'Negocios',
  showInSidebar: true,
  iconName: 'town-hall',
  route: '/branches',
  section: NavigationEnum.DEVELOPER,
  isGlobal: true,
  permissions: [
    'create:branches',
    'read:branches',
    'update:branches',
    'delete:branches',
  ],
};

// Ciclos
export const CYCLES_ROUTE: RouteItem = {
  displayName: 'Ciclos',
  showInSidebar: true,
  iconName: 'calendar-blank-outline',
  route: '/cycles',
  section: NavigationEnum.DEVELOPER,
  isGlobal: true,
  permissions: [
    'create:cycles',
    'read:cycles',
    'update:cycles',
    'delete:cycles',
  ],
};

// Cuentas clip
export const CLIP_ACCOUNTS_ROUTE: RouteItem = {
  displayName: 'Cuentas clip',
  showInSidebar: true,
  iconName: 'cash',
  route: '/clip-accounts',
  section: NavigationEnum.DEVELOPER,
  isGlobal: true,
  permissions: [
    'create:clip-accounts',
    'read:clip-accounts',
    'update:clip-accounts',
    'delete:clip-accounts',
  ],
};

// Usuarios
export const USERS_ROUTE: RouteItem = {
  displayName: 'Usuarios',
  showInSidebar: true,
  iconName: 'key',
  route: '/users',
  section: NavigationEnum.DEVELOPER,
  isGlobal: true,
  permissions: [
    'create:users',
    'read:users',
    'update:users',
    'delete:users',
    'select:policies',
  ],
};

// Políticas
export const POLICIES_ROUTE: RouteItem = {
  displayName: 'Políticas',
  showInSidebar: true,
  iconName: 'shield',
  route: '/policies',
  section: NavigationEnum.DEVELOPER,
  isGlobal: true,
  permissions: [
    'create:policies',
    'read:policies',
    'update:policies',
    'delete:policies',
  ],
};

// Arreglo completo
export const navItems: RouteItem[] = [
  PANEL_CONTROL_ROUTE,
  STUDENTS_ROUTE,
  ENROLLMENTS_ROUTE,
  PAYMENTS_ROUTE,
  REPORTS_ROUTE,
  REPORTS_INCOMES_ROUTE,
  REPORTS_DEBITS_ROUTE,
  REPORTS_STATEMENT_ACCOUNT_ROUTE,
  LEVELS_ROUTE,
  DISCIPLINES_ROUTE,
  TEACHERS_ROUTE,
  CALENDARS_ROUTE,
  PRICES_ROUTE,
  DISCOUNTS_ROUTE,
  BRANCHES_ROUTE,
  CYCLES_ROUTE,
  CLIP_ACCOUNTS_ROUTE,
  USERS_ROUTE,
  POLICIES_ROUTE,
];
