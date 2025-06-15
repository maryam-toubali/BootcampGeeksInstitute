import datetime

# Function to check if a year is a leap year
def is_leap_year(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

# Function to create the cake
def display_cake(age):
    candles = age % 10
    candle_str = "i" * candles

    print("      ___" + candle_str + "___")
    print("     |:H:a:p:p:y:|")
    print("   __|___________|__")
    print("  |^^^^^^^^^^^^^^^^^|")
    print("  |:B:i:r:t:h:d:a:y:|")
    print("  |                 |")
    print("  ~~~~~~~~~~~~~~~~~~~")

# Main function
def main():
    birthdate_str = input("Enter your birthdate (DD/MM/YYYY): ")

    try:
        birthdate = datetime.datetime.strptime(birthdate_str, "%d/%m/%Y")
        today = datetime.date.today()

        # Calculate age
        age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
        print(f"\nYou are {age} years old.\n")

        # Display cake(s)
        if is_leap_year(birthdate.year):
            print("Leap year detected! Two cakes for you!\n")
            display_cake(age)
            display_cake(age)
        else:
            display_cake(age)

    except ValueError:
        print("Invalid date format. Please enter as DD/MM/YYYY.")

# Run the program
if __name__ == "__main__":
    main()
