//https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1
/*
You are given a 2D binary array arr[][] consisting of only 1s and 0s. Each row of the array is sorted in non-decreasing order. 
Your task is to find and return the index of the first row that contains the maximum number of 1s. If no such row exists, return -1.

Input: arr[][] = [[0,1,1,1], [0,0,1,1], [1,1,1,1], [0,0,0,0]]
Output: 2
Explanation: Row 2 contains the most number of 1s (4 1s). Hence, the output is 2.
*/

//Approach 1: Brute Force - Count 1s in Each Row
/**
 * Finds the first row with maximum number of 1s in a sorted 2D binary array.
 * @param {number[][]} binaryMatrix - The 2D binary array with rows sorted in non-decreasing order
 * @return {number} - Index of the first row with max 1s, or -1 if no 1s exist
 */
function findRowWithMaxOnesBruteForce(binaryMatrix) {
  let maxCount = 0;
  let resultRow = -1;

  for (let row = 0; row < binaryMatrix.length; row++) {
    let currentCount = 0;
    // Count 1s in current row (since it's sorted, we can stop at first 0)
    for (let col = 0; col < binaryMatrix[row].length; col++) {
      if (binaryMatrix[row][col] === 1) currentCount++;
    }
    // Update max count and result if current row has more 1s
    if (currentCount > maxCount) {
      maxCount = currentCount;
      resultRow = row;
    }
  }

  return resultRow;
}

// Approach 2: Binary Search to Count 1s in Each Row
/**
 * Finds the first row with maximum number of 1s using binary search per row.
 * @param {number[][]} binaryMatrix - The 2D binary array with rows sorted in non-decreasing order
 * @return {number} - Index of the first row with max 1s, or -1 if no 1s exist
 */
function findRowWithMaxOnesBinarySearch(binaryMatrix) {
  let maxCount = 0;
  let resultRow = -1;

  for (let row = 0; row < binaryMatrix.length; row++) {
    // Use binary search to find the first occurrence of 1
    const firstOneIndex = findFirstOne(binaryMatrix[row]);
    const currentCount =
      firstOneIndex === -1 ? 0 : binaryMatrix[row].length - firstOneIndex;

    // Update max count and result if current row has more 1s
    if (currentCount > maxCount) {
      maxCount = currentCount;
      resultRow = row;
    }
  }

  return resultRow;
}

/**
 * Helper function to find the first occurrence of 1 in a sorted binary array
 * @param {number[]} arr - Sorted binary array
 * @return {number} - Index of first 1, or -1 if no 1s exist
 */
function findFirstOne(arr) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 1) {
      result = mid;
      right = mid - 1; // Look for earlier 1s
    } else {
      left = mid + 1;
    }
  }

  return result;
}
