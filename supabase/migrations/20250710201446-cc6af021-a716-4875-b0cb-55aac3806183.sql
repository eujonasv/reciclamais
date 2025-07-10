-- Simplificar políticas RLS para o sistema de usuários (corrigido)

-- Atualizar políticas da tabela profiles
DROP POLICY IF EXISTS "Only admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Only master admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles if admin" ON public.profiles;

-- Novas políticas simplificadas para profiles
CREATE POLICY "Anyone authenticated can insert profiles" ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Anyone authenticated can update profiles" ON public.profiles
FOR UPDATE TO authenticated
USING (true);

CREATE POLICY "Anyone authenticated can view profiles" ON public.profiles
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Only super admin can delete profiles" ON public.profiles
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND email = 'adm@reciclamais.com'
  )
);

-- Atualizar políticas da tabela audit_logs
DROP POLICY IF EXISTS "Only admins can view audit logs" ON public.audit_logs;

CREATE POLICY "Anyone authenticated can view audit logs" ON public.audit_logs
FOR SELECT TO authenticated
USING (true);

-- Atualizar políticas da tabela collection_points para ser mais permissiva
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.collection_points;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON public.collection_points;

CREATE POLICY "Anyone authenticated can insert collection points" ON public.collection_points
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Anyone authenticated can update collection points" ON public.collection_points
FOR UPDATE TO authenticated
USING (true);

-- Atualizar políticas da tabela user_invitations
DROP POLICY IF EXISTS "Only admins can manage invitations" ON public.user_invitations;

CREATE POLICY "Anyone authenticated can manage invitations" ON public.user_invitations
FOR ALL TO authenticated
USING (true);

-- Agora podemos remover as funções não utilizadas
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.get_user_role(uuid);