//LC-54 54. Spiral Matrix
//Given an m x n matrix, return all elements of the matrix in spiral order.

//Approach-1

var spiralOrder = function (matrix) {
  let ans = [];
  let count = 0;
  let m = matrix.length;
  let n = matrix[0].length;
  let total = m * n;

  let startingRow = 0;
  let endingCol = n - 1;
  let endingRow = m - 1;
  let staringCol = 0;

  while (count < total) {
    // printing first row
    for (let i = startingRow; i <= endingCol && count < total; i++) {
      ans.push(matrix[startingRow][i]);
      count++;
    }
    startingRow++;
    //printing last column

    for (let i = startingRow; i <= endingRow && count < total; i++) {
      ans.push(matrix[i][endingCol]);
      count++;
    }
    endingCol--;
    // Printing last row
    for (let i = endingCol; i >= staringCol && count < total; i--) {
      //i=endingCol
      ans.push(matrix[endingRow][i]);
      count++;
    }
    endingRow--;

    //printing first column
    for (let i = endingRow; i >= startingRow && count < total; i--) {
      ans.push(matrix[i][staringCol]);
      count++;
    }
    staringCol++;
  }

  return ans;
};

function spiralOrder(matrix) {
  // Handle edge cases: empty matrix
  if (!matrix.length || !matrix[0].length) return [];

  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  // Define boundaries
  let top = 0,
    bottom = rows - 1;
  let left = 0,
    right = cols - 1;
  // Direction: 0 (right), 1 (down), 2 (left), 3 (up)
  let direction = 0;

  // Continue until boundaries cross
  while (top <= bottom && left <= right) {
    if (direction === 0) {
      // Move right: Traverse top row from left to right
      for (let col = left; col <= right; col++) {
        result.push(matrix[top][col]);
      }
      top++; // Shrink top boundary
    } else if (direction === 1) {
      // Move down: Traverse right column from top to bottom
      for (let row = top; row <= bottom; row++) {
        result.push(matrix[row][right]);
      }
      right--; // Shrink right boundary
    } else if (direction === 2) {
      // Move left: Traverse bottom row from right to left
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--; // Shrink bottom boundary
    } else if (direction === 3) {
      // Move up: Traverse left column from bottom to top
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++; // Shrink left boundary
    }
    // Update direction (cycle through 0 to 3)
    direction = (direction + 1) % 4;
  }

  return result;
}
