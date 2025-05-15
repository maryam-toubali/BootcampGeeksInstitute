from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("\n--- Restaurant Menu Editor ---")
        print("Choose an option:")
        print("(V) View an Item")
        print("(A) Add an Item")
        print("(D) Delete an Item")
        print("(U) Update an Item")
        print("(S) Show Menu")
        print("(Q) Quit")

        choice = input("Your choice: ").strip().upper()

        if choice == 'V':
            view_item()
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'Q':
            print("\nFinal Restaurant Menu:")
            show_restaurant_menu()
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please select a valid option.")


def add_item_to_menu():
    name = input("Enter item name to add: ").strip()
    try:
        price = int(input("Enter item price: "))
        item = MenuItem(name, price)
        item.save()
        print(f"'{name}' was added successfully.")
    except Exception as e:
        print("Error adding item:", e)


def remove_item_from_menu():
    name = input("Enter item name to delete: ").strip()
    item = MenuManager.get_by_name(name)
    if item:
        item.delete()
        print(f"'{name}' was deleted successfully.")
    else:
        print("Item not found. Nothing was deleted.")


def update_item_from_menu():
    old_name = input("Enter the name of the item to update: ").strip()
    item = MenuManager.get_by_name(old_name)
    if item:
        new_name = input("Enter the new name: ").strip()
        try:
            new_price = int(input("Enter the new price: "))
            item.update(new_name, new_price)
            print(f"'{old_name}' was updated successfully to '{new_name}' with price {new_price}.")
        except Exception as e:
            print("Error updating item:", e)
    else:
        print("Item not found. Cannot update.")


def view_item():
    name = input("Enter item name to view: ").strip()
    item = MenuManager.get_by_name(name)
    if item:
        print(f"Item found: {item.name}, Price: {item.price}")
    else:
        print("Item not found.")


def show_restaurant_menu():
    items = MenuManager.all_items()
    if not items:
        print("The menu is currently empty.")
    else:
        print("\n--- Restaurant Menu ---")
        for item in items:
            print(f"{item.name}: {item.price}€")


# Run the program:
if __name__ == "__main__":
    show_user_menu()
