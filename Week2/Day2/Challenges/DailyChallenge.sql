CREATE TABLE FirstTab (
    id INTEGER,
    name VARCHAR(10)
);

INSERT INTO FirstTab VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

CREATE TABLE SecondTab (
    id INTEGER
);

INSERT INTO SecondTab VALUES
(5),
(NULL);

SELECT * FROM FirstTab;

SELECT * FROM SecondTab;

-- Output: 0 (NOT IN with NULL causes the condition to return UNKNOWN for all rows)
SELECT COUNT(*) AS q1_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NULL);

-- Output: 2 (IDs 6 and 7 match; NULL is ignored)
SELECT COUNT(*) AS q2_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id = 5);

-- Output: 0 (Because NULL is in the subquery result, all comparisons become UNKNOWN)
SELECT COUNT(*) AS q3_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab);

-- Output: 2 (IDs 6 and 7 match; NULL is ignored)
SELECT COUNT(*) AS q4_result
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NOT NULL);
