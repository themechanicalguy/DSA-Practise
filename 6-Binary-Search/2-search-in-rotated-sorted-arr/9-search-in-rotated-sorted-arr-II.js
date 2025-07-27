//LC- 81 Search in Rotated Sorted Array II
// Given an integer array nums sorted in ascending order, possibly rotated at some pivot unknown to you beforehand,
// and an integer target, return true if target is in nums, or false if it is not.
// The array may contain duplicates.
// Example 1:
// Input: nums = [2,5,6,0,0,1,2], target = 0
// Output: true
// Example 2:
// Input: nums = [2,5,6,0,0,1,2], target = 3
// Output: false
// Example 3:
// Input: nums = [1,0,1,1,1], target = 0
// Output: true
// Example 4:
// Input: nums = [1,1,1,1,1], target = 0
// Output: false

//Approach 1: Linear Search (Brute Force)
/**
 * Linear search through the array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function searchInRotatedArrayLinear(nums, target) {
  for (const num of nums) {
    if (num === target) {
      return true;
    }
  }
  return false;
}

console.log(searchInRotatedArrayLinear(nums1, 0)); // true
console.log(searchInRotatedArrayLinear(nums2, 3)); // false

// Approach 2: Find Pivot + Binary Search
/**
 * Searches for a target in a rotated sorted array with duplicates using iterative pivot finding and binary search.
 * @param {number[]} nums - The rotated sorted array with duplicates
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists, false otherwise
 */
function searchInRotatedArrayIterative(nums, target) {
  if (nums.length === 0) return false;

  // Iterative function to find the pivot index (point of rotation)
  function findPivotIterative(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      // If mid element is greater than next element, mid is the pivot
      if (mid < right && arr[mid] > arr[mid + 1]) {
        return mid;
      }

      // If mid element is less than previous element, mid-1 is the pivot
      if (mid > left && arr[mid] < arr[mid - 1]) {
        return mid - 1;
      }

      // If elements at left, mid and right are same, we need to skip duplicates
      if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
        // Move left pointer if left is not pivot
        if (arr[left] > arr[left + 1]) {
          return left;
        }
        left++;

        // Move right pointer if right is not pivot
        if (arr[right] < arr[right - 1]) {
          return right - 1;
        }
        right--;
      }
      // Left side is sorted, so pivot must be in right side
      else if (arr[left] <= arr[mid]) {
        left = mid + 1;
      }
      // Right side is sorted, so pivot must be in left side
      else {
        right = mid - 1;
      }
    }

    // No pivot found (array is not rotated)
    return -1;
  }

  // Standard iterative binary search
  function binarySearchIterative(arr, left, right, target) {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return true;
      }
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return false;
  }

  const pivot = findPivotIterative(nums);

  // If no pivot found, array is not rotated - perform normal binary search
  if (pivot === -1) {
    return binarySearchIterative(nums, 0, nums.length - 1, target);
  }

  // Check if pivot is the target
  if (nums[pivot] === target) {
    return true;
  }

  // Decide which part to search based on target value
  if (nums[0] <= target) {
    return binarySearchIterative(nums, 0, pivot - 1, target);
  }
  return binarySearchIterative(nums, pivot + 1, nums.length - 1, target);
}

console.log(searchInRotatedArrayWithPivot(nums1, 0)); // true
console.log(searchInRotatedArrayWithPivot(nums2, 3)); // false

// Approach 3: Binary Search (Optimized)
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
