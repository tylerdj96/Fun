# The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
#
# Find the sum of all the primes below two million.

import math
import time

def is_prime(x):
    if(x<=1):
        return False
    elif(x<=3):
        return True
    elif(x%2==0 or x%3==0):
        return False
    i = 5
    while(i<=math.sqrt(x)):
        if(x%i==0 or x%(i+2)==0):
            return False
        i += 6
    return True

## True indicates a prime so all values initially set to False
def Eratosthenes(x):
    marked_nums = ['false']*(x-1)
    p = 0
    while(p<=(x)):
        # marked_nums[0] = 'true'
        j = p + 2
        for i in range(p, len(marked_nums), j):
            marked_nums[i]='true'
        if('false' in marked_nums):
            p = marked_nums.index('false')
            if(p==x-2):
                return True
        else:
            return False

start_time = time.time()
running_sum = 0

for i in range(1,2000000):
     if(is_prime(i)):
         running_sum += i

print(running_sum)
print("--- %s seconds with trial division ---" % (time.time() - start_time))


start_time = time.time()
running_sum = 0

for i in range(1,2000000):
     if(Eratosthenes(i)):
         running_sum += i

print(running_sum)
print("--- %s seconds with Eratosthenes ---" % (time.time() - start_time))