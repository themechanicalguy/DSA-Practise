//LC- 74 Search a 2D Matrix
// Given an n x m matrix, find a target value in the matrix.
// The matrix has the following properties:
// 1. Integers in each row are sorted from left to right.
// 2. The first integer of each row is greater than the last integer of the previous row.
// Example 1:
// Input: matrix = [[1,3,5],[7,9,11],[13,15,17]], target = 9
// Output: true
// Explanation: The target value 9 is found in the matrix.

/**
 * Searches for a target value in a 2D matrix where:
 * - Each row is sorted in ascending order
 * - The first integer of each row is greater than the last integer of the previous row
 *
 * @param {number[][]} binaryMatrix - The 2D matrix with sorted rows and columns
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists in matrix, false otherwise
 */
var searchMatrix = function (binaryMatrix, target) {
  // Handle edge cases: empty matrix or empty rows
  if (!binaryMatrix.length || !binaryMatrix[0].length) {
    return false;
  }

  // Iterate through each row in the matrix
  for (let row = 0; row < binaryMatrix.length; row++) {
    // perform binary search in the current row
    const targetIndex = binarySearchInRow(binaryMatrix[row], target);
    if (targetIndex) return true;
  }

  return false;
};

/**
 * Helper function to perform binary search on a sorted array
 *
 * @param {number[]} sortedArray - The sorted array to search
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists in array, false otherwise
 */
function binarySearchInRow(sortedArray, target) {
  let leftPointer = 0;
  let rightPointer = sortedArray.length - 1;

  while (leftPointer <= rightPointer) {
    const middleIndex = Math.floor((leftPointer + rightPointer) / 2);
    const middleValue = sortedArray[middleIndex];

    if (middleValue === target) {
      return true;
    } else if (middleValue < target) {
      // Search the right half
      leftPointer = middleIndex + 1;
    } else {
      // Search the left half
      rightPointer = middleIndex - 1;
    }
  }

  return false;
}
