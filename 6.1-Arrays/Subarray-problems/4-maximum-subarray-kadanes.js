//LC-53
// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
// A subarray is a contiguous part of an array.

//Brute Force

function maxSubarraySumBruteForce(nums) {
  let maxSum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      maxSum = Math.max(maxSum, sum);
    }
  }

  return maxSum;
}

// Example usage:
console.log(maxSubarraySumBruteForce([2, 3, -8, 7, -1, 2, 3])); // Output: 11

//Kadane’s Algorithm (O(n)) - Optimized Approach
// Kadane's algorithm is the most efficient way to solve this problem.
// It tracks the maximum sum ending at the current index and updates the global maximum sum.

function maxSubarraySumKadane(nums) {
  let maxSoFar = nums[0],
    maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// Example usage:
console.log(maxSubarraySumKadane([2, 3, -8, 7, -1, 2, 3])); // Output: 11

//Divide and Conquer Approach (O(n log n))
//This approach recursively finds the maximum subarray sum by dividing the array into two halves.
function maxCrossingSum(nums, left, mid, right) {
  let leftSum = -Infinity,
    sum = 0;

  for (let i = mid; i >= left; i--) {
    sum += nums[i];
    leftSum = Math.max(leftSum, sum);
  }

  let rightSum = -Infinity;
  sum = 0;

  for (let i = mid + 1; i <= right; i++) {
    sum += nums[i];
    rightSum = Math.max(rightSum, sum);
  }

  return leftSum + rightSum;
}

function maxSubarraySumDivideAndConquer(nums, left, right) {
  if (left === right) return nums[left];

  let mid = Math.floor((left + right) / 2);

  let leftMax = maxSubarraySumDivideAndConquer(nums, left, mid);
  let rightMax = maxSubarraySumDivideAndConquer(nums, mid + 1, right);
  let crossMax = maxCrossingSum(nums, left, mid, right);

  return Math.max(leftMax, rightMax, crossMax);
}

function findMaxSubarraySum(nums) {
  return maxSubarraySumDivideAndConquer(nums, 0, nums.length - 1);
}

// Example usage:
console.log(findMaxSubarraySum([2, 3, -8, 7, -1, 2, 3])); // Output: 11
