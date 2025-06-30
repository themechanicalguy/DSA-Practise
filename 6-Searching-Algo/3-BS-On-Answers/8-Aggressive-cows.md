# Agressive Cows

## Problem Statement

https://www.geeksforgeeks.org/problems/aggressive-cows/1

- You are given an array with unique elements of `stalls[]`, which denote the position of a stall.
- You are also given an integer `k` which denotes the number of aggressive cows.
- Your task is to assign `stalls` to `k` cows such that the `minimum distance` between any two of them is the `maximum` possible.

**Examples :**

- Input: `stalls[]` = `[1, 2, 4, 8, 9]`, `k` = `3`
- Output: `3`
- Explanation: The first cow can be placed at stalls[0],
  the second cow can be placed at stalls[2] and
  the third cow can be placed at stalls[3].
  The minimum distance between cows, in this case, is 3, which also is the largest among all possible ways.

## Problem Understanding

- We need to place `k` cows in `n` stalls positioned at various locations such that the `minimum distance` between any two cows is `maximized`.
- The stalls have unique positions given in an array.

## Intuition

This is a classic optimization problem that can be efficiently solved using binary search. The key observations are:

1. The minimum possible distance between cows is 0 (if all cows are placed in same stall, though constraints prevent this)
2. The maximum possible distance is the distance between first and last stall (when k=2(no. of cows))
3. We can use binary search to check if a certain minimum distance is possible to achieve with k cows

### 1. Brute Force Approach (Linear Search)

- Try all possible minimum distances from 1 to max possible distance
- For each distance, check if we can place all cows with at least that distance
- The maximum distance where placement is possible is our answer

```javascript
/**
 * Brute force approach to find maximum minimum distance between cows
 * @param {number[]} stalls - Array of stall positions
 * @param {number} k - Number of cows
 * @return {number} - Maximum minimum distance between cows
 */
function aggressiveCowsBruteForce(stalls, k) {
  // First, sort the stalls array in ascending order to easily calculate distances
  stalls.sort((a, b) => a - b);
  const n = stalls.length;

  // Calculate the maximum possible distance between first and last stall
  let maxDist = stalls[n - 1] - stalls[0];

  // Edge case: if number of cows equals number of stalls,
  // we have to place one cow in each stall, so the minimum distance
  // is the smallest distance between any two consecutive stalls
  if (k === n) {
    let minDist = Infinity;
    // Find the minimum distance between consecutive stalls
    for (let i = 1; i < n; i++) {
      minDist = Math.min(minDist, stalls[i] - stalls[i - 1]);
    }
    return minDist;
  }

  // Try all possible distances from max down to 1
  // We start from maximum possible distance and go down to find the largest possible minimum distance
  for (let dist = maxDist; dist >= 1; dist--) {
    // Check if we can place all cows with at least 'dist' distance apart
    if (canPlaceCows(stalls, k, dist)) {
      return dist; // Return the first valid distance (which will be maximum)
    }
  }
  return 0; // If no distance found (shouldn't happen with k >= 2)
}

/**
 * Helper function to check if cows can be placed with given minimum distance
 * @param {number[]} stalls - Sorted array of stall positions
 * @param {number} k - Number of cows
 * @param {number} minDist - Minimum distance to maintain between cows
 * @return {boolean} - True if placement possible, false otherwise
 */
function canPlaceCows(stalls, k, minDist) {
  let count = 1; // We always place the first cow at the first stall
  let lastPos = stalls[0]; // Track position of last placed cow

  // Iterate through remaining stalls
  for (let i = 1; i < stalls.length; i++) {
    // If current stall is at least 'minDist' away from last placed cow
    if (stalls[i] - lastPos >= minDist) {
      count++; // Place a cow here
      lastPos = stalls[i]; // Update last position
      // If we've placed all cows, return true
      if (count === k) return true;
    }
  }
  // If we've gone through all stalls without placing all cows
  return false;
}
```

### 2. Optimal Approach (Binary Search)

- Use binary search on the possible distance range (1 to max_distance)
- For each mid value, check if placement is possible
- Adjust search range based on whether placement was possible

```javascript
/**
 * Optimal binary search approach to find maximum minimum distance between cows
 * @param {number[]} stalls - Array of stall positions
 * @param {number} k - Number of cows
 * @return {number} - Maximum minimum distance between cows
 */
function aggressiveCows(stalls, k) {
  // First, sort the stalls array in ascending order
  stalls.sort((a, b) => a - b);
  const n = stalls.length;

  // Edge case: if number of cows equals number of stalls
  if (k === n) {
    let minDist = Infinity;
    // Find the minimum distance between consecutive stalls
    for (let i = 1; i < n; i++) {
      minDist = Math.min(minDist, stalls[i] - stalls[i - 1]);
    }
    return minDist;
  }

  // Initialize binary search bounds
  let left = 1; // Minimum possible distance between cows
  let right = stalls[n - 1] - stalls[0]; // Maximum possible distance
  let result = 0; // To store the maximum minimum distance found

  // Binary search loop
  while (left <= right) {
    // Calculate mid point of current search range
    const mid = Math.floor((left + right) / 2);

    // Check if we can place cows with at least 'mid' distance apart
    if (canPlaceCows(stalls, k, mid)) {
      // If possible, try for a larger distance
      result = mid; // Update result
      left = mid + 1;
    } else {
      // If not possible, try smaller distances
      right = mid - 1;
    }
  }

  return result;
}

// Reusing the same canPlaceCows helper function from brute force approach
```

**Time Complexity**: O(n log(max_dist)), where n is number of stalls and max_dist is maximum possible distance between first and last stall  
**Space Complexity**: O(1)

## Dry Run with Examples

### Example 1: stalls = [1, 2, 4, 8, 9], k = 3

1. Sort stalls: [1, 2, 4, 8, 9]
2. Binary search range: left=1, right=8 (9-1)
3. Iterations:
   - mid=4: canPlaceCows returns false (can only place 2 cows)
   - mid=2: canPlaceCows returns true (positions 1,4,8 or 1,4,9)
   - mid=3: canPlaceCows returns true (positions 1,4,8)
   - left=4, right=3 → exit loop
4. Result is 3

### Example 2: stalls = [10, 1, 2, 7, 5], k = 3

1. Sort stalls: [1, 2, 5, 7, 10]
2. Binary search range: left=1, right=9 (10-1)
3. Iterations:
   - mid=5: canPlaceCows returns false (positions 1,7 - only 2 cows)
   - mid=2: canPlaceCows returns true (positions 1,5,10)
   - mid=3: canPlaceCows returns true (positions 1,5,10)
   - mid=4: canPlaceCows returns true (positions 1,5,10)
   - mid=5: already checked false
   - left=5, right=4 → exit loop
4. Result is 4

### Example 3: stalls = [2, 12, 11, 3, 26, 7], k = 5

1. Sort stalls: [2, 3, 7, 11, 12, 26]
2. Edge case: k === stalls.length → return minimum distance between consecutive stalls
3. minDist is min(1,4,4,1,14) = 1
4. Result is 1

## Edge Cases Covered

1. When number of cows equals number of stalls (minimum possible distance)
2. When only 2 cows (maximum possible distance)
3. Normal case where we need to find optimal distance
4. Unsorted input array (handled by sorting first)

The binary search approach is optimal as it reduces the search space exponentially, making it much faster than the linear search approach for large inputs.
