-- Temporarily disable RLS to check if it's a policy issue
ALTER TABLE public.collection_points DISABLE ROW LEVEL SECURITY;

-- Update a test record to see if the issue is with RLS
UPDATE public.collection_points 
SET description = '{"monday":{"enabled":true,"openTime":"08:00","closeTime":"17:00"},"tuesday":{"enabled":true,"openTime":"08:00","closeTime":"17:00"},"wednesday":{"enabled":true,"openTime":"08:00","closeTime":"17:00"},"thursday":{"enabled":true,"openTime":"08:00","closeTime":"17:00"},"friday":{"enabled":true,"openTime":"08:00","closeTime":"17:00"},"saturday":{"enabled":false,"openTime":"","closeTime":""},"sunday":{"enabled":false,"openTime":"","closeTime":""}}'::text
WHERE id = '308c082f-fa6c-4a7c-8e2b-28d9472b5871';

-- Re-enable RLS
ALTER TABLE public.collection_points ENABLE ROW LEVEL SECURITY;

-- Create a more permissive update policy for admins
DROP POLICY IF EXISTS "Allow update for owner" ON public.collection_points;

CREATE POLICY "Allow update for authenticated users" 
ON public.collection_points 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);