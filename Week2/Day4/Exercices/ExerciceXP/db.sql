--ex1:
--Part1:
CREATE table Menu_Items (
item_id SERIAL PRIMARY KEY,
item_name VARCHAR(30) NOT NULL,
item_price SMALLINT DEFAULT 0
)

SELECT * FROM Menu_Items;

