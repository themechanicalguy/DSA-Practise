//LC- 35
// Search Insert Position
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
// You must write an algorithm with O(log n) runtime complexity.

// Example 1:
// Input: nums = [1,3,5,6], target = 5
// Output: 2
// Example 2:
// Input: nums = [1,3,5,6], target = 2
// Output: 1

//Brute force approach
// Time Complexity: O(n)
// Linear Search (Brute Force)
/**
 * Finds the insert position using linear search
 * @param {number[]} sortedArray - Array of distinct integers in ascending order
 * @param {number} targetValue - Value to search or insert
 * @return {number} Index where target is found or should be inserted
 */
function findInsertPositionLinear(sortedArray, targetValue) {
  // Iterate through each element in the array
  for (
    let currentIndex = 0;
    currentIndex < sortedArray.length;
    currentIndex++
  ) {
    // If current element is equal or larger than target, return this position
    if (sortedArray[currentIndex] >= targetValue) {
      return currentIndex;
    }
  }
  // If all elements are smaller, target should be inserted at the end
  return sortedArray.length;
}

//Binary Search Approach

/**
 * Finds the insert position using iterative binary search
 * @param {number[]} sortedArray - Array of distinct integers in ascending order
 * @param {number} targetValue - Value to search or insert
 * @return {number} Index where target is found or should be inserted
 */
function findInsertPositionBinaryIterative(sortedArray, targetValue) {
  let leftBound = 0;
  let rightBound = sortedArray.length - 1;

  while (leftBound <= rightBound) {
    const middleIndex = Math.floor((leftBound + rightBound) / 2);
    const middleValue = sortedArray[middleIndex];

    if (middleValue === targetValue) {
      // Target found at middle index
      return middleIndex;
    } else if (middleValue < targetValue) {
      // Search the right half
      leftBound = middleIndex + 1;
    } else {
      // Search the left half
      rightBound = middleIndex - 1;
    }
  }

  // If not found, leftBound is the insert position
  return leftBound;
}
