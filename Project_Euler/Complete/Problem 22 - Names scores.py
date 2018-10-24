import string

file = open('C:/Users/r633478/Project_Euler/Project_Euler/Provided Files/problem22_names.txt');
names = file.read();
names = names.split(',')
names = list(map(lambda x: x.replace('"', ''), names))
names.sort()

letters = string.ascii_lowercase
lettersDict = {}

for x in range(0, len(letters)):
    lettersDict[letters[x]]=x+1

sum = 0

for x in range(0, len(names)):
    running_sum = 0
    for letter in names[x].lower():
        running_sum += lettersDict[letter]
    sum += running_sum * (x+1)

print(sum)
