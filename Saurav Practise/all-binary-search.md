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
    else if (rotatedArray[mid] < rotatedArray[right]) {
      right = mid - 1;
    } else if (rotatedArray[mid] > rotatedArray[left]) {
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

```javascript
/**
 * Finds the number of times a sorted array has been rotated using linear search.
 * @param {number[]} rotatedArray - The rotated sorted array.
 * @returns {number} - The number of rotations.
 */
function countRotationsLinear(rotatedArray) {
  // The number of rotations is equal to the index of the smallest element.
  let minIndex = 0;
  for (let i = 1; i < rotatedArray.length; i++) {
    if (rotatedArray[i] < rotatedArray[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

// Example Usage:
console.log(countRotationsLinear([1, 2, 3, 4, 5])); // Output: 0
console.log(countRotationsLinear([3, 4, 5, 1, 2])); // Output: 3
console.log(countRotationsLinear([5, 1, 2, 3, 4])); // Output: 1
```

#### 2. Binary Search Approach

**Simple Appraoch** - `while (left < right)` condition

```javascript
/**
 * Function to find the number of times a sorted array has been right-rotated.
 * @param {number[]} arr - The rotated sorted array.
 * @return {number} - The number of rotations.
 */
function findRotationCount(arr) {
  let left = 0;
  let right = arr.length - 1;

  // Binary search with < condition
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Check if the middle element is greater than the rightmost element
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // The index of the smallest element is the number of rotations
  return left;
}

// Test cases
console.log(findRotationCount([5, 1, 2, 3, 4])); // Output: 1
console.log(findRotationCount([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationCount([2, 4, 6, 9])); // Output: 0 (assuming original array is [2, 4, 6, 9])
console.log(findRotationCount([6, 9, 2, 4])); // Output: 2
```

```javascript
/**
 * Finds the number of times a sorted array has been rotated using binary search.
 * @param {number[]} rotatedArray - The rotated sorted array.
 * @returns {number} - The number of rotations.
 */
function countRotationsBinary(rotatedArray) {
  const n = rotatedArray.length;
  let left = 0;
  let right = n - 1;

  // If the array is not rotated at all.
  if (rotatedArray[left] <= rotatedArray[right]) {
    return 0;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Taking modulo arr.length wraps the index around to the start of the array.
    // For example, if arr.length = 4 and mid = 3,
    // then (3 + 1) % 4 = 4 % 4 = 0,
    // which is the first index of the array.
    const next = (mid + 1) % n;
    // Taking modulo arr.length wraps the index around to the end of the array.
    // For example, if arr.length = 4 and mid = 0,
    // then (0 - 1 + 4) % 4 = 3 % 4 = 3,
    // which is the last index of the array.
    const prev = (mid - 1 + n) % n;

    // Check if mid is the smallest element.
    if (
      rotatedArray[mid] <= rotatedArray[next] &&
      rotatedArray[mid] <= rotatedArray[prev]
    ) {
      return mid;
    }

    // Decide which half to search.
    if (rotatedArray[mid] <= rotatedArray[right]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return 0;
}

// Example Usage:
console.log(countRotationsBinary([1, 2, 3, 4, 5])); // Output: 0
console.log(countRotationsBinary([3, 4, 5, 1, 2])); // Output: 3
console.log(countRotationsBinary([5, 1, 2, 3, 4])); // Output: 1
```

### Dry Run of Binary Search Approach:

#### Example 1: `[1, 2, 3, 4, 5]`

- Initial: `left = 0`, `right = 4`.
- Check if `arr[left] <= arr[right]` → `1 <= 5` → `true`. Return `0`.

#### Example 2: `[3, 4, 5, 1, 2]`

- Initial: `left = 0`, `right = 4`.
- `arr[left] > arr[right]` → proceed.
- `mid = 2` → `arr[mid] = 5`.
  - `next = 3`, `prev = 1`.
  - Check if `5 <= 1 && 5 <= 4` → `false`.
  - Since `5 <= 2` → `false`, so `left = 3`.
- Now `left = 3`, `right = 4`.
- `mid = 3` → `arr[mid] = 1`.
  - `next = 4`, `prev = 2`.
  - Check if `1 <= 2 && 1 <= 5` → `true`. Return `3`.

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

# July - 29

---

# Find the Nth root of a number using binary search -- 1

You are given 2 numbers `n` and `m`, the task is to find `n√m` (nth root of m). If the root is not integer then returns -1.

- Examples : Input: n = 3, m = 27 , Output: 3, Explanation: `3*3*3` = 27, The cube root of 27 is equal to 3.
- Input: n = 3, m = 9 Output: -1, Explanation: 3rd root of 9 is not integer.
- Input: n = 4, m = 625, Output: 5, Explanation: `5*5*5*5` = 625

obj - To find the Nth root of a number M, we need to find a number X such that X^N = M. If no such integer X exists, we should return -1.

**Binary Search Approach:**

1. **Range Identification**: The Nth root of M (if it exists) will lie between 1 and M. For example:
   - For N=3 and M=27, the cube root is 3.
   - For N=4 and M=69, no integer X satisfies X^4 = 69.
2. **Binary Search**: We can use binary search to efficiently check possible values of X in the range - Search space [1, M].
3. **Mid Calculation**: For each mid value in the binary search, compute mid^N:
   - If mid^N equals M, return mid.
   - If mid^N < M, search the right half.
   - If mid^N > M, search the left half.
4. **Early Termination**: If we exhaust the search space without finding X, return -1.

```javascript
/**
 * Function to find the Nth root of M using binary search.
 * @param {number} N - The root to find (e.g., 3 for cube root).
 * @param {number} M - The number to find the root of (e.g., 27).
 * @return {number} - The Nth root if it exists, otherwise -1.
 */
function nthRoot(N, M) {
  if (M === 1) return 1; // The Nth root of 1 is always 1 for any N.
  if (N === 1) return M; // The 1st root of M is M itself.

  let low = 1;
  let high = M;
  let result = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    //The time complexity of Math.pow() in JavaScript is generally considered to be O(1), or constant time.
    let power = Math.pow(mid, N);
    if (power === M) {
      return mid; // Found the exact Nth root.
    } else if (power < M) {
      low = mid + 1; // Search in the right half.
    } else {
      high = mid - 1; // Search in the left half.
    }
  }

  return result; // Return -1 if not found.
}

// Example Test Cases
console.log(nthRoot(3, 27)); // Output: 3 (3^3 = 27)
console.log(nthRoot(4, 69)); // Output: -1 (No integer X satisfies X^4 = 69)
console.log(nthRoot(2, 16)); // Output: 4 (4^2 = 16)
console.log(nthRoot(5, 3125)); // Output: 5 (5^5 = 3125)
console.log(nthRoot(3, 30)); // Output: -1 (No integer X satisfies X^3 = 30)
```

- **Time Complexity**: O(log M)
- **Space Complexity**: O(1)

**Example 1: N = 3, M = 27**

- low = 1, high = 27
- Iteration 1: mid = 14, 14^3 = 2744 > 27 → high = 13
- Iteration 2: mid = 7, 7^3 = 343 > 27 → high = 6
- Iteration 3: mid = 3, 3^3 = 27 == 27 → return 3

**Example 2: N = 4, M = 69**

- low = 1, high = 69
- Iteration 1: mid = 35, 35^4 is very large → high = 34
- Iteration 2: mid = 17, 17^4 = 83521 > 69 → high = 16
- Iteration 3: mid = 8, 8^4 = 4096 > 69 → high = 7
- Iteration 4: mid = 4, 4^4 = 256 > 69 → high = 3
- Iteration 5: mid = 2, 2^4 = 16 < 69 → low = 3
- Iteration 6: mid = 3, 3^4 = 81 > 69 → high = 2
- Now low > high → exit loop → return -1

---

# 1283. Find the Smallest Divisor Given a Threshold --2

Find the smallest Divisor

Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less than or equal to threshold.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: 7/3 = 3 and 10/2 = 5).
The test cases are generated so that there will be an answer.

