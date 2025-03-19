/*
  # Fix Row Level Security policies for appointments

  1. Changes
    - Reset RLS policies for the appointments table
    - Ensure anonymous users can properly insert new appointments
    - Configure proper access for authenticated users
    
  2. Purpose
    - Fix insertion errors when booking appointments
    - Maintain data security while allowing proper access
*/

-- Disable and drop all existing RLS policies for appointments table
DROP POLICY IF EXISTS "Anyone can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can delete appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can update appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON appointments;

-- Re-enable RLS on the table
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create proper INSERT policy for anonymous users
CREATE POLICY "Anyone can insert appointments"
ON appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create SELECT policy allowing authenticated users to view all appointments
CREATE POLICY "Authenticated users can view appointments"
ON appointments
FOR SELECT
TO authenticated
USING (true);

-- Create UPDATE policy allowing authenticated users to update any appointment
CREATE POLICY "Authenticated users can update appointments"
ON appointments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create DELETE policy allowing authenticated users to delete appointments
CREATE POLICY "Authenticated users can delete appointments"
ON appointments
FOR DELETE
TO authenticated
USING (true);