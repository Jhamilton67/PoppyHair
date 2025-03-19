import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from '../src/lib/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Apply a migration SQL file to the Supabase database
 * @param {string} migrationName - The name of the migration file to apply
 */
const applyMigration = async (migrationName) => {
  // Get the migration file path
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  const migrationPath = path.join(migrationsDir, migrationName);
  
  if (!fs.existsSync(migrationPath)) {
    console.error(`Migration file not found: ${migrationPath}`);
    process.exit(1);
  }
  
  // Read the migration file
  const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
  
  try {
    console.log(`Applying migration: ${migrationName}`);
    
    // Execute the SQL using Supabase's pg_execute RPC function
    const { error } = await supabase.rpc('pg_execute', {
      query_text: migrationSQL
    });
    
    if (error) {
      console.error('Error applying migration:', error);
      process.exit(1);
    }
    
    console.log(`Migration applied successfully: ${migrationName}`);
  } catch (error) {
    console.error('Failed to apply migration:', error);
    process.exit(1);
  }
};

// Get the migration file name from command line arguments
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration file name as an argument');
  process.exit(1);
}

// Apply the migration
applyMigration(migrationName);