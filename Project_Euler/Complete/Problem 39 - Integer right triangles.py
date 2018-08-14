import math

ps = [0]*1000;

for x in range(1,1000):
    for y in range(x,1000):
        current_c = math.sqrt((x**2)+(y**2))
##        print(x,y)
##        print(current_c)
        if(current_c.is_integer()):
            p = int(current_c) + x + y
            if(p<=1000):
                ps[p-1] = ps[p-1] + 1
                #print(ps)


print("Solution max is: ", ps.index(max(ps)))        
        
        
        
    
