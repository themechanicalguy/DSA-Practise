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

# Search in an almost Sorted Array -- 25 July

Given a sorted integer array arr[] consisting of distinct elements, where some elements of the array are moved to either of the adjacent positions, i.e. arr[i] may be present at arr[i-1] or arr[i+1].
Given an integer target. You have to return the index ( 0-based ) of the target in the array. If target is not present return -1.

Examples:

Input: arr[] = [10, 3, 40, 20, 50, 80, 70], target = 40
Output: 2
Explanation: Index of 40 in the given array is 2.

```javascript

    findTarget(arr, target) {
        // code here
        // given sorted array arr[] of distinct int, an integer target
        // return index of target or -1 if not found

        // Brute force - linear search

        // Optimized - Binary search
        let n = arr.length;

        let left = 0, right = n-1;
        while(left <= right){
            let mid = Math.floor(left + (right-left)/2);

            if(arr[mid] === target) return mid;
            else if(arr[mid-1] === target) return mid-1;
            else if(arr[mid+1] === target) return mid+1;
            else if(arr[mid] < target) left = mid+2;
            else right = mid-2;
        }
        return -1;
    }

```

---

# Finding Position in an Infinite Sorted Array OR Exponential Search

## Problem Understanding

We need to find the position of a given element in an "infinite" sorted array. In reality, since we can't have truly infinite arrays in programming, this means we need to find the element without knowing the array bounds beforehand.

## Exponential Search (Optimal)

**Intuition:** For an infinite array, we first find a range where the target might exist by exponentially increasing the high index `(e.g., 1, 2, 4, 8, …) `until we find an element greater than or equal to the target or undefined.
Then, apply binary search within that range.

This is the best approach for unbounded/infinite arrays:

1. Start with a small range (like index 0-1)
2. Keep doubling the range until we find a range that contains the target
3. Then perform binary search within that range

```javascript
function findElementInfinite(arr, target) {
  // Step 1: Find the range where target might exist
  let low = 0;
  let high = 1;

  // Exponentially increase high until arr[high] >= target or undefined
  while (arr[high] !== undefined && arr[high] < target) {
    low = high + 1; // Move low to next range
    high *= 2; // Double the high index
  }

  // Step 2: Perform binary search in the range [low, high]
  while (low <= high && arr[low] !== undefined && arr[high] !== undefined) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}
```

---

# Pattern - 2

---

# Search for Boundaries (Leftmost/Rightmost Occurrence)

- The **Search for Boundaries** pattern in Binary Search is a technique used to find the leftmost (lower bound) or rightmost (upper bound) occurrence of a target value in a sorted array, or to determine boundaries where a condition changes in a monotonic sequence.
- Unlike standard binary search, which finds any occurrence of a target, this pattern focuses on pinpointing the exact boundary positions—either the first or last occurrence of a value or the transition point where a condition holds true.

## How to Identify the Pattern

You can recognize the Search for Boundaries pattern when the problem involves:

- A **sorted array** or a **monotonic condition** (e.g., an array where elements transition from one state to another, like false to true).
- A requirement to the **first** or **last** occurrence of a target element in a sorted array with duplicates.
- A need to identify the **transition point** where a condition changes (e.g., the smallest number satisfying a condition).
- Problems asking for boundaries, such as "find the first position where X occurs" or "find the last position where Y is true."

Common problem types include:

- Finding the first or last occurrence of a number in a sorted array with duplicates.
- Finding the insertion point in a sorted array.
- Determining the minimum or maximum value that satisfies a condition.

---

# Implement lower bound and upper bound

`https:www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1`

Given a sorted array arr[] of size N and an integer x, find the floor of x in arr[].
The floor of x is the largest element in arr[] smaller than or equal to x.
If the floor doesn't exist, return -1.

- Input: N = 5, arr[] = {1, 2, 8, 10, 10}, x = 12
- Output: 10

```javascript
function findFloorBinaryIterative(arr, x) {
  //Brute force- Linear search with condition <=x
  //Optimized modified binary search
  let left = 0;
  let right = arr.length - 1;
  let floorIndex = -1; // Initialize result

  // Binary search to find floor
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= x) {
      floorIndex = mid; // Potential floor found, but look for larger one
      left = mid + 1; // Search in right half
    } else {
      right = mid - 1; // Search in left half
    }
  }

  return floorIndex;
}

function upperBound(arr, x) {
  //Brute force- Linear search with condition >=x
  //Optimized modified binary search
  let ans = arr.length;
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > x) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
}

const arr = [3, 5, 8, 9, 15, 19]; // ans: 4
const x = 9;
console.log("where x is 9: ", upperBound(arr, x));
console.log("where x is 21: ", upperBound(arr, 21));
```

---

# 34. Find First and Last Position of Element in Sorted Array

```javascript
//Approach 1: Binary Search Twice (Most Efficient)

function findBound(nums, target, isFirst) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      if (isFirst) {
        // Search left half for first occurrence
        right = mid - 1;
      } else {
        // Search right half for last occurrence
        left = mid + 1;
      }
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
function searchRange(nums, target) {
  const firstOccurrence = findBound(nums, target, true);

  // If target doesn't exist in the array, return [-1, -1]
  if (firstOccurrence === -1) {
    return [-1, -1];
  }

  const lastOccurrence = findBound(nums, target, false);
  return [firstOccurrence, lastOccurrence];
}
```

# Count occurrences of a number in a sorted array with duplicates

Solve the problem in the same as above, just return lastOccurence - firstOccurence

---

# LC- 35 Search Insert Position

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  //Constraints - arr of distinct int,
  //given int arr[], target,
  // return int-- index if target is found, !found index where it should ideally present

  //Brute force
  // linear search for item found, else index < target + 1
  let ans = -1;

  // for(let i=0;i<nums.length;i++){
  //     if(nums[i] === target){
  //         ans = i;
  //         return ans;
  //     }
  //     if (nums[i] < target){
  //         ans = i;
  //     }
  // }

  // return ans+1;

  // Binary search

  let n = nums.length;
  let l = 0;
  let r = n - 1;

  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);
    if (nums[m] === target) {
      ans = m;
      return ans;
    }

    if (nums[m] < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }

  return l;
};
```
