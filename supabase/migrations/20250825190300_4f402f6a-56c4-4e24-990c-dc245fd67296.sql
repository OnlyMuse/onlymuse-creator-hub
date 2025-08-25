-- Fix the RLS policy to work with custom admin authentication
-- The previous policy assumed Supabase auth, but we're using custom admin auth

-- Drop the policy that requires auth.uid() since we're not using Supabase auth for admins
DROP POLICY IF EXISTS "Authenticated admins can view own data" ON public.admin_users;

-- Create a policy that allows NO direct access to the table
-- Only the security definer function can access it
CREATE POLICY "No direct access to admin_users" 
ON public.admin_users 
FOR ALL 
USING (false)
WITH CHECK (false);

-- The verify_admin_credentials function will still work because it's SECURITY DEFINER
-- which bypasses RLS policies, but direct queries to the table are blocked