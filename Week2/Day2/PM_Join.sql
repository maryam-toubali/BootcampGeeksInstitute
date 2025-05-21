-- Create the first table: companies
CREATE TABLE IF NOT EXISTS companies (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    industry VARCHAR(50),
    founded_date DATE
);

-- Create the second table: employees
CREATE TABLE IF NOT EXISTS employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary NUMERIC(10, 2),
    position VARCHAR(50),
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) -- This creates the relationship
);

-- Clear existing data (if any)
DELETE FROM employees;
DELETE FROM companies;

-- Reset sequences (using a more compatible approach)
-- Note: The exact syntax may vary by PostgreSQL version, you may need to adjust this
-- For PostgreSQL 10+ use:
SELECT setval(pg_get_serial_sequence('companies', 'company_id'), 1, false);
SELECT setval(pg_get_serial_sequence('employees', 'employee_id'), 1, false);

-- Insert data into companies table
INSERT INTO companies (company_name, location, industry, founded_date)
VALUES
    ('Tech Innovations', 'San Francisco', 'Technology', '2010-05-15'),
    ('Green Solutions', 'Portland', 'Environmental', '2015-03-22'),
    ('Global Finance', 'New York', 'Finance', '2005-11-08'),
    ('Health Plus', 'Boston', 'Healthcare', '2012-07-30'),
    ('Creative Media', 'Los Angeles', 'Entertainment', '2018-01-10'),
    ('Empty Corp', 'Chicago', 'Consulting', '2019-06-20'), -- This company will have no employees
    ('Ghost Inc', 'Seattle', 'Research', '2017-09-11');    -- This company will have no employees

-- Insert data into employees table
INSERT INTO employees (first_name, last_name, email, hire_date, salary, position, company_id)
VALUES
    ('John', 'Smith', 'john.smith@techinnovations.com', '2018-06-12', 85000.00, 'Software Engineer', 1),
    ('Sarah', 'Johnson', 'sarah.j@techinnovations.com', '2019-03-15', 92000.00, 'Product Manager', 1),
    ('Michael', 'Brown', 'michael.b@greensolutions.com', '2017-11-20', 78000.00, 'Environmental Specialist', 2),
    ('Emma', 'Davis', 'emma.d@greensolutions.com', '2020-01-10', 65000.00, 'Marketing Coordinator', 2),
    ('Robert', 'Wilson', 'robert.w@globalfinance.com', '2015-07-22', 110000.00, 'Financial Analyst', 3),
    ('Jessica', 'Lee', 'jessica.l@healthplus.com', '2019-08-05', 95000.00, 'Medical Researcher', 4),
    ('David', 'Miller', 'david.m@creativemedia.com', '2020-02-15', 72000.00, 'Graphic Designer', 5);

-- Add employees with no company (NULL company_id)
INSERT INTO employees (first_name, last_name, email, hire_date, salary, position, company_id)
VALUES
    ('Lisa', 'Taylor', 'lisa.t@freelancer.com', '2021-04-10', 88000.00, 'Freelance Developer', NULL),
    ('James', 'Anderson', 'james.a@consultant.com', '2016-09-18', 105000.00, 'Independent Consultant', NULL),
    ('Jennifer', 'Clark', 'jennifer.c@contractor.com', '2018-11-30', 82000.00, 'Contract Specialist', NULL);

-- CRUD Operations Examples

-- READ: Basic SELECT
SELECT * FROM companies;
SELECT * FROM employees;

-- READ: Select specific columns
SELECT employee_id, first_name, last_name, position, salary FROM employees ORDER BY employee_id ASC;

-- UPDATE: Update employee information
UPDATE employees SET salary = 945000.00 WHERE employee_id = 1;

-- DELETE: Remove an employee
DELETE FROM employees WHERE employee_id = 7;

-- ========== JOIN DEMONSTRATIONS ==========

-- Visual explanation of different JOIN types
/*
    COMPANY TABLE            EMPLOYEE TABLE
    +-----------+            +-----------+
    | Company 1 |<---matched-| Employee 1|
    +-----------+            +-----------+
    | Company 2 |<---matched-| Employee 2|
    +-----------+            +-----------+
    | Company 3 |            | Employee 3|<---no match
    +-----------+            +-----------+
    | Company 4 |<---matched-| Employee 4|
    +-----------+            +-----------+
    | Company 5 |            +-----------+
    +-----------+            
    | Company 6 |            
    +-----------+            
*/

