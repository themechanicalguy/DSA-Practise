//https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1
// Longest Subarray with Sum K
// Given an array containing N integers and an integer K.
// Your task is to find the length of the longest Sub-Array with the sum of the elements equal to the given value K.

//Brute force approach

function longestSubarrayBruteForce(arr, k) {
  let maxLength = 0;

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum === k) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
}

// Example Usage
console.log(longestSubarrayBruteForce([1, 2, 3, 4, 5], 9)); // Output: 2

// Approach 2: Hash Map (Prefix Sum) - Optimal for all cases
function longestSubarrayHash(arr, k) {
  const prefixSum = new Map();
  let sum = 0;
  let maxLength = 0;

  // Initialize with sum 0 at index -1
  prefixSum.set(0, -1);

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    // If sum - k exists in map, we found a subarray
    if (prefixSum.has(sum - k)) {
      maxLength = Math.max(maxLength, i - prefixSum.get(sum - k));
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

// Problem Variant 2: Sliding Window (works for positive numbers only)
function longestSubarraySliding(arr, k) {
  let maxLength = 0;
  let windowSum = 0;
  let start = 0;

  for (let end = 0; end < arr.length; end++) {
    windowSum += arr[end];

    // Shrink window if sum exceeds k
    while (windowSum > k && start <= end) {
      windowSum -= arr[start];
      start++;
    }

    if (windowSum === k) {
      maxLength = Math.max(maxLength, end - start + 1);
    }
  }

  return maxLength;
}
