#ch
class Farm:
    def __init__(self, farm_name):
        self.name = farm_name       
        self.animals = {}           
    def add_animal(self, animal_type, count=1):
        # If the animal already exists in our dictionary
        if animal_type in self.animals:
            # Increase its count by the specified amount
            self.animals[animal_type] += count
        else:
            # Otherwise, add it as a new entry with the specified count
            self.animals[animal_type] = count   
    def get_info(self):
        # Start with the farm name and header
        info = f"{self.name}'s farm\n\n"       
        # For each animal in our dictionary
        for animal, count in self.animals.items():
            # Add a line with the animal type and count
            info += f"{animal} : {count}\n"       
        # Add the closing line with extra spacing
        info += "\n    E-I-E-I-0!"       
        return info   
    def get_animal_types(self):
        # Return the keys from our animals dictionary, sorted alphabetically
        return sorted(self.animals.keys())  
    def get_short_info(self):
        # Get the sorted list of animal types
        animal_types = self.get_animal_types()       
        # Create a new list for the animal names, with plural forms if count > 1
        animals_list = []
        for animal in animal_types:
            # Add 's' to the animal name if there's more than one
            if self.animals[animal] > 1:
                animals_list.append(animal + "s")
            else:
                animals_list.append(animal)       
        # Join the animal list with commas and 'and' for the last item
        if len(animals_list) > 1:
            animals_text = ", ".join(animals_list[:-1]) + " and " + animals_list[-1]
        else:
            animals_text = animals_list[0] if animals_list else ""      
        # Return the formatted short info
        return f"{self.name}'s farm has {animals_text}."
# Test the code
sunnydale = Farm("SunnyDale")  # Changed farm name from McDonald to SunnyDale
sunnydale.add_animal('cow', 5)
sunnydale.add_animal('sheep')
sunnydale.add_animal('sheep')
sunnydale.add_animal('goat', 12)
print(sunnydale.get_info())
# Test the bonus methods
print("\nAnimal types:", sunnydale.get_animal_types())
print(sunnydale.get_short_info())