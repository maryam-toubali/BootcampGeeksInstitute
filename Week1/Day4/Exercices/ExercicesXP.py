#ex1
class Pets():
    def __init__(self, animals):
        self.animals = animals  
    def walk(self):
        for animal in self.animals:
            # Polymorphism in action: same method call, different behaviors based on the actual object type
            print(animal.walk())
class Cat():
    # Class attribute shared by all instances of the class and its subclasses
    is_lazy = True  # Demonstrates a class attribute vs instance attribute
    def __init__(self, name, age):
        self.name = name  
        self.age = age   
    def walk(self):
        return f'{self.name} is just walking around'
class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'  
    # Note: The walk() method is inherited from the Cat class
class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
class Siamese(Cat):
    def __init__(self, name, age, color_pattern="seal point"):
        super().__init__(name, age)
        self.color_pattern = color_pattern  
    def sing(self, sounds):
        return f'{sounds} (but louder and more persistent)'   
    def walk(self):
        # Override the walk method to give Siamese cats a unique walking style
        return f'{self.name} is walking gracefully with {self.color_pattern} tail held high'
bengal_cat = Bengal("Leo", 3)
chartreux_cat = Chartreux("Luna", 5) 
siamese_cat = Siamese("Milo", 2, "chocolate point")
all_cats = [bengal_cat, chartreux_cat, siamese_cat]
sara_pets = Pets(all_cats)
print("Taking all cats for a walk:")
sara_pets.walk()
print("\nMaking cats sing:")
print(f"{bengal_cat.name} sings: {bengal_cat.sing('Meow meow')}")
print(f"{chartreux_cat.name} sings: {chartreux_cat.sing('Purr purr')}")
print(f"{siamese_cat.name} sings: {siamese_cat.sing('Meeeeooow')}")
print(f"\n{siamese_cat.name}'s color pattern is {siamese_cat.color_pattern}")

#ex2
class Dog:
    def __init__(self, name, age, weight):
        self.name = name    
        self.age = age       
        self.weight = weight    
    def bark(self):
        return f"{self.name} is barking"   
    def run_speed(self):
        speed = self.weight / self.age * 10
        return speed 
    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        if my_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"The fight between {self.name} and {other_dog.name} was a draw"
dog1 = Dog("Rex", 5, 30.5)  
dog2 = Dog("Buddy", 3, 22.0)  
dog3 = Dog("Max", 7, 35.2) 
print("\n--- Barking Demo ---")
print(dog1.bark()) 
print(dog2.bark())  
print(dog3.bark()) 
print("\n--- Running Speed Demo ---")
print(f"{dog1.name}'s running speed: {dog1.run_speed():.2f}")
print(f"{dog2.name}'s running speed: {dog2.run_speed():.2f}")
print(f"{dog3.name}'s running speed: {dog3.run_speed():.2f}")
print("\n--- Fighting Demo ---")
print(dog1.fight(dog2))  
print(dog2.fight(dog3)) 
print(dog3.fight(dog1)) 
print("\n--- Self-Fighting Demo (should be draws) ---")
print(dog1.fight(dog1)) 
print("\n--- Fighting Power Analysis ---")
dog1_power = dog1.run_speed() * dog1.weight
dog2_power = dog2.run_speed() * dog2.weight
dog3_power = dog3.run_speed() * dog3.weight
print(f"{dog1.name}'s fighting power: {dog1_power:.2f}")
print(f"{dog2.name}'s fighting power: {dog2_power:.2f}")
print(f"{dog3.name}'s fighting power: {dog3_power:.2f}")

#ex3
import random
class Dog:
    # Constructor: initializes the Dog object's attributes
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    # Method: behavior shared by all Dog objects
    def bark(self):
        return f"{self.name} is barking"
    # Method: encapsulates how run speed is calculated
    def run_speed(self):
        return self.weight / self.age * 10
    # Method: simulates a fight between two Dog objects
    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if my_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"The fight between {self.name} and {other_dog.name} was a draw"
class PetDog(Dog):
    # Inheritance: PetDog extends Dog and reuses its constructor using super()
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False
    # Method overriding and state change: trains the dog and sets trained to True
    def train(self):
        print(self.bark())  # Inherited method
        self.trained = True
    # Polymorphism: accepts a variable number of arguments to simulate play behavior
    def play(self, *args):
        all_dogs = [self.name]
        for dog in args:
            if isinstance(dog, Dog):
                all_dogs.append(dog.name)
            else:
                all_dogs.append(str(dog))
        print(f"{', '.join(all_dogs)} all play together")
    # Conditional behavior: performs a trick only if trained
    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", 
                      "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} doesn't know any tricks yet")
# Demo usage
print("=== Creating Pet Dog Instances ===")
my_dog = PetDog("Fido", 2, 10)
friends_dog = PetDog("Buddy", 3, 15)
another_dog = PetDog("Max", 4, 12)
print("\n=== Training Demo ===")
print(f"Is {my_dog.name} trained? {my_dog.trained}")
my_dog.train()
print(f"After training, is {my_dog.name} trained? {my_dog.trained}")
print("\n=== Play Demo ===")
my_dog.play("Rex", "Spot")
my_dog.play(friends_dog, another_dog)
my_dog.play("Rex", friends_dog)
print("\n=== Tricks Demo ===")
print("Before training:")
friends_dog.do_a_trick()
print("\nTraining the dog:")
friends_dog.train()
print("\nAfter training:")
friends_dog.do_a_trick()
friends_dog.do_a_trick()
friends_dog.do_a_trick()
print("\n=== Inherited Methods Demo ===")
print(f"{my_dog.name}'s running speed: {my_dog.run_speed():.2f}")
print(my_dog.fight(friends_dog))

#ex4
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""  # Will be set by the Family class
    def is_18(self):
        return self.age >= 18
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []  # List of Person objects

    def born(self, first_name, age):
        # Create a new person and assign the family last name
        new_member = Person(first_name, age)
        new_member.last_name = self.last_name
        self.members.append(new_member)

    def check_majority(self, first_name):
        # Search for the person by first name
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return
        print(f"No family member named {first_name} was found.")

    def family_presentation(self):
        print(f"Family {self.last_name}")
        for member in self.members:
            print(f"{member.first_name}, {member.age} years old")

