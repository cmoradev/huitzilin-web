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

export const permissions = [
  {
    username: 'calebmoradev',
    routes: [
      {
        route: PANEL_CONTROL_ROUTE,
        permissions: PANEL_CONTROL_ROUTE.permissions,
      },
      {
        route: STUDENTS_ROUTE,
        permissions: STUDENTS_ROUTE.permissions,
      },
      {
        route: ENROLLMENTS_ROUTE,
        permissions: ENROLLMENTS_ROUTE.permissions,
      },
      {
        route: PAYMENTS_ROUTE,
        permissions: PAYMENTS_ROUTE.permissions,
      },
      {
        route: REPORTS_ROUTE,
        permissions: REPORTS_ROUTE.permissions,
      },
      {
        route: REPORTS_INCOMES_ROUTE,
        permissions: REPORTS_INCOMES_ROUTE.permissions,
      },
      {
        route: REPORTS_DEBITS_ROUTE,
        permissions: REPORTS_DEBITS_ROUTE.permissions,
      },
      {
        route: REPORTS_STATEMENT_ACCOUNT_ROUTE,
        permissions: REPORTS_STATEMENT_ACCOUNT_ROUTE.permissions,
      },
      {
        route: LEVELS_ROUTE,
        permissions: LEVELS_ROUTE.permissions,
      },
      {
        route: DISCIPLINES_ROUTE,
        permissions: DISCIPLINES_ROUTE.permissions,
      },
      {
        route: CALENDARS_ROUTE,
        permissions: CALENDARS_ROUTE.permissions,
      },
      {
        route: PRICES_ROUTE,
        permissions: PRICES_ROUTE.permissions,
      },
      {
        route: DISCOUNTS_ROUTE,
        permissions: DISCOUNTS_ROUTE.permissions,
      },
      {
        route: BRANCHES_ROUTE,
        permissions: BRANCHES_ROUTE.permissions,
      },
      {
        route: CYCLES_ROUTE,
        permissions: CYCLES_ROUTE.permissions,
      },
      {
        route: CLIP_ACCOUNTS_ROUTE,
        permissions: CLIP_ACCOUNTS_ROUTE.permissions,
      },
      {
        route: USERS_ROUTE,
        permissions: USERS_ROUTE.permissions,
      },
      {
        route: POLICIES_ROUTE,
        permissions: POLICIES_ROUTE.permissions,
      },
    ],
  },
  {
    username: 'direcciongeneral',
    routes: [
      {
        route: PANEL_CONTROL_ROUTE,
        permissions: PANEL_CONTROL_ROUTE.permissions,
      },
      {
        route: STUDENTS_ROUTE,
        permissions: STUDENTS_ROUTE.permissions,
      },
      {
        route: ENROLLMENTS_ROUTE,
        permissions: ENROLLMENTS_ROUTE.permissions,
      },
      {
        route: PAYMENTS_ROUTE,
        permissions: PAYMENTS_ROUTE.permissions,
      },
      {
        route: REPORTS_ROUTE,
        permissions: REPORTS_ROUTE.permissions,
      },
      {
        route: REPORTS_INCOMES_ROUTE,
        permissions: REPORTS_INCOMES_ROUTE.permissions,
      },
      {
        route: REPORTS_DEBITS_ROUTE,
        permissions: REPORTS_DEBITS_ROUTE.permissions,
      },
      {
        route: REPORTS_STATEMENT_ACCOUNT_ROUTE,
        permissions: REPORTS_STATEMENT_ACCOUNT_ROUTE.permissions,
      },
      {
        route: LEVELS_ROUTE,
        permissions: LEVELS_ROUTE.permissions,
      },
      {
        route: DISCIPLINES_ROUTE,
        permissions: DISCIPLINES_ROUTE.permissions,
      },
      {
        route: CALENDARS_ROUTE,
        permissions: CALENDARS_ROUTE.permissions,
      },
      {
        route: PRICES_ROUTE,
        permissions: PRICES_ROUTE.permissions,
      },
      {
        route: DISCOUNTS_ROUTE,
        permissions: DISCOUNTS_ROUTE.permissions,
      },
      {
        route: BRANCHES_ROUTE,
        permissions: BRANCHES_ROUTE.permissions,
      },
      {
        route: CYCLES_ROUTE,
        permissions: CYCLES_ROUTE.permissions,
      },
      {
        route: CLIP_ACCOUNTS_ROUTE,
        permissions: CLIP_ACCOUNTS_ROUTE.permissions,
      },
      {
        route: USERS_ROUTE,
        permissions: USERS_ROUTE.permissions,
      },
      {
        route: POLICIES_ROUTE,
        permissions: POLICIES_ROUTE.permissions,
      },
    ],
  },
  {
    username: 'emartinez',
    routes: [
      {
        route: PANEL_CONTROL_ROUTE,
        permissions: PANEL_CONTROL_ROUTE.permissions,
      },
      {
        route: STUDENTS_ROUTE,
        permissions: STUDENTS_ROUTE.permissions,
      },
      {
        route: ENROLLMENTS_ROUTE,
        permissions: ENROLLMENTS_ROUTE.permissions,
      },
    ],
  },
];