- Example 1: Input: nums = [1,2,5,9], threshold = 6 , Output: 5
  Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
  If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).
- Example 2: Input: nums = [44,22,33,11,1], threshold = 5 Output: 44

```javascript
function smallestDivisorBinarySearch(nums, threshold) {
  let left = 1;
  let right = Math.max(...nums);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const sum = computeSum(nums, mid);
    if (sum <= threshold) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

function computeSum(nums, divisor) {
  let sum = 0;
  for (const num of nums) {
    sum += Math.ceil(num / divisor);
  }
  return sum;
}
```

**Time Complexity**: `O(n log m)`, where `n` is the length of `nums` and `m` is the maximum value in `nums`. The binary search runs in O(log m) and each sum computation is O(n).
**Space Complexity**: `O(1)`, as no additional space is used apart from a few variables.

---

# Aggressive Cows -- 3

https://www.geeksforgeeks.org/problems/aggressive-cows/1

- You are given an array with unique elements of `stalls[]`, which denote the position of a stall.
- You are also given an integer `k` which denotes the number of aggressive cows.
- Your task is to assign `stalls` to `k` cows such that the `minimum distance` between any two of them is the `maximum` possible.

**Examples :**

- Input: `stalls[]` = `[1, 2, 4, 8, 9]`, `k` = `3`
- Output: `3`
- Explanation: The first cow can be placed at stalls[0],
  the second cow can be placed at stalls[2] and
  the third cow can be placed at stalls[3].
  The minimum distance between cows, in this case, is 3, which also is the largest among all possible ways.

## Problem Understanding

- We need to place `k` cows in `n` stalls positioned at various locations such that the `minimum distance` between any two cows is `maximized`.
- The stalls have unique positions given in an array.

## Intuition

This is a classic optimization problem that can be efficiently solved using binary search. The key observations are:

1. The minimum possible distance between cows is 0 (if all cows are placed in same stall, though constraints prevent this)
2. The maximum possible distance is the distance between first and last stall (when k=2(no. of cows))
3. We can use binary search to check if a certain minimum distance is possible to achieve with k cows

### 2. Optimal Approach (Binary Search)

- Use binary search on the possible distance range (1 to max_distance)
- For each mid value, check if placement is possible
- Adjust search range based on whether placement was possible

```javascript
/**
 * Helper function to check if cows can be placed with given minimum distance
 * @param {number[]} stalls - Sorted array of stall positions
 * @param {number} k - Number of cows
 * @param {number} minDist - Minimum distance to maintain between cows
 * @return {boolean} - True if placement possible, false otherwise
 */
const canPlaceCows = (stalls, dist, k) => {
  // last = stalls[0], count
  let last = stalls[0];
  let count = 1;
  // iterate stalls, 0 -> n
  for (let i = 0; i < stalls.length; i++) {
    // check if curr stalls - last >= dist
    if (stalls[i] - last >= dist) {
      // increment count
      count++;
      // set last to currVal
      last = stalls[i];
    }
  }
  return count >= k;
};

/**
 * Optimal binary search approach to find maximum minimum distance between cows
 * @param {number[]} stalls - Array of stall positions
 * @param {number} k - Number of cows
 * @return {number} - Maximum minimum distance between cows
 */
function aggressiveCows(stalls, k) {
  // First, sort the stalls array in ascending order
  stalls.sort((a, b) => a - b);
  const n = stalls.length;

  // Edge case: if number of cows equals number of stalls
  if (k === n) {
    let minDist = Infinity;
    // Find the minimum distance between consecutive stalls
    for (let i = 1; i < n; i++) {
      minDist = Math.min(minDist, stalls[i] - stalls[i - 1]);
    }
    return minDist;
  }

  // Initialize binary search bounds
  let left = 1; // Minimum possible distance between cows
  let right = stalls[n - 1] - stalls[0]; // Maximum possible distance
  let result = 0; // To store the maximum minimum distance found

  // Binary search loop
  while (left <= right) {
    // Calculate mid point of current search range
    const mid = Math.floor((left + right) / 2);

    // Check if we can place cows with at least 'mid' distance apart
    if (canPlaceCows(stalls, k, mid)) {
      // If possible, try for a larger distance
      result = mid; // Update result
      left = mid + 1;
    } else {
      // If not possible, try smaller distances
      right = mid - 1;
    }
  }

  return result;
}

// Reusing the same canPlaceCows helper function from brute force approach
```

**Time Complexity**: `O(n log(max_dist))`, where n is number of stalls and max_dist is maximum possible distance between first and last stall  
**Space Complexity**: `O(1)`

### Example 1: stalls = [1, 2, 4, 8, 9], k = 3

1. Sort stalls: [1, 2, 4, 8, 9]
2. Binary search range: left=1, right=8 (9-1)
3. Iterations:
   - mid=4: canPlaceCows returns false (can only place 2 cows)
   - mid=2: canPlaceCows returns true (positions 1,4,8 or 1,4,9)
   - mid=3: canPlaceCows returns true (positions 1,4,8)
   - left=4, right=3 → exit loop
4. Result is 3

### Example 2: stalls = [10, 1, 2, 7, 5], k = 3

1. Sort stalls: [1, 2, 5, 7, 10]
2. Binary search range: left=1, right=9 (10-1)
3. Iterations:
   - mid=5: canPlaceCows returns false (positions 1,7 - only 2 cows)
   - mid=2: canPlaceCows returns true (positions 1,5,10)
   - mid=3: canPlaceCows returns true (positions 1,5,10)
   - mid=4: canPlaceCows returns true (positions 1,5,10)
   - mid=5: already checked false
   - left=5, right=4 → exit loop
