export type UserRole = 'master_admin' | 'admin' | 'moderator' | 'editor';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  avatar_url?: string;
  last_login?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface UserInvitation {
  id: string;
  email: string;
  role: UserRole;
  invited_by: string;
  token: string;
  expires_at: string;
  accepted_at?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  master_admin: 'Administrador Master',
  admin: 'Administrador',
  moderator: 'Moderador',
  editor: 'Editor'
};

export const USER_ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  master_admin: 'Acesso total ao sistema, pode gerenciar todos os usuários',
  admin: 'Pode gerenciar pontos de coleta e usuários moderadores/editores',
  moderator: 'Pode moderar conteúdo e gerenciar pontos de coleta',
  editor: 'Pode criar e editar pontos de coleta'
};