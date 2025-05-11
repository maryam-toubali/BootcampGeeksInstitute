#ex1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
 #Step 1: Create cat objects
cat1 = Cat("miao", 1)
cat2 = Cat("rix", 2)
cat3 = Cat("misho", 3)
 #Step 2: Create a function to find the oldest cat
def find_oldest_cat(cat1, cat2, cat3):
    return max([cat1,cat2,cat3], key= lambda cat : cat.age )    
 #Step 3: Print the oldest cat's details
oldCat = find_oldest_cat(cat1,cat2,cat3)
print(f"The oldest cat name: {oldCat.name}, age: {oldCat.age}")

#ex2
class Dog: 
    def __init__ (self, name, height) :
         self.name = name
         self.height = height
    def bark(self) :
        print(f'{self.name}goes woof!')       
    def jump(self) :
        x = self.height * 2 
        print(f'{self.name} jumps {x} cm high!')
davids_dog = Dog("Rix", 20) 
sarahs_dog = Dog("Staf", 90)
print(f"name: {davids_dog.name}, height: {davids_dog.height}")
print(f"name: {sarahs_dog.name}, height: {sarahs_dog.height}")
davids_dog.bark()
sarahs_dog.jump()
big_dog = max([davids_dog, sarahs_dog] , key = lambda h : h.height)
print(f'the tall dog is {big_dog.name}')

#ex3
class Song : 
      __init__ (self, lyrics):
        self.lyrecs = lyrecs
      def sing_me_a_song():
            for i in self.lyrics:
               print(i)
stairway = Song(["There’s a lady who's sure", "all that glitters is gold", "and she’s buying a stairway to heaven"])             
stairway.sing_me_a_song()

#ex4
class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []  
        self.groups = {}   
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} has been added to the zoo.")
        else:
            print(f"Animal {new_animal} is already in the zoo.")
    def get_animals(self):
        print("Current animals in the zoo:")
        for animal in self.animals:
            print(animal)
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold.")
        else:
            print(f"Animal {animal_sold} is not in the zoo.")
    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        grouped = {}
        for animal in sorted_animals:
            first_letter = animal[0].upper()  
            if first_letter not in grouped:
                grouped[first_letter] = []
            grouped[first_letter].append(animal)
        self.groups = grouped  # Save to instance variable
    def get_groups(self):
        if not self.groups:
            self.sort_animals()  # Make sure animals are sorted before getting groups
        print("Animal groups by first letter:")
        for letter, group in self.groups.items():
            print(f"{letter}: {group}")
ramat_gan_safari = Zoo("Ramat Gan Safari")
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.get_animals()
ramat_gan_safari.sell_animal("Bear")
ramat_gan_safari.get_animals()
ramat_gan_safari.sort_animals()
ramat_gan_safari.get_groups()
