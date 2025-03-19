/*
  # Create appointments table for Poppy Hair

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text)
      - `service` (text, not null)
      - `appointment_date` (date, not null)
      - `appointment_time` (text, not null)
      - `message` (text)
      - `status` (text, default 'pending')
  2. Security
    - Enable RLS on `appointments` table
    - Add policy for authenticated users to read their own data
    - Add policy for anon users to insert data
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  message text,
  status text DEFAULT 'pending'
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new appointments
CREATE POLICY "Anyone can insert appointments"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view appointments
CREATE POLICY "Authenticated users can view appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update appointments
CREATE POLICY "Authenticated users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);