4. Result is 4

---

# Book Allocation Problem -- 4

https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1

## Problem Statement

You are given an array `arr[]` of integers, where each element `arr[i]` represents the number of pages in the `ith` book.
You also have an integer `k` representing the number of students. The task is to allocate books to each student such that:

- Each student receives atleast one book.
- Each student is assigned a contiguous sequence of books.
- No book is assigned to more than one student.

The objective is to `minimize the maximum number of pages` assigned to any student.
In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the `smallest possible maximum`.

- **Note:** Return -1 if a valid assignment is not possible, and allotment should be in contiguous order (see the explanation for better understanding).
- **Input:** arr[] = `[12, 34, 67, 90]`, k = `2`
- **Output:** 113
- **Explanation:**
  - Allocation can be done in following ways:
    - `[12]` and `[34, 67, 90]` Maximum Pages = 191
    - `[12, 34]` and `[67, 90]` Maximum Pages = 157
    - `[12, 34, 67]` and `[90]` Maximum Pages = 113.
    - Therefore, the minimum of these cases is 113, which is selected as the output.

## Problem Understanding

We need to allocate books (represented by pages in an array) to students such that:

1. Every student gets at least one book
2. Books are assigned in contiguous sequences (e.g., books at indices `[i, i+1, ..., j]` go to one student).
3. No book is assigned to more than one student.
4. We minimize the maximum pages any student has to read

## Intuition

This is a classic optimization problem that can be solved using binary search. The key insights:

- The minimum possible maximum is the largest single book (since one student must get at least that)
- The maximum possible maximum is the sum of all pages (if one student gets all books)
- We can use binary search between these bounds to find the minimal maximum allocation

This is a classic optimization problem that resembles the `split array into k subarrays` problem. The key insight is that we need to find the smallest possible maximum sum of pages (for any student) that allows a valid allocation. Since the books must be assigned contiguously, we’re essentially partitioning the array into `k` contiguous subarrays, and the maximum sum of any subarray should be as small as possible.

## Why Binary Search?

A brute-force approach would involve trying every possible way to split the array into `k` contiguous parts and computing the `maximum` sum for each split, which is computationally expensive. Instead, notice that:

- If we guess a maximum number of pages `maxPages` that any student can have, we can check if it’s possible to allocate the books to `k` students such that no student gets more than maxPages pages.
- If we can allocate with `maxPages`, then higher values might also work, but we want the smallest possible `maxPages`.
- If we cannot allocate with maxPages, then lower values won’t work either.

This suggests a binary search on the possible values of `maxPages`. The range for `maxPages` is:

- **Lower bound:** The maximum number of pages in a single book `(Math.max(...arr))`, because each student must get at least one book, and we can’t have a maximum less than the largest book.
- **Upper bound:** The sum of all pages `(arr.reduce((a, b) => a + b, 0))`, because in the worst case, one student gets all books.

For each guessed `maxPages`, we greedily try to assign books to students, ensuring each student’s total pages don’t exceed `maxPages`. If we can assign to `k` or fewer students, the guess is feasible; otherwise, it’s not.

## Approach 1: Binary Search Approach (Optimal Solution)

```javascript
/**
 * Allocates books to students using binary search approach
 * @param {number[]} books - Array where books[i] represents pages in ith book
 * @param {number} students - Number of students to allocate books to
 * @return {number} - Minimum possible maximum pages allocated or -1 if invalid
 */
function allocateBooksBinarySearch(books, students) {
  // If number of students is greater than number of books, allocation is impossible
  if (students > books.length) {
    return -1;
  }

  let totalPages = books.reduce((sum, pages) => sum + pages, 0);
  let maxPagesInSingleBook = Math.max(...books);

  // The minimum possible maximum pages is at least the largest single book
  // The maximum possible maximum pages is the sum of all pages
  let low = maxPagesInSingleBook;
  let high = totalPages;
  let result = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    // Check if current mid value is feasible
    if (isAllocationPossible(books, students, mid)) {
      // If feasible, try for a smaller value
      result = mid;
      high = mid - 1;
    } else {
      // If not feasible, try for a larger value
      low = mid + 1;
    }
  }

  return result;
}

/**
 * Helper function to check if allocation with given maximum pages is possible
 * @param {number[]} books - Array of book pages
 * @param {number} students - Number of students
 * @param {number} maxPagesPerStudent - Maximum pages allowed per student
 * @return {boolean} - True if allocation is possible, false otherwise
 */
function isAllocationPossible(books, students, maxPagesPerStudent) {
  let currentStudentCount = 1;
  let currentPagesSum = 0;

  for (let pages of books) {
    // If single book exceeds maxPages, allocation impossible
    if (pages > maxPagesPerStudent) return false;

    // If adding current book exceeds the max pages, assign to next student
    if (currentPagesSum + pages > maxPagesPerStudent) {
      currentStudentCount++;
      currentPagesSum = pages;

      // If we've exceeded the number of students, allocation is impossible
      if (currentStudentCount > students) {
        return false;
      }
    } else {
      currentPagesSum += pages;
    }
  }

  return true;
}
```

- **Time Complexity:** `O(n log(sum))` where n is number of books and sum is total pages
- **Space Complexity:** `O(1)` - uses constant extra space

### Example 1: [12, 34, 67, 90], k=2

1. left = 90 (max), right = 203 (sum)
2. mid = 146 → possible? [12+34+67,90] → 113,90 → max=113 → possible
   - result=146, right=145
3. mid=117 → possible? [12+34+67,90] → 113,90 → possible
   - result=117, right=116
4. mid=103 → possible? [12+34,67,90] → needs 3 students → not possible
   - left=104
5. mid=110 → possible? [12+34+67,90] → possible
   - result=110, right=109
     ... continues until left > right
     Final result is 113

---

# Split array - Largest Sum -- 5

Given an array `nums` which consists of non-negative integers and an integer `m`, you can split the array into `m` non-empty continuous subarrays.
Write an algorithm to minimize the largest `sum` among these `m` subarrays.
Return the `minimized largest sum of the split`.

- A subarray is a contiguous part of the array.

**Example 1:**

- Input: nums = `[7,2,5,10,8]`, m = `2`
- Output: 18
- Explanation: There are four ways to split nums into two subarrays.
  The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.

**Example 2:**

- Input: nums = `[1,2,3,4,5]`, m = `2`
- Output: 9
- Explanation: There are two ways to split nums into two subarrays.
  The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.

---

## Problem Understanding

We need to split an array into `k` contiguous subarrays such that the largest sum among these subarrays is as small as possible.

## Intuition

The goal is to divide the array `nums` into `k` contiguous subarrays such that the maximum sum of any subarray is as small as possible.
This is an optimization problem where we need to find the smallest possible maximum subarray sum.

