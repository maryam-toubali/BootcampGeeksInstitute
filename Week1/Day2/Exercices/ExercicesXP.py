#ex1
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
print(dict(zip(keys,values)))  # dic={} for i,j in zip(keys,values): dic[i]=j print(dic)


#ex2
family = {}
price = 0
while True:
   name = input('Enter your name or done to exit: ')
   if name.lower() == 'done' :
       break
   age = int(input('Enter your age: '))
   family[name] = age
for name ,age in family.items() :
   if age < 3 :
      cost = 0
   elif age >= 3 and age < 12 :
      cost = 10
   else:  
      cost = 15
   price += cost
   print(f'{name} cost: {cost}')       
print(f'You cost: {price}')

#ex3
brand = {
   'name': 'Zara', 
   'creation_date': 1975, 
   'creator_name': ['Amancio', 'Ortega', 'Gaona'], 
   'type_of_clothes': ['men', 'women', 'children', 'home'], 
   'international_competitors': ['Gap', 'H&M', 'Benetton'],
   'number_stores': 7000,
   'major_color' : { 
        'France': 'blue', 
        'Spain': 'red', 
        'US': ['pink', 'green']
   }
}
brand['number_stores'] = 2
print('the zara clients are :',  brand['type_of_clothes'])
brand['country_creation'] = 'Spain'
if 'international_competitors' in brand :
    brand['international_competitors'].append('Desigual')
del brand['creation_date']
print('The last international competitors is: ', brand['international_competitors'][-1])
print('The major clothes is: ', brand['major_color']['US'])
print('The length of my dictionary is: ', len(brand))
print('The Keys of my dictionary is: ', brand.keys())
more_on_zara = {
  'creation_date': 1975,
  'number_stores': 10000
}
brand.update(more_on_zara)
print("Updated number of stores:", brand['number_stores'])

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
        print("You guessed it wrong")
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
      if season.lower() == 'winter': 
          return random.randint(-10,9)
      elif season.lower() == 'spring':
          return random.randint(10,17)
      elif season.lower() == 'automn':
          return random.randint(18,24)  
      elif season.lower() == 'summer':
          return random.randint(25,40)    
      else:
          return "Invalid season"
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
    random_num = get_random_temp(season)
    print(f"The temperature right now is {random_num:.1f} degrees Celsius.")   #.1f → format the number as a float with 1 decimal place
    if random_num < 0: print('Brrr, it is freezing!')
    elif random_num < 16: print('Quite chilly! Don’t forget your coat')
    elif random_num < 23: print("Nice weather!")
    elif random_num < 33: print("Warm and sunny!")
    else: print("It's really hot!")
print(main())

#ex8
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]
def ask_qst():
    corr = 0                   
    incorr = 0                
    wrong_answers = []         
    for i in range(len(data)):  #
      print(f"Question: {data[i]['question']}\n")
      user_answer = input('Enter your answer: ')
      if user_answer.lower().strip() == data[i]['answer'].lower():   # strip() method removes any extra spaces
        corr += 1
      else:
        incorr += 1
        wrong_answers.append({
          "question": data[i]["question"],  
          "your_answer": user_answer,
          "correct_answer": data[i]["answer"]     
        })
    report_results(corr, incorr, wrong_answers)
def report_results(corr, incorr, wrong_answers):
    print("\nQuiz Results:")
    print(f"Correct answers: {corr}")
    print(f"Incorrect answers: {incorr}")
    if wrong_answers:
      print("\nQuestions you got wrong:")
      for item in wrong_answers:
        print(f"{item['question']}")
        print(f"Your answer: {item['your_answer']}")
        print(f"Correct answer: {item['correct_answer']}\n") 
      if incorr > 3:  
        print("You had more than 3 incorrect. Try again.")
        ask_qst()
ask_qst()
