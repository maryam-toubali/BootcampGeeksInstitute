--ex1

SELECT * 
FROM items
ORDER BY price;

SELECT * 
FROM items
WHERE price >= 80
ORDER BY price DESC;

SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

SELECT last_name
FROM customers
ORDER BY last_name DESC;

--ex2

SELECT * FROM customer

SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM customer; -- or: first_name || ' ' || last_name

SELECT DISTINCT create_date FROM customer;

SELECT * FROM customer ORDER BY first_name DESC;

SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

SELECT address, phone
FROM address
WHERE district = 'Texas';

SELECT * FROM film
WHERE film_id IN (15, 150);

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'The kid';

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title ILIKE 'Th%';

SELECT film_id, title, rental_rate
FROM film
ORDER BY rental_rate ASC
LIMIT 10;

SELECT film_id, title, rental_rate
FROM film
ORDER BY rental_rate ASC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

SELECT *
FROM film
WHERE film_id NOT IN (
  SELECT DISTINCT film_id FROM inventory
);

SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;

SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id;




