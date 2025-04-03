//LC-34 Find first and last position of element in sorted array
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:
// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:
// Input: nums = [], target = 0
// Output: [-1,-1]
// Constraints:
// 0 <= nums.length <= 105

//Approach 1: Binary Search Twice (Most Efficient)
/**
 * Finds the first and last position of target in a sorted array
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Value to search for
 * @return {number[]} - Array with first and last indices of target, or [-1, -1] if not found
 */
function searchRange(nums, target) {
  const firstOccurrence = findBound(nums, target, true);

  // If target doesn't exist in the array, return [-1, -1]
  if (firstOccurrence === -1) {
    return [-1, -1];
  }

  const lastOccurrence = findBound(nums, target, false);
  return [firstOccurrence, lastOccurrence];
}

/**
 * Helper function to find either the first or last occurrence of target
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Value to search for
 * @param {boolean} isFirst - Flag to determine if we're searching for first occurrence
 * @return {number} - Index of first/last occurrence, or -1 if not found
 */
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

//Approach 2: Binary Search with Custom Comparison

function searchRange(nums, target) {
  function findFirst() {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }

      if (nums[mid] === target) {
        result = mid;
      }
    }

    return result;
  }

  function findLast() {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] <= target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }

      if (nums[mid] === target) {
        result = mid;
      }
    }

    return result;
  }

  const first = findFirst();
  const last = findLast();

  return [first, last];
}
