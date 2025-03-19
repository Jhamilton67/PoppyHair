import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a timestamp-based migration name
const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
const migrationName = process.argv[2] || 'migration';
const fileName = `${timestamp}_${migrationName}.sql`;

// Ensure migrations directory exists
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

const migrationPath = path.join(migrationsDir, fileName);

// Create migration file with template
const migrationContent = `/*
  # Add patch tested column for coloring services

  1. Changes
    - Add \`patch_tested\` boolean column to the \`appointments\` table to track if clients have been patch tested
    
  2. Purpose
    - UK law requires patch testing for coloring services if not done in the last 12 months
    - This column allows tracking of patch test status for legal compliance
*/

-- Add patch_tested column to appointments table
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS patch_tested BOOLEAN;

-- Update the database types
COMMENT ON COLUMN appointments.patch_tested IS 'Indicates if the client has been patch tested for coloring services in the last 12 months';
`;

fs.writeFileSync(migrationPath, migrationContent);

console.log(`Migration file created: ${migrationPath}`);