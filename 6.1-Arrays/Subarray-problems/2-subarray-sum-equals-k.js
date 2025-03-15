//LC-560- Subarray Sum Equals K

// Approach 1: Brute Force
function subarraySumBrute(nums, k) {
  let count = 0;

  // Check all possible subarrays
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }

  return count;
}

// Approach 2: Hash Map (Prefix Sum) - Optimal
function subarraySumHash(nums, k) {
  const prefixSum = new Map();
  let sum = 0;
  let count = 0;

  // Initialize with sum 0 having count 1
  prefixSum.set(0, 1);

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    // If sum-k exists, add its frequency to count
    if (prefixSum.has(sum - k)) {
      count += prefixSum.get(sum - k);
    }

    // Update frequency of current sum
    prefixSum.set(sum, (prefixSum.get(sum) || 0) + 1);
  }

  return count;
}

/*

Hash Map is the most efficient and recommended approach,works for positive, negative, and zero values

Why Hash Map Works Best:
Linear time complexity

Handles all edge cases (negatives, zeros)
Uses prefix sum concept: if sum[j] - sum[i-1] = k, then subarray i to j sums to k
Maintains frequency of sums to count all occurrences

Why Initialize with Sum 0?

In the prefix sum approach:
We maintain a running sum (sum) as we iterate through the array.

For each position, we check if there exists a previous prefix sum such that current_sum - k equals that previous sum. 
If it does, we've found a subarray with sum k.

The initialization of prefixSum.set(0, 1) represents the "empty subarray" before the array starts, with a sum of 0 occurring once.

This initialization handles two important cases:
Subarrays starting from index 0: When the sum from the start of the array equals k, we need to count that subarray.

Correct frequency counting: It ensures we don't miss subarrays that begin at the first element.





*/
