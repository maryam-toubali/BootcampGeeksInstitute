


string = list(input("Enter a string: "))    # input() gives a string by default.
result = []
for char in string:
   if not result or char != result[-1]:          # not result (true) = empty list 
       result.append(char)
print(''.join(result))