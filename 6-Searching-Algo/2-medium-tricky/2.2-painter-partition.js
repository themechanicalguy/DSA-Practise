//https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1
/*
Dilpreet wants to paint his dog's home that has n boards with different lengths. The length of ith board is given by arr[i] where arr[] is an array of n integers. He hired k painters for this work and each painter takes 1 unit time to paint 1 unit of the board.
Return the minimum time to get this job done if all painters start together with the constraint that any painter will only paint continuous boards, say boards numbered [2,3,4] or only board [1] or nothing but not boards [2,4,5].

Examples:
Input: arr[] = [5, 10, 30, 20, 15], k = 3
Output: 35
Explanation: The most optimal way will be: Painter 1 allocation : [5,10], Painter 2 allocation : [30], Painter 3 allocation : [20,15], Job will be done when all painters finish i.e. at time = max(5+10, 30, 20+15) = 35
*/

/**
 * Finds the minimum time required to paint all boards using binary search
 * @param {number[]} boardLengths - Array representing lengths of each board
 * @param {number} numPainters - Number of painters available
 * @return {number} Minimum time required
 */
function painterPartitionBinarySearch(boardLengths, numPainters) {
  // Check for edge cases
  if (boardLengths.length === 0 || numPainters <= 0) return 0;

  // The minimum possible time is the length of the longest single board
  let low = Math.max(...boardLengths);
  // The maximum possible time is the sum of all board lengths (one painter)
  let high = boardLengths.reduce((sum, length) => sum + length, 0);

  let result = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Check if current mid value is feasible
    if (isFeasible(boardLengths, numPainters, mid)) {
      result = mid;
      high = mid - 1; // Try for a smaller value
    } else {
      low = mid + 1; // Need to increase the time
    }
  }

  return result;
}

/**
 * Helper function to check if a given time is feasible with given number of painters
 * @param {number[]} boardLengths - Array of board lengths
 * @param {number} numPainters - Available painters
 * @param {number} maxTime - Current maximum time to check
 * @return {boolean} True if feasible, false otherwise
 */
function isFeasible(boardLengths, numPainters, maxTime) {
  let paintersUsed = 1;
  let currentSum = 0;

  for (const length of boardLengths) {
    currentSum += length;

    // If current board causes time to exceed maxTime,
    // assign a new painter for remaining boards
    if (currentSum > maxTime) {
      paintersUsed++;
      currentSum = length;

      // If we've exceeded the number of painters, not feasible
      if (paintersUsed > numPainters) {
        return false;
      }
    }
  }

  return true;
}

// Example usage
const boards = [5, 10, 30, 20, 15];
const painters = 3;
console.log(painterPartitionBinarySearch(boards, painters)); // Output: 35
