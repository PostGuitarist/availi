-- Drop existing tables if they exist
DROP TABLE IF EXISTS availability CASCADE;
DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS meetings CASCADE;

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date_range JSONB NOT NULL,
  time_range JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create participants table with JSONB availability
CREATE TABLE IF NOT EXISTS participants (
  id VARCHAR(20) PRIMARY KEY,
  meeting_id VARCHAR(20) NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  availability JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_participants_meeting_id ON participants(meeting_id);

