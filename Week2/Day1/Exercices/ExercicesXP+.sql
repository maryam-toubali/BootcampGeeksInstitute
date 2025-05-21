CREATE TABLE students();

ALTER TABLE students 
ADD COLUMN id SERIAL PRIMARY KEY,
ADD COLUMN first_name VARCHAR(50),
ADD COLUMN last_name VARCHAR(50),
ADD COLUMN birth_date DATE;

INSERT INTO students (first_name, last_name, birth_date) VALUES 
('Marc', 'Benichou', '1998-11-02'),
('Yoan', 'Cohen', '2010-12-03'),
('Lea', 'Benichou', '1987-07-27'),
('Amelia', 'Dux', '1996-04-07'),
('David', 'Grez', '2003-06-14'),
('Omer', 'Simpson', '1980-10-03');
INSERT INTO students (first_name, last_name, birth_date)
VALUES ('Maryam', 'Toubali', '1998-02-20');

SELECT * FROM students;
SELECT first_name, last_name FROM students;

SELECT first_name, last_name FROM students 
WHERE id = 2;
SELECT first_name, last_name FROM students 
WHERE last_name = 'Benichou' AND first_name = 'Marc';
SELECT first_name, last_name FROM students 
WHERE last_names = 'Benichou' OR first_names = 'Marc';
SELECT first_name, last_name FROM students 
WHERE first_name ILIKE '%a%'; --ILIKE fetch both (A,a) 
SELECT first_name, last_name FROM students 
WHERE first_name ILIKE 'a%';
SELECT first_name, last_name FROM students 
WHERE first_name ILIKE '%a';
SELECT first_name, last_name FROM students 
WHERE first_name LIKE '%a_';  --% = any number of characters, a = the second-to-last letter, _ = exactly one character (the last letter)
SELECT first_name, last_name FROM students 
WHERE id IN (1, 3);

SELECT * FROM students 
WHERE birth_date >= '2000-01-01';





