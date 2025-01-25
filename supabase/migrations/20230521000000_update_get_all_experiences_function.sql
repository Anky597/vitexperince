-- First, drop the existing function
DROP FUNCTION IF EXISTS get_all_experiences();

-- Now, create the updated function
CREATE OR REPLACE FUNCTION get_all_experiences()
RETURNS SETOF JSON AS $$
BEGIN
  RETURN QUERY
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
  )
  FROM experiences e
  GROUP BY e.id
  ORDER BY e.created_at DESC;
END;
$$ LANGUAGE plpgsql;

