# By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
#
# What is the 10 001st prime number?

import math

def is_prime(x):
    i = math.sqrt(x)
    while(x<i):
        if(x%2==0 or x%3==0 or)