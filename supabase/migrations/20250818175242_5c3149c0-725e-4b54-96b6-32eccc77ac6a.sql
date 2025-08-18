-- Create leads table for storing form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('model', 'client')),
  email TEXT NOT NULL,
  
  -- Model specific fields
  artistic_name TEXT,
  country TEXT,
  city TEXT,
  languages TEXT[],
  social_links JSONB,
  onlyfans_link TEXT,
  experience TEXT,
  time_available TEXT,
  goals TEXT[],
  current_earnings TEXT,
  contact_preference TEXT,
  phone TEXT,
  
  -- Client specific fields
  company_name TEXT,
  business_type TEXT,
  budget TEXT,
  objectives TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for lead generation)
CREATE POLICY "Allow anonymous lead submissions" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading for authenticated users (admin access)
CREATE POLICY "Authenticated users can view leads" 
ON public.leads 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_profile_type ON public.leads(profile_type);
CREATE INDEX idx_leads_email ON public.leads(email);