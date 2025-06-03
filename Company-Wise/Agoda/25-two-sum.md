# Two Sum Problem: Approaches and Solutions

## Problem Understanding

We need to find two numbers in an array that add up to a given target and return their indices. Each input has exactly one solution, and we can't use the same element twice.

## Approaches

### 1. Brute Force Approach (Nested Loops)

**Intuition**: Check every possible pair of numbers in the array to see if they sum to the target.

```javascript
/**
 * Brute Force Solution
 * Time Complexity: O(n²) - Nested loops
 * Space Complexity: O(1) - No extra space used
 */
function twoSumBruteForce(nums, target) {
  // Iterate through each element in the array
  for (let i = 0; i < nums.length; i++) {
    // For each element, check all subsequent elements
    for (let j = i + 1; j < nums.length; j++) {
      // If the sum matches the target, return the indices
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  // Though problem states there's a solution, return empty if none found
  return [];
}
```

### 2. Hash Map (Optimal) Approach

**Intuition**: As we iterate through the array, we store each element's complement (target - element) in a hash map. If we find an element that exists in the hash map, we've found our pair.

```javascript
/**
 * Hash Map Solution (Optimal)
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(n) - Storing complements in hash map
 */
function twoSumHashMap(nums, target) {
  // Create a map to store value-index pairs
  const complementMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;

    // If complement exists in map, return the indices
    if (complementMap.has(complement)) {
      return [complementMap.get(complement), i];
    }

    // Store current number and its index in the map
    complementMap.set(currentNum, i);
  }

  return [];
}
```

### 3. Two-pass Hash Table Approach

**Intuition**: First pass stores all elements in a hash map, second pass checks for complements.

```javascript
/**
 * Two-pass Hash Table Solution
 * Time Complexity: O(n) - Two separate passes
 * Space Complexity: O(n) - Storing all elements in hash map
 */
function twoSumTwoPass(nums, target) {
  const numMap = new Map();

  // First pass: populate the hash map
  for (let i = 0; i < nums.length; i++) {
    numMap.set(nums[i], i);
  }

  // Second pass: check for complements
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    // Ensure we're not using the same element twice
    if (numMap.has(complement) && numMap.get(complement) !== i) {
      return [i, numMap.get(complement)];
    }
  }

  return [];
}
```

## Optimal Approach Dry Run

### Example 1: nums = [2,7,11,15], target = 9

- Initialize empty map: {}
- i=0: num=2, complement=7
  - 7 not in map → store {2:0}
- i=1: num=7, complement=2
  - 2 is in map → return [map[2],1] = [0,1]

### Example 2: nums = [3,2,4], target = 6

- Initialize empty map: {}
- i=0: num=3, complement=3
  - 3 not in map → store {3:0}
- i=1: num=2, complement=4
  - 4 not in map → store {2:1}
- i=2: num=4, complement=2
  - 2 is in map → return [map[2],2] = [1,2]

### Example 3: nums = [3,3], target = 6

- Initialize empty map: {}
- i=0: num=3, complement=3
  - 3 not in map → store {3:0}
- i=1: num=3, complement=3
  - 3 is in map → return [map[3],1] = [0,1]

## Edge Cases Covered

1. Solution at beginning of array (Example 1)
2. Solution at end of array (Example 2)
3. Duplicate values (Example 3)
4. The algorithm works when the two numbers are the same value (Example 3)

## Complexity Analysis

- **Brute Force**: O(n²) time, O(1) space
- **Hash Map**: O(n) time, O(n) space (optimal for time)
- **Two-pass Hash**: O(n) time, O(n) space (slightly less efficient than single-pass)

The hash map approach is optimal for time complexity, trading space for faster execution. It's particularly efficient for large arrays where the O(n²) solution would be too slow.