- Use binary search to guess the minimum maximum sum
- For each guess, check if it's possible to split the array into <= k parts where no part exceeds the guess

### Key Observations:

- **Lower Bound:** If `k = 1`, the entire array is one subarray, so the minimum largest sum is the sum of all elements in nums. If `k = n` (where `n` is the array length), each element is its own subarray, so the minimum largest sum is the maximum element in `nums`.
- **Upper Bound:** The largest possible maximum subarray sum is the sum of all elements in `nums` (when `k = 1`).
- **Feasibility Check:** For a given target sum `target`, we can check if it’s possible to split the array into `k` or fewer subarrays where each subarray’s sum is at most `target`. If it’s possible, we can try a smaller `target`; if not, we need a larger `target`.
- **Binary Search Applicability:** Since we’re looking for the smallest target that allows splitting into `k` subarrays, and the feasibility check is monotonic (if a target is feasible, all larger sums are feasible), binary search can be used to find the minimal target.

```javascript
function splitArray(nums, k) {
  // The minimal possible answer is the maximum single element
  // (when we split into n subarrays, each containing one element)
  let left = Math.max(...nums);

  // The maximal possible answer is the sum of all elements
  // (when we have just one subarray containing everything)
  let right = nums.reduce((sum, num) => sum + num, 0);

  // Binary search between left and right to find the minimal maximum sum
  while (left < right) {
    // Try mid as our candidate for the minimal maximum sum
    const mid = Math.floor((left + right) / 2);

    // Check if it's possible to split into <= k subarrays
    // where each subarray sum is <= mid
    if (canSplit(nums, mid, k)) {
      // If possible, try to find a smaller sum
      right = mid;
    } else {
      // If not possible, we need to try larger sums
      left = mid + 1;
    }
  }

  // When left == right, we've found our minimal maximum sum
  return left;
}

// Helper function to check if we can split nums into <= k subarrays
// where each subarray sum is <= maxSum
function canSplit(nums, maxSum, k) {
  let currentSum = 0; // Tracks sum of current subarray
  let splitsRequired = 1; // We start with 1 subarray (the whole array)

  for (const num of nums) {
    currentSum += num;

    // If adding this number exceeds maxSum, we need a new split
    if (currentSum > maxSum) {
      splitsRequired++; // Increment split count
      currentSum = num; // Start new subarray with current number

      // If we've exceeded k splits, return false
      if (splitsRequired > k) {
        return false;
      }
    }
  }

  // If we completed the array with <= k splits, return true
  return true;
}
```

- Time: O(n × log(sum(nums))) - Binary search with linear validation
- Space: O(1) - Constant extra space

## Dry Run of Optimal Approach (Binary Search)

### Example 1: nums = [7,2,5,10,8], k = 2

- left = max(7,2,5,10,8) = 10
- right = 7+2+5+10+8 = 32

**Iteration 1**: mid = (10+32)/2 = 21

- canSplit(21):
  - [7,2,5] = 14 ≤ 21
  - [10,8] = 18 ≤ 21
  - splits = 2 ≤ k → possible
- right = 21

**Iteration 2**: mid = (10+21)/2 = 15

- canSplit(15):
  - [7,2,5] = 14 ≤ 15
  - [10] = 10 ≤ 15
  - [8] = 8 ≤ 15
  - splits = 3 > k → not possible
- left = 16

**Iteration 3**: mid = (16+21)/2 = 18

- canSplit(18):
  - [7,2,5] = 14 ≤ 18
  - [10,8] = 18 ≤ 18
  - splits = 2 ≤ k → possible
- right = 18

**Iteration 4**: left=16, right=18, mid=17

- canSplit(17):
  - [7,2,5] = 14 ≤ 17
  - [10] = 10 ≤ 17
  - [8] = 8 ≤ 17
  - splits = 3 > k → not possible
- left = 18

Now left == right → return 18

---

# Painter Partition II -- 6

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

---

# July 31th

# Median of 2 sorted arrays---1

We need to find the median of two sorted arrays without actually merging them (to achieve O(log(m+n)) time complexity).

### Intuition

The median divides a dataset into two equal halves. For two sorted arrays, we can find a partition that correctly divides the combined elements into left and right halves.

### Approach 1: Merge and Find Median (Brute Force)

- Merge both arrays into one sorted array
- Find the median of the merged array

```javascript
function findMedianSortedArrays(nums1, nums2) {
  const merged = [];
  let i = 0,
    j = 0;

  // Merge the two arrays
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  // Add remaining elements from nums1
  while (i < nums1.length) merged.push(nums1[i++]);

  // Add remaining elements from nums2
  while (j < nums2.length) merged.push(nums2[j++]);

  const n = merged.length;

  // Calculate median
  if (n % 2 === 0) {
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
  } else {
    return merged[Math.floor(n / 2)];
  }
}
```

- **Time Complexity**: O(m+n) - We iterate through all elements of both arrays
- **Space Complexity**: O(m+n) - We store all elements in a new merged array

### Approach 2: Binary Search on Smaller Array (Optimal)

**Intuition**

The goal is to find the median of the merged sorted array formed by two sorted arrays, `nums1` (size m) and `nums2` (size n), without explicitly merging them.

The median is:

- For an odd total length (m+n), the middle element.
- For an even total length, the average of the two middle elements.

Since the time complexity must be `O(log(m+n))`, a binary search is suggested, as it reduces the search space logarithmically.
The key idea is to partition both arrays into two parts (left and right halves) such that:

- The left half of the merged array consists of elements from the left parts of both `nums1` and `nums2`.
- The right half consists of elements from the right parts of both arrays.
- The partition is valid when elements in the left halves are less than or equal to elements in the right halves.
- The median lies at the boundary between these halves.

To minimize the search space, we perform binary search on the smaller array (to reduce the number of iterations to `O(log(min(m,n)))`). For each partition in the smaller array, we compute the corresponding partition in the larger array to balance the number of elements in the left and right halves of the merged array. We then check if the partition satisfies the median condition and adjust the search space accordingly.

#### Step 1: Ensure the First Array is Smaller

- To optimize, perform binary search on the smaller array (fewer elements mean fewer iterations).
- If `nums1` has more elements than `nums2`, swap them so that `nums1` is always the smaller array.
- Why? Binary search on the smaller array ensures the time complexity is `O(log(min(m,n)))`, which is always `≤ O(log(m+n))`.

```javascript
if (nums1.length > nums2.length) {
  [nums1, nums2] = [nums2, nums1];
}
```

#### Step 2: Initialize VariablesDefine:

- `m`: Length of `nums1` (smaller array).
- `n`: Length of `nums2` (larger array).
- `totalLength`: `m + n`, the total number of elements in the merged array.
- `left` : Start of binary search range (0, as we can take 0 elements from `nums1`).
- `right`: End of binary search range (m, as we can take all elements from `nums1`).

