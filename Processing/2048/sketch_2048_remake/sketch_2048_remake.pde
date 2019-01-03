/**
 * Array. 
 * 
 * An array is a list of data. Each piece of data in an array 
 * is identified by an index number representing its position in 
 * the array. Arrays are zero based, which means that the first 
 * element in the array is [0], the second element is [1], and so on. 
 * In this example, an array named "coswave" is created and
 * filled with the cosine values. This data is displayed three 
 * separate ways on the screen.  
 */


public class square 
{ 
    // Instance Variables 
    int xCoord; 
    int yCoord; 
    int val;  
  
    // Constructor Declaration of Class 
    public square(int xCoord, int yCoord, int val) 
    { 
        this.xCoord = xCoord; 
        this.yCoord = yCoord; 
        this.val = val; 
    } 

    public int getxCoord() 
    { 
        return xCoord; 
    } 
    
    public int getyCoord() 
    { 
        return yCoord; 
    } 
    
    public int getVal() 
    { 
        return val; 
    } 
  
} 

square[][] gameBoard = new square[4][4];

for(int i=0; i<gameBoard.length; i++){
  for(int j=0; j<gameBoard[i].length; j++){
      gameBoard[i][j]= new square(i, j, 0);
  }
}

void setup() {
  size(800, 800);
}
 
void draw() {
  background(255);

  text("red = mouse pos X, blue = the map result from 150 to 250", 16, 16); 
  
  fill(210,196,180);
  
  int boardWidth = width/4;
  int boardHeight = height/4;
  
  rect(boardWidth, boardHeight, 400, 400);
}
