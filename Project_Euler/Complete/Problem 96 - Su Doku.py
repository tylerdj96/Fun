# By solving all fifty puzzles find the sum of the 3-digit numbers found in the top left corner of each solution grid; for example, 483 is the 3-digit number found in the top left corner of the solution grid above.

def ingest_puzzle(file_name, puzzle_number):
    file = open(file_name, "rb")
    file.seek(8*puzzle_number+(90*(puzzle_number-1)), 1)
    mystr = file.read(90)
    return mystr.decode("utf-8")

print(ingest_puzzle("C:/Users/r633478/Project_Euler/Project_Euler/Provided Files/problem96_sudoku.txt", 3))