Purpose: These variables set up the binary search on the number of elements to take from `nums1` for the left half of the merged array.

```javascript
const m = nums1.length;
const n = nums2.length;
const totalLength = m + n;
let left = 0;
let right = m;
```

#### Step 3: Binary Search to Find the Partition

- Use a while loop to perform binary search until `left <= right`.
- For each iteration:
  - Compute `partitionLeft`: The number of elements to take from `nums1` for the `left` half, calculated as the midpoint of `left` and `right`.
  - Compute `partitionRight`: The number of elements to take from `nums2` for the `left` half, such that the total number of elements in the `left` half is `(totalLength + 1) / 2`.

This is derived as:

- Total elements in left half = `(m + n + 1) / 2` (using integer division).
- If we take `partitionLeft` elements from `nums1`, then `partitionRight` = (totalLength + 1) / 2 - `partitionLeft`.

Why `totalLength + 1`? This ensures the left half has at least as many elements as the right half (or one more for odd lengths), simplifying median calculation.

```javascript
while (left <= right) {
    const partitionLeft = Math.floor((left + right) / 2);
    const partitionRight = Math.floor((totalLength + 1) / 2) - partitionLeft;
```

#### Step 4: Determine Partition Elements

For the partition to be valid, we need to check the elements just before and after the partition points in both arrays:

- `leftArr1`: The last element in the left half of `nums1` (index `partitionLeft - 1`).
- `rightArr1`: The first element in the right half of `nums1` (index `partitionLeft`).
- `leftArr2`: The last element in the left half of `nums2` (index `partitionRight - 1`).
- `rightArr2`: The first element in the right half of `nums2` (index `partitionRight`).

Handle edge cases:

- If `partitionLeft = 0`, there are no elements in the left half of `nums1`, so `leftArr1 = -Infinity`.
- If `partitionLeft = m`, there are no elements in the right half of `nums1`, so `rightArr1 = Infinity`.
- Similarly for nums2: If `partitionRight = 0`, `leftArr2 = -Infinity`; if `partitionRight = n`, `rightArr2 = Infinity`.

- **Why Infinity?** Using `-Infinity` and `Infinity` handles edge cases (e.g., empty arrays or partitions at the boundaries) by ensuring comparisons work correctly.

```javascript
const leftArr1 = partitionLeft === 0 ? -Infinity : nums1[partitionLeft - 1];
const rightArr1 = partitionLeft === m ? Infinity : nums1[partitionLeft];
const leftArr2 = partitionRight === 0 ? -Infinity : nums2[partitionRight - 1];
const rightArr2 = partitionRight === n ? Infinity : nums2[partitionRight];
```

- **maxLeft1**: Largest element in nums1's left partition
- **minRight1**: Smallest element in nums1's right partition
- **maxLeft2**: Largest element in nums2's left partition
- **minRight2**: Smallest element in nums2's right partition
- **Edge Cases**: Handled with ±Infinity when partitions are at boundaries

#### Step 5: Validate the Partition

A valid partition satisfies:

- `leftArr1 <= rightArr2`: The largest element in the left half of `nums1` is less than or equal to the smallest element in the right half of `nums2`.
- `leftArr2 <= rightArr1`: The largest element in the left half of `nums2` is less than or equal to the smallest element in the right half of `nums1`.

These conditions ensure that all elements in the left half of the merged array are less than or equal to all elements in the right half, meaning the partition splits the merged array correctly around the median.

```javascript
if (leftArr1 <= rightArr2 && leftArr2 <= rightArr1) {
  // Valid partition found
}
```

#### Step 6: Compute the Median

If the partition is valid:

For odd total length `(totalLength % 2 === 1)`:

- The median is the largest element in the left half, i.e., `max(leftArr1, leftArr2)`.

For even total length (totalLength % 2 === 0):

- The median is the average of the largest element in the left half `(max(leftArr1, leftArr2))` and the smallest element in the right half `(min(rightArr1, rightArr2))`.

```javascript
if (totalLength % 2 === 1) {
  return Math.max(leftArr1, leftArr2);
}
return (Math.max(leftArr1, leftArr2) + Math.min(rightArr1, rightArr2)) / 2;
```

#### Step 7: Adjust the Search Space

If the partition is invalid:

- If `leftArr1 > rightArr2`: The partition in `nums1` includes too many elements (or too large elements), so move the partition to the left by setting `right = partitionLeft - 1`.
- If `leftArr2 > rightArr1`: The partition in `nums1` includes too few elements, so move the partition to the right by setting `left = partitionLeft + 1`.

**Why?** These adjustments reduce the search space by half, leveraging binary search to converge on the correct partition.

```javascript
} else if (leftArr1 > rightArr2) {
    right = partitionLeft - 1;
} else {
    left = partitionLeft + 1;
}
```

#### Step 8: Handle Invalid Input

If the binary search loop exits without finding a valid partition (i.e., `left > right`), it indicates the input arrays are not sorted or invalid. Throw an error in this case.

```javascript
throw new Error("Input arrays are not sorted");
```

## Full Code for Reference

```javascript
/**
 * Finds the median of two sorted arrays using binary search.
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @returns {number} - Median of the merged array
 */
function findMedianSortedArrays(nums1, nums2) {
  // Step 1: Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  // Step 2: Initialize variables
  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  let left = 0;
  let right = m;

  //  Binary search on the smaller array
  while (left <= right) {
    // Step 3: Compute partition points
    const partitionLeft = Math.floor((left + right) / 2); //mid

    const partitionRight = Math.floor((totalLength + 1) / 2) - partitionLeft;

    // Step 4: Get elements around partitions
    const leftArr1 = partitionLeft === 0 ? -Infinity : nums1[partitionLeft - 1];
    const rightArr1 = partitionLeft === m ? Infinity : nums1[partitionLeft];
    const leftArr2 =
      partitionRight === 0 ? -Infinity : nums2[partitionRight - 1];
    const rightArr2 = partitionRight === n ? Infinity : nums2[partitionRight];

    // Step 5: Check if partition is valid
    if (leftArr1 <= rightArr2 && leftArr2 <= rightArr1) {
      // Step 6: Compute median based on total length
      if (totalLength % 2 === 1) {
        return Math.max(leftArr1, leftArr2);
      }
      return (
        (Math.max(leftArr1, leftArr2) + Math.min(rightArr1, rightArr2)) / 2
      );
    } else if (leftArr1 > rightArr2) {
      // Step 7: Adjust partition to the left
      right = partitionLeft - 1;
    } else {
      // Step 7: Adjust partition to the right
      left = partitionLeft + 1;
    }
  }

  // Step 8: Handle invalid input
  throw new Error("Input arrays are not sorted");
}
```

- **Time Complexity**: O(log(min(m,n))) - We perform binary search on the smaller array
- **Space Complexity**: O(1) - We use only constant extra space

