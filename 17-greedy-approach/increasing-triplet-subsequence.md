# 334. Increasing Triplet Subsequence

### Problem Understanding

The problem requires us to determine if there exists any triplet of indices `(i, j, k)` in an array `nums` such that `i < j < k` and `nums[i] < nums[j] < nums[k]`. If such a triplet exists, we return `true`; otherwise, we return `false`.

### Intuition

To solve this problem, we need to find a sequence of three numbers in the array where each subsequent number is greater than the previous one, and their indices are in increasing order. The key is to efficiently check for such a sequence without resorting to a brute-force approach that would have a high time complexity.

### Approaches

1. **Brute Force Approach**: Check all possible triplets in the array to see if any satisfy the condition. This approach has a time complexity of O(n^3), which is inefficient for large arrays.

```javascript
/**
 * Checks if there exists any increasing triplet using brute force.
 * Time Complexity: O(n^3) - Checking all possible triplets.
 * Space Complexity: O(1) - No extra space used.
 * @param {number[]} nums - The input array.
 * @return {boolean} - True if an increasing triplet exists, false otherwise.
 */
function increasingTripletBruteForce(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] < nums[j] && nums[j] < nums[k]) {
          return true;
        }
      }
    }
  }
  return false;
}
```

- **Brute Force Approach**: This approach checks every possible triplet `(i, j, k)` to see if they form an increasing sequence. While straightforward, it is highly inefficient for large arrays due to its cubic time complexity.

#### Approach 2: Optimal Greedy Approach

- Track the smallest and second smallest elements encountered so far.
- As we iterate through the array, we update these values and check if we encounter a number that is greater than both, indicating the existence of a valid triplet.

```javascript
/**
 * Checks if there exists any increasing triplet using a greedy approach.
 * Time Complexity: O(n) - Single pass through the array.
 * Space Complexity: O(1) - Constant space used.
 * @param {number[]} nums - The input array.
 * @return {boolean} - True if an increasing triplet exists, false otherwise.
 */
function increasingTriplet(nums) {
  let first = Infinity; // Tracks the smallest element found so far
  let second = Infinity; // Tracks the second smallest element found so far

  for (const num of nums) {
    if (num <= first) {
      first = num; // Update the smallest element
    } else if (num <= second) {
      second = num; // Update the second smallest element
    } else {
      // Found a number greater than both first and second
      return true;
    }
  }
  return false;
}
```

### Explanation

- **Optimal Greedy Approach**: This approach efficiently tracks the smallest (`first`) and second smallest (`second`) elements encountered during the iteration. If a number is found that is greater than both `first` and `second`, it confirms the existence of an increasing triplet. This method ensures we only pass through the array once, resulting in linear time complexity.

### Dry Run of Optimal Approach

#### Example 1: nums = [1, 2, 3, 4, 5]

- Initialize `first = Infinity`, `second = Infinity`.
- Iterate through each element:
  - 1: `first = 1`, `second = Infinity`.
  - 2: `first = 1`, `second = 2`.
  - 3: 3 > `second` (2), return `true`.
    **Output**: `true`

#### Example 2: nums = [5, 4, 3, 2, 1]

- Initialize `first = Infinity`, `second = Infinity`.
- Iterate through each element:
  - 5: `first = 5`, `second = Infinity`.
  - 4: `first = 4`, `second = Infinity`.
  - 3: `first = 3`, `second = Infinity`.
  - 2: `first = 2`, `second = Infinity`.
  - 1: `first = 1`, `second = Infinity`.
- No triplet found.
  **Output**: `false`

#### Example 3: nums = [2, 1, 5, 0, 4, 6]

- Initialize `first = Infinity`, `second = Infinity`.
- Iterate through each element:
  - 2: `first = 2`, `second = Infinity`.
  - 1: `first = 1`, `second = Infinity`.
  - 5: `first = 1`, `second = 5`.
  - 0: `first = 0`, `second = 5`.
  - 4: 4 < `second` (5), so `second = 4`.
  - 6: 6 > `second` (4), return `true`.
    **Output**: `true`

### Edge Cases Covered

1. **All Increasing**: The entire array is increasing, so any triplet works.
2. **All Decreasing**: No triplet can be increasing.
3. **Mixed Values**: The triplet may not be consecutive but still exists (e.g., indices 3, 4, 5 in the third example).

This approach efficiently handles all cases with optimal time and space complexity.