-- INNER JOIN: Returns records with matching values in both tables
-- Only shows employees who have a company AND companies that have employees
SELECT 
    e.employee_id, 
    e.first_name, 
    e.last_name, 
    c.company_id, 
    c.company_name,
    'Records where company_id matches in both tables' AS join_explanation
FROM 
    employees e
INNER JOIN 
    companies c ON e.company_id = c.company_id
ORDER BY 
    e.employee_id;

-- LEFT JOIN: Returns all records from the left table and matched records from the right table
-- Shows ALL employees (including those with no company) and their company data if available
SELECT 
    e.employee_id, 
    e.first_name, 
    e.last_name, 
    c.company_id, 
    c.company_name,
    CASE 
        WHEN c.company_id IS NULL THEN 'Employee has no company (NULL company_id)'
        ELSE 'Employee has matching company'
    END AS join_explanation
FROM 
    employees e
LEFT JOIN 
    companies c ON e.company_id = c.company_id
ORDER BY 
    e.employee_id;

-- RIGHT JOIN: Returns all records from the right table and matched records from the left table
-- Shows ALL companies (including those with no employees) and their employees if available
SELECT 
    c.company_id, 
    c.company_name, 
    e.employee_id, 
    e.first_name, 
    e.last_name,
    CASE 
        WHEN e.employee_id IS NULL THEN 'Company has no employees'
        ELSE 'Company has matching employees'
    END AS join_explanation
FROM 
    employees e
RIGHT JOIN 
    companies c ON e.company_id = c.company_id
ORDER BY 
    c.company_id, e.employee_id;

-- FULL OUTER JOIN: Returns all records when there is a match in either the left or right table
-- Shows ALL employees and ALL companies, with matches connected where they exist
SELECT 
    c.company_id, 
    c.company_name, 
    e.employee_id, 
    e.first_name, 
    e.last_name,
    CASE 
        WHEN c.company_id IS NULL THEN 'Employee has no company'
        WHEN e.employee_id IS NULL THEN 'Company has no employees'
        ELSE 'Employee and company match'
    END AS join_explanation
FROM 
    employees e
FULL OUTER JOIN 
    companies c ON e.company_id = c.company_id
ORDER BY 
    COALESCE(c.company_id, 0), 
    COALESCE(e.employee_id, 0);

-- Finding companies with no employees
SELECT 
    c.company_id, 
    c.company_name, 
    'Company has no employees' AS status
FROM 
    companies c
LEFT JOIN 
    employees e ON c.company_id = e.company_id
WHERE 
    e.employee_id IS NULL;

-- Finding employees with no company
SELECT 
    e.employee_id, 
    e.first_name, 
    e.last_name, 
    'Employee has no company' AS status
FROM 
    employees e
LEFT JOIN 
    companies c ON e.company_id = c.company_id
WHERE 
    c.company_id IS NULL;

-- UNION: Combine results from two queries
-- Example: List of all company and employee names
SELECT company_name AS name, 'Company' AS type FROM companies
UNION
SELECT CONCAT(first_name, ' ', last_name) AS name, 'Employee' AS type FROM employees
ORDER BY name;

-- GROUP BY with HAVING: Find companies with more than 1 employee
SELECT 
    c.company_name, 
    COUNT(e.employee_id) AS employee_count
FROM 
    companies c
LEFT JOIN 
    employees e ON c.company_id = e.company_id
GROUP BY 
    c.company_name
HAVING 
    COUNT(e.employee_id) > 1;

-- Advanced query: Average salary by industry
SELECT 
    c.industry, 
    AVG(e.salary) AS average_salary
FROM 
    companies c
JOIN 
    employees e ON c.company_id = e.company_id
GROUP BY 
    c.industry
ORDER BY 
    average_salary DESC;

-- Advanced query: Employees with above average salary in their company
SELECT 
    e.first_name, 
    e.last_name, 
    e.salary, 
    c.company_name
FROM 
    employees e
JOIN 
    companies c ON e.company_id = c.company_id
WHERE 
    e.salary > (
        SELECT AVG(salary) 
        FROM employees e2 
        WHERE e2.company_id = e.company_id
    )
ORDER BY 
    c.company_name, e.salary DESC;
