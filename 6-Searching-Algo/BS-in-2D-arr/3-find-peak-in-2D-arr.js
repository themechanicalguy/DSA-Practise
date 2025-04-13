//LC - 1901 Find a Peak Element II
// Given a 2D integer matrix mat, find a peak element in it and return its position.
// A peak element is an element that is strictly greater than all of its adjacent neighbors.
// An element's adjacent neighbors are the elements directly above, below, left, and right of it.
// You may assume that the boundary of the matrix is not considered to be an adjacent neighbor.
// You must write an algorithm that runs in O(m log(n)) time complexity, where m is the number of rows and n is the number of columns.
// Example 1:
// Input: mat = [[1,4],[3,2]]
// Output: [0,1]
// Explanation: 4 is a peak element and your function should return the row and column index [0,1].

// Approach 1: Binary Search on Rows (O(n log(m)))

/**
 * Finds a peak element in a 2D matrix using binary search on rows.
 * @param {number[][]} matrix - The input 2D matrix.
 * @returns {number[]} - The [row, col] indices of a peak element.
 */
function findPeakGrid(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Helper function to find the column index of the maximum element in a row
  function getMaxColInRow(row) {
    let maxCol = 0;
    for (let col = 1; col < numCols; col++) {
      if (matrix[row][col] > matrix[row][maxCol]) {
        maxCol = col;
      }
    }
    return maxCol;
  }

  // Binary search on rows
  let topRow = 0;
  let bottomRow = numRows - 1;

  while (topRow <= bottomRow) {
    let midRow = Math.floor((topRow + bottomRow) / 2);
    let maxCol = getMaxColInRow(midRow);

    const peakVal = matrix[midRow][maxCol];
    const topVal = midRow > 0 ? matrix[midRow - 1][maxCol] : -1;
    const bottomVal = midRow < numRows - 1 ? matrix[midRow + 1][maxCol] : -1;

    // Check if peakVal is a peak
    if (peakVal > topVal && peakVal > bottomVal) {
      // Check left and right neighbors
      const leftVal = maxCol > 0 ? matrix[midRow][maxCol - 1] : -1;
      const rightVal = maxCol < numCols - 1 ? matrix[midRow][maxCol + 1] : -1;
      if (peakVal > leftVal && peakVal > rightVal) {
        return [midRow, maxCol];
      }
    }

    // Move to the side with the larger neighbor
    if (topVal > peakVal) {
      bottomRow = midRow - 1;
    } else {
      topRow = midRow + 1;
    }
  }

  return [-1, -1]; // Should never reach here given problem constraints
}

// Test case
const mat = [
  [1, 4],
  [3, 2],
];
const mat2 = [
  [10, 20, 15],
  [21, 30, 14],
  [7, 16, 32],
];
console.log(findPeakGrid(mat)); // Output: [0, 1]
