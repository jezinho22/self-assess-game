## db

users (id, created_at, clerkId, username)
questions (id, created_at, question, level_id)
level (id, created_at, level)
answers (id, created_at, answer, feedback, points, question_id (questions_id), user_id (users_id))
scores (id, created_at, user_id (users_id), question_id (questions_id), points)
