/*
  # Update table comments for UK spelling

  1. Changes
    - Update comment on patch_tested column from "coloring services" to "colouring services" to use UK spelling
    
  2. Purpose
    - Standardize terminology using UK English spelling across the application
*/

-- Update the database comment to use UK spelling
COMMENT ON COLUMN appointments.patch_tested IS 'Indicates if the client has been patch tested for colouring services in the last 12 months';