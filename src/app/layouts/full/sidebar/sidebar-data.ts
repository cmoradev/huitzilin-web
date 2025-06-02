export enum NavigationEnum {
  OPERATIONS = 'Menú',
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
    displayName: 'Ciclos',
    iconName: 'calendar-blank-outline',
    route: '/cycles',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Aulas',
    iconName: 'human-male-board',
    route: '/classrooms',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Niveles',
    iconName: 'magic-staff',
    route: '/levels',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Precios',
    iconName: 'currency-usd',
    route: '/prices',
    section: NavigationEnum.ADMINISTRATION,
  },
  {
    displayName: 'Negocios',
    iconName: 'town-hall',
    route: '/branches',
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
