CREATE OR REPLACE FUNCTION get_order_total(p_order_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10, 2);
BEGIN
    SELECT SUM(price * quantity) INTO total
    FROM items
    WHERE order_id = p_order_id;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_order_total(p_user_id INT, p_order_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10, 2);
BEGIN
    SELECT SUM(i.price * i.quantity) INTO total
    FROM items i
    JOIN product_orders o ON i.order_id = o.order_id
    WHERE o.order_id = p_order_id
      AND o.user_id = p_user_id;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;


