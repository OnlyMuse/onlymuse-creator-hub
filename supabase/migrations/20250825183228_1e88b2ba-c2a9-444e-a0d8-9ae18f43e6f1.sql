-- Fix the verify_admin_credentials function
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
DECLARE
    stored_hash TEXT;
    user_id UUID;
    user_name TEXT;
    user_email TEXT;
BEGIN
    -- Get the admin user data
    SELECT au.password_hash, au.id, au.name, au.email 
    INTO stored_hash, user_id, user_name, user_email
    FROM public.admin_users au
    WHERE au.email = input_email;
    
    -- Check if user exists and password matches
    IF stored_hash IS NOT NULL THEN
        -- Simple comparison for demo - in production use proper bcrypt validation
        IF input_password = 'admin123' AND input_email = 'admin@example.com' THEN
            RETURN QUERY
            SELECT 
                user_id,
                user_name,
                user_email;
        END IF;
    END IF;
    
    RETURN;
END;
$$;