## Dry Run of Optimal Approach

### Example 1:

**Input**: nums1 = [1,3], nums2 = [2]

1. nums1 is smaller (length 2), nums2 length 1
2. totalLength = 3, halfLength = 2
3. Initial left=0, right=2
4. partition1=1, partition2=1
   - maxLeft1=1, minRight1=3
   - maxLeft2=2, minRight2=Infinity
   - Check: 1 <= Infinity && 2 <= 3 → true
5. totalLength is odd → return max(1,2) = 2

### Example 2:

**Input**: nums1 = [1,2], nums2 = [3,4]

1. nums1 is smaller (length 2), nums2 length 2
2. totalLength = 4, halfLength = 2
3. Initial left=0, right=2
4. First iteration:
   - partition1=1, partition2=1
   - maxLeft1=1, minRight1=2
   - maxLeft2=3, minRight2=4
   - Check: 1 <= 4 && 3 <= 2 → false (3 <= 2 fails)
   - Move left (since maxLeft2 > minRight1)
5. Second iteration:
   - partition1=2, partition2=0
   - maxLeft1=2, minRight1=Infinity
   - maxLeft2=-Infinity, minRight2=3
   - Check: 2 <= 3 && -Infinity <= Infinity → true
6. totalLength is even → return (max(2,-Infinity) + min(Infinity,3))/2 = (2+3)/2 = 2.5

### Example 3 (Edge Case: Empty Array):

**Input**: nums1 = [], nums2 = [1]

1. nums1 is empty, automatically return median of nums2 which is 1

The optimal approach efficiently finds the median without merging by using binary search to find the correct partition point.

# Aug 1 2025

# Kth element of 2 sorted arrays -- 2

We need to find the element that would be at the k-th position (1-based index) in the merged sorted array of two given sorted arrays, without actually merging them.

## Approaches

### 1. Brute Force (Merge and Find)

**Intuition**: Merge both arrays into a new sorted array and return the k-th element.

**Approach**:

- Create a new array by merging both arrays in sorted order
- Return the element at index k-1 (since arrays are 0-based in JavaScript)

**Time Complexity**: O(m+n) where m and n are lengths of the arrays
**Space Complexity**: O(m+n) for the merged array

```javascript
function findKthElementBruteForce(a, b, k) {
  const merged = [];
  let i = 0,
    j = 0;

  // Merge the two arrays
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      merged.push(a[i++]);
    } else {
      merged.push(b[j++]);
    }
  }

  // Add remaining elements from a
  while (i < a.length) {
    merged.push(a[i++]);
  }

  // Add remaining elements from b
  while (j < b.length) {
    merged.push(b[j++]);
  }

  // Return k-th element (1-based to 0-based index)
  return merged[k - 1];
}
```

### 2. Optimized Space (Merge Without Storing)

**Intuition**: We can merge virtually without storing the merged array by counting elements until we reach the k-th element.

**Approach**:

- Use two pointers to traverse both arrays
- Compare elements and move the pointer with the smaller element
- Count the steps until we reach the k-th element

**Time Complexity**: O(k)
**Space Complexity**: O(1)

```javascript
function findKthElementOptimized(a, b, k) {
  let i = 0,
    j = 0;
  let count = 0;
  let result;

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result = a[i++];
    } else {
      result = b[j++];
    }
    count++;
    if (count === k) {
      return result;
    }
  }

  // If we reach here, one array is exhausted
  // Check remaining elements in a
  while (i < a.length) {
    result = a[i++];
    count++;
    if (count === k) {
      return result;
    }
  }

  // Check remaining elements in b
  while (j < b.length) {
    result = b[j++];
    count++;
    if (count === k) {
      return result;
    }
  }

  return -1; // k is out of bounds
}
```

### 3. Binary Search Approach (Optimal)

**Intuition**: We can use binary search to partition both arrays such that the combined left parts contain exactly k elements.

**Approach**:

1. Ensure the first array is smaller for simplicity
2. Perform binary search on the smaller array
3. Partition both arrays such that total left elements = k
4. Compare boundary elements to find the correct partition

**Time Complexity**: O(log(min(m,n)))
**Space Complexity**: O(1)

```javascript
function findKthElementBinarySearch(a, b, k) {
  // Ensure a is the smaller array
  if (a.length > b.length) {
    return findKthElementBinarySearch(b, a, k);
  }

  const m = a.length;
  const n = b.length;
  let low = 0,
    high = Math.min(m, k);

  while (low <= high) {
    // Partition a such that we take partitionA elements from a
    const partitionA = Math.floor((low + high) / 2);
    // Partition b such that partitionA + partitionB = k
    const partitionB = k - partitionA;

    // Handle edge cases where partitions are at boundaries
    const maxLeftA = partitionA === 0 ? -Infinity : a[partitionA - 1];
    const minRightA = partitionA === m ? Infinity : a[partitionA];

    const maxLeftB = partitionB === 0 ? -Infinity : b[partitionB - 1];
    const minRightB = partitionB === n ? Infinity : b[partitionB];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      // Correct partition found
      return Math.max(maxLeftA, maxLeftB);
    } else if (maxLeftA > minRightB) {
      // Too many elements from a, move partition left
      high = partitionA - 1;
    } else {
      // Too few elements from a, move partition right
      low = partitionA + 1;
    }
  }

  return -1; // k is out of bounds
}
```

## Dry Run of Binary Search Approach

### Example 1:

a = [2, 3, 6, 7, 9], b = [1, 4, 8, 10], k = 5

1. Initial: low=0, high=5 (min of a.length and k)
2. partitionA=2, partitionB=3

   - maxLeftA=3, minRightA=6
   - maxLeftB=4, minRightB=8
   - Check: 3 <= 8 && 4 <= 6 → true
   - Return max(3,4) = 4 ❌ (Incorrect, should be 6)

   Wait, this shows a problem with our initial approach. Actually, the correct answer is 6, but our binary search approach is giving 4. This indicates we need to adjust our approach.

   The issue is that we're not properly handling the case where the k-th element is in the right part of the arrays. Let me re-examine the binary search approach.

After re-evaluating, I realize the correct binary search approach should:

1. Make sure we're selecting k elements total from both arrays
2. The correct partition is when all elements in the left partitions are ≤ all elements in right partitions
3. Then the k-th element is the maximum of the two left partitions

In the example:

- With partitionA=3, partitionB=2
  - maxLeftA=6, minRightA=7
  - maxLeftB=4, minRightB=8
  - Check: 6 <= 8 && 4 <= 7 → true
  - Return max(6,4) = 6 ✅

This gives the correct answer. The initial partition was incorrect because it didn't satisfy the condition properly.

---

# Find the row with maximum number of 1's---4

You are given a 2D binary array arr[][] consisting of only 1s and 0s. Each row of the array is sorted in non-decreasing order.
Your task is to find and return the index of the first row that contains the maximum number of 1s. If no such row exists, return -1.

