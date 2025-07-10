import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserInvitation, UserRole } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
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

  const fetchInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('user_invitations')
        .select('*')
        .is('accepted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar convites",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const inviteUser = async (email: string, role: UserRole) => {
    try {
      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          role,
          invited_by: user.id,
          token,
          expires_at: expiresAt.toISOString(),
        });

      if (error) throw error;

      // Log audit
      await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'invite_user',
          details: { email, role }
        });

      toast({
        title: "Convite enviado",
        description: `Convite enviado para ${email} com role ${role}`,
      });

      await fetchInvitations();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao enviar convite",
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

  const deleteInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('user_invitations')
        .delete()
        .eq('id', invitationId);

      if (error) throw error;

      toast({
        title: "Convite removido",
        description: "O convite foi removido com sucesso",
      });

      await fetchInvitations();
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao remover convite",
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

  const canInviteRole = (targetRole: UserRole): boolean => {
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
        await Promise.all([fetchUsers(), fetchInvitations()]);
      } else {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return {
    users,
    invitations,
    currentUserRole,
    loading,
    inviteUser,
    updateUserRole,
    toggleUserStatus,
    deleteInvitation,
    canManageUser,
    canInviteRole,
    refetch: () => Promise.all([fetchUsers(), fetchInvitations()])
  };
};