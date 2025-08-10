export enum NavigationEnum {
  OPERATIONS = 'Operación',
  ADMINISTRATION = 'Administración',
  DEVELOPER = 'Configuraciones',
}

export type Entity =
  | 'branches'
  | 'cycles'
  | 'clip-accounts'
  | 'users'
  | 'policies'
  | 'permissions'
  | 'discounts'
  | 'price-lists'
  | 'fees'
  | 'periods'
  | 'schedules'
  | 'disciplines'
  | 'levels'
  | 'students'
  | 'debits'
  | 'incomes'
  | 'enrollments'
  | 'documents';

export type Action =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'select'
  | 'management';

export type Reports =
  | 'reports:incomes'
  | 'reports:debits'
  | 'reports:statement-account'
  | 'reports:chart'
  | 'reports:data';

export type PermissionKey = `${Action}:${Entity}` | Reports | '*:*';

export type RouteItem = {
  displayName: string;
  iconName: string;
  route: string;
  showInSidebar: boolean;
  section: NavigationEnum;
  permissions: PermissionKey[];
  isGlobal: boolean;
};

export type Permission = {
  route: string;
  name: string;
  permission: PermissionKey;
  description: string;
};

export type NavItem = {
  section: NavigationEnum;
  routes: RouteItem[];
};
