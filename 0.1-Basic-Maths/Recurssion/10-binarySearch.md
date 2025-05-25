# Binary Search Algorithm

## Intuition and Approach

Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

**Key points:**

1. The array must be sorted for binary search to work
2. We compare the target value to the middle element of the array
3. If they're not equal, we eliminate half of the array where the target cannot be
4. We repeat this process on the remaining half until we find the target or exhaust the search space

**Why it's efficient:**

- With each comparison, we eliminate half of the remaining elements
- This gives us O(log n) time complexity, much better than O(n) linear search

## Recursive JavaScript Implementation

```javascript
/**
 * Recursive binary search implementation
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The value to search for
 * @param {number} [left=0] - Left boundary of the search range (inclusive)
 * @param {number} [right=sortedArray.length-1] - Right boundary of the search range (inclusive)
 * @returns {number} - The index of the target if found, otherwise -1
 */
function binarySearchRecursive(
  sortedArray,
  target,
  left = 0,
  right = sortedArray.length - 1
) {
  // Base case: search range is invalid (target not found)
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);
  const midValue = sortedArray[mid];

  // If we found the target, return its index
  if (midValue === target) {
    return mid;
  }
  // If target is smaller than middle element, search left half
  else if (target < midValue) {
    return binarySearchRecursive(sortedArray, target, left, mid - 1);
  }
  // If target is larger than middle element, search right half
  else {
    return binarySearchRecursive(sortedArray, target, mid + 1, right);
  }
}
```

## Complexity Analysis

**Time Complexity: O(log n)**

- Each recursive call halves the search space
- Maximum number of calls is log₂n (where n is array length)

**Space Complexity: O(log n)**

- Due to the recursion call stack
- In the worst case, we'll have log n calls on the stack
- (An iterative implementation would have O(1) space complexity)

## Dry Runs

### Example 1: Target exists in array

Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

1. left=0, right=9, mid=4 (16)
   - 23 > 16 → search right (left=5, right=9)
2. left=5, right=9, mid=7 (56)
   - 23 < 56 → search left (left=5, right=6)
3. left=5, right=6, mid=5 (23)
   - Found at index 5

### Example 2: Target doesn't exist

Array: [1, 3, 5, 7, 9]
Target: 4

1. left=0, right=4, mid=2 (5)
   - 4 < 5 → search left (left=0, right=1)
2. left=0, right=1, mid=0 (1)
   - 4 > 1 → search right (left=1, right=1)
3. left=1, right=1, mid=1 (3)
   - 4 > 3 → search right (left=2, right=1)
4. left > right → return -1

### Example 3: Empty array

Array: []
Target: 5

1. left=0, right=-1 (since array length is 0)
   - left > right → return -1 immediately

### Example 4: Single element array (edge case)

Array: [10]
Target: 10

1. left=0, right=0, mid=0 (10)
   - Found at index 0

This implementation handles all edge cases:

- Empty array
- Single element array
- Target at beginning/middle/end
- Target not present
- Even/odd length arrays
