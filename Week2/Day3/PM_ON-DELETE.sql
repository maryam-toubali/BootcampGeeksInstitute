-- ON DELETE RESTRICT Explanation and Examples
-- =======================================

-- ON DELETE RESTRICT is a referential action for foreign keys that prevents
-- the deletion of a parent record if child records reference it.

-- Let's create example tables to demonstrate:

-- Parent table
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

-- Child table with ON DELETE RESTRICT constraint
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    -- This creates a relationship with RESTRICT behavior
    -- In PostgreSQL, RESTRICT is actually the default behavior if you don't specify any ON DELETE action
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Insert sample data
INSERT INTO departments (department_name) VALUES 
    ('Engineering'),
    ('Marketing'),
    ('Finance');

INSERT INTO employees (first_name, last_name, department_id) VALUES
    ('John', 'Smith', 1),   -- Engineering
    ('Sarah', 'Johnson', 1), -- Engineering
    ('Michael', 'Brown', 2);  -- Marketing

-- EXAMPLE 1: Attempting to delete a department that has employees
-- =======================================
-- This will FAIL with an error because employees reference department 1
DELETE FROM departments WHERE department_id = 1;
-- ERROR: update or delete on table "departments" violates foreign key constraint
-- on table "employees" DETAIL: Key (department_id)=(1) is still referenced from
-- table "employees".

-- EXAMPLE 2: Successfully deleting a department with no employees
-- =======================================
-- This will SUCCEED because department 3 (Finance) has no employees referencing it
DELETE FROM departments WHERE department_id = 3;

-- EXAMPLE 3: How to delete a department with employees
-- =======================================
-- To delete department 1, you must first delete or reassign its employees
DELETE FROM employees WHERE department_id = 1;
-- Now you can delete the department
DELETE FROM departments WHERE department_id = 1;

-- ON DELETE RESTRICT vs Other Options
-- =======================================
-- 1. ON DELETE RESTRICT: Prevents deletion of parent record (default behavior)
-- 2. ON DELETE CASCADE: Automatically deletes child records when parent is deleted
-- 3. ON DELETE SET NULL: Sets foreign key to NULL when parent is deleted
-- 4. ON DELETE SET DEFAULT: Sets foreign key to default value when parent is deleted
-- 5. ON DELETE NO ACTION: Similar to RESTRICT but defers the check to end of transaction

-- In most production databases, RESTRICT is used to prevent accidental data loss
-- by ensuring referential integrity. It forces developers to explicitly handle
-- child records before removing parent records. 

-- DETAILED EXPLANATION OF ON DELETE SET DEFAULT
-- =============================================
-- ON DELETE SET DEFAULT sets the foreign key column to its default value
-- when the referenced row in the parent table is deleted.

-- Example tables to demonstrate ON DELETE SET DEFAULT:
DROP TABLE IF EXISTS employees_set_default;
DROP TABLE IF EXISTS departments_example;

CREATE TABLE departments_example (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

-- Set up a "general" department as the default
INSERT INTO departments_example (department_name) VALUES 
    ('General'),   -- This will be department_id 1, our default
    ('Engineering'),
    ('Marketing');

CREATE TABLE employees_set_default (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    -- Set default to department_id 1 (General)
    department_id INT DEFAULT 1,
    -- In PostgreSQL, we would write:
    -- FOREIGN KEY (department_id) REFERENCES departments_example(department_id) ON DELETE SET DEFAULT
    -- This would set department_id to its default value (1) when the referenced department is deleted
    FOREIGN KEY (department_id) REFERENCES departments_example(department_id)
);

-- Insert sample data
INSERT INTO employees_set_default (first_name, last_name, department_id) VALUES
    ('John', 'Smith', 2),   -- Engineering
    ('Sarah', 'Johnson', 2), -- Engineering
    ('Michael', 'Brown', 3);  -- Marketing

-- If ON DELETE SET DEFAULT was implemented, when we delete department 2 (Engineering),
-- all employees in that department would be reassigned to department 1 (General) automatically
-- For demonstration, we'll manually update:
UPDATE employees_set_default SET department_id = DEFAULT WHERE department_id = 2;
DELETE FROM departments_example WHERE department_id = 2;

-- After this DELETE, we would see:
-- SELECT * FROM employees_set_default;
-- employee_id | first_name | last_name | department_id
-- ------------+------------+-----------+--------------
-- 1           | John       | Smith     | 1            -- Changed from 2 to 1
-- 2           | Sarah      | Johnson   | 1            -- Changed from 2 to 1  
-- 3           | Michael    | Brown     | 3            -- Unchanged

-- DETAILED EXPLANATION OF ON DELETE NO ACTION
-- ===========================================
-- ON DELETE NO ACTION is very similar to RESTRICT but with a subtle difference:
-- - RESTRICT checks the constraint immediately during the DELETE operation
-- - NO ACTION delays the check until the end of the transaction

-- In practice with PostgreSQL, NO ACTION and RESTRICT behave almost identically
-- in most scenarios. The key difference appears in complex transactions with
-- deferred constraints.

-- Example of ON DELETE NO ACTION:
DROP TABLE IF EXISTS employees_no_action;
DROP TABLE IF EXISTS departments_no_action;

CREATE TABLE departments_no_action (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees_no_action (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    -- In PostgreSQL, the following would enforce NO ACTION behavior:
    -- FOREIGN KEY (department_id) REFERENCES departments_no_action(department_id) ON DELETE NO ACTION
    -- For our demo, we'll use the default behavior
    FOREIGN KEY (department_id) REFERENCES departments_no_action(department_id)
);

INSERT INTO departments_no_action (department_name) VALUES 
    ('Engineering'),
    ('Marketing');

INSERT INTO employees_no_action (first_name, last_name, department_id) VALUES
    ('John', 'Smith', 1),
    ('Sarah', 'Johnson', 1);

-- This transaction will FAIL because of the constraint
BEGIN;
    DELETE FROM departments_no_action WHERE department_id = 1;
    -- If this was DEFERRABLE INITIALLY DEFERRED, we could do this:
    -- DELETE FROM employees_no_action WHERE department_id = 1;
COMMIT;
-- Error would occur at COMMIT time with NO ACTION if constraints were deferred
-- With RESTRICT, the error would happen immediately at the DELETE statement

-- USAGE CONSIDERATIONS:
-- 1. RESTRICT: Use when you want immediate validation and to prevent accidental deletions
-- 2. CASCADE: Use when child records should be automatically deleted with parent
-- 3. SET NULL: Use when child records should become orphaned but remain in the system
-- 4. SET DEFAULT: Use when child records should be reassigned to a default category
-- 5. NO ACTION: Similar to RESTRICT, but useful in complex transactions with deferred constraints 