- Input: arr[][] = `[[0,1,1,1], [0,0,1,1], [1,1,1,1], [0,0,0,0]]`
- Output: 2
- Explanation: Row 2 contains the most number of 1s (4 1s). Hence, the output is 2.

BRUTE FORCE
FAILED APPROACH

```javascript
function rowWithMax1s(arr) {
  // code here

  // [[0,1,1,1],   R
  //  [0,0,1,1],
  //  [1,1,1,1],
  //  [0,0,0,0]]
  //   C

  // let cols = arr.length;
  // let rows = arr[0].length; // TRAVERSED COL WISE

  let cols = arr[0].length;
  let rows = arr.length;
  let maxSum = 0;
  let maxRow = -1;

  // loop over each cols
  for (let row = 0; row < rows; row++) {
    // LOOP1

    let currentSum = 0;
    for (let col = 0; col < cols; col++) {
      //LOOP 2
      if (arr[row][col] === 1) {
        currentSum++;
      }
      if (currentSum > maxSum) {
        maxSum = currentSum;
        maxRow = row;
      }
    }
  }
  // loop over each row in cols
  // maintain a max length variable and currentMax for counting 1's
  // if currentMax > maxLen
  //  maxLen = currentMax;
  // return row;

  return maxRow;
}
```

```javascript
//Approach 1: Brute Force - Count 1s in Each Row

function findRowWithMaxOnesBruteForce(binaryMatrix) {
  let maxCount = 0;
  let resultRow = -1;

  for (let row = 0; row < binaryMatrix.length; row++) {
    let currentCount = 0;
    // Count 1s in current row (since it's sorted, we can stop at first 0)
    for (let col = 0; col < binaryMatrix[row].length; col++) {
      if (binaryMatrix[row][col] === 1) currentCount++;
    }
    // Update max count and result if current row has more 1s
    if (currentCount > maxCount) {
      maxCount = currentCount;
      resultRow = row;
    }
  }

  return resultRow;
}
```

OPTIMIZED APPROACH

```javascript
// Approach 2: Binary Search to Count 1s in Each Row
/**
 * Finds the first row with maximum number of 1s using binary search per row.
 * @param {number[][]} binaryMatrix - The 2D binary array with rows sorted in non-decreasing order
 * @return {number} - Index of the first row with max 1s, or -1 if no 1s exist
 */
function findRowWithMaxOnesBinarySearch(binaryMatrix) {
  let maxCount = 0;
  let resultRow = -1;

  for (let row = 0; row < binaryMatrix.length; row++) {
    // Use binary search to find the first occurrence of 1
    const firstOneIndex = findFirstOne(binaryMatrix[row]);
    const currentCount =
      firstOneIndex === -1 ? 0 : binaryMatrix[row].length - firstOneIndex;

    // Update max count and result if current row has more 1s
    if (currentCount > maxCount) {
      maxCount = currentCount;
      resultRow = row;
    }
  }

  return resultRow;
}

/**
 * Helper function to find the first occurrence of 1 in a sorted binary array
 * @param {number[]} arr - Sorted binary array
 * @return {number} - Index of first 1, or -1 if no 1s exist
 */
function findFirstOne(arr) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 1) {
      result = mid;
      right = mid - 1; // Look for earlier 1s
    } else {
      left = mid + 1;
    }
  }

  return result;
}
```

---

# LC- 74 Search a 2D Matrix --5

Given an n x m matrix, find a target value in the matrix.

The matrix has the following properties:

1. Integers in each row are sorted from left to right.
2. The first integer of each row is greater than the last integer of the previous row.

- Example 1: I: matrix = `[[1,3,5],[7,9,11],[13,15,17]]`, target = 9, O: true
  Explanation: The target value 9 is found in the matrix.

```javascript
/**
 * Searches for a target value in a 2D matrix where:
 * - Each row is sorted in ascending order
 * - The first integer of each row is greater than the last integer of the previous row
 *
 * @param {number[][]} binaryMatrix - The 2D matrix with sorted rows and columns
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists in matrix, false otherwise
 */
var searchMatrix = function (binaryMatrix, target) {
  // Handle edge cases: empty matrix or empty rows
  if (!binaryMatrix.length || !binaryMatrix[0].length) {
    return false;
  }

  // Iterate through each row in the matrix
  for (let row = 0; row < binaryMatrix.length; row++) {
    // perform binary search in the current row
    const targetIndex = binarySearchInRow(binaryMatrix[row], target);
    if (targetIndex) return true;
  }

  return false;
};

/**
 * Helper function to perform binary search on a sorted array
 *
 * @param {number[]} sortedArray - The sorted array to search
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists in array, false otherwise
 */
function binarySearchInRow(sortedArray, target) {
  let leftPointer = 0;
  let rightPointer = sortedArray.length - 1;

  while (leftPointer <= rightPointer) {
    const middleIndex = Math.floor((leftPointer + rightPointer) / 2);
    const middleValue = sortedArray[middleIndex];

    if (middleValue === target) {
      return true;
    } else if (middleValue < target) {
      // Search the right half
      leftPointer = middleIndex + 1;
    } else {
      // Search the left half
      rightPointer = middleIndex - 1;
    }
  }

  return false;
}
```

---

# 240. Search a 2D Matrix II --6

Write an efficient algorithm that searches for a value target in an `m x n` integer matrix matrix. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

Example 1:
Input: matrix = `[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]`, target = 5, O: true
Input: matrix = `[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]`, target = 20, Output: false

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (binaryMatrix, target) {
  // Handle edge cases: empty matrix or empty rows
  if (!binaryMatrix.length || !binaryMatrix[0].length) {
    return false;
  }

  // Iterate through each row in the matrix
  for (let row = 0; row < binaryMatrix.length; row++) {
    // perform binary search in the current row
    const targetIndex = binarySearchInRow(binaryMatrix[row], target);
    if (targetIndex) return true;
  }

  return false;
};

// refer to binarySearchInRow function in above
```

---

# 2nd Aug 2025

---

# Minimizing Maximum Distance Between Gas Stations --3

We have a horizontal number line. On that number line, we have gas stations at positions `stations[0], stations[1], ..., stations[n-1]`,
where `n` is the size of the stations array.
Now, we add `k` more gas stations so that `d`, the maximum distance between adjacent gas stations, is minimized.
We have to find the smallest possible value of `d`. Find the answer exactly to 2 decimal places.
Note: stations is in a strictly increasing order.

**Example 1:**

- Input: n = `10`, stations[] = `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`,- k = `9`, Output: `0.50`
- Explanation: Each of the 9 stations can be added mid way between all the existing adjacent stations.

**Example 2:**

- Input: n = `10`, stations[] = `[3, 6, 12, 19, 33, 44, 67, 72, 89, 95]` k = `2` Output: `14.00`
- Explanation: Construction of gas stations at 8th(between 72 and 89) and 6th(between 44 and 67) locations.

## Problem Intuition and Approach

The problem involves `minimizing the maximum distance` between adjacent gas stations by strategically placing `k` new stations.

- **Understanding the Objective:** The maximum distance `d` between any two adjacent stations after adding `k` stations is determined by the largest gap between consecutive stations (including new ones). Our goal is to place the new stations such that this largest gap is as small as possible.
- **Key Insight:** For a given maximum distance `d`, we can calculate how many new stations are needed to ensure that every gap between adjacent stations is at most `d`. If we can achieve this with `≤k` stations, then `d` is feasible. The smallest such `d` is our answer.
- **Binary Search on the Answer:** Since `d` is a real number and we need the answer to two decimal places, binary search is an efficient approach to find the smallest `d`. We can search over possible values of `d` and check if it’s possible to place ( k ) or fewer stations to make all gaps at most `d`.
- **Feasibility Check:** For a given `d`, compute the number of new stations needed in each existing gap (between `stations[i]` and `stations[i+1]`).
  If the gap size is `g`, we need `⌊g/d⌋` new stations to break the gap into segments of size at most `d`. Sum these across all gaps and check if the total is `≤k`.
- **Edge Cases**:
  - If `k=0`, no new stations are added, so `d` is the maximum of the current gaps.
  - If the gaps are uneven, we prioritize placing stations in larger gaps to reduce the maximum distance.
  - The answer should be precise to two decimal places, so we handle floating-point precision carefully.

**Binary Search Approach:**

Use binary search to find the smallest `d`. This is optimal for large inputs due to its logarithmic time complexity in searching for ( d ).

```javascript
function canAchieveMaxDist(stations, d, k) {
  let stationsNeeded = 0;
  // Check each gap between consecutive stations
  for (let i = 1; i < stations.length; i++) {
    const gap = stations[i] - stations[i - 1];
    // Number of stations needed to make this gap have segments <= d
    stationsNeeded += Math.floor(gap / d);
  }
  // Return true if we can achieve max distance d with k or fewer stations
  return stationsNeeded <= k;
}

function findSmallestMaxDist(stations, k) {
  const n = stations.length;

  // Binary search for the smallest possible max distance
  let left = 0; // Minimum possible max distance
  let right = stations[n - 1] - stations[0]; // Maximum possible gap
  let precision = 1e-6; // Precision for binary search
  let result = right;

  while (right - left > precision) {
    let mid = (left + right) / 2;
    if (canAchieveMaxDist(stations, mid, k)) {
      // If feasible, try a smaller max distance
      result = mid;
      right = mid;
    } else {
      // If not feasible, need a larger max distance
      left = mid;
    }
  }

  // Return result rounded to 2 decimal places
  return Number(result.toFixed(2));
}
// Test the function
const stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const k = 9;
console.log(findSmallestMaxDist(stations, k)); // Output: 0.50
```

**Brute Force**

```javascript
function findSmallestMaxDist(stations, k) {
  // placedCount: will be like a imaginary space where we keep track of how many stations are placed
  const placedCount = new Array(stations.length - 1).fill(0);

  // loop to find out the placedcount, so it can be used later to find the maxDistance
  for (let i = 0; i < k; i++) {
    // find maxi, maxInd
    let maxi = 0,
      maxInd = -1;
    for (let j = 0; j < stations.length - 1; j++) {
      // find diff,
      const diff = (stations[j + 1] - stations[j]) / (placedCount[j] + 1);
      if (maxi < diff) {
        maxi = diff;
        maxInd = j;
      }
    }

    placedCount[maxInd]++;
  }

  // loop to find the maxDisatance from obtained placedCount
  let maxAns = 0;
  for (let j = 0; j < stations.length - 1; j++) {
    // find diff,
    const diff = (stations[j + 1] - stations[j]) / (placedCount[j] + 1);
    maxAns = Math.max(maxAns, diff);
  }
  return maxAns;
}
```

# Find Peak Element (2D Matrix) ---7

# Matrix Median --- 8

Given a `row-wise sorted` matrix `mat[][]` where the `number of rows and columns is always odd`.
Return the median of the matrix.

Examples:

- Input: `mat[][]` = `[[1, 3, 5],[2, 6, 9],[3, 6, 9]]` Output: `5` Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9]. Hence, 5 is median.
- Input: `mat[][]` = `[[2, 4, 9],[3, 6, 7],[4, 7, 10]]` Output: `6` Explanation: Sorting matrix elements gives us [2, 3, 4, 4, 6, 7, 7, 9, 10]. Hence, 6 is median.
- Input: `mat` = `[[3], [4], [8]]` Output: `4` Explanation: Sorting matrix elements gives us [3, 4, 8]. Hence, 4 is median.

```javascript
//Approach 1: Flatten and Sort (Brute Force)
/**
 * Finds the median of a row-wise sorted matrix by flattening and sorting
 * Time Complexity: O(mn log mn) where m is rows, n is columns
 * Space Complexity: O(mn) for storing all elements
 */
function matrixMedianFlattenSort(matrix) {
  // Flatten the matrix into a single array
  const flattened = matrix.flat();

  // Sort the flattened array in ascending order
  flattened.sort((a, b) => a - b);

  // Find the middle index (since matrix size is always odd)
  const middleIndex = Math.floor(flattened.length / 2);

  // Return the middle element
  return flattened[middleIndex];
}

const mat = [
  [1, 3, 5],
  [2, 6, 9],
  [3, 6, 9],
];
console.log(matrixMedianFlattenSort(mat)); // Output: 5

/**
 * Finds the median using binary search on the median value
 * Time Complexity: O(m log n log max-min) where m is rows, n is columns
 * Space Complexity: O(1)
 */
function matrixMedianBinarySearch(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const totalElements = rows * cols;
  const medianPosition = Math.floor(totalElements / 2);

  // Find the minimum and maximum in the matrix
  let min = matrix[0][0];
  let max = matrix[0][cols - 1];

  for (let i = 1; i < rows; i++) {
    min = Math.min(min, matrix[i][0]);
    max = Math.max(max, matrix[i][cols - 1]);
  }

  // Binary search between min and max
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    let count = 0;

    // Count numbers less than or equal to mid in each row
    for (let i = 0; i < rows; i++) {
      let left = 0;
      let right = cols - 1;

      // Binary search in current row
      while (left <= right) {
        const midCol = Math.floor((left + right) / 2);
        if (matrix[i][midCol] <= mid) {
          left = midCol + 1;
        } else {
          right = midCol - 1;
        }
      }
      count += left;
    }

    if (count <= medianPosition) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min;
}

console.log(matrixMedianBinarySearch(mat)); // Output: 5
```
