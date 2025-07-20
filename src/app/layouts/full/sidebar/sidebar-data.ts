export enum NavigationEnum {
  OPERATIONS = 'Operación',
  ADMINISTRATION = 'Administración',
  DEVELOPER = 'Opciones de desarrollador',
}

export const navItems: RouteItem[] = [
  {
    displayName: 'Panel de control',
    iconName: 'view-dashboard-outline',
    route: '/',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Estudiantes',
    iconName: 'account-school-outline',
    route: '/students',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Inscripciones',
    iconName: 'tag-text-outline',
    route: '/enrollments',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Cobranza',
    iconName: 'point-of-sale',
    route: '/payments',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Niveles',
    iconName: 'magic-staff',
    route: '/levels',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Disciplinas',
    iconName: 'basketball',
    route: '/disciplines',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Calendario',
    iconName: 'calendar-multiselect',
    route: '/calendars',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Precios',
    iconName: 'currency-usd',
    route: '/prices',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Descuentos',
    iconName: 'percent',
    route: '/discounts',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Negocios',
    iconName: 'town-hall',
    route: '/branches',
    section: NavigationEnum.DEVELOPER,
  },
  {
    displayName: 'Ciclos',
    iconName: 'calendar-blank-outline',
    route: '/cycles',
    section: NavigationEnum.DEVELOPER,
  },
    {
    displayName: 'Cuentas clip',
    iconName: 'cash',
    route: '/clip-accounts',
    section: NavigationEnum.DEVELOPER,
  },
];

export type RouteItem = {
  displayName: string;
  iconName: string;
  route: string;
  section: NavigationEnum;
  children?: RouteItem[];
};

export type NavItem = {
  section: NavigationEnum;
  routes: RouteItem[];
};
