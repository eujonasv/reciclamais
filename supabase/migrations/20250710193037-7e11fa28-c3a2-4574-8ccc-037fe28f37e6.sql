-- Create the first master admin user
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role,
  is_active,
  created_at,
  updated_at
) VALUES (
  'd33fc5e6-9cf0-46b8-9bc5-31a5bedb14df'::uuid,
  'adm@reciclamais.com',
  'Administrador Master',
  'master_admin'::user_role,
  true,
  now(),
  now()
) ON CONFLICT (user_id) DO UPDATE SET
  role = 'master_admin'::user_role,
  is_active = true;