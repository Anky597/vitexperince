-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add user_id column to experiences table
ALTER TABLE experiences
ADD COLUMN user_id UUID REFERENCES users(id);

-- Update the increment_likes function to use BIGINT explicitly
CREATE OR REPLACE FUNCTION increment_likes(row_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE experiences
  SET likes = likes + 1
  WHERE id = row_id AND user_id IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

