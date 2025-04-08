//LC 410. Split Array Largest Sum
// Problem statement:
// Given an array nums which consists of non-negative integers and an integer m, you can split the array into m non-empty continuous subarrays.
// Write an algorithm to minimize the largest sum among these m subarrays.
// Return the minimized largest sum of the split.
// A subarray is a contiguous part of the array.

// Example 1:
// Input: nums = [7,2,5,10,8], m = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
// Example 2:
// Input: nums = [1,2,3,4,5], m = 2
// Output: 9
// Explanation: There are two ways to split nums into two subarrays.
// The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function splitArrayBinarySearch(nums, k) {
  // The minimum possible largest sum is the maximum element in the array
  let left = Math.max(...nums);
  // The maximum possible largest sum is the sum of all elements
  let right = nums.reduce((sum, num) => sum + num, 0);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Check if we can split the array into k parts with max sum <= mid
    if (canSplit(nums, k, mid)) {
      right = mid; // Try for a smaller sum
    } else {
      left = mid + 1; // Need to increase the sum
    }
  }

  return left;
}

/**
 * Helper function to check if we can split nums into <= k parts with each sum <= targetSum
 */
function canSplit(nums, k, targetSum) {
  let currentSum = 0;
  let partsNeeded = 1; // Start with 1 part

  for (const num of nums) {
    currentSum += num;

    // If current sum exceeds target, we need a new split
    if (currentSum > targetSum) {
      partsNeeded++;
      currentSum = num;

      // If we need more splits than allowed, return false
      if (partsNeeded > k) {
        return false;
      }
    }
  }

  return true;
}
