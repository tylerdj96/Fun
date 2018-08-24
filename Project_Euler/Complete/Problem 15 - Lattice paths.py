# Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
#
#
# How many such routes are there through a 20×20 grid?


class node(object):
    neighbor1 = None
    neighbor2 = None
    value = None
    def __init__(self, val, n1, n2):
        self.value = val
        self.neighbor1 = n1
        self.neighbor2 = n2



def create_tree(n):
    tree = []
    for i in range(1, (n+2)):
        for j in range(1, (n+2)):
            
