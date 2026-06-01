-- Tighten bookings RLS: remove broad SELECT, add explicit deny UPDATE/DELETE
DROP POLICY IF EXISTS "Only authenticated users can view bookings" ON public.bookings;

-- Deny all UPDATE / DELETE through the Data API (service role bypasses RLS)
CREATE POLICY "No one can update bookings"
ON public.bookings
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No one can delete bookings"
ON public.bookings
FOR DELETE
TO anon, authenticated
USING (false);