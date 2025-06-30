# 283. Move Zeroes

## Problem Understanding

We need to move all zeros in an array to the end while maintaining the relative order of non-zero elements. The operation must be done in-place (without creating a new array).

## Intuition

The key challenge is to rearrange the elements without losing the relative order of non-zero elements. We can approach this by:

1. Identifying non-zero elements and moving them to the front
2. Then filling the remaining positions with zeros
3. Or by swapping zeros with non-zero elements as we encounter them

## Approaches

### Approach 1: Extra Space (Not in-place, not optimal but easy to understand)

Create a new array, copy non-zero elements first, then fill remaining with zeros.

```javascript
/**
 * Moves all zeros to the end using extra space
 * Time: O(n), Space: O(n)
 */
function moveZeroesExtraSpace(nums) {
  const nonZeros = nums.filter((num) => num !== 0);
  const zeros = new Array(nums.length - nonZeros.length).fill(0);
  const result = [...nonZeros, ...zeros];

  // Copy back to original array (to satisfy in-place requirement)
  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }
}
```

### Approach 2: Two Pointers - Swap -Optimal

Use two pointers to swap non-zero elements with zeros as we find them.

```javascript
/**
 * Moves all zeros to the end using two pointers with swapping
 * Time: O(n), Space: O(1)
 */
function moveZeroesSwap(nums) {
  let lastNonZeroIndex = 0;

  for (let current = 0; current < nums.length; current++) {
    if (nums[current] !== 0) {
      // Swap current non-zero with lastNonZeroIndex position
      [nums[lastNonZeroIndex], nums[current]] = [
        nums[current],
        nums[lastNonZeroIndex],
      ];
      lastNonZeroIndex++;
    }
  }
}
```

### Approach 3: Two Pointers -- Copy and Overwrite

Use a pointer to track where the next non-zero element should go, then overwrite remaining positions with zeros.

```javascript
/**
 * Moves all zeros to the end using two pointers (copy non-zeros first)
 * Time: O(n), Space: O(1)
 */
function moveZeroesCopyNonZeros(nums) {
  let lastNonZeroIndex = 0;

  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNonZeroIndex++] = nums[i];
    }
  }

  // Fill remaining positions with zeros
  for (let i = lastNonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}
```

### Approach 4: JavaScript Specific - Filter and Concatenation

While not strictly in-place, we can use JavaScript's array methods to filter and concatenate.

```javascript
/**
 * JavaScript specific approach using filter (not strictly in-place)
 * Time: O(n), Space: O(n)
 */
function moveZeroesJavaScript(nums) {
  const nonZeroCount = nums.filter((num) => num !== 0).length;
  const nonZeros = nums.filter((num) => num !== 0);
  const zeros = new Array(nums.length - nonZeroCount).fill(0);

  // Modify original array
  nums.length = 0; // Clear array
  nums.push(...nonZeros, ...zeros);
}
```

## Complexity Analysis

### Approach 1: Extra Space

- Time Complexity: O(n) - We traverse the array twice (once for filter, once for copy)
- Space Complexity: O(n) - We create new arrays for non-zeros and zeros

### Approach 2: Two Pointers - Copy and Overwrite

- Time Complexity: O(n) - Two passes through the array
- Space Complexity: O(1) - Constant extra space

### Approach 3: Two Pointers - Swap

- Time Complexity: O(n) - Single pass through the array
- Space Complexity: O(1) - Constant extra space

### Approach 4: JavaScript Specific

- Time Complexity: O(n) - Filter operations are O(n)
- Space Complexity: O(n) - Creates new arrays

## Optimal Approach Dry Run

The optimal approaches are #2 and #3 with O(n) time and O(1) space. Let's dry run approach #3 (swap) with 3 examples:

### Example 1: [0,1,0,3,12]

Initial: [0,1,0,3,12], lastNonZeroIndex = 0

- current=0: nums[0]=0 → do nothing
- current=1: nums[1]=1 ≠ 0 → swap nums[0] and nums[1]
  - Array: [1,0,0,3,12], lastNonZeroIndex=1
- current=2: nums[2]=0 → do nothing
- current=3: nums[3]=3 ≠ 0 → swap nums[1] and nums[3]
  - Array: [1,3,0,0,12], lastNonZeroIndex=2
- current=4: nums[4]=12 ≠ 0 → swap nums[2] and nums[4]
  - Array: [1,3,12,0,0], lastNonZeroIndex=3

Result: [1,3,12,0,0]

### Example 2: [0]

Initial: [0], lastNonZeroIndex = 0

- current=0: nums[0]=0 → do nothing

Result: [0] (unchanged)

### Example 3: [2,1]

Initial: [2,1], lastNonZeroIndex = 0

- current=0: nums[0]=2 ≠ 0 → swap nums[0] with nums[0] (no change)
  - Array: [2,1], lastNonZeroIndex=1
- current=1: nums[1]=1 ≠ 0 → swap nums[1] with nums[1] (no change)
  - Array: [2,1], lastNonZeroIndex=2

Result: [2,1] (unchanged as no zeros)

This demonstrates the approach works for arrays with:

- Multiple zeros
- Single element
- No zeros at all

```

```
