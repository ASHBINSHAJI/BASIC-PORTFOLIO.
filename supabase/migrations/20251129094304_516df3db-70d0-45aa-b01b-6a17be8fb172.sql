-- Create bookings table to store form submissions
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  booking_date date NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public form)
CREATE POLICY "Anyone can submit bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy for viewing bookings (only for future admin access if needed)
CREATE POLICY "Only authenticated users can view bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);