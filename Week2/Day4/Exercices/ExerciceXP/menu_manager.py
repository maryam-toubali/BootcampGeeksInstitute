from menu_item import MenuItem
import psycopg2

class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        conn = psycopg2.connect(database="menu", user="postgres", password="admin", host="localhost", port="5432")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Menu_Items WHERE item_name = %s", (name,))
        result = cursor.fetchone()
        conn.close()
        if result:
            return MenuItem(result[1], result[2])
        else:
            return None

    @classmethod
    def all_items(cls):
        conn = psycopg2.connect(database="menu", user="postgres", password="admin", host="localhost", port="5432")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Menu_Items")
        rows = cursor.fetchall()
        conn.close()
        return [MenuItem(row[1], row[2]) for row in rows]

#Safe test area:
if __name__ == "__main__":
    # Create item and save
    item = MenuItem('Burger', 35)
    item.save()
    print("Saved item.")

    # Update item
    item.update('Veggie Burger', 37)
    print("Updated item.")

    # Get item by name
    item_found = MenuManager.get_by_name('Veggie Burger')
    print("Found:", item_found.name if item_found else "Not found")

    # Show all
    items = MenuManager.all_items()
    for i in items:
        print(i.name, i.price)

    # Delete item
    item.delete()
    print("Deleted item.")
