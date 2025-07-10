import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCurrentUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      return profile?.role || null;
    } catch (error) {
      console.error('Error fetching current user role:', error);
      return null;
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (email: string, fullName: string, role: UserRole) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Criar usuário no sistema de autenticação primeiro
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password: Math.random().toString(36).slice(-12), // senha temporária
        email_confirm: true,
        user_metadata: {
          full_name: fullName
        }
      });

      if (authError) throw authError;
      if (!authUser.user) throw new Error('Erro ao criar usuário');

      // Criar perfil na tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: authUser.user.id,
          email,
          full_name: fullName,
          role,
          created_by: user.id,
          is_active: true
        });

      if (profileError) throw profileError;

      // Log audit
      await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'create_user',
          details: { email, role, full_name: fullName }
        });

      toast({
        title: "Usuário criado",
        description: `Usuário ${email} criado com role ${role}`,
      });

      await fetchUsers();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao criar usuário",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      // Log audit
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('audit_logs')
          .insert({
            user_id: user.id,
            action: 'update_user_role',
            resource_type: 'user',
            resource_id: userId,
            details: { new_role: newRole }
          });
      }

      toast({
        title: "Role atualizada",
        description: "A role do usuário foi atualizada com sucesso",
      });

      await fetchUsers();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar role",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: isActive })
        .eq('user_id', userId);

      if (error) throw error;

      // Log audit
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('audit_logs')
          .insert({
            user_id: user.id,
            action: isActive ? 'activate_user' : 'deactivate_user',
            resource_type: 'user',
            resource_id: userId,
            details: { is_active: isActive }
          });
      }

      toast({
        title: isActive ? "Usuário ativado" : "Usuário desativado",
        description: `O usuário foi ${isActive ? 'ativado' : 'desativado'} com sucesso`,
      });

      await fetchUsers();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao alterar status",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      // Log audit
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('audit_logs')
          .insert({
            user_id: user.id,
            action: 'delete_user',
            resource_type: 'user',
            resource_id: userId,
            details: {}
          });
      }

      toast({
        title: "Usuário removido",
        description: "O usuário foi removido com sucesso",
      });

      await fetchUsers();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao remover usuário",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const canManageUser = (targetRole: UserRole): boolean => {
    if (!currentUserRole) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      editor: 1,
      moderator: 2,
      admin: 3,
      master_admin: 4
    };

    return roleHierarchy[currentUserRole] > roleHierarchy[targetRole];
  };

  const canCreateRole = (targetRole: UserRole): boolean => {
    if (!currentUserRole) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      editor: 1,
      moderator: 2,
      admin: 3,
      master_admin: 4
    };

    return roleHierarchy[currentUserRole] >= roleHierarchy[targetRole];
  };

  useEffect(() => {
    const initialize = async () => {
      const role = await fetchCurrentUserRole();
      setCurrentUserRole(role);
      
      if (role && ['master_admin', 'admin', 'moderator'].includes(role)) {
        await fetchUsers();
      } else {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return {
    users,
    currentUserRole,
    loading,
    createUser,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    canManageUser,
    canCreateRole,
    refetch: () => fetchUsers()
  };
};