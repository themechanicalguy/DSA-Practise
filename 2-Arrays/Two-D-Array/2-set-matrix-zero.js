//LC-73 Set Matrix Zeroes

// Given an m x n matrix. If an element is 0, set its entire row and column to 0. Do it in-place.
// Follow up:
// A straight forward solution using O(mn) space is probably a bad idea.
// A simple improvement uses O(m + n) space, but still not the best solution.
// Could you devise a constant space solution?

// Example 1:
// Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]
// Example 2:
// Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

//Approach 1: Using Additional Arrays to Track Rows and Columns

function setZeroes(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Arrays to keep track of which rows and columns should be set to zero
  const rowsToZero = new Array(numRows).fill(false);
  const colsToZero = new Array(numCols).fill(false);

  // First pass: Identify which rows and columns contain zeros
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (matrix[row][col] === 0) {
        rowsToZero[row] = true;
        colsToZero[col] = true;
      }
    }
  }

  // Second pass: Set the identified rows and columns to zero
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (rowsToZero[row] || colsToZero[col]) {
        matrix[row][col] = 0;
      }
    }
  }
}

// Example usage:
const matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
setZeroes(matrix);
console.log(matrix); // Output: [[1,0,1],[0,0,0],[1,0,1]]

//Approach 2: Using the First Row and First Column as Trackers --Optimal
function setZeroes(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Variables to check if the first row and first column need to be zeroed
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Check if the first row contains any zero
  for (let col = 0; col < numCols; col++) {
    if (matrix[0][col] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // Check if the first column contains any zero
  for (let row = 0; row < numRows; row++) {
    if (matrix[row][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Use the first row and first column to mark which rows and columns to zero
  for (let row = 1; row < numRows; row++) {
    for (let col = 1; col < numCols; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0;
        matrix[0][col] = 0;
      }
    }
  }

  // Zero out the cells based on the marks in the first row and first column
  for (let row = 1; row < numRows; row++) {
    for (let col = 1; col < numCols; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // Zero out the first row if needed
  if (firstRowHasZero) {
    for (let col = 0; col < numCols; col++) {
      matrix[0][col] = 0;
    }
  }

  // Zero out the first column if needed
  if (firstColHasZero) {
    for (let row = 0; row < numRows; row++) {
      matrix[row][0] = 0;
    }
  }
}

// Example usage:
const matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
setZeroes(matrix);
console.log(matrix); // Output: [[1,0,1],[0,0,0],[1,0,1]]

//Approach 3: Using a Single Variable to Track the First Column
function setZeroes(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Variable to check if the first column needs to be zeroed
  let firstColHasZero = false;

  // Use the first row and first column to mark which rows and columns to zero
  for (let row = 0; row < numRows; row++) {
    if (matrix[row][0] === 0) {
      firstColHasZero = true;
    }

    for (let col = 1; col < numCols; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0;
        matrix[0][col] = 0;
      }
    }
  }

  // Zero out the cells based on the marks in the first row and first column
  for (let row = 1; row < numRows; row++) {
    for (let col = 1; col < numCols; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // Zero out the first row if needed
  if (matrix[0][0] === 0) {
    for (let col = 0; col < numCols; col++) {
      matrix[0][col] = 0;
    }
  }

  // Zero out the first column if needed
  if (firstColHasZero) {
    for (let row = 0; row < numRows; row++) {
      matrix[row][0] = 0;
    }
  }
}

// Example usage:
const matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
setZeroes(matrix);
console.log(matrix); // Output: [[1,0,1],[0,0,0],[1,0,1]]
