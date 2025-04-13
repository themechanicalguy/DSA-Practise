//LC- 1283 Find the Smallest Divisor Given a Threshold
// Problem Statement
// Given an array of integers nums and an integer threshold, find the smallest divisor such that the sum of
// the division of each element by the divisor is less than or equal to threshold.
// Each division is rounded up to the nearest integer.
// Example 1:
// Input: nums = [1,2,5,9], threshold = 6
// Output: 5
// Explanation: The sum is 1 + 1 + 1 + 2 = 5 which is less than or equal to threshold.
// Example 2:
// Input: nums = [2,3,5,7,11], threshold = 11
// Output: 3
// Explanation: The sum is 1 + 1 + 1 + 1 + 1 = 5 which is less than or equal to threshold.

/**
 * Finds the smallest divisor such that the sum of ceiling divisions is <= threshold
 * @param {number[]} nums - Array of positive integers
 * @param {number} threshold - Maximum allowed sum
 * @return {number} - Smallest divisor meeting the condition
 */

// Approach 1: Brute Force
function smallestDivisorBruteForce(nums, threshold) {
  // Start with divisor 1 and increment until we meet the condition
  for (let divisor = 1; ; divisor++) {
    let sum = 0;
    for (const num of nums) {
      // Calculate ceiling division: Math.ceil(num / divisor)
      sum += Math.ceil(num / divisor);
      // Early exit if sum already exceeds threshold
      if (sum > threshold) break;
    }
    if (sum <= threshold) {
      return divisor;
    }
  }
}

// Approach 2: Binary Search (Optimal)
function smallestDivisor(nums, threshold) {
  // Helper function to calculate the sum of ceiling divisions
  const getSum = (divisor) => {
    let sum = 0;
    for (const num of nums) {
      sum += Math.ceil(num / divisor);
    }
    return sum;
  };

  // Binary search boundaries
  let left = 1;
  let right = Math.max(...nums);
  let result = right; // Initialize with the maximum possible divisor

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentSum = getSum(mid);

    if (currentSum <= threshold) {
      // Valid divisor, try to find a smaller one
      result = mid;
      right = mid - 1;
    } else {
      // Sum too large, need larger divisor
      left = mid + 1;
    }
  }

  return result;
}

// Example usage
const nums = [1, 2, 5, 9];
const threshold = 6;
console.log(smallestDivisorBruteForce(nums, threshold)); // Output: 5
console.log(smallestDivisor(nums, threshold)); // Output: 5
