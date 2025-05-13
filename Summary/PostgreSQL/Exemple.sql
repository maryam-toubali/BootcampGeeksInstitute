--📘 What This Covers:
--✅ Data types
--✅ Constraints (PRIMARY KEY, UNIQUE, CHECK, NOT NULL, DEFAULT)
--✅ Pattern matching with LIKE, ILIKE, %, _
--✅ Filtering (WHERE, BETWEEN, IN)
--✅ Aggregates (COUNT, AVG, etc.)
--✅ Sorting, Pagination (ORDER BY, LIMIT, OFFSET)
--✅ Aliasing with AS
--✅ JOIN (INNER JOIN)
--✅ Indexes
--✅ Trigger and functions
--✅ EXPLAIN, NOW(), ALTER, DELETE, UPDATE, INSERT


-- 1. Create a new table with different constraints and data types
CREATE TABLE students (
    id SERIAL PRIMARY KEY,                     -- Auto-increment unique ID
    first_name TEXT NOT NULL,                  -- No nulls allowed
    last_name TEXT NOT NULL,
    birth_date DATE CHECK (birth_date < NOW()),-- Must be a past date
    email TEXT UNIQUE,                         -- Must be unique
    score INTEGER DEFAULT 0                    -- If not given, default to 0
);

-- 2. Insert data into the table
INSERT INTO students (first_name, last_name, birth_date, email, score) VALUES
('Sara', 'Lee', '2005-03-10', 'sara@example.com', 85),
('Ali', 'Khan', '2003-11-21', 'ali@example.com', 90),
('Nina', 'Smith', '2001-09-15', 'nina@example.com', 88),
('Moe', 'Zed', '1999-05-30', 'moe@example.com', 72);

-- 3. Select all data
SELECT * FROM students;

-- 4. Select specific columns with aliases
SELECT first_name AS name, score AS final_score FROM students;

-- 5. Filtering with WHERE, LIKE, ILIKE, IN, BETWEEN
SELECT * FROM students
WHERE first_name ILIKE 's%'                    -- Starts with 'S' (case-insensitive)
  AND score BETWEEN 80 AND 90                  -- Score between 80 and 90
  AND id IN (1, 2, 3);                         -- Only IDs 1–3

-- 6. Pattern matching wildcards
SELECT * FROM students
WHERE last_name LIKE '_e%';                   -- Second letter is 'e', then anything

-- 7. Use DISTINCT to remove duplicates
SELECT DISTINCT birth_date FROM students;

-- 8. Sort by score descending
SELECT * FROM students
ORDER BY score DESC;

-- 9. Limit and Offset
SELECT * FROM students
ORDER BY id
LIMIT 2 OFFSET 1;                              -- Skip 1 row, fetch next 2

-- 10. Aggregate functions and GROUP BY
SELECT birth_date, COUNT(*) FROM students
GROUP BY birth_date
HAVING COUNT(*) > 0;                           -- All birth_dates that appear

-- 11. Update a student’s score
UPDATE students
SET score = score + 5
WHERE email = 'moe@example.com';

-- 12. Delete a student
DELETE FROM students
WHERE first_name = 'Ali';

-- 13. Alter table to add a column
ALTER TABLE students ADD COLUMN gender TEXT;

-- 14. Create another table and use JOIN
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name TEXT,
    student_id INTEGER REFERENCES students(id)
);

INSERT INTO courses (course_name, student_id) VALUES
('SQL Basics', 1),
('Data Science', 2),
('Web Dev', 3);

-- INNER JOIN: show students with their courses
SELECT s.first_name, c.course_name
FROM students s
INNER JOIN courses c ON s.id = c.student_id;

-- 15. Use NOW() and date filtering
SELECT * FROM students
WHERE birth_date < NOW();

-- 16. Create an index for performance
CREATE INDEX idx_birth_date ON students (birth_date);

-- 17. Use EXPLAIN to check query plan
EXPLAIN SELECT * FROM students WHERE score > 80;

-- 18. Create a trigger (simplified)
-- First, create a function that runs on trigger
CREATE FUNCTION log_score_update()
RETURNS trigger AS $$
BEGIN
  RAISE NOTICE 'Score updated for student ID: %', NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Then attach the trigger to the table
CREATE TRIGGER trg_score_update
AFTER UPDATE OF score ON students
FOR EACH ROW
EXECUTE FUNCTION log_score_update();
