SELECT * FROM students
ORDER BY last_name 
LIMIT 4;

SELECT * FROM students   
ORDER BY birth_date DESC --or (in SQL WHERE is processed first) WHERE birth_date = ( SELECT MAX(birth_date) FROM students);
LIMIT 1;  

SELECT * FROM students
ORDER BY id -- good practice: use ORDER BY id to explicitly tell the database to order the rows by the id column
OFFSET 2 LIMIT 3;