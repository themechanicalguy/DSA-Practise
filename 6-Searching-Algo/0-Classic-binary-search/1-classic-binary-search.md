# LC- 704. Binary Search

Binary search works only for sorted array

## Problem Understanding

We need to find the index of a number `k` in a sorted array using binary search. If the number isn't present, we should return -1.

## Intuition

Binary search works by repeatedly dividing the search interval in half. Because the array is sorted, we can:

1. Compare the target value to the middle element
2. If it matches, we've found our element
3. If the target is less than the middle element, search the left half
4. If the target is greater, search the right half

This approach is much faster than linear search (O(log n) vs O(n)) because it eliminates half of the remaining elements at each step.

## Approaches

### 1. Iterative Binary Search

```javascript
/**
 * Iterative binary search implementation
 * @param {number[]} sortedArray - Array of numbers in ascending order
 * @param {number} target - The number to search for
 * @return {number} Index of target in array, or -1 if not found
 */
function binarySearchIterative(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    // Prevent potential integer overflow (though not an issue in JS)
    const mid = Math.floor(left + (right - left) / 2);

    if (sortedArray[mid] === target) {
      return mid; // Target found
    } else if (sortedArray[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}
```

This implementation handles all edge cases including:

- Empty arrays
- Single element arrays
- Arrays with even/odd lengths
- Targets at beginning/end of array
- Targets not present in array

### 2. Recursive Binary Search

```javascript
/**
 * Recursive binary search implementation
 * @param {number[]} sortedArray - Array of numbers in ascending order
 * @param {number} target - The number to search for
 * @param {number} left - Left boundary of search range
 * @param {number} right - Right boundary of search range
 * @return {number} Index of target in array, or -1 if not found
 */
function binarySearchRecursive(
  sortedArray,
  target,
  left = 0,
  right = sortedArray.length - 1
) {
  if (left > right) {
    return -1; // Base case: target not found
  }

  const mid = Math.floor(left + (right - left) / 2);

  if (sortedArray[mid] === target) {
    return mid; // Target found
  } else if (sortedArray[mid] < target) {
    return binarySearchRecursive(sortedArray, target, mid + 1, right); // Search right
  } else {
    return binarySearchRecursive(sortedArray, target, left, mid - 1); // Search left
  }
}
```

## Complexity Analysis

### Iterative Approach

- **Time Complexity**: O(log n) - With each iteration, we halve the search space
- **Space Complexity**: O(1) - Uses constant space for pointers

### Recursive Approach

- **Time Complexity**: O(log n) - Same as iterative, just implemented recursively
- **Space Complexity**: O(log n) - Due to call stack in recursion (could lead to stack overflow for very large arrays)

The iterative approach is generally preferred due to its constant space complexity.

## Dry Run Examples

### Example 1: Target exists in array

**Array**: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]  
**Target**: 23

1. left=0, right=9 → mid=4 (16)
   - 16 < 23 → search right (left=5)
2. left=5, right=9 → mid=7 (56)
   - 56 > 23 → search left (right=6)
3. left=5, right=6 → mid=5 (23)
   - Found at index 5

### Example 2: Target doesn't exist

**Array**: [1, 3, 5, 7, 9]  
**Target**: 4

1. left=0, right=4 → mid=2 (5)
   - 5 > 4 → search left (right=1)
2. left=0, right=1 → mid=0 (1)
   - 1 < 4 → search right (left=1)
3. left=1, right=1 → mid=1 (3)
   - 3 < 4 → search right (left=2)
4. left=2 > right → return -1

### Example 3: Empty array

**Array**: []  
**Target**: 5

- Immediately returns -1 since left=0 > right=-1

### Example 4: Single element array (edge case)

**Array**: [10]  
**Target**: 10

1. left=0, right=0 → mid=0 (10)
   - Found at index 0

## Optimal Solution

The iterative approach is optimal because:

1. It has O(log n) time complexity
2. It uses only O(1) space
3. No risk of stack overflow
4. Simple and easy to understand

---

## Calculating the Middle Index in Binary Search

Let's analyze all three approaches for calculating the middle index in binary search and understand their pros and cons.

### 1. Recommended Approach

```javascript
const mid = Math.floor(left + (right - left) / 2);
```

**Advantages:**

- Prevents integer overflow (important in languages(c/c++/java) with fixed-size integers)
- Works correctly for all array sizes
- Handles edge cases properly
- Standard approach used in most implementations

### 2. Problematic Approach #1

```javascript
const mid = Math.floor(arr.length / 2);
```

**Issues:**

- Doesn't consider the current search range (`left` and `right`)
- Only works for the first iteration when searching the entire array
- Will give incorrect results after the search range is narrowed
- Essentially breaks the binary search algorithm

**Example Failure:**
Searching for 5 in [1, 3, 5, 7, 9]:

- First iteration: mid = 2 (correct)
- Second iteration (if needed): still uses full array length, not current range

### 3. Problematic Approach #2

```javascript
const mid = Math.floor((left + right) / 2);
```

**Issues:**

- Potential integer overflow with very large arrays (in languages with fixed-size integers)
- While this works in JavaScript (which uses floating-point numbers), it's not safe in other languages
- Not considered a best practice

**Example Overflow Scenario:**
In Java/C++ with `left = 2,000,000,000` and `right = 2,000,000,001`:

- `left + right` would overflow a 32-bit integer
- `left + (right - left)/2` would calculate safely (2,000,000,000 + 0.5 → 2,000,000,000)

## Why the First Approach is Best

1. **Correctness**: Always calculates the middle of the current search range
2. **Safety**: Prevents integer overflow (important for other languages)
3. **Clarity**: Clearly shows we're finding the midpoint between left and right
4. **Portability**: Works correctly in all programming languages
5. **Edge Cases**: Handles all edge cases properly

## JavaScript-Specific Notes

While JavaScript uses floating-point numbers for all numeric operations (so integer overflow isn't a concern for typical array sizes), it's still best to use the first approach because:

1. It's the standard implementation used across all languages
2. It makes your code more portable
3. It's clearer in expressing the intent (middle of current range)
4. It works correctly even with extremely large arrays (though JavaScript has other limits before integer math becomes problematic)

## Final Recommendation

Always use:

```javascript
const mid = Math.floor(left + (right - left) / 2);
```

Or the equivalent bitwise version (slightly faster in some JS engines):

```javascript
const mid = (left + right) >> 1;
```

This approach is:

- Correct for all cases
- Safe from overflow
- Clear in intent
- The standard implementation used in professional code
