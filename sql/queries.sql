-- Benchmark 1: Get likes on comments under posts by a specific user
-- Without indexes: ~102ms
  --  Planning Time: 10.390 ms
  --  Execution Time: 101.904 ms
  -- (15 rows)
                                                                
-- With indexes:    ~30ms
  --  Planning Time: 3.691 ms
  --  Execution Time: 30.274 ms
  -- (15 rows)

-- This query retrieves all likes on comments that belong to posts made by a specific user.
EXPLAIN ANALYZE
SELECT l.*
FROM likes l
JOIN comments c ON l.comment_id = c.id
JOIN posts p ON c.post_id = p.id
WHERE p.user_id = '<user_id>';

-- X--------------------------------------------------------------------------------X

-- Benchmark 2: Get top 10 comments with most likes

EXPLAIN ANALYZE
SELECT comment_id, COUNT(*) AS like_count
FROM likes
GROUP BY comment_id
ORDER BY like_count DESC
LIMIT 10;

-- X--------------------------------------------------------------------------------X
-- Benchmark 3: Find posts with no comments

EXPLAIN ANALYZE
SELECT p.*
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
WHERE c.id IS NULL;

-- X--------------------------------------------------------------------------------X
-- Benchmark 4: Count total likes per user (via comments/posts)

EXPLAIN ANALYZE
SELECT u.id AS user_id, COUNT(l.id) AS total_likes
FROM users u
JOIN posts p ON u.id = p.user_id
JOIN comments c ON p.id = c.post_id
JOIN likes l ON c.id = l.comment_id
GROUP BY u.id
ORDER BY total_likes DESC
LIMIT 10;


