import random
class Game:
    def get_user_item(self):
        while True:
            user_input = input("Select (r)ock, (p)aper, or (s)cissors: ").lower()
            if user_input in ['r', 'p', 's']:
                return user_input
            else:
                print("Invalid input. Please try again.")
    def get_computer_item(self):
        return random.choice(['r', 'p', 's'])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == "r" and computer_item == "s") or (user_item == "p" and computer_item == "r") or (user_item == "s" and computer_item == "p"):
            return "win"
        else:
            return "loss"
    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        # Get the result
        result = self.get_game_result(user_item, computer_item)
        # Mapping for display
        item_names = {'r': 'rock', 'p': 'paper', 's': 'scissors'}
        print(f"You chose: {item_names[user_item]}. The computer chose: {item_names[computer_item]}. Result: {result}")
        return result
