--ch
-- Part I: Customer and Customer Profile

CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE CustomerProfile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INTEGER REFERENCES Customer(id) ON DELETE CASCADE
);

INSERT INTO Customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
SELECT TRUE, id FROM Customer WHERE first_name = 'John';

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
SELECT FALSE, id FROM Customer WHERE first_name = 'Jerome';

SELECT c.first_name
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

SELECT c.first_name, COALESCE(cp.isLoggedIn, FALSE) AS isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id;

SELECT COUNT(*)
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE COALESCE(cp.isLoggedIn, FALSE) = FALSE;

-- Part II: Book, Student, Library

CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

INSERT INTO Book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);

INSERT INTO Student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE Library (
    book_fk_id INTEGER REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id)
);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
SELECT book_id, student_id, '2022-02-15' FROM Book WHERE title = 'Alice In Wonderland' AND author = 'Lewis Carroll'
JOIN Student ON name = 'John';

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
SELECT book_id, student_id, '2021-03-03' FROM Book WHERE title = 'To kill a mockingbird' AND author = 'Harper Lee'
JOIN Student ON name = 'Bob';

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
SELECT book_id, student_id, '2021-05-23' FROM Book WHERE title = 'Alice In Wonderland' AND author = 'Lewis Carroll'
JOIN Student ON name = 'Lera';

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
SELECT book_id, student_id, '2021-08-12' FROM Book WHERE title = 'Harry Potter' AND author = 'J.K Rowling'
JOIN Student ON name = 'Bob';

SELECT * FROM Library;

SELECT s.name, b.title
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;

SELECT AVG(s.age)
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

DELETE FROM Student WHERE name = 'John';
SELECT * FROM Library;



