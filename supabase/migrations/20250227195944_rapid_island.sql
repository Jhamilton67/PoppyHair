/*
  # Add patch tested column for coloring services

  1. Changes
    - Add `patch_tested` boolean column to the `appointments` table to track if clients have been patch tested
    
  2. Purpose
    - UK law requires patch testing for coloring services if not done in the last 12 months
    - This column allows tracking of patch test status for legal compliance
*/

-- Add patch_tested column to appointments table
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS patch_tested BOOLEAN;

-- Update the database types
COMMENT ON COLUMN appointments.patch_tested IS 'Indicates if the client has been patch tested for coloring services in the last 12 months';