#Part1:
import psycopg2

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def save(self):
        try:
            connection = psycopg2.connect(
                dbname="menu",
                user="postgres",
                password="admin",
                host="localhost"
            )
            cursor = connection.cursor()
            insert_query = "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)"
            cursor.execute(insert_query, (self.name, self.price))
            connection.commit()
            cursor.close()
            connection.close()
        except Exception as e:
            print(f"An error occurred: {e}")

    def delete(self):
        try:
            connection = psycopg2.connect(
                dbname="menu",
                user="postgres",
                password="admin",
                host="localhost"
            )
            cursor = connection.cursor()
            delete_query = "DELETE FROM Menu_Items WHERE item_name = %s"
            cursor.execute(delete_query, (self.name,))
            connection.commit()
            cursor.close()
            connection.close()
        except Exception as e:
            print(f"An error occurred: {e}")

    def update(self, new_name, new_price):
        try:
            connection = psycopg2.connect(
                dbname="menu",
                user="postgres",
                password="admin",
                host="localhost"
            )
            cursor = connection.cursor()
            update_query = "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s"
            cursor.execute(update_query, (new_name, new_price, self.name))
            connection.commit()
            cursor.close()
            connection.close()
            self.name = new_name
            self.price = new_price
        except Exception as e:
            print(f"An error occurred: {e}")

        