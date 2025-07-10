-- Remove foreign key constraint from profiles table to allow creating profiles without auth.users dependency
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;