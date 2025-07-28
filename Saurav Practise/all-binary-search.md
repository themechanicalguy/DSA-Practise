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

# 2300. Successful Pairs of Spells and Potions --26 July

You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

Example 1:

Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:

- 0th spell: 5 \* [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
- 1st spell: 1 \* [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
- 2nd spell: 3 \* [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
  Thus, [4,0,3] is returned.
  Example 2:

**Brute Force**

```javascript
var successfulPairs = function (spells, potions, success) {
  // obj- multiply spells item with all potion items
  // check if items are greater >= success
  // then increase count for that spell and push it to result array after that spell is completed
  const res = [];

  for (let spell of spells) {
    let count = 0;
    for (let potion of potions) {
      let strength = spell * potion;
      if (strength >= success) {
        count++;
      }
    }
    res.push(count);
  }

  return res;
};
```

FAILED FOR OPTIMIZED

#### **2. Optimized Approach (Sorting + Binary Search)**

```javascript
/**
 * Optimized approach: Sort potions and use binary search for each spell.
 * @param {number[]} spells - Array of spell strengths.
 * @param {number[]} potions - Array of potion strengths.
 * @param {number} success - Threshold for a successful pair.
 * @return {number[]} - Array where each element represents the count of successful potions for the corresponding spell.
 */
function successfulPairs(spells, potions, success) {
  const n = spells.length; // Number of spells
  const m = potions.length; // Number of potions
  const pairs = new Array(n).fill(0); // Initialize result array with zeros

  potions.sort((a, b) => a - b); // Sort potions in ascending order

  for (let i = 0; i < n; i++) {
    // Iterate over each spell
    const spell = spells[i]; // Current spell strength
    // Calculate the minimum potion strength needed for success
    const minPotion = Math.ceil(success / spell);

    // Binary search to find the first potion >= minPotion
    let left = 0; // Start of search range
    let right = m - 1; // End of search range
    let firstSuccessfulIndex = m; // Default to m (no successful potions)

    while (left <= right) {
      // Binary search loop
      const mid = Math.floor((left + right) / 2); // Midpoint
      if (potions[mid] >= minPotion) {
        // If mid potion is sufficient
        firstSuccessfulIndex = mid; // Update first successful index
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }

    // Number of successful potions is total potions - first successful index
    pairs[i] = m - firstSuccessfulIndex;
  }

  return pairs; // Return the result array
}
```

### **Dry Run of Optimal Approach**

#### **Example 1:**

- `spells = [5, 1, 3]`, `potions = [1, 2, 3, 4, 5]`, `success = 7`

1. Sort `potions`: Already sorted `[1, 2, 3, 4, 5]`.
2. For `spell = 5`:
   - `minPotion = ceil(7 / 5) = 2`.
   - Binary search for first `potion >= 2`: index `1` (value `2`).
   - Successful potions: `5 - 1 = 4` (`[2, 3, 4, 5]`).
3. For `spell = 1`:
   - `minPotion = ceil(7 / 1) = 7`.
   - Binary search for first `potion >= 7`: index `5` (no such potion).
   - Successful potions: `5 - 5 = 0`.
4. For `spell = 3`:
   - `minPotion = ceil(7 / 3) = 3`.
   - Binary search for first `potion >= 3`: index `2` (value `3`).
   - Successful potions: `5 - 2 = 3` (`[3, 4, 5]`).

- **Output**: `[4, 0, 3]`.

---

# Pattern - 2 - Search in Rotated Sorted Array

- The **Search in Rotated Sorted Array** pattern is a variation of the binary search algorithm used to find a target element in a sorted array that has been rotated at some unknown `pivot` point.
- The array is originally sorted in `ascending` order, but after rotation, a portion of it is shifted to the end.
- For example, `[1, 2, 3, 4, 5]` rotated at index 2 becomes `[3, 4, 5, 1, 2]`.
- The challenge is to efficiently locate the target element while maintaining the `O(log n)` time complexity of binary search.

## Identifying the Pattern

You can identify this pattern when:

- The input is a `sorted array` that has been `rotated` at some pivot.
- The array has `no duplicates` (or duplicates are explicitly handled in some variations).
- You need to `find an element` or determine its `index` in the array.
- The problem requires `logarithmic time complexity` (O(log n)), suggesting a binary search-based approach.

**Key characteristics:**

- The array is divided into `two sorted subarrays` due to rotation.
- At least one half of the array (left or right of the midpoint) is always sorted.
- i.e Find a target or a specific property (e.g., minimum) in a sorted array that has been rotated at an unknown pivot.

**Common problems include:**

- Finding a target element in a rotated sorted array.
- Finding the pivot (rotation point) or the minimum element.
- Variations like searching in an array with duplicates.

## Intuition

The core idea is to adapt binary search to handle the rotation. In a regular sorted array, binary search compares the target with the middle element and eliminates half of the array. In a rotated sorted array:

- **Determine which half is sorted:** By comparing the `middle` element with the array's endpoints, you can identify which half (left or right) is sorted.
- **Check if the target lies in the sorted half:** If the `target` is within the range of the sorted half, apply standard binary search on that half. Otherwise, search the other (unsorted) half.
- **Handle edge cases:** Empty arrays, single-element arrays, or cases where the array is not rotated.

The intuition relies on the fact that even after rotation, one half of the array is always sorted, allowing us to decide which half to search based on the target’s value relative to the sorted portion.

## Approach

- **Initialize pointers:** Use two pointers, `low` and `right`, to represent the search range (initially 0 and `n-1`).
- **Binary search loop:**
  - Compute the `middle` index: `mid` = `Math.floor((left + right) / 2)`.
  - Check if the `middle` element is the target: if `(arr[mid] === target)` return `mid`.
  - Determine which half is sorted by comparing `arr[mid]` with `arr[left]` or `arr[right]`:
    - If arr[left] <= arr[mid], the left half (left to mid) is sorted.
    - If arr[mid] <= arr[right], the right half (mid to right) is sorted.
  - For the sorted half, check if the `target` lies within its range (e.g., for left half: arr[left] <= target < arr[mid]).
    - If `yes`, search the sorted half `(right = mid - 1 or left = mid + 1)`.
    - If `no`, search the other half.
- **Termination:** If `left > right`, the target is not in the array, `return -1`.

## Time Complexity

**O(log n)**

## Examples

1. **Search for a target** in a rotated sorted array (e.g., LeetCode: _Search in Rotated Sorted Array_).
2. **Find the minimum element** in a rotated sorted array (e.g., LeetCode: _Find Minimum in Rotated Sorted Array_).

## Conditions

- The array was originally sorted but rotated.
- No duplicates (or special handling for duplicates, as in LeetCode: _Search in Rotated Sorted Array II_).

# July 27,2025

---

# LC - 33 Search in Rotated Sorted Array --1

SUBMITTED ON 3 FAILED ATTEMPTS

My approach

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (arr, target) {
  //Brute Force - Linear Search
  //Optimal Modified Binary Search
  let n = arr.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    // check arr[mid] > arr[n-1] --left half is sorted
    if (arr[mid] >= arr[right]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // right half sorted
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

//
/**
 * Search in Rotated Sorted Array (Single-pass Binary Search)
 * @param {number[]} nums - Rotated sorted array with distinct values
 * @param {number} target - Value to search for
 * @return {number} - Index of target if found, otherwise -1
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Case 1: Found the target
    if (nums[mid] === target) return mid;
    // FAILED IN THE BELOW STEP 2 TIMES
    // Case 2: Left half [left..mid] is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is within the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }
    // Case 3: Right half [mid..right] must be sorted (since left half isn't)
    else {
      // Check if target is within the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Search right half
      } else {
        right = mid - 1; // Search left half
      }
    }
  }
  // Target not found
  return -1;
}
```

---

# LC- 81 Search in Rotated Sorted Array II --2

**Approach 1**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (arr, target) {
  let nums = [...new Set(arr)];
  console.log(nums);

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Case 1: Found the target
    if (nums[mid] === target) return true;

    // Case 2: Left half [left..mid] is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is within the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }
    // Case 3: Right half [mid..right] must be sorted (since left half isn't)
    else {
      // Check if target is within the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Search right half
      } else {
        right = mid - 1; // Search left half
      }
    }
  }

  // Target not found
  return false;
};

// Approach 2: Binary Search (Optimized) - withour using sets
/**
 * Binary search with rotation handling
 * Time Complexity: O(log n) average case, O(n) worst case (when many duplicates)
 * Space Complexity: O(1)
 */

function searchInRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Found the target
    if (nums[mid] === target) return true;

    // When left, mid and right elements are same, we can't decide which side is sorted
    // So we move both pointers inward
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    }
    // Left side is sorted
    else if (nums[left] <= nums[mid]) {
      // Target is in the left sorted part
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right side is sorted
    else {
      // Target is in the right sorted part
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}

// Test cases
const nums1 = [2, 5, 6, 0, 0, 1, 2];
const nums2 = [2, 5, 6, 0, 0, 1, 2];

console.log(searchInRotatedArray(nums1, 0)); // true
console.log(searchInRotatedArray(nums2, 3)); // false
```

---

# LC- 153 Find Minimum in Rotated Sorted Array -- 3

Given an integer array nums sorted in ascending order, rotated at some pivot unknown to you beforehand,
return the minimum element of this array.
You may assume no duplicates exist in the array.

- Example 1: Inp: nums = `[3,4,5,1,2]`, Output: `1`
- Example 2: Inp: nums = `[4,5,6,7,0,1,2]` Output: `0`

- FAILED 2 ATTEMPTS

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // brute force linear search
  // optimal - binary search
  let n = nums.length;
  let left = 0;
  let right = n - 1;
  let min = Infinity;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    // check which side is sorted
    if (nums[left] <= nums[mid]) {
      //left half is sorted
      //get min from left half
      min = Math.min(min, nums[left]);
      left = mid + 1;
    } else {
      //right half is sorted and arr[min] is probably min
      min = Math.min(min, nums[mid]);
      right = mid - 1;
    }
  }
  return min;
};

findMin([3, 4, 5, 1, 2]); //1
findMin([4, 5, 6, 7, 0, 1, 2]); //0
```

---

# Find out how many times has an array been rotated --4

FAILED OPTIMAL

https://www.geeksforgeeks.org/problems/rotation4723/1

Given an array of size n, the task is to find the number of times the array has been rotated.

The rotation of the array is done by moving the first element to the end of the array.
The rotation of the array is done `k` times.

- Example 1: Inp: arr[] = `{1, 2, 3, 4, 5}` Output: `0` , Explanation: The array is not rotated.
- Example 2: Inp: arr[] = `{3, 4, 5, 1, 2}` Output: `3` Explanation: The array is rotated 3 times.

### Observations:

- The array is sorted in ascending order before rotation.
- After `k` rotations, the smallest element in the array will be at position `k` (0-based index).
- The array is divided into two sorted parts: one from `0` to `k-1` and another from `k` to `n-1`.

### Approaches to Solve the Problem:

```javascript
// Approach 1: Linear Search (Brute Force)
/**
 * Finds the number of rotations using linear search
 * @param {number[]} rotatedArray - The rotated array
 * @return {number} - The number of rotations
 */
function findRotationsLinear(rotatedArray) {
  // The number of rotations is equal to the index of the minimum element
  for (let i = 0; i < rotatedArray.length - 1; i++) {
    if (rotatedArray[i] > rotatedArray[i + 1]) {
      return i + 1;
    }
  }
  // If array is not rotated, return 0
  return 0;
}

// Example usage:
console.log(findRotationsLinear([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationsLinear([3, 4, 5, 1, 2])); // Output: 3
```

#### 2. Binary Search (Optimal)

- **Intuition**: Since the array is sorted and then rotated, we can use binary search to find the pivot (smallest element).
- **Approach**:
  - The smallest element is the only element for which the previous element is greater than it. Use binary search to find such an element.

```javascript
//Approach 2: Binary Search (Optimal for Sorted Arrays)
/**
 * Finds the number of rotations using binary search
 * @param {number[]} rotatedArray - The rotated array
 * @return {number} - The number of rotations
 */
function findRotationsBinary(rotatedArray) {
  const n = rotatedArray.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    // If array is already sorted
    if (rotatedArray[left] <= rotatedArray[right]) {
      return left;
    }

    const mid = Math.floor((left + right) / 2);
    //Imp to check rotation
    const next = (mid + 1) % n;
    const prev = (mid - 1 + n) % n;

    // Check if mid element is the smallest
    if (
      rotatedArray[mid] <= rotatedArray[next] &&
      rotatedArray[mid] <= rotatedArray[prev]
    ) {
      return mid;
    }
    // Decide which half to search
    else if (rotatedArray[mid] <= rotatedArray[right]) {
      right = mid - 1;
    } else if (rotatedArray[mid] >= rotatedArray[left]) {
      left = mid + 1;
    }
  }
  return 0;
}

// Example usage:
console.log(findRotationsBinary([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationsBinary([3, 4, 5, 1, 2])); // Output: 3
```

---

# LC 540 Single Element in a Sorted Array --5

Single Missing Number in Sorted Array of Natural Numbers

Finds the single element in a sorted array where every other element appears twice.

FAILED
ODD EVEN -- modified binary search pattern

### Intuition

The key observation is that in a perfectly paired array (all elements appearing twice), `the first occurrence of an element is at an even index and the second at the next odd index`. The presence of a single unpaired element disrupts this pattern.

For example:

- In `[1,1,2,3,3,4,4,8,8]`, before the single element `2`, pairs are at indices (0,1), (2,3), etc. After `2`, the pairs shift their positions.
- We can use binary search to check the middle element and compare it with its neighbors to determine if the single element is on the left or right.

### Approaches

1. **Binary Search**:
   - Initialize `left` and `right` pointers.
   - Calculate `mid`. If `mid` is even, the next element should be the same, and if `mid` is odd, the previous element should be the same.
   - Based on whether these conditions hold, adjust `left` or `right` to narrow down the search space.

```javascript
/**
 * Finds the single element in a sorted array where every other element appears twice.
 * @param {number[]} nums - The sorted array of integers.
 * @return {number} - The single element.
 */
function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // Ensure mid is even to check pairs correctly
    if (mid % 2 === 1) {
      mid--; // Adjust mid to be even
    }
    // Check if mid and mid+1 are the same, then left side of mid is balanced
    if (nums[mid] === nums[mid + 1]) {
      // The single element is on the right side
      left = mid + 2;
    } else {
      // The single element is on the left side including mid
      right = mid;
    }
  }
  // When left === right, we've found the single element
  return nums[left];
}

singleNonDuplicate([1, 1, 2, 2, 3, 3, 4, 4, 8]);
// [0,1,2,3,4,5,6,7,8]
// [1,1,2,2,3,3,4,4,8]
```

### Dry Runs

**Example 1**: `nums = [1,1,2,3,3,4,4,8,8]`

- Initial: left = 0, right = 8
- mid = 4 (even), nums[4] = 3, nums[5] = 4 → not equal → right = 4
- mid = 2 (even), nums[2] = 2, nums[3] = 3 → not equal → right = 2
- mid = 1 (odd → adjust to 0), nums[0] = 1, nums[1] = 1 → equal → left = 2
- Now left = right = 2 → return nums[2] = 2

**Example 2**: `nums = [3,3,7,7,10,11,11]`

- Initial: left = 0, right = 6
- mid = 3 (odd → adjust to 2), nums[2] = 7, nums[3] = 7 → equal → left = 4
- mid = 5 (odd → adjust to 4), nums[4] = 10, nums[5] = 11 → not equal → right = 4
- Now left = right = 4 → return nums[4] = 10

# LC- 1539 Kth Missing Positive Number --6

FAILED

Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Find the kth positive integer that is missing from this array.
Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,...]. The 5th missing positive integer is 9.
Example 2:
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

### Intuition

The problem requires finding the k-th missing positive integer in a strictly increasing sorted array of positive integers. The missing integers are those positive integers that are not present in the array. For example, in the array `[2,3,4,7,11]`, the missing positive integers are `[1,5,6,8,9,10,12,...]`. The task is to find the k-th integer in this list of missing numbers.

### Approaches

There are several approaches to solve this problem:

1. **Brute Force (Linear Search)**:

   - Iterate through each positive integer starting from 1.
   - For each integer, check if it exists in the array. If it doesn't, count it as missing.
   - When the count reaches k, return the current integer.

2. **Binary Search (Optimal Approach)**:
   - The idea is to determine how many numbers are missing before each element in the array.
   - For any index `i`, the number of missing numbers before `arr[i]` is `arr[i] - (i + 1)` (since in a no-missing scenario, `arr[i]` would be `i + 1`).
   - Use binary search to find the smallest index `i` where the number of missing numbers before `arr[i]` is at least `k`.
   - The k-th missing number is then `k + i` (since up to index `i`, there are `i` numbers present, and the missing numbers before `arr[i]` are `arr[i] - (i + 1)`).

### Solution Code

#### Approach 1: Brute Force (Linear Search)

```javascript
/**
 * Finds the k-th missing positive integer using linear search.
 * @param {number[]} arr - The strictly increasing sorted array of positive integers.
 * @param {number} k - The k-th missing positive integer to find.
 * @return {number} The k-th missing positive integer.
 */
function findKthPositiveBruteForce(arr, k) {
  let missingCount = 0;
  let currentNumber = 1;
  let index = 0;
  const n = arr.length;

  while (missingCount < k) {
    if (index < n && arr[index] === currentNumber) {
      index++;
    } else {
      missingCount++;
    }
    if (missingCount === k) {
      return currentNumber;
    }
    currentNumber++;
  }
  return -1; // Shouldn't reach here for valid inputs
}
```

**Time Complexity**: O(n + k), where n is the length of the array. In the worst case, we might need to check up to `arr[n-1] + k` numbers.
**Space Complexity**: O(1), as we use a constant amount of extra space.

#### Approach 2: Binary Search (Optimal)

```javascript
/**
 * Finds the k-th missing positive integer using binary search.
 * @param {number[]} arr - The strictly increasing sorted array of positive integers.
 * @param {number} k - The k-th missing positive integer to find.
 * @return {number} The k-th missing positive integer.
 */
function findKthPositiveBinarySearch(arr, k) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const missingCount = arr[mid] - (mid + 1);

    if (missingCount < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // At this point, left is the smallest index where missingCount >= k
  // The k-th missing number is k + left
  return k + left;
}
```

**Time Complexity**: O(log n), where n is the length of the array. Binary search reduces the problem size by half in each iteration.
**Space Complexity**: O(1), as we use a constant amount of extra space.

### Dry Run of Optimal Approach (Binary Search)

#### Example 1:

**Input**: arr = [2,3,4,7,11], k = 5

1. **Initial**: left = 0, right = 4
2. **Mid = 2**: arr[2] = 4, missingCount = 4 - (2 + 1) = 1 < 5 → left = 3
3. **Mid = 3**: arr[3] = 7, missingCount = 7 - (3 + 1) = 3 < 5 → left = 4
4. **Mid = 4**: arr[4] = 11, missingCount = 11 - (4 + 1) = 6 >= 5 → right = 3
5. **Loop ends**: left = 4
6. **Result**: k + left = 5 + 4 = 9

**Output**: 9

#### Example 2:

**Input**: arr = [1,2,3,4], k = 2

1. **Initial**: left = 0, right = 3
2. **Mid = 1**: arr[1] = 2, missingCount = 2 - (1 + 1) = 0 < 2 → left = 2
3. **Mid = 2**: arr[2] = 3, missingCount = 3 - (2 + 1) = 0 < 2 → left = 3
4. **Mid = 3**: arr[3] = 4, missingCount = 4 - (3 + 1) = 0 < 2 → left = 4
5. **Loop ends**: left = 4
6. **Result**: k + left = 2 + 4 = 6

---

# 28th July

# LC - 162 Find Peak Element -- 1

FAILED BRUTE FORCE, NO TIME FOR OPTIMIZED

```javascript
/**
 * FAILED APPROACH - 62 OF 68 PASSED
 */
var findPeakElement = function (nums) {
  if (nums.length < 2) return 0;
  // Brute force
  // Loop over the items
  // check if index is 0 then next item is < arr[o], them peak = next item
  // If index = n-1, and n-1 greater than prev n-2, then peak = n-1
  // So here we need a reference to prev and next items
  // If prev and next items are < and > respectivelty prak is the item in index
  // [-2,-1,0,-3]
  for (let i = 0; i <= nums.length; i++) {
    let prev = i - 1;
    let next = i + 1;
    if (!nums[prev]) {
      if (nums[i] > nums[next]) return i;
    }
    if (!nums[next]) {
      // THIS CONDITION IS FAILED IN CASE nums[next] = 0
      if (nums[i] > nums[prev]) return i;
    }
    if (
      nums[prev] &&
      nums[next] &&
      nums[i] > nums[prev] &&
      nums[i] > nums[next]
    ) {
      return i;
    }
  }

  return 0;
};

findPeakElement([-2, -1, 0, -3]);
```

### 1. CORECT BRUTE FORCE Linear Scan (O(n) time)

The simplest approach is to scan through the array and check each element to see if it's a peak.

```javascript
function findPeakElementLinear(nums) {
  for (let i = 0; i < nums.length; i++) {
    // Check if current element is greater than both neighbors
    const greaterThanLeft = i === 0 || nums[i] > nums[i - 1];
    const greaterThanRight = i === nums.length - 1 || nums[i] > nums[i + 1];

    if (greaterThanLeft && greaterThanRight) {
      return i;
    }
  }
  return -1; // This line is theoretically unreachable for valid inputs
}
```

### 2. Binary Search (O(log n) time)

The key intuition is that:

1. If nums[mid] < nums[mid+1], there must be a peak in the right half because:
   - Either the numbers keep increasing to the end (then last element is peak)
   - Or they start decreasing at some point (that point is a peak)
2. Otherwise, there must be a peak in the left half (including mid) because:
   - Either the numbers keep decreasing to the start (then first element is peak)
   - Or they start increasing at some point (that point is a peak)

```javascript
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If mid element is less than next element, peak is in right half
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      // Otherwise, peak is in left half (including mid)
      right = mid;
    }
  }

  // When left == right, we've found a peak
  return left;
}
```

### Dry Run Examples 1: [1, 2, 3, 1]

- Initial: left = 0, right = 3
- mid = 1, nums[1]=2 < nums[2]=3 → left = 2
- mid = 2, nums[2]=3 > nums[3]=1 → right = 2
- left == right → return 2

### Example 2: [1, 2, 1, 3, 5, 6, 4]

- Initial: left = 0, right = 6
- mid = 3, nums[3]=3 < nums[4]=5 → left = 4
- mid = 5, nums[5]=6 > nums[6]=4 → right = 5
- mid = 4, nums[4]=5 < nums[5]=6 → left = 5
- left == right → return 5

---

# Find pivot element in an array --2

Find pivot element in an array - modified binary search

pivot element:- The element at which the monotonic order breaks is the pivot element

- Input: `[3,4,5,6,7,1,2]`
- Output: `1` (the pivot element where the order breaks)

This question is similiar kind as find the kth rotations

### Intuition

Since the array is rotated but still maintains a sorted order in two parts, we can use a modified binary search to efficiently find the pivot element. The pivot element is the only element in the array that is smaller than its previous element in a sorted array.

Key Observations:

1. In a normally sorted array (not rotated), the first element is the smallest.
2. In a rotated sorted array, the pivot is the point where the order breaks, i.e., where `arr[i] > arr[i+1]`.
3. The pivot element is the smallest element in the array.

```javascript
/**
 * BRUTE FORCE- LINEAR SEARCH
 * Finds the pivot element in a rotated sorted array using linear search.
 * @param {number[]} arr - The rotated sorted array.
 * @return {number} - The pivot element.
 */
function findPivotLinear(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return arr[i + 1];
    }
  }
  return arr[0]; // If no pivot found, array is not rotated
}
```

**Modified Binary Search**: Use binary search to find the pivot by comparing the middle element with the first and last elements.

- **Initialization**: Start with `left` at the beginning and `right` at the end of the array.
- **Binary Search Loop**:
  - Calculate `mid`.
  - If `arr[mid] > arr[right]`, the pivot is in the right half.
  - Else, the pivot is in the left half including `mid`.
- **Termination**: When `left` equals `right`, `arr[left]` is the pivot.

```javascript
/**
 * Finds the pivot element in a rotated sorted array using binary search.
 * @param {number[]} arr - The rotated sorted array.
 * @return {number} - The pivot element.
 */
function findPivotBinary(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return arr[left];
}
```

#### Dry Runs Example 1: `[3,4,5,6,7,1,2]`

- Initial: left = 0, right = 6
- mid = 3, arr[3] = 6 > arr[6] = 2 → left = 4
- mid = 5, arr[5] = 1 < arr[6] = 2 → right = 5
- mid = 4, arr[4] = 7 > arr[5] = 1 → left = 5
- Now left == right → return arr[5] = 1

#### Example 2: `[7,1,2,3,4,5,6]`

- Initial: left = 0, right = 6
- mid = 3, arr[3] = 3 < arr[6] = 6 → right = 3
- mid = 1, arr[1] = 1 < arr[3] = 3 → right = 1
- mid = 0, arr[0] = 7 > arr[1] = 1 → left = 1
- Now left == right → return arr[1] = 1

---

# LC - 1011 Capacity To Ship Packages Within D Days --3

FAILED- THIS IS A VVI Quest

A conveyor belt has packages that must be shipped from one port to another within `D` days.
The `ith` package on the conveyor belt has a weight of `weights[i]`. Each day, we can ship packages of a maximum weight of `W`.
We can ship packages in batches, but the weight of each batch cannot exceed W.
We need to find the least weight capacity of the ship that will result in all the packages being shipped within D days.

**objective** -

Simply here you need to ship 55 kgs(total) of weight in 5 days and Return the `least weight capacity` of the ship that will result in all the packages being shipped within `D days`.

- Example 1: I : weights = [1,2,3,4,5,6,7,8,9,10], D = 5, O: 15
- Explanation: A ship with a capacity of 15 can ship the packages in 5 days.

  - Day 1: 1, 2, 3, 4, 5
  - Day 2: 6, 7
  - Day 3: 8
  - Day 4: 9
  - Day 5: 10

### Problem Understanding

- We need to determine the minimum ship capacity required to ship all packages within a given number of days.
- The packages must be shipped in the order they appear on the conveyor belt, and we cannot split the order.
- The goal is to find the smallest capacity such that the total number of days required to ship all packages does not exceed the given `days`.

## Approach 1: Linear Search (Brute Force)

```javascript
function shipWithinDaysLinear(weights, days) {
  // Start with the minimum possible capacity (max single package)
  let capacity = Math.max(...weights);

  // Keep increasing capacity until we find one that works
  while (true) {
    const daysNeeded = calculateDaysNeeded(weights, capacity);
    if (daysNeeded <= days) {
      return capacity;
    }

    capacity++;
  }
}
function calculateDaysNeeded(weights, capacity) {
  let daysNeeded = 1;
  let currentLoad = 0;

  for (const currentWeight of weights) {
    if (currentLoad + currentWeight > capacity) {
      // Need a new day for this package
      daysNeeded++;
      currentLoad = currentWeight;
    } else {
      // Add to current day's load
      currentLoad += currentWeight;
    }
  }

  return daysNeeded;
}
```

### **Binary Search with Feasibility Check**:

1. **Binary Search Approach**: The key observation here is that the minimum capacity lies between the maximum weight in the `weights` array (since we must be able to ship the heaviest package) and the sum of all weights (which would allow shipping all packages in one day). We can use binary search to efficiently narrow down the minimum capacity.
1. **Feasibility Check**: For a given capacity, we need to check if it's possible to ship all packages within the given days. This involves simulating the shipping process: iterating through the weights and accumulating them until adding the next weight would exceed the capacity, at which point we start a new day.

#### Code Exp:

- **Initialization**: Set the left boundary (`left`) to the maximum weight in the array and the right boundary (`right`) to the sum of all weights.
- **Binary Search**: While `left` is less than `right`, calculate the mid capacity and check if it's feasible to ship all packages within `days` using this capacity.
- **Feasibility Function**: Iterate through the weights, accumulating them until the capacity is exceeded, counting the days required. If the days required is less than or equal to the given `days`, the capacity is feasible.

### Solution Code

```javascript
/**
 * Finds the least weight capacity of the ship to ship all packages within given days.
 * @param {number[]} weights - Array of package weights.
 * @param {number} days - Maximum number of days allowed to ship all packages.
 * @return {number} - The minimum ship capacity required.
 */
function shipWithinDays(weights, days) {
  let left = Math.max(...weights); // Minimum possible capacity is the maximum weight
  let right = weights.reduce((a, b) => a + b, 0); // Maximum possible capacity is the sum of all weights

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canShipWithCapacity(weights, days, mid)) {
      right = mid - 1; // Try to find a smaller capacity
    } else {
      left = mid + 1; // Need a larger capacity
    }
  }

  return left;
}

/**
 * Checks if it's possible to ship all packages within the given days using the specified capacity.
 * @param {number[]} weights - Array of package weights.
 * @param {number} days - Maximum number of days allowed.
 * @param {number} capacity - Current ship capacity to test.
 * @return {boolean} - True if feasible, false otherwise.
 */
function canShipWithCapacity(weights, days, capacity) {
  let currentLoad = 0;
  let daysNeeded = 1; // Start with the first day

  for (const weight of weights) {
    if (currentLoad + weight > capacity) {
      daysNeeded++; // Need a new day
      currentLoad = weight; // Start the new day with the current weight
      if (daysNeeded > days) {
        return false; // Exceeds the allowed days
      }
    } else {
      currentLoad += weight; // Add to the current day's load
    }
  }

  return daysNeeded <= days;
}

// Example Test Cases
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // Output: 15
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3)); // Output: 6
console.log(shipWithinDays([1, 2, 3, 1, 1], 4)); // Output: 3
```

### Dry Run with Examples

**Example 1: weights = [1,2,3,4,5,6,7,8,9,10], days = 5**

- **Initial**: left = 10, right = 55
- **Iteration 1**: mid = 32, daysNeeded = 2 (feasible), right = 32
- **Iteration 2**: mid = 21, daysNeeded = 3 (feasible), right = 21
- **Iteration 3**: mid = 15, daysNeeded = 5 (feasible), right = 15
- **Iteration 4**: mid = 12, daysNeeded = 6 (not feasible), left = 13
- **Iteration 5**: mid = 14, daysNeeded = 6 (not feasible), left = 15
- **Exit**: left = 15, which is the answer.

**Example 2: weights = [3,2,2,4,1,4], days = 3**

- **Initial**: left = 4, right = 16
- **Iteration 1**: mid = 10, daysNeeded = 2 (feasible), right = 10
- **Iteration 2**: mid = 7, daysNeeded = 3 (feasible), right = 7
- **Iteration 3**: mid = 5, daysNeeded = 4 (not feasible), left = 6
- **Iteration 4**: mid = 6, daysNeeded = 3 (feasible), right = 6
- **Exit**: left = 6, which is the answer.

---

# 1482. Minimum Number of Days to Make m Bouquets --4

You are given an integer array `bloomDay` of length n, an integer `m` and an integer `k`.

- You want to make `m` bouquets. To make a bouquet, you need to use `k` adjacent(situated next to or close to something) flowers from the garden. The flowers will bloom in `bloomDay[i]` days.

The problem is to find the `minimum number of days` you have to wait until you can make `m` bouquets.
Return the minimum number of days you have to wait until you can make m bouquets.

If it is impossible to make m bouquets return -1.

**Example 1:**
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: We can make the following bouquets:

- [1] from bloomDay[0]
- [3] from bloomDay[2]
- [2] from bloomDay[4]
  So we need to wait 3 days before we can make the bouquets.

## Intuition

- The goal is to find the `minimum of days` such that we can form `m` bouquets, where each bouquet requires `k` adjacent flowers that have bloomed by that day.
- If it’s impossible to make `m` bouquets (e.g., due to insufficient flowers or non-adjacent blooms), we return -1.

Key observations:

1. If `m * k` > total flowers, it's impossible (return -1)
2. The answer must be between the minimum and maximum bloom days
3. For any given day, we can check if it's possible to make the bouquets

- **Binary Search on Days:**

  - The answer (minimum days) lies between the minimum and maximum values in `bloomDay`.
  - We can use binary search to find the minimum days that allows us to make `m` bouquets.

- **Feasibility Check:**

  - For a given day, we can check if it’s possible to make `m` bouquets by counting groups of `k` adjacent bloomed flowers.
  - A flower at index `i` is bloomed if `bloomDay[i] <= day`.

- **Edge Cases**:

  - If `m * k > n` (where n is the length of bloomDay), it’s impossible to make m bouquets, as we don’t have enough flowers.
  - If there are enough flowers but they are not adjacent, we may still fail to form m bouquets.

- **Monotonic Property:**
  - If we can make `m` bouquets on day `d`, we can also make them on any day `d' > d`. If we cannot make `m` bouquets on day `d`, we cannot make them on any day `d' < d`. This makes binary search suitable.

### 1. Brute Force (Linear Search)

- Check each day from min to max bloom day
- For each day, count how many bouquets can be made
- Return the first day that satisfies the requirement

```javascript
//Approach 1: Linear Search with Greedy Check
function minDaysToMakeBouquetsLinear(bloomDay, m, k) {
  const totalFlowersNeeded = m * k;
  if (bloomDay.length < totalFlowersNeeded) return -1;

  const minDay = Math.min(...bloomDay);
  const maxDay = Math.max(...bloomDay);

  for (let day = minDay; day <= maxDay; day++) {
    if (canMakeBouquets(bloomDay, m, k, day)) {
      return day;
    }
  }

  return -1;
}

/**
 * Helper function to check if m bouquets can be made by a specific day
 * @param {number[]} bloomDay - Array of bloom days
 * @param {number} m - Required bouquets
 * @param {number} k - Flowers per bouquet
 * @param {number} day - The day to check
 * @return {boolean} True if possible, false otherwise
 */
function canMakeBouquets(bloomDay, m, k, day) {
  let bouquetsMade = 0; // Count of complete bouquets
  let adjacentFlowers = 0; // Count of consecutive bloomed flowers

  for (const bloom of bloomDay) {
    if (bloom <= day) {
      // Flower has bloomed by this day
      adjacentFlowers++;

      // If we have enough for a bouquet
      if (adjacentFlowers === k) {
        bouquetsMade++;
        adjacentFlowers = 0; // Reset counter
      }
    } else {
      // Flower hasn't bloomed - reset consecutive counter
      adjacentFlowers = 0;
    }

    // Early exit if we've made enough bouquets
    if (bouquetsMade >= m) return true;
  }

  return bouquetsMade >= m;
}
```

**Time Complexity**: `O(n(maxDay - minDay))` - In worst case, we check every day between min and max
**Space Complexity**: `O(1)` - Constant extra space

### 2. Binary Search (Optimal)

- Use binary search between min and max bloom days
- For each mid day, check if we can make enough bouquets
- Adjust search range based on the result

```javascript
//Approach 2: Binary Search with Greedy Check
/**
 * Finds the minimum number of days needed to make m bouquets using k adjacent flowers
 * using binary search for optimal performance.
 * @param {number[]} bloomDay - Array where bloomDay[i] is the day the ith flower blooms
 * @param {number} m - Number of bouquets needed
 * @param {number} k - Number of adjacent flowers needed per bouquet
 * @return {number} Minimum days needed or -1 if impossible
 */
function minDaysToMakeBouquets(bloomDay, m, k) {
  // Calculate total flowers needed and check if it's possible
  const totalFlowersNeeded = m * k;
  if (bloomDay.length < totalFlowersNeeded) {
    return -1; // Not enough flowers in total
  }

  // Initialize binary search boundaries
  let left = Math.min(...bloomDay); // Earliest possible day
  let right = Math.max(...bloomDay); // Latest possible day
  let result = -1; // Stores our answer

  // Binary search loop
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Middle day to check

    // If we can make bouquets by 'mid' days, try to find a smaller day
    if (canMakeBouquets(bloomDay, m, k, mid)) {
      result = mid;
      right = mid - 1; // Search left half
    } else {
      left = mid + 1; // Search right half
    }
  }

  return result;
}
```

**Time Complexity**: O(n log(maxDay - minDay)) - Binary search reduces the search space logarithmically
**Space Complexity**: O(1) - Constant extra space

## Dry Runs

### Example 1:

Input: [1,10,3,10,2], m = 3, k = 1

- Binary search between 1 and 10
- mid = 5 → can make 3 bouquets (1,3,2 bloomed)
- mid = 3 → can make 3 bouquets
- mid = 2 → can make 2 bouquets
- So answer is 3

---

# 875. Koko Eating Bananas --5

Koko loves to eat bananas. There are `n` piles of bananas, the `ith` pile has `piles[i]` bananas.
The guards have gone and will come back in `h` hours. Koko can decide how many bananas to eat per hour. Each hour, she chooses some pile of bananas and eats bananas from that pile.
If the pile has less than `k` bananas, she eats all of them instead. Koko likes to eat slowly but still wants to finish eating before the guards return.
Return the minimum integer `k` such that she can eat all the bananas within `h` hours.

- Example 1:I: piles = `[3,6,7,11]`, h = 8, O: 4
- Example 2:I: piles = `[30,11,23,4,20]`, h = 5, O: 30
- Example 3:I: piles = `[30,11,23,4,20]`, h = 6, O: 23

## Understanding Problem

- Let’s dive into solving the "Koko Eating Bananas" problem.
- The goal is to find the minimum integer eating speed `k` (`bananas per hour`) that allows Koko to eat all bananas in n piles within `h` hours, where each pile i has `piles[i]` bananas.
- If a pile has fewer than `k` bananas, Koko eats all of them in that hour and moves on. We need to minimize `k` while ensuring all bananas are consumed before the guards return in `h` hours.

## Intuition and Approach

The problem asks for the smallest `k` such that Koko can eat all bananas in at most `h` hours. Since `k` represents bananas eaten per hour, the total hours required to eat all bananas depend on `k`.

- A smaller `k` means more hours are needed, while a larger `k` reduces the hours but may be unnecessarily high.
- The key is to find the smallest `k` that keeps the total `hours ≤ h`.

## Key Insights:

**Feasible k Range:**

- The minimum possible `k` is `1` (eating at least 1 banana per hour).
- The maximum possible `k` is the size of the largest pile (`max(piles)`), as Koko cannot eat more bananas than are in a pile in one hour.
- Thus, `k` lies in the range `[1, max(piles)]`.

**Hours Calculation:**

- For a given `k`, the hours required to eat a pile of size `piles[i]` is `Math.ceil(piles[i] / k)`, because Koko eats `k` bananas per hour and needs enough hours to consume all bananas in the pile.
- Total hours = sum of `Math.ceil(piles[i] / k)` for all piles.
- We need this total to be `≤ h`.

**Monotonic Relationship:**

- As `k` increases, the hours required to eat all bananas decreases (fewer hours per pile).
- If a certain `k` allows Koko to finish in ≤ `h` hours, any `k' > k` will also work (but may be suboptimal).
- If a certain `k` requires > h hours, any `k' < k` will require even more hours and won’t work.

This suggests a binary search to find the smallest `k` where total hours ≤ `h`.

## Approach 1. Brute Force Approach

We iterate through all possible values of `k` from `1` to the `maximum pile size`, calculate the total hours required for each `k`, and return the smallest `k` where total `hours ≤ h`.

```javascript
function minEatingSpeedBruteForce(piles, h) {
  // Start with minimum possible speed
  let eatingSpeed = 1;

  // Keep increasing speed until we find one that works
  while (true) {
    let hoursNeeded = 0;

    // Calculate total hours needed at current speed
    for (const pile of piles) {
      hoursNeeded += Math.ceil(pile / eatingSpeed);
    }

    // If we can eat all bananas within h hours, return current speed
    if (hoursNeeded <= h) {
      return eatingSpeed;
    }

    // Otherwise try faster speed
    eatingSpeed++;
  }
}
```

## Approach 2. Binary Search Approach (Optimal)

Since the feasibility of `k` is monotonic (larger `k` always reduces hours), we can use binary search to find the smallest `k` where total `hours ≤ h`.
We search in the range `[1, max(piles)]`.

```javascript
/**
 * Optimal binary search approach to find minimum eating speed
 * @param {number[]} piles - Array representing number of bananas in each pile
 * @param {number} h - Maximum hours available
 * @return {number} - Minimum eating speed k
 */
function minEatingSpeed(piles, h) {
  // The minimum possible speed is 1 (eat at least 1 banana/hour)
  let left = 1;
  // The maximum possible speed is the maximum pile size
  // (since eating faster than that doesn't help)
  let right = Math.max(...piles);
  let result = right; // Initialize with the maximum possible speed

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let hoursNeeded = 0;

    // Calculate total hours needed at current mid speed
    for (const pile of piles) {
      hoursNeeded += Math.ceil(pile / mid);
    }

    if (hoursNeeded <= h) {
      // If we can finish in time, try a slower speed
      result = Math.min(result, mid);
      right = mid - 1;
    } else {
      // If we can't finish in time, we need to eat faster
      left = mid + 1;
    }
  }

  return result;
}
```

**Time Complexity:**

- Binary search range is `[1, max(piles)]`, so there are `O(log M)` iterations, where `M = max(piles)`.
- For each `k`, we iterate through `n` piles to compute total hours.
- Total: `O(n * log M)`.

**Space Complexity:** `O(1)` (only using a few variables).

---

# find the square root of n using binary search -- 6

https://www.geeksforgeeks.org/problems/square-root/0
Given a positive integer n, find the square root of n. If n is not a perfect square, then return the floor value.
Floor value of any number is the greatest Integer which is less than or equal to that number

```javascript
/**  Brute Force Approach (Linear Search)
 * Finds the square root of a positive integer using brute force.
 * @param {number} num - The positive integer to find the square root of
 * @return {number} - The square root if perfect square, else floor value
 */
function squareRootBruteForce(num) {
  // Handle edge case where num is 0 or 1
  if (num === 0 || num === 1) {
    return num;
  }
  // Initialize counter
  let counter = 1;
  // Loop until counter squared exceeds num
  while (counter * counter <= num) {
    counter++;
  }
  // Return counter - 1 since we overshot in the loop
  return counter - 1;
}

/**
 * Finds the square root of a positive integer using binary search.
 * @param {number} num - The positive integer to find the square root of
 * @return {number} - The square root if perfect square, else floor value
 */
function squareRootBinarySearch(num) {
  // Handle edge cases
  if (num === 0 || num === 1) {
    return num;
  }

  let left = 1;
  let right = num;
  let result = 0;

  while (left <= right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);

    // If mid squared equals num, we found the exact root
    if (mid * mid === num) {
      return mid;
    }

    // If mid squared is less than num, search right half
    if (mid * mid < num) {
      left = mid + 1;
      result = mid; // Update result to the floor value
    }
    // Else search left half
    else {
      right = mid - 1;
    }
  }

  return result;
}

const testNumber = 25; // Perfect square
const nonPerfectSquare = 30; // Non-perfect square

console.log("Brute Force:", squareRootBruteForce(testNumber)); // 5
console.log("Brute Force:", squareRootBruteForce(nonPerfectSquare)); // 5

console.log("Binary Search:", squareRootBinarySearch(testNumber)); // 5
console.log("Binary Search:", squareRootBinarySearch(nonPerfectSquare)); // 5
```
