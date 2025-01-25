-- Drop both versions of the function
DROP FUNCTION IF EXISTS increment_likes(bigint);
DROP FUNCTION IF EXISTS increment_likes(integer);

-- Create a new version that explicitly uses bigint
CREATE OR REPLACE FUNCTION increment_likes(row_id bigint)
RETURNS void AS $$
BEGIN
  UPDATE experiences
  SET likes = likes + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

