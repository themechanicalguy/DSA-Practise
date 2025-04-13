//LC - 33 Search in Rotated Sorted Array
// Given an integer array nums sorted in ascending order, possibly rotated at some pivot unknown to you beforehand,
// and an integer target, return the index of target in nums, or -1 if target is not in nums.
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4

//Approach 1: Find Pivot + Binary Search (Two Pass)
/**
 * Search in rotated sorted array by first finding pivot, then binary searching
 * @param {number[]} nums - The rotated sorted array
 * @param {number} target - The value to search for
 * @return {number} - Index of target or -1 if not found
 */
function searchRotatedArrayTwoPass(nums, target) {
  if (nums.length === 0) return -1;

  // Step 1: Find the index of the smallest element (pivot)
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const pivot = left;
  left = 0;
  right = nums.length - 1;

  // Step 2: Determine which side of the pivot to search
  if (target >= nums[pivot] && target <= nums[right]) {
    left = pivot;
  } else {
    right = pivot - 1;
  }

  // Step 3: Perform standard binary search
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// Example usage
const nums = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotatedArrayTwoPass(nums, target)); // Output: 4

//Approach 2: Modified Binary Search (Single Pass)

/**
 * Search in rotated sorted array using modified binary search (single pass)
 * @param {number[]} nums - The rotated sorted array
 * @param {number} target - The value to search for
 * @return {number} - Index of target or -1 if not found
 */
function searchRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // If target is found at mid, return immediately
    if (nums[mid] === target) {
      return mid;
    }

    // Check if the left half is sorted
    if (nums[left] <= nums[mid]) {
      // If target is within the sorted left half range
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }
    // Otherwise, the right half must be sorted
    else {
      // If target is within the sorted right half range
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

// Example usage

const target = 0;
console.log(searchRotatedArray(nums, target)); // Output: 4
