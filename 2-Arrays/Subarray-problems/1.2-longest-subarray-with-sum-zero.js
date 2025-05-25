//https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1?
// Largest subarray with 0 sum
// Given an array having both positive and negative integers. The task is to compute the length of the largest subarray with sum 0.
//
// //Approach 1: Brute Force
//
function largestSubarrayBruteForce(arr) {
  let maxLength = 0;

  for (let i = 0; i < arr.length; i++) {
    // Start index
    let sum = 0;
    //for subarrays or in case when creating a window start from i
    for (let j = i; j < arr.length; j++) {
      // End index
      sum += arr[j];
      if (sum === 0) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
}

// Example Usage
console.log(largestSubarrayBruteForce([15, -2, 2, -8, 1, 7, 10, 23])); // Output: 5

// Approach 2: Hash Map (Prefix Sum) - Optimal for all cases
function longestSubarrayHash(arr) {
  const prefixSum = new Map();
  let sum = 0;
  let maxLength = 0;

  // Initialize with sum 0 at index -1
  prefixSum.set(0, -1);

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    // If sum - k exists in map, we found a subarray
    if (prefixSum.has(sum)) {
      maxLength = Math.max(maxLength, i - prefixSum.get(sum));
    }

    // Only set if not present to keep earliest occurrence
    if (!prefixSum.has(sum)) {
      prefixSum.set(sum, i);
    }
  }

  return maxLength;
}
// Example Usage
console.log(longestSubarraySlidingWindow([1, 2, 3, 4, 5], 9)); // Output: 2
