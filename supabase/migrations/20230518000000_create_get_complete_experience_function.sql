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

-- Create a function to get all experiences
CREATE OR REPLACE FUNCTION get_all_experiences()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_agg(
    get_complete_experience(e.id)
  ) INTO result
  FROM experiences e
  ORDER BY e.created_at DESC;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

