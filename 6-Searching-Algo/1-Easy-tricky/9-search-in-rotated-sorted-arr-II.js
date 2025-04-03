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
 * Find pivot then binary search
 * Time Complexity: O(log n) average case, O(n) worst case
 * Space Complexity: O(1)
 */
/**
 * Fixed Find pivot then binary search
 * Time Complexity: O(log n) average case, O(n) worst case
 * Space Complexity: O(1)
 */
function searchInRotatedArrayWithPivot(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  // Find the pivot (smallest element)
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      // Special case: if right is not the smallest, we need to check
      if (nums[right] >= nums[right - 1]) {
        right--;
      } else {
        // Found the pivot at right
        left = right;
        break;
      }
    }
  }

  const pivot = left;
  left = 0;
  right = nums.length - 1;

  // Determine which side to search
  if (target >= nums[pivot] && target <= nums[right]) {
    left = pivot;
  } else {
    right = pivot - 1;
  }

  // Binary search on the selected side
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return true;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
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
    if (nums[mid] === target) {
      return true;
    }

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
