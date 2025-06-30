# LC-128. Longest Consecutive Sequence

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.

Example 1:
Input: nums = `[100,4,200,1,3,2]`
Output: `4`
Explanation: The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is `4`.

Example 2:
Input: nums = `[0,3,7,2,5,8,4,6,0,1]`
Output: `9`

## Problem Understanding

We need to find the length of the longest sequence of consecutive numbers in an unsorted array. The algorithm must run in O(n) time.

**Key Points:**

- Consecutive means numbers follow each other in order `(e.g., 1, 2, 3, 4)`
- The sequence doesn't need to be contiguous in the original array
- We need the longest such sequence

## Intuition and Approach

The key challenge is achieving O(n) time complexity. A naive approach might involve sorting the array (O(n log n)), but that exceeds the time constraint. Instead, we need a method that processes each element in constant or near-constant time.

**Optimal Approach: Using a Hash Set**

**Intuition:**

- A sequence of consecutive numbers forms a chain `(e.g., 1, 2, 3, 4)`. If we can efficiently check whether a number is the start of a sequence and count how many numbers follow it consecutively, we can find the longest sequence.
- To avoid duplicates and achieve `O(1)` lookups, store all numbers in a hash set.
- For each potential sequence start (a number with no predecessor in the set), count the length of the sequence by checking for consecutive numbers.
- This ensures we only process each number once and perform constant-time lookups.

**Steps:**

- Convert the array to a set to remove duplicates and enable O(1) lookups.
- Iterate through the array. For each number num, check if it’s the start of a sequence (i.e., `num - 1` is not in the set).
- If it is a start, count the length of the sequence by checking for `num + 1`, `num + 2`, etc., in the set.
- Track the maximum sequence length found.

**This approach is `O(n)` because:**

- Building the set is `O(n)`.
- Each number is processed once, and for each sequence start, we only count consecutive numbers once (each number is visited at most twice: once during iteration and once during sequence counting).

```javascript
/**
 * OPTIMAL HASH SET APPROACH
 * Uses a set for O(1) lookups and only checks sequence starts
 *
 * Time Complexity: O(n) - Each number processed at most twice
 * Space Complexity: O(n) - For the hash set storage
 */
function longestConsecutive(nums) {
  // Create a set of all unique numbers for O(1) lookups
  const numSet = new Set(nums);
  let maxLength = 0;

  // Check each unique number in the set ---loop over set not the original array
  for (const num of numSet) {
    // Only process if this number is the start of a sequence
    // (i.e., no number immediately before it exists) -- Most important step for logic to work
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1; // Start new streak

      // Count how long this consecutive sequence goes
      while (numSet.has(currentNum + 1)) {
        currentNum++; // Move to next number
        currentStreak++; // Increase streak length
      }

      // Update max length if this streak is longer
      maxLength = Math.max(maxLength, currentStreak);
    }
    // If num-1 exists, we'll process it when we reach that number
  }

  return maxLength;
}
```

### Alternative Approaches

**Sorting Approach:** Sort the array and iterate to find the longest consecutive sequence. This is intuitive but runs in O(n log n), failing the time constraint.

```javascript
/**
 * SORTING APPROACH
 * First sorts the array, then finds consecutive sequences
 *
 * Time Complexity: O(n log n) - Dominated by the sorting step
 * Space Complexity: O(1) if we can modify input, O(n) if we need to copy
 */
function longestConsecutiveSorting(nums) {
  // Handle empty array case
  if (nums.length === 0) return 0;

  // Sort numbers in ascending order
  nums.sort((a, b) => a - b);

  let maxLength = 1; // Minimum sequence length is 1
  let currentLength = 1; // Track current sequence length

  // Start from second element and compare with previous
  for (let i = 1; i < nums.length; i++) {
    // Skip duplicate numbers (don't break sequence but don't increase length)
    if (nums[i] === nums[i - 1]) continue;

    // If current number is exactly 1 more than previous
    if (nums[i] === nums[i - 1] + 1) {
      currentLength++; // Extend current streak
      maxLength = Math.max(maxLength, currentLength);
    } else {
      // Sequence broken, reset current streak
      currentLength = 1;
    }
  }

  return maxLength;
}
```

**Union-Find (Disjoint Set):** Treat numbers as nodes and connect consecutive numbers. This can achieve near O(n) time with optimizations but is complex and typically slower in practice.

Below, I’ll implement both the optimal (hash set) and sorting approaches in JavaScript, as the union-find approach is less practical for this problem.

### Brute Force Approach (O(n^3) time)

Check all possible sequences for each number.

### 1. Brute Force Approach

```javascript
/**
 * Brute force approach - checks all possible sequences
 * Time: O(n^3) - For each number, we check all possible sequences
 * Space: O(1)
 */
function longestConsecutiveBruteForce(nums) {
  let maxLength = 0;

  for (let num of nums) {
    let currentNum = num;
    let currentStreak = 1;

    // Check if next consecutive number exists
    while (nums.includes(currentNum + 1)) {
      currentNum += 1;
      currentStreak += 1;
    }

    maxLength = Math.max(maxLength, currentStreak);
  }

  return maxLength;
}
```

## Dry Runs

### Example 1: [100,4,200,1,3,2]

- Set: {100,4,200,1,3,2}
- Check 100: no 99 → sequence 100 (length 1)
- Check 4: has 3 → skip
- Check 200: no 199 → sequence 200 (length 1)
- Check 1: no 0 → sequence 1,2,3,4 (length 4)
- Check 3: has 2 → skip
- Check 2: has 1 → skip
- Max length: 4

### Example 2: [0,3,7,2,5,8,4,6,0,1]

- Set: {0,3,7,2,5,8,4,6,1}
- Check 0: no -1 → sequence 0,1,2,3,4,5,6,7,8 (length 9)
- Other numbers all have predecessors → skip
- Max length: 9

### Example 3: [1,0,1,2]

- Set: {1,0,2}
- Check 1: has 0 → skip
- Check 0: no -1 → sequence 0,1,2 (length 3)
- Check 2: has 1 → skip
- Max length: 3

### Edge Case: Empty Array []

- Returns 0 immediately

### Edge Case: Single Element [5]

- Returns 1 (the single element sequence)

### Edge Case: All Duplicates [1,1,1]

- Set: {1}
- Check 1: no 0 → sequence 1 (length 1)
- Returns 1

This approach efficiently handles all cases while maintaining O(n) time complexity.
