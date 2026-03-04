export type UserRole = 'super_admin' | 'administrator' | 'editor' | 'moderator' | 'source';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  region_id?: string;
  status: 'active' | 'inactive';
}

const PERMISSIONS: Record<string, UserRole[]> = {
  view_admin: ['super_admin', 'administrator', 'editor', 'moderator', 'source'],
  manage_users: ['super_admin'],
  create_element: ['super_admin', 'administrator', 'editor', 'source'],
  edit_any_element: ['super_admin', 'administrator'],
  edit_own_element: ['super_admin', 'administrator', 'editor', 'source'],
  delete_element: ['super_admin', 'administrator'],
  publish_element: ['super_admin', 'administrator', 'moderator'],
  create_bearer: ['super_admin', 'administrator', 'editor', 'source'],
  edit_bearer: ['super_admin', 'administrator'],
  delete_bearer: ['super_admin', 'administrator'],
  create_news: ['super_admin', 'administrator', 'editor'],
  edit_news: ['super_admin', 'administrator'],
  delete_news: ['super_admin', 'administrator'],
  upload_media: ['super_admin', 'administrator', 'editor', 'source'],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return PERMISSIONS[permission]?.includes(role) ?? false;
}

export function canCreate(role: UserRole, resource: 'element' | 'bearer' | 'news'): boolean {
  return hasPermission(role, `create_${resource}`);
}

export function canEdit(role: UserRole, resource: 'element' | 'bearer' | 'news', isOwn = false): boolean {
  if (resource === 'element') {
    return isOwn ? hasPermission(role, 'edit_own_element') : hasPermission(role, 'edit_any_element');
  }
  return hasPermission(role, `edit_${resource}`);
}

export function canDelete(role: UserRole, resource: 'element' | 'bearer' | 'news'): boolean {
  return hasPermission(role, `delete_${resource}`);
}

export function canPublish(role: UserRole): boolean {
  return hasPermission(role, 'publish_element');
}

export function canManageUsers(role: UserRole): boolean {
  return hasPermission(role, 'manage_users');
}

// Sample admin users for demo
export const SAMPLE_USERS: AdminUser[] = [
  { id: 'u1', email: 'admin@memm.kz', full_name: 'Жүйе Әкімшісі', role: 'super_admin', status: 'active' },
  { id: 'u2', email: 'editor@memm.kz', full_name: 'Серікбол Қанатұлы', role: 'editor', status: 'active' },
  { id: 'u3', email: 'moderator@memm.kz', full_name: 'Айгүл Мұратқызы', role: 'moderator', status: 'active' },
  { id: 'u4', email: 'source@memm.kz', full_name: 'Нұрбек Сағынтайұлы', role: 'source', region_id: 'almaty_obl', status: 'active' },
  { id: 'u5', email: 'admin2@memm.kz', full_name: 'Марат Жанұзақов', role: 'administrator', status: 'active' },
];
