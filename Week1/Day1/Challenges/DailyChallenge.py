#ch1
number = int(input("Enter a number: "))   
length = int(input("Enter the length: "))
multiples = []
for i in range(1,length+1) 
    multiples.append(number * i)
print(multiples)

#ch2
string = list(input("Enter a string: "))    # input() gives a string by default.
result = []
for char in string:
   if not result or char != result[-1]:          # not result (true) = empty list 
       result.append(char)
print(''.join(result))
