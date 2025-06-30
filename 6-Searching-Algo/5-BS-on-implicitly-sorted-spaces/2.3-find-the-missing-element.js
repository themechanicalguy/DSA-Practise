// https://www.geeksforgeeks.org/problems/missing-number-in-sorted-array-of-natural-numbers/1
//Missing Number in Sorted Array of Natural Numbers
// Given a sorted array of n distinct natural numbers in the range from 1 to n+1.
// Find the missing number in the array.
// Example: arr = [1, 2, 3, 4, 5, 6, 7, 9, 10]
// Output: 8
// Approach: We can use binary search to find the missing number.

//1. Brute Force Approach (Linear Search)
/**
 * Finds the missing number in a sorted array using linear search
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} sortedArray - The sorted array with a missing number
 * @param {number} n - The maximum number in the sequence (array length + 1)
 * @return {number} - The missing number
 */
function findMissingNumberLinear(sortedArray, n) {
  // Iterate through each element from 1 to n
  for (let i = 0; i < n - 1; i++) {
    // If the current element doesn't match i+1, we found the missing number
    if (sortedArray[i] !== i + 1) {
      return i + 1;
    }
  }
  // If all numbers are present except n, return n
  return n;
}

//Mathematical Approach (Sum of First n Natural Numbers)
/**
 * Finds the missing number using the sum of first n natural numbers formula
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} sortedArray - The sorted array with a missing number
 * @param {number} n - The maximum number in the sequence (array length + 1)
 * @return {number} - The missing number
 */
function findMissingNumberSum(sortedArray, n) {
  // Calculate the expected sum of first n natural numbers
  const expectedSum = (n * (n + 1)) / 2;

  // Calculate the actual sum of elements in the array
  let actualSum = 0;
  for (const num of sortedArray) {
    actualSum += num;
  }

  // The difference is the missing number
  return expectedSum - actualSum;
}

//3. Binary Search Approach (Optimal for Sorted Array)
// Modified binary search
/**
 * Finds the missing number using binary search (optimal for sorted array)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * @param {number[]} sortedArray - The sorted array with a missing number
 * @param {number} n - The maximum number in the sequence (array length + 1)
 * @return {number} - The missing number
 */
function findMissingNumberBinarySearch(sortedArray, n) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // If the element at mid is mid + 1, then missing number is after mid
    if (sortedArray[mid] === mid + 1) {
      left = mid + 1;
    } else {
      // Otherwise, missing number is before or at mid
      right = mid - 1;
    }
  }

  // At the end, left will point to the missing number's position
  return left + 1;
}
findMissingNumberBinarySearch([1, 2, 3, 4, 5, 6, 7, 9, 10]);
