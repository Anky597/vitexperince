-- Drop the existing experiences table
DROP TABLE IF EXISTS experiences;

-- Create the updated experiences table
CREATE TABLE experiences (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES users(id),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  interview_type TEXT NOT NULL,
  overall_experience TEXT NOT NULL,
  tips TEXT NOT NULL,
  salary TEXT,
  difficulty TEXT NOT NULL,
  outcome TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the rounds table
CREATE TABLE rounds (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  experience_id BIGINT REFERENCES experiences(id) ON DELETE CASCADE,
  round_name TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Create the questions table
CREATE TABLE questions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  round_id BIGINT REFERENCES rounds(id) ON DELETE CASCADE,
  question TEXT NOT NULL
);

-- Update the increment_likes function
CREATE OR REPLACE FUNCTION increment_likes(row_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE experiences
  SET likes = likes + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get a complete experience with rounds and questions
CREATE OR REPLACE FUNCTION get_complete_experience(experience_id BIGINT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'id', e.id,
    'user_id', e.user_id,
    'company', e.company,
    'role', e.role,
    'date', e.date,
    'location', e.location,
    'interview_type', e.interview_type,
    'overall_experience', e.overall_experience,
    'tips', e.tips,
    'salary', e.salary,
    'difficulty', e.difficulty,
    'outcome', e.outcome,
    'likes', e.likes,
    'created_at', e.created_at,
    'rounds', (
      SELECT json_agg(json_build_object(
        'round_name', r.round_name,
        'description', r.description,
        'questions', (
          SELECT json_agg(q.question)
          FROM questions q
          WHERE q.round_id = r.id
        )
      ))
      FROM rounds r
      WHERE r.experience_id = e.id
    )
  ) INTO result
  FROM experiences e
  WHERE e.id = experience_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

