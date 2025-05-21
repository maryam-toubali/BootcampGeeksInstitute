--ex1
SELECT name FROM language;

SELECT f.title, f.description, l.name 
FROM language l LEFT JOIN film f ON f.language_id = l.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO new_film (name) VALUES ('The Kid'), ('Lions'), ('Special Things');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,                           -- Unique ID for each review
    film_id INT NOT NULL REFERENCES new_film(id) ON DELETE CASCADE, -- Deletes review if film is deleted
    language_id INT NOT NULL REFERENCES language(language_id),       -- Links review to language
    title VARCHAR(255),
    score INT CHECK (score BETWEEN 1 AND 10),               -- Only values from 1 to 10 are valid
    review_text TEXT,                                       -- No length limit
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP         -- Auto set to current time
);

-- Insert reviews linked to existing films and languages
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Amazing story', 9, 'A beautifully directed film.'),
(2, 2, 'Mediocre at best', 5, 'Some good moments, but lacks consistency.');

DELETE FROM new_film WHERE id = 1;

SELECT * FROM new_film

--ex2
UPDATE film
SET language_id = 3  
WHERE title IN ('ACADEMY DINOSAUR', 'ALADDIN CALENDAR');

-- 2. Checking foreign keys in the customer table (for info purposes; no SQL needed)
-- The customer table has:
-- - store_id -> store(store_id)
-- - address_id -> address(address_id)
-- When inserting, both must exist.

-- CASCADE ensures that dependent constraints or objects are also dropped.
DROP TABLE IF EXISTS customer_review CASCADE;

SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

SELECT f.title, f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;


SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
  AND f.description ILIKE '%sumo wrestler%';

SELECT title
FROM film
WHERE length < 60 AND rating = 'R';

SELECT f.title
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

SELECT f.title, f.replacement_cost
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;


