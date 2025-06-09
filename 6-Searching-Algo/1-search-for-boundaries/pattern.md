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

## Intuition

The intuition behind the Search for Boundaries pattern lies in leveraging the sorted nature of the array or the monotonic property of a condition.
Instead of stopping when a target is found, we continue searching to find the extreme (leftmost or rightmost) position that satisfies the condition. This is achieved by:

- Adjusting the search space to exclude portions that cannot contain the boundary.
- For the **left boundary** (first occurrence), when we find a match, we exclude the right half and continue searching in the left half to see if an earlier occurrence exists.
- For the **right boundary** (last occurrence), when we find a match, we exclude the left half and continue searching in the right half to find a later occurrence.

The key is to update the boundary variable (e.g., `leftBound` or `rightBound`) whenever a valid candidate is found and to keep narrowing the search space until the boundary is confirmed.

## Approach to Solve

- **Initialize pointers:** Set `left` to 0 and `right` to the last index of the array (`length - 1`).
- **Track the boundary:** Use a variable to store the `leftmost` or `rightmost` position found so far (e.g., leftBound or rightBound).
- **Binary search loop:**

  - Compute the middle index (`mid`).
  - Check if the middle element is the target or satisfies the condition.
  - For `left boundary`: If a match is found, update leftBound = mid and search the left half `(right = mid - 1)` to find an earlier occurrence.
  - For `right boundary`: If a match is found, update rightBound = mid and search the right half `(left = mid + 1)` to find a later occurrence.
  - If no match, adjust `left` or `right` based on whether the target is greater or less than the middle element.

- **Termination:** The loop ends when `left > right`. Return the stored boundary.

## Example Problems and JavaScript Code

### Problem 1: Find the First and Last Position of Element in Sorted Array

Given a sorted array `nums` with possible duplicates, find the first and last positions of a target value. If the target is not found, return `[-1, -1]`.
Input: nums = `[5,7,7,8,8,10]`, target = `8`
Output: `[3, 4]`

```javascript
/**
 * Finds the first and last positions of a target in a sorted array.
 * @param {number[]} nums - Sorted array with possible duplicates
 * @param {number} target - Target value to find
 * @return {number[]} - Array containing first and last positions
 */
function searchRange(nums, target) {
  // Helper function to find left boundary (first occurrence)
  function findLeft(nums, target) {
    let left = 0,
      right = nums.length - 1;
    let leftBound = -1; // Store leftmost position of target

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        leftBound = mid; // Potential left boundary
        right = mid - 1; // Search left half for earlier occurrence
      } else if (nums[mid] < target) {
        left = mid + 1; // Target is in right half
      } else {
        right = mid - 1; // Target is in left half
      }
    }
    return leftBound;
  }

  // Helper function to find right boundary (last occurrence)
  function findRight(nums, target) {
    let left = 0,
      right = nums.length - 1;
    let rightBound = -1; // Store rightmost position of target

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        rightBound = mid; // Potential right boundary
        left = mid + 1; // Search right half for later occurrence
      } else if (nums[mid] < target) {
        left = mid + 1; // Target is in right half
      } else {
        right = mid - 1; // Target is in left half
      }
    }
    return rightBound;
  }

  return [findLeft(nums, target), findRight(nums, target)];
}

// Test cases
console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]
console.log(searchRange([1], 1)); // [0, 0]
```

## Problem 2: Find the Minimum in Rotated Sorted Array

Given a sorted array rotated at some pivot, find the `minimum element`. Assume no duplicates.
Example:
Input: nums = `[3,4,5,1,2]`
Output: `1`
Input: nums = `[4,5,6,7,0,1,2]`
Output: `0`

```javascript
/**
 * Finds the minimum element in a rotated sorted array.
 * @param {number[]} nums - Rotated sorted array without duplicates
 * @return {number} - Minimum element
 */
function findMin(nums) {
  let left = 0,
    right = nums.length - 1;
  let minVal = nums[0]; // Initialize with first element

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // If mid element is greater than right element, minimum is in right half
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    }
    // If mid element is less than or equal to right, minimum is in left half including mid
    else {
      minVal = Math.min(minVal, nums[mid]); // Update minimum
      right = mid - 1;
    }
  }

  return minVal;
}

// Test cases
console.log(findMin([3, 4, 5, 1, 2])); // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([1])); // 1
```

### Time Complexity

- **O(log n)**

### Examples

1. Find the first and last position of an element in a sorted array.  
   _(e.g., LeetCode: Find First and Last Position of Element in Sorted Array)_

2. Find the leftmost insertion point for a target.

### Conditions

- Input is a **sorted array** with possible duplicates.
- Requires tweaking the binary search logic to bias toward one side after finding a match.
