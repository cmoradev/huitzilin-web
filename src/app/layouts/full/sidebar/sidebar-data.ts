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
    displayName: 'Panel de control',
    iconName: 'view-dashboard-outline',
    route: '/asd',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Panel de control',
    iconName: 'view-dashboard-outline',
    route: '/asd',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Panel de control',
    iconName: 'view-dashboard-outline',
    route: '/asd',
    section: NavigationEnum.OPERATIONS,
  },
  {
    displayName: 'Usuarios',
    iconName: 'account-group-outline',
    route: '/settings/users',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Usuarios',
    iconName: 'account-group-outline',
    route: '/settings/users',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Usuarios',
    iconName: 'account-group-outline',
    route: '/settings/users',
    section: NavigationEnum.ADMINISTRATION,
    children: [
      {
        displayName: 'Usuarios',
        iconName: 'account-group-outline',
        route: '/settings/users',
        section: NavigationEnum.ADMINISTRATION,
      },
      {
        displayName: 'Usuarios',
        iconName: 'account-group-outline',
        route: '/settings/users',
        section: NavigationEnum.ADMINISTRATION,
      },
    ],
  },
  {
    displayName: 'Usuarios',
    iconName: 'account-group-outline',
    route: '/settings/users',
    section: NavigationEnum.ADMINISTRATION,
    children: [
      {
        displayName: 'Usuarios',
        iconName: 'account-group-outline',
        route: '/settings/users',
        section: NavigationEnum.ADMINISTRATION,
      },
      {
        displayName: 'Usuarios',
        iconName: 'account-group-outline',
        route: '/settings/users',
        section: NavigationEnum.ADMINISTRATION,
      },
    ],
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
