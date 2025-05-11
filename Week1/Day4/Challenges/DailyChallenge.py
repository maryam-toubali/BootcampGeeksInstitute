#ch
# made with AI
import math
class Pagination:
    def __init__(self, items=None, page_size=10):
        # Initialize items as an empty list if None is provided
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0  # Tracks current page (0-based index)
        self.total_pages = math.ceil(len(self.items) / self.page_size)
    def get_visible_items(self):
        # Return only the items on the current page using slicing
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]
    def go_to_page(self, page_num):
        # Convert input to integer if needed
        try:
            page_num = int(page_num)
        except ValueError:
            raise ValueError("Page number must be an integer.")
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number must be between 1 and {self.total_pages}")
        self.current_idx = page_num - 1  # Convert to 0-based index
    def first_page(self):
        self.current_idx = 0
        return self  # Enables method chaining
    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self
    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self
    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self
    def __str__(self):
        # Return a user-friendly view of current page items
        return "\n".join(self.get_visible_items())

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)
print(p.get_visible_items())  
p.next_page()
print(p.get_visible_items())  
p.last_page()
print(p.get_visible_items()) 
p.go_to_page(10)
print(p.current_idx + 1)    
try:
    p.go_to_page(0)
except ValueError as e:
    print(e)  
