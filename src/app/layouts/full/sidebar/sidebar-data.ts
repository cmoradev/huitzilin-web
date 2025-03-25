export enum NavigationEnum {
  OPERATIONS = 'Menú',
  ADMINISTRATION = 'Administración',
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
    displayName: 'Precios',
    iconName: 'cash',
    route: '/prices',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Negocios',
    iconName: 'town-hall',
    route: '/branches',
    section: NavigationEnum.ADMINISTRATION,
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
