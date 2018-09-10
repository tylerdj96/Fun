def factor(n):
    x = 1
    factors = []
    while(n>=x):
        if(n%x==0):
            factors.append(x)
        x += 1
    return factors

def prime_factor(n):
    a = []
    while n%2 == 0:
        a.append(2)
        n/=2
    f=3
    while f * f <= n:
        if (n % f == 0):
            a.append(f)
            n /= f
        else:
            f += 2
    if(n!=1)\
            : a.append(n)
    #Only odd number is possible
    return a