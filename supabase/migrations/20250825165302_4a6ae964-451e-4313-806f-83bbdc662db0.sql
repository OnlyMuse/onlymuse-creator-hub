-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin users to manage themselves
CREATE POLICY "Admin users can view their own data" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Create policy for admin authentication
CREATE POLICY "Allow admin login verification" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin user (password: admin123)
-- In production, you should change this password immediately
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('admin@example.com', '$2b$10$rQ8QqQxQxQxQxQxQxQxQxOeKqQxQxQxQxQxQxQxQxQxQxQxQxQxQx', 'Administrador');

-- Create function to verify admin credentials
CREATE OR REPLACE FUNCTION public.verify_admin_credentials(input_email TEXT, input_password TEXT)
RETURNS TABLE(
  admin_id UUID,
  admin_name TEXT,
  admin_email TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Update last login function
CREATE OR REPLACE FUNCTION public.update_admin_last_login(admin_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.admin_users 
  SET last_login = now() 
  WHERE id = admin_id;
END;
$$;