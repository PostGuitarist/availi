import { sql } from "./db"

export async function runMigrations() {
  try {
    console.log("Running database migrations...")

    // Add audit logging
    await sql`
      CREATE TABLE IF NOT EXISTS migration_logs (
        id SERIAL PRIMARY KEY,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL,
        details TEXT
      )
    `

    // Log migration start
    await sql`
      INSERT INTO migration_logs (status, details)
      VALUES ('STARTED', 'Starting database migration')
    `

    // Drop existing tables if they exist (for clean migration)
    await sql`
      DROP TABLE IF EXISTS availability CASCADE;
      DROP TABLE IF EXISTS participants CASCADE;
      DROP TABLE IF EXISTS meetings CASCADE;
    `

    // Create meetings table
    await sql`
      CREATE TABLE IF NOT EXISTS meetings (
        id VARCHAR(20) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date_range JSONB NOT NULL,
        time_range JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create participants table with JSONB availability
    await sql`
      CREATE TABLE IF NOT EXISTS participants (
        id VARCHAR(20) PRIMARY KEY,
        meeting_id VARCHAR(20) NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        availability JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Add indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_participants_meeting_id ON participants(meeting_id);
    `

    // Create a table to track API usage for additional rate limiting
    await sql`
      CREATE TABLE IF NOT EXISTS api_usage (
        id SERIAL PRIMARY KEY,
        client_ip VARCHAR(45), 
        endpoint VARCHAR(255) NOT NULL,
        request_count INTEGER DEFAULT 1,
        last_request TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(client_ip, endpoint)
      )
    `

    // Log successful migration
    await sql`
      INSERT INTO migration_logs (status, details)
      VALUES ('COMPLETED', 'Database migration completed successfully')
    `

    return {
      success: true,
    }
  } catch (error) {
    console.error("Migration error:", error)
    
    // Log failed migration
    try {
      await sql`
        INSERT INTO migration_logs (status, details)
        VALUES ('FAILED', ${String(error)})
      `
    } catch (logError) {
      console.error("Failed to log migration error:", logError)
    }
    
    return {
      success: false,
      error,
    }
  }
}

