-- SQL TABLE RELATIONSHIPS EXPLAINED
-- ============================
-- This file demonstrates three fundamental types of database relationships:
-- 1. One-to-One
-- 2. One-to-Many
-- 3. Many-to-Many

-- ============================
-- 1. ONE-TO-ONE RELATIONSHIP
-- ============================
-- A one-to-one relationship exists when one record in table A can be associated with only one record in table B, and vice versa.
-- Examples: Person to Passport, User to User_Profile, Employee to Employee_Benefits

-- Creating tables for One-to-One relationship example
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL, -- UNIQUE constraint ensures one-to-one relationship
    bio TEXT,
    birth_date DATE,
    location VARCHAR(100),
    avatar_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert sample data
INSERT INTO users (username, email) VALUES
    ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com'),
    ('bob_jones', 'bob@example.com');

INSERT INTO user_profiles (user_id, bio, location) VALUES
    (1, 'Software developer from California', 'San Francisco'),
    (2, 'Digital marketer and dog lover', 'New York'),
    (3, 'Adventurous traveler and photographer', 'Chicago');

-- Querying a one-to-one relationship
SELECT u.username, u.email, p.bio, p.location
FROM users u
JOIN user_profiles p ON u.user_id = p.user_id;

-- ============================
-- 2. ONE-TO-MANY RELATIONSHIP
-- ============================
-- A one-to-many relationship exists when one record in table A can be associated with multiple records in table B,
-- but each record in table B is related to only one record in table A.
-- Examples: Author to Books, Department to Employees, Customer to Orders

-- Creating tables for One-to-Many relationship example
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50),
    birth_year INT
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    publication_year INT,
    isbn VARCHAR(20) UNIQUE,
    author_id INT, -- Foreign key to authors table
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

-- Insert sample data
INSERT INTO authors (author_name, nationality, birth_year) VALUES
    ('J.K. Rowling', 'British', 1965),
    ('George Orwell', 'British', 1903),
    ('Stephen King', 'American', 1947);

INSERT INTO books (title, publication_year, isbn, author_id) VALUES
    ('Harry Potter and the Philosopher''s Stone', 1997, '9780747532743', 1),
    ('Harry Potter and the Chamber of Secrets', 1998, '9780747538486', 1),
    ('Harry Potter and the Prisoner of Azkaban', 1999, '9780747546290', 1),
    ('1984', 1949, '9780451524935', 2),
    ('Animal Farm', 1945, '9780451526342', 2),
    ('The Shining', 1977, '9780307743657', 3),
    ('It', 1986, '9781501142970', 3);

-- Querying a one-to-many relationship
-- Find all books by a specific author
SELECT a.author_name, b.title, b.publication_year
FROM authors a
JOIN books b ON a.author_id = b.author_id
WHERE a.author_name = 'J.K. Rowling';

-- Count how many books each author has written
SELECT a.author_name, COUNT(b.book_id) AS book_count
FROM authors a
LEFT JOIN books b ON a.author_id = b.author_id
GROUP BY a.author_name
ORDER BY book_count DESC;

-- ============================
-- 3. MANY-TO-MANY RELATIONSHIP
-- ============================
-- A many-to-many relationship exists when multiple records in table A can be associated with multiple records in table B.
-- This requires a junction/pivot table to connect the two tables.
-- Examples: Students to Courses, Products to Orders, Actors to Movies

-- Creating tables for Many-to-Many relationship example
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    credits INT
);

-- Junction table for the many-to-many relationship
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    grade CHAR(1),
    -- Composite unique constraint to prevent duplicate enrollments
    UNIQUE(student_id, course_id),
    -- Foreign keys to both main tables
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Insert sample data
INSERT INTO students (student_name, email, enrollment_date) VALUES
    ('Alice Johnson', 'alice@university.edu', '2022-09-01'),
    ('Bob Williams', 'bob@university.edu', '2022-09-01'),
    ('Carol Davis', 'carol@university.edu', '2021-09-01');

INSERT INTO courses (course_name, department, credits) VALUES
    ('Database Systems', 'Computer Science', 4),
    ('Web Development', 'Computer Science', 3),
    ('Statistics', 'Mathematics', 3),
    ('Organic Chemistry', 'Chemistry', 4);

-- Students enroll in multiple courses
INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES
    (1, 1, '2022-09-05', 'A'), -- Alice in Database Systems
    (1, 2, '2022-09-05', 'B'), -- Alice in Web Development
    (1, 3, '2023-01-15', NULL), -- Alice in Statistics (no grade yet)
    (2, 2, '2022-09-07', 'A'), -- Bob in Web Development
    (2, 4, '2022-09-07', 'C'), -- Bob in Organic Chemistry
    (3, 1, '2022-09-03', 'B'), -- Carol in Database Systems
    (3, 3, '2022-09-03', 'A'); -- Carol in Statistics

-- Querying many-to-many relationships
-- Find all courses a specific student is enrolled in
SELECT s.student_name, c.course_name, e.grade
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.student_name = 'Alice Johnson';

-- Find all students enrolled in a specific course
SELECT c.course_name, s.student_name, e.grade
FROM courses c
JOIN enrollments e ON c.course_id = e.course_id
JOIN students s ON e.student_id = s.student_id
WHERE c.course_name = 'Database Systems';

-- Get course enrollment counts
SELECT c.course_name, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name
ORDER BY student_count DESC;

-- Find students enrolled in multiple courses and count them
SELECT s.student_name, COUNT(e.course_id) AS course_count
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_name
HAVING COUNT(e.course_id) > 1
ORDER BY course_count DESC;

-- ============================
-- PRACTICAL CONSIDERATIONS
-- ============================

-- When to use One-to-One:
-- 1. To split a table with many columns for performance or logical organization
-- 2. To store optional information that doesn't apply to all records
-- 3. To enforce security on certain fields by restricting access to the secondary table

-- When to use One-to-Many:
-- 1. Most common relationship type in relational databases
-- 2. Represents natural parent-child relationships between entities
-- 3. Maintains referential integrity with foreign keys

-- When to use Many-to-Many:
-- 1. When each record in both tables can relate to multiple records in the other table
-- 2. Always requires a junction/pivot table to implement
-- 3. The junction table can store relationship-specific attributes (like enrollment_date and grade) 