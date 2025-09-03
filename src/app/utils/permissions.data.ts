import {
  BRANCHES_ROUTE,
  CALENDARS_ROUTE,
  CLIP_ACCOUNTS_ROUTE,
  CYCLES_ROUTE,
  DISCIPLINES_ROUTE,
  DISCOUNTS_ROUTE,
  ENROLLMENTS_ROUTE,
  LEVELS_ROUTE,
  PANEL_CONTROL_ROUTE,
  PAYMENTS_ROUTE,
  POLICIES_ROUTE,
  PRICES_ROUTE,
  REPORTS_DEBITS_ROUTE,
  REPORTS_INCOMES_ROUTE,
  REPORTS_ROUTE,
  REPORTS_STATEMENT_ACCOUNT_ROUTE,
  STUDENTS_ROUTE,
  USERS_ROUTE,
} from '@routes';

const rootPermissions = [
  {
    route: PANEL_CONTROL_ROUTE.route,
    permissions: new Set(PANEL_CONTROL_ROUTE.permissions),
  },
  {
    route: STUDENTS_ROUTE.route,
    permissions: new Set(STUDENTS_ROUTE.permissions),
  },
  {
    route: ENROLLMENTS_ROUTE.route,
    permissions: new Set(ENROLLMENTS_ROUTE.permissions),
  },
  {
    route: PAYMENTS_ROUTE.route,
    permissions: new Set(PAYMENTS_ROUTE.permissions),
  },
  {
    route: REPORTS_ROUTE.route,
    permissions: new Set(REPORTS_ROUTE.permissions),
  },
  {
    route: REPORTS_INCOMES_ROUTE.route,
    permissions: new Set(REPORTS_INCOMES_ROUTE.permissions),
  },
  {
    route: REPORTS_DEBITS_ROUTE.route,
    permissions: new Set(REPORTS_DEBITS_ROUTE.permissions),
  },
  {
    route: REPORTS_STATEMENT_ACCOUNT_ROUTE.route,
    permissions: new Set(REPORTS_STATEMENT_ACCOUNT_ROUTE.permissions),
  },
  {
    route: LEVELS_ROUTE.route,
    permissions: new Set(LEVELS_ROUTE.permissions),
  },
  {
    route: DISCIPLINES_ROUTE.route,
    permissions: new Set(DISCIPLINES_ROUTE.permissions),
  },
  {
    route: CALENDARS_ROUTE.route,
    permissions: new Set(CALENDARS_ROUTE.permissions),
  },
  {
    route: PRICES_ROUTE.route,
    permissions: new Set(PRICES_ROUTE.permissions),
  },
  {
    route: DISCOUNTS_ROUTE.route,
    permissions: new Set(DISCOUNTS_ROUTE.permissions),
  },
  {
    route: BRANCHES_ROUTE.route,
    permissions: new Set(BRANCHES_ROUTE.permissions),
  },
  {
    route: CYCLES_ROUTE.route,
    permissions: new Set(CYCLES_ROUTE.permissions),
  },
  {
    route: CLIP_ACCOUNTS_ROUTE.route,
    permissions: new Set(CLIP_ACCOUNTS_ROUTE.permissions),
  },
  {
    route: USERS_ROUTE.route,
    permissions: new Set(USERS_ROUTE.permissions),
  },
  {
    route: POLICIES_ROUTE.route,
    permissions: new Set(POLICIES_ROUTE.permissions),
  },
];

export const permissionMap = new Map<string, typeof rootPermissions>();

permissionMap.set('calebmoradev', rootPermissions);
permissionMap.set('direcciongeneral', rootPermissions);
permissionMap.set('igonzález', rootPermissions);
permissionMap.set('mfernandez', rootPermissions);
permissionMap.set('emartinez', [
  {
    route: PANEL_CONTROL_ROUTE.route,
    permissions: new Set(PANEL_CONTROL_ROUTE.permissions),
  },
  {
    route: STUDENTS_ROUTE.route,
    permissions: new Set(STUDENTS_ROUTE.permissions),
  },
  {
    route: ENROLLMENTS_ROUTE.route,
    permissions: new Set(ENROLLMENTS_ROUTE.permissions),
  },
  {
    route: PAYMENTS_ROUTE.route,
    permissions: new Set(PAYMENTS_ROUTE.permissions),
  },
  {
    route: LEVELS_ROUTE.route,
    permissions: new Set(LEVELS_ROUTE.permissions),
  },
  {
    route: DISCIPLINES_ROUTE.route,
    permissions: new Set(DISCIPLINES_ROUTE.permissions),
  },
  {
    route: CALENDARS_ROUTE.route,
    permissions: new Set(CALENDARS_ROUTE.permissions),
  },
  {
    route: PRICES_ROUTE.route,
    permissions: new Set(PRICES_ROUTE.permissions),
  },
]);
