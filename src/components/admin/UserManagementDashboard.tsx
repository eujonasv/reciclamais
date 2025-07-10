import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { useUserManagement } from '@/hooks/use-user-management';
import { UserRole, USER_ROLE_LABELS, USER_ROLE_DESCRIPTIONS } from '@/types/user';
import { UserPlus, Mail, Shield, Clock, Trash2, Settings, Users, UserCheck, UserX, Calendar } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const UserManagementDashboard = () => {
  const {
    users,
    currentUserRole,
    loading,
    createUser,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    canManageUser,
    canCreateRole
  } = useUserManagement();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createEmail, setCreateEmail] = useState('');
  const [createFullName, setCreateFullName] = useState('');
  const [createRole, setCreateRole] = useState<UserRole>('editor');
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateUser = async () => {
    if (!createEmail.trim() || !createFullName.trim()) return;
    
    setCreateLoading(true);
    const success = await createUser(createEmail, createFullName, createRole);
    
    if (success) {
      setCreateEmail('');
      setCreateFullName('');
      setCreateRole('editor');
      setCreateDialogOpen(false);
    }
    setCreateLoading(false);
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'master_admin': return 'destructive';
      case 'admin': return 'default';
      case 'moderator': return 'secondary';
      case 'editor': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentUserRole || !['master_admin', 'admin', 'moderator'].includes(currentUserRole)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Acesso Negado
          </CardTitle>
          <CardDescription>
            Você não tem permissão para acessar o gerenciamento de usuários.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const availableRoles = Object.entries(USER_ROLE_LABELS).filter(([role]) => 
    canCreateRole(role as UserRole)
  );

  const activeUsers = users.filter(u => u.is_active);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
          <p className="text-muted-foreground">Gerencie usuários e suas permissões na plataforma</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Criar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Usuário</DialogTitle>
              <DialogDescription>
                Crie um novo usuário com as permissões adequadas.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@exemplo.com"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  placeholder="Nome do usuário"
                  value={createFullName}
                  onChange={(e) => setCreateFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select value={createRole} onValueChange={(value) => setCreateRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(([role, label]) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex flex-col items-start">
                          <span>{label}</span>
                          <span className="text-sm text-muted-foreground">
                            {USER_ROLE_DESCRIPTIONS[role as UserRole]}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateUser} disabled={createLoading || !createEmail.trim() || !createFullName.trim()}>
                {createLoading ? 'Criando...' : 'Criar Usuário'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.length - activeUsers.length} inativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Registrados no sistema
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sua Função</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{USER_ROLE_LABELS[currentUserRole]}</div>
            <p className="text-xs text-muted-foreground">
              {USER_ROLE_DESCRIPTIONS[currentUserRole]}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Usuários Cadastrados
          </CardTitle>
          <CardDescription>
            Lista de todos os usuários registrados na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{user.full_name || 'Nome não informado'}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {USER_ROLE_LABELS[user.role]}
                    </Badge>
                    {!user.is_active && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Criado em {format(new Date(user.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                    {user.last_login && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Último acesso {formatDistanceToNow(new Date(user.last_login), { 
                          addSuffix: true, 
                          locale: ptBR 
                        })}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {canManageUser(user.role) && (
                    <>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${user.id}`} className="text-sm">
                          {user.is_active ? 'Ativo' : 'Inativo'}
                        </Label>
                        <Switch
                          id={`active-${user.id}`}
                          checked={user.is_active}
                          onCheckedChange={(checked) => toggleUserStatus(user.user_id, checked)}
                        />
                      </div>
                      <Select
                        value={user.role}
                        onValueChange={(value) => updateUserRole(user.user_id, value as UserRole)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map(([role, label]) => (
                            <SelectItem key={role} value={role}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <UserX className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remover Usuário</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja remover o usuário {user.full_name || user.email}? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteUser(user.user_id)}>
                              Remover
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementDashboard;