#ex1
print("Hello world\n" * 4)    # print(.. , end="") to not add ligne /n in the end

#ex2
result = (99**3) * 8
print(f"the result of: (99^3)*8 is: {result}")

#ex3
myname="maryam"
username=input("Your name: ")
if myname==username.lower() :
    print('We have the same name 😊')
else :
    print('You have a great name 😊')
    
#ex4
height= float(input('Plase input your height in centimeters: '))
if height > 145 :
    print('You are tall enough to ride.')
else : 
    print ('You need to grow some more to ride')
    
#ex5
my_fav_numbers = {0, 27, 100, 98}
friend_fav_numbers = {247, 160, 48}
my_fav_numbers.update([20,8])    # or two add()
my_fav_numbers = list(my_fav_numbers)
my_fav_numbers.pop()
my_fav_numbers = set(my_fav_numbers)
print("Remove last item: ", my_fav_numbers)
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)  # or set1|set2 like + for the other sequences
print(f'Our favorit numbers: {our_fav_numbers}')

#ex6
 #Given a tuple which value is integers, is it possible to add more integers to the tuple?
 #No we can't
 #Tuples rules: not changeable
 #AttributeError: 'tuple' object has no attribute 'insert'
ituple = (3,45,4345,5)
ituple=ituple.insert(4,8)
ituple=ituple.append(9)
print(ituple)

#ex7
basket = ["Banana", "Apples", "Oranges", "Blueberries"];
basket.remove("Banana")
basket.pop()
basket.append('Kiwi')
basket.insert(0,'Apples')
print("List: ",basket)
print('Number of Apples is :',basket.count('Apples'))
basket.clear()
print("Empty the list: ",basket)

#ex8
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
finished_sandwiches = []    # or .. = list()
while 'Pastrami sandwich' in sandwich_orders :
    sandwich_orders.remove('Pastrami sandwich')
for sandwich in sandwich_orders :     
    finished_sandwiches.append(sandwich)
    print(f"I made your",sandwich.lower()) 
print(f"Exist sandwiches: {finished_sandwiches}\nSandwich orders: {sandwich_orders}")






