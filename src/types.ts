export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team?: string;
  position?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles: UserRole[];
}
