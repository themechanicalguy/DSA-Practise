# **Binary Search**

# Classic Binary Search

**Pattern**: Find a specific target element in a sorted array or determine if it exists.

**Key Insight**:  
The data is sorted, allowing you to eliminate half of the _search space_ in each step by comparing the middle element with the target.

**Time Complexity**: O(log n)

## Examples

1. **Find an element in a sorted array**  
   _(e.g., LeetCode: Binary Search)_

2. **Determine the insertion point for a target in a sorted array**

## Conditions

- The array/list must be sorted.
- Direct comparison with the target is possible.

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

## Why `while (left <= right)` vs `while (left < right)` in Binary Search

The condition `while (left <= right)` is crucial for binary search to work correctly in all cases.
Here's why `left < right` isn't sufficient:

### Key Difference

- **`left <= right`**: Checks if the search space contains at least one element
- **`left < right`**: Checks if the search space contains at least two elements

### Why `left <= right` is Necessary

1. **Handles Single-Element Cases**:

   - When `left == right`, there's exactly one element left to check
   - With `left < right`, we'd miss checking this final element

2. **Edge Case Coverage**:

   - Works correctly for arrays of size 1
   - Works when the target is at either boundary of the current search space

3. **Termination Condition**:
   - When `left` passes `right`, we've definitively determined the element isn't present
   - With `left < right`, we might exit prematurely

### Example Where `left < right` Fails

**Array**: [5]  
**Target**: 5

- Initial: left = 0, right = 0
- With `left < right`: loop doesn't execute → returns -1 (incorrect)
- With `left <= right`: loop executes once and finds the element

### Implementation Comparison

**Correct Version**:

```javascript
while (left <= right) {
  const mid = Math.floor(left + (right - left) / 2);
  // ... rest of logic
}
```

**Problematic Version**:

```javascript
while (left < right) {
  // May miss the final element
  const mid = Math.floor(left + (right - left) / 2);
  // ... rest of logic
  // Would need additional checks after the loop
}
```

### When Might `left < right` Work?

You could make `left < right` work if you:

1. Add a post-loop check for `arr[left] === target`
2. Adjust the pointer updates carefully

But this makes the code more complex and error-prone without any benefit.

### Why Not Use `left < right`?

1. **More Complex Termination**: Requires additional checks after the loop
2. **Harder to Prove Correctness**: More edge cases to consider
3. **No Performance Benefit**: Same asymptotic complexity
4. **Standard Practice**: `left <= right` is the widely accepted convention

### Time Complexity Perspective

Both approaches maintain O(log n) time complexity, but `left <= right` is:

- More straightforward
- Easier to verify
- Less prone to off-by-one errors

### Conclusion

Always use `while (left <= right)` because:

1. It's simpler and more intuitive
2. It handles all edge cases correctly
3. It matches the standard implementation used in computer science literature
4. It doesn't require special case handling after the loop

The small difference in the comparison operator makes a big difference in correctness, especially for small arrays and edge cases.

---

# LC- 704. Binary Search -- 24th july

**Iterative binary search implementation**

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

**Recursive binary search implementation**

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
