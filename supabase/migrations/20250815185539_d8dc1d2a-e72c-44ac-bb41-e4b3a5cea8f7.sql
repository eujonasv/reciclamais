-- Security Fix: Update RLS policies and harden database functions

-- 1. Drop overly permissive RLS policies
DROP POLICY IF EXISTS "Anyone authenticated can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anyone authenticated can view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Anyone authenticated can manage invitations" ON public.user_invitations;

-- 2. Create secure RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Master admin can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles p 
  WHERE p.user_id = auth.uid() 
  AND p.email = 'adm@reciclamais.com'
));

-- 3. Create secure RLS policies for audit_logs table
CREATE POLICY "Master admin can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles p 
  WHERE p.user_id = auth.uid() 
  AND p.email = 'adm@reciclamais.com'
));

-- 4. Create secure RLS policies for user_invitations table
CREATE POLICY "Master admin can manage invitations" 
ON public.user_invitations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles p 
  WHERE p.user_id = auth.uid() 
  AND p.email = 'adm@reciclamais.com'
));

CREATE POLICY "Users can view their own invitation" 
ON public.user_invitations 
FOR SELECT 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 5. Harden database functions with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_user_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at THEN
    UPDATE public.profiles 
    SET last_login = NEW.last_sign_in_at 
    WHERE user_id = NEW.id;
    
    INSERT INTO public.audit_logs (user_id, action, details)
    VALUES (NEW.id, 'login', jsonb_build_object('timestamp', NEW.last_sign_in_at));
  END IF;
  RETURN NEW;
END;
$function$;