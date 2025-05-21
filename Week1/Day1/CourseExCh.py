#
x=1
while x < 11:
       print(x)
       x += 1

#
a_tuple = (10, 20, 30, 40)
a,b,c,d = a_tuple
print(d)

#
list1 = [5, 10, 15, 20, 25, 50, 20]
if 20 in list1 :
    index = list1.index(20)
    list1[index] = 200
    print(list1)
else:
    print("You don't have the 20 number in your list")
        
#
num = int(input('Give me please a number between 1 and 100: '))
if num%3==0 and num%5==0 :
    print('FizzBuzz')
elif num%3==0 :
    print('Fizz')
elif num%5==0 :
    print('Buzz')
else :
    print('Not a multiple of 3 or 5')
    
#
name= input("What is your name? ")
if len(name)<5:
    print('You have a short name :)')
else:
    print("Your name is not short.")
    
#
age = input("How old are you? ")
print(f"You are {age} years old") 

#
age = int(input("Your age: "))
yt100 = 100 - age
print(f"You will turn 100 in {yt100} years")

#
Name= 'Alice'
Age= 30
City= 'New York' 
print(f"Hello, {Name}! You are {Age} years old and live in {City}.")
print("Hello, {}! You are {} years old and live in {}.".format(Name,Age,City))