//Defense of a Kingdom
//https://www.spoj.com/problems/DEFKIN/

/**
 * Theodore implements a new strategy game “Defense of a Kingdom”. 
 * On each level a player defends the Kingdom that is represented by a rectangular grid of cells. 
 * The player builds crossbow towers in some cells of the grid. 
 * The tower defends all the cells in the same row and the same column. 
 * No two towers share a row or a column.

The penalty of the position is the number of cells in the largest undefended rectangle. For example, the position shown on the picture has penalty 12.
Help Theodore write a program that calculates the penalty of the given position.

Input

each case consists of a line with 2 integer numbers and an 2D array: 
    w — width of the grid,  - 15
    h — height of the grid - 8
    [x,y] — x index, yindex crossbow towers - [[3,8],[11,2],[8,6]]


Output - 12

 */

//Approach

/**
 * Understanding the Defense Mechanism

    Each tower covers an entire row and an entire column.
    The largest undefended rectangle is formed between the gaps of towers.

 * Key Observations

    The largest gap between consecutive x-coordinates (columns) of towers determines the maximum width of the undefended rectangle.
    The largest gap between consecutive y-coordinates (rows) of towers determines the maximum height of the undefended rectangle.

 * Steps to Solve Efficiently (O(n log n))

    Read input values.
    Store tower coordinates in separate arrays for x and y.
    Add boundary values (0 and width+1, 0 and height+1) to handle edge cases.
    Sort both arrays.
    Find the maximum gap in both x and y directions.
    Multiply these max gaps to get the largest undefended rectangle.
 */

function largestUndefendedArea(w, h, towers) {
  if (towers.length === 0) return w * h; // No towers, entire grid is undefended.

  let xCoords = [0, w + 1];
  let yCoords = [0, h + 1];

  for (let [x, y] of towers) {
    xCoords.push(x);
    yCoords.push(y);
  }

  // Sort the coordinates to find the max gap
  xCoords.sort((a, b) => a - b);
  yCoords.sort((a, b) => a - b);

  let maxWidth = 0,
    maxHeight = 0;

  // Find maximum gap between consecutive x-coordinates
  for (let i = 1; i < xCoords.length; i++) {
    maxWidth = Math.max(maxWidth, xCoords[i] - xCoords[i - 1] - 1);
  }

  // Find maximum gap between consecutive y-coordinates
  for (let i = 1; i < yCoords.length; i++) {
    maxHeight = Math.max(maxHeight, yCoords[i] - yCoords[i - 1] - 1);
  }

  return maxWidth * maxHeight;
}

largestUndefendedArea(15, 8, [
  [3, 8],
  [11, 2],
  [8, 6],
]);
