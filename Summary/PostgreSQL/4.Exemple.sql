-- STEP 1: Create a table of users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  age INT,
  active BOOLEAN DEFAULT true
);

-- STEP 2: Create a related table of orders
-- Each order belongs to a user (user_id is a foreign key)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount NUMERIC
);

-- STEP 3: Insert some users
INSERT INTO users (name, age) VALUES
  ('Sara', 28),
  ('Ali', 34),
  ('Nora', 22);

-- STEP 4: Insert some orders connected to those users
INSERT INTO orders (user_id, amount) VALUES
  (1, 100.50),
  (2, 200.00),
  (1, 75.25); -- Sara made 2 orders

-- STEP 5: Read data — Get all users older than 25, sorted by name
SELECT * FROM users
WHERE age > 25
ORDER BY name ASC;

-- STEP 6: JOIN — Show each user's name and their order amount
SELECT users.name, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id;

-- STEP 7: Add an index to speed up searches by name
CREATE INDEX idx_users_name ON users(name);

-- STEP 8: Use EXPLAIN to see how PostgreSQL plans the query
EXPLAIN SELECT * FROM users WHERE name = 'Ali';

-- STEP 9: Create a function to calculate a 10% discount
CREATE FUNCTION get_discount(price NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  RETURN price * 0.9;
END;
$$ LANGUAGE plpgsql;

-- Use the function in a query
SELECT id, get_discount(amount) AS discounted_price FROM orders;

-- STEP 10: Create a view to simplify access to active users
CREATE VIEW active_users AS
SELECT * FROM users WHERE active = true;

-- BONUS: Create a trigger that logs user deletions
CREATE TABLE deleted_users_log (
  user_id INT,
  deleted_at TIMESTAMP
);

CREATE FUNCTION log_delete() RETURNS trigger AS $$
BEGIN
  INSERT INTO deleted_users_log (user_id, deleted_at)
  VALUES (OLD.id, NOW());
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_deletion
AFTER DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION log_delete();

-- Test the trigger
DELETE FROM users WHERE name = 'Nora';
