# Painter Partition II

https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1

- Dilpreet wants to paint his dog's home that has `n` boards with different lengths.
- The length of ith board is given by `arr[i]` where arr[] is an array of `n` integers.
- He hired `k` painters for this work and each painter takes 1 unit time to paint 1 unit of the board.
  Return the `minimum time` to get this job done if all painters start together with the constraint that any painter will only paint continuous boards, say boards numbered `[2,3,4]` or only board `[1]` or nothing but not boards `[2,4,5]`.

**Examples:**

- **Input:** arr[] = `[5, 10, 30, 20, 15]`, k = `3`
- **Output:** `35`
- **Explanation:** The most optimal way will be: Painter 1 allocation : [5,10], Painter 2 allocation : [30], Painter 3 allocation : [20,15], Job will be

## Problem understanding

- Let’s dive into solving the `Painter’s Partition Problem` (also known as the "Split Array Largest Sum" problem).
- We have `n` boards with lengths given in array `arr`.
- We need to partition these boards into `k` contiguous segments (one per painter).
- Each painter takes time equal to the sum of lengths of their assigned boards.
- The total time is the maximum sum of any segment.
- We need to `minimize this maximum` sum.

## Key Insights

- This is a `minimization problem` where we’re trying to find the smallest possible maximum sum of `k` contiguous subarrays.
- The answer (minimum time) must lie between:
  - **Lower bound:** The maximum board length `(max(arr))`, because no painter can take less time than the longest single board.
  - **Upper bound:** The sum of all board lengths `(sum(arr))`, which is the time taken if one painter paints all boards.

We can’t greedily assign boards to painters (e.g., by equalizing sums), as the `constraint of contiguous segments makes it tricky`.

- The problem resembles the `Split Array Largest Sum` problem, which can be solved using:
  - **Binary Search:** Guess a maximum sum and check if it’s possible to partition the array into k or fewer segments.
  - **Dynamic Programming:** Compute the minimum maximum sum for all possible partitions.

## Approaches

We’ll explore two main approaches:

- **Binary Search on Answer:** Guess the maximum sum and verify if the boards can be split into `k` segments with each segment’s `sum ≤ guessed value`.
- **Dynamic Programming:** Use a DP table to compute the minimum maximum sum for partitioning the array into k parts.

```javascript
/**
 * Finds the minimum time to paint all boards with k painters using binary search.
 * @param {number[]} boardLengths - Array of board lengths
 * @param {number} numPainters - Number of painters
 * @returns {number} Minimum time required
 */
function minTimeToPaintBinarySearch(boardLengths, numPainters) {
  const numBoards = boardLengths.length;

  // Edge case: if painters are less than boards, return -1 (invalid)
  if (numPainters > numBoards) return -1;

  // Find the search range for binary search
  let left = Math.max(...boardLengths); // Minimum possible max sum
  let right = boardLengths.reduce((sum, length) => sum + length, 0); // Maximum possible max sum

  let minTime = right; // Store the minimum valid time found

  // Binary search on the maximum sum
  while (left <= right) {
    const maxSum = Math.floor((left + right) / 2); // Guess the max sum

    // Check if we can partition with this max sum
    if (canPartition(boardLengths, numPainters, maxSum)) {
      minTime = maxSum; // Valid partition, try a smaller sum
      right = maxSum - 1;
    } else {
      left = maxSum + 1; // Need a larger sum
    }
  }

  return minTime;
}

/**
 * Checks if it's possible to partition boards into k segments with max sum <= maxSum.
 * @param {number[]} boardLengths - Array of board lengths
 * @param {number} numPainters - Number of painters
 * @param {number} maxSum - Maximum allowed sum per segment
 * @returns {boolean} True if possible, false otherwise
 */
function canPartition(boardLengths, numPainters, maxSum) {
  let currentSum = 0; // Sum of current segment
  let paintersNeeded = 1; // Number of painters used

  // Greedily assign boards to painters
  for (let length of boardLengths) {
    if (currentSum + length <= maxSum) {
      currentSum += length; // Add to current painter's segment
    } else {
      paintersNeeded++; // Start a new painter
      currentSum = length; // New segment starts with current board
    }
  }

  // Return true if we used <= numPainters
  return paintersNeeded <= numPainters;
}
```

**Binary Search Approach:**

- Time Complexity: O(n log(sum of array))
  - Binary search runs in O(log(sum of array)) iterations
  - Each iteration requires O(n) time for the `isPossible` check
- Space Complexity: O(1)
  - Only constant extra space is used

## Dry Run Examples

### Example 1: [5, 10, 30, 20, 15], k = 3

1. Initial: low = 30 (max), high = 80 (sum)
2. mid = 55 → possible (partitions: [5,10,30], [20,15]) → high = 55
3. mid = 42 → possible (partitions: [5,10], [30], [20,15]) → high = 42
4. mid = 36 → possible (same partitions) → high = 36
5. mid = 33 → not possible → low = 34
6. mid = 35 → possible → high = 35
7. low = 34, high = 35 → mid = 34 → not possible → low = 35
8. Return 35

### Example 2: [10, 20, 30, 40], k = 2

1. Initial: low = 40, high = 100
2. mid = 70 → possible ([10,20,30], [40]) → high = 70
3. mid = 55 → possible (same) → high = 55
4. mid = 47 → not possible → low = 48
5. ... continues until low=60, high=60 → return 60

### Edge Case: [100, 200, 300, 400], k = 1

1. Only 1 painter → must paint all boards
2. Directly returns sum: 1000

This approach efficiently narrows down the solution space using binary search while ensuring optimal partitioning.
