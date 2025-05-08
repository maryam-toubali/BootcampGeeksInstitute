import random
def compare(num):
    rand_num = random.randint(1, 100)
    if num == rand_num:
        print("Numbers match.")
    else:
        print(f"Your number: {num}, Random number: {rand_num}")
compare(50)
