#ex1
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
print(dict(zip(keys,values)))  # dic={} for i,j in zip(keys,values): dic[i]=j print(dic)


#ex2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0
for name, age in family.items():
    if age < 3: pay = 0
    elif age <= 12: pay = 10
    else: pay = 15
    print(f"{name} has to pay ${cost}")
    total_cost += pay
print("Total cost:", total_cost)


#ex3
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes":["men","women","children","home"],
    "international_competitors": ["Gap","H&M","Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France":"blue",
        "Spain":"red",
        "US": ["pink","green"]
    }
}
brand["number_stores"] = 2
print("Zara's clients are:", brand["type_of_clothes"])
brand["country_creation"] = "Spain"
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
del brand["creation_date"]
print("Last competitor:", brand["international_competitors"][-1])
print("US colors:", brand["major_color"]["US"])
print("Number of key-value pairs:", len(brand))
print("Keys:", brand.keys())
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}
brand.update(more_on_zara)
print("Updated number of stores:", brand["number_stores"])

#ex4
def describe_city(city,country="Morocco"):
    print(f"{city} is in {country}")
describe_city("Casablanca")

#ex5
import random
def compare(num):
    rand_num = random.randint(1, 100)
    if num == rand_num:
        print("Numbers match.")
    else:
        print(f"Your number: {num}, Random number: {rand_num}")
compare(10)

#ex6
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'")
make_shirt()
make_shirt(size="medium")
make_shirt(size="small", text="Keep Coding")
make_shirt(text="Safe", size="S")

#ex7
import random
def get_random_temp(season):
    if season == "winter":
        return random.uniform(-10,16)
    elif season == "spring":
        return random.uniform(10,22)
    elif season == "summer":
        return random.uniform(24,40)
    else:
        return random.uniform(5,20)
def main():
    month = int(input("Enter the month number (1-12): "))
    if month in [12,1,2]:
        season = "winter"
    elif month in [3,4,5]:
        season = "spring"
    elif month in [6,7,8]:
        season = "summer"
    else:
        season = "autumn"
    temp = get_random_temp(season)
    print(f"The temperature right now is {temp:.1f} degrees Celsius.")
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today")
    elif temp < 16:
        print("Quite chilly! Don’t forget your coat")
    elif temp < 23:
        print("Nice weather!")
    elif temp < 33:
        print("Warm and sunny!")
    else:
        print("It's really hot!")

#ex8
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]
def star_wars_quiz():
    correct = 0
    wrong = 0
    wrong_answers = []
    for q in data:
        ans = input(q["question"] + " ").strip()
        if ans.lower() == q["answer"].lower():
            correct += 1
        else:
            wrong += 1
            wrong_answers.append({"question": q["question"], "your_answer": ans, "correct": q["answer"]})
    print(f"Correct: {correct}, Incorrect: {wrong}")
    if wrong > 3:
        print("You got more than 3 wrong. Try again!")
    for wa in wrong_answers:
        print(f"Question: {wa['question']}\nYour answer: {wa['your_answer']}\nCorrect answer: {wa['correct']}\n")

