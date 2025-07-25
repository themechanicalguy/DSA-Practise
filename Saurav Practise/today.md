# Search in an almost Sorted Array

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
