-- Fix security issues by setting search_path on functions

-- Update the verify_admin_credentials function with proper search_path
CREATE OR REPLACE FUNCTION public.verify_admin_credentials(input_email TEXT, input_password TEXT)
RETURNS TABLE(
  admin_id UUID,
  admin_name TEXT,
  admin_email TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.name,
    au.email
  FROM public.admin_users au
  WHERE au.email = input_email 
    AND au.password_hash = crypt(input_password, au.password_hash);
END;
$$;

-- Update the update_admin_last_login function with proper search_path
CREATE OR REPLACE FUNCTION public.update_admin_last_login(admin_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.admin_users 
  SET last_login = now() 
  WHERE id = admin_id;
END;
$$;

-- Update the existing update_updated_at_column function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;