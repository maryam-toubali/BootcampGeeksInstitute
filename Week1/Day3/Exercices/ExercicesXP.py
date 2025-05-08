#ex1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
cat1 = Cat("Milo", 5)
cat2 = Cat("Whiskers", 7)
cat3 = Cat("Luna", 3)
def find_oldest_cat(cat1, cat2, cat3):
    return max([cat1, cat2, cat3], key=lambda cat: cat.age)
oldest = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")

#ex2
