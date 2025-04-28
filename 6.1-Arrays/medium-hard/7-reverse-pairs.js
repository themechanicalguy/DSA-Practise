//LC 493. Reverse Pairs
// Given an integer array nums, return the number of reverse pairs in the array.
// A reverse pair is a pair (i, j) where:
// 0 <= i < j < nums.length and
// nums[i] > 2 * nums[j].
// Example 1:
// Input: nums = [1,3,2,3,1]
// Output: 2
// Explanation: The reverse pairs are:
// (1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
// (3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1

//Approach 1. Brute Force Solution
/**
 * Counts reverse pairs using brute force approach
 * @param {number[]} nums - The input array
 * @return {number} - The count of reverse pairs
 */
function reversePairsBruteForce(nums) {
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] > 2 * nums[j]) {
        count++;
      }
    }
  }

  return count;
}

// Example usage:
const nums = [1, 3, 2, 3, 1];
console.log(reversePairsBruteForce(nums)); // Output: 2

//2. Optimized Merge Sort Solution
/**
 * Counts the number of reverse pairs in the array using merge sort.
 * A reverse pair is (i, j) where i < j and nums[i] > 2 * nums[j].
 * @param {number[]} nums - Input array of integers
 * @return {number} - Number of reverse pairs
 */
function reversePairs(nums) {
  // Return 0 if array is empty or has one element
  if (!nums || nums.length < 2) return 0;

  // Start merge sort and count reverse pairs
  return mergeSort(nums, 0, nums.length - 1);
}

// Merge sort function that also counts reverse pairs
function mergeSort(nums, left, right) {
  // Base case: single element or empty array
  if (left >= right) return 0;

  // Find middle point
  const mid = Math.floor((left + right) / 2);

  // Recursively count pairs in left and right halves
  let count = mergeSort(nums, left, mid) + mergeSort(nums, mid + 1, right);

  // Count cross-subarray reverse pairs and merge
  count += mergeAndCount(nums, left, mid, right);

  return count;
}

// Merge two sorted subarrays and count reverse pairs
function mergeAndCount(nums, left, mid, right) {
  let count = 0;

  // Count reverse pairs where nums[i] > 2 * nums[j]
  // i is in left subarray, j is in right subarray
  let j = mid + 1; // Pointer for right subarray
  for (let i = left; i <= mid; i++) {
    // Move j until nums[i] <= 2 * nums[j]
    while (j <= right && nums[i] > 2 * nums[j]) {
      j++;
    }
    // All elements from mid+1 to j-1 form reverse pairs with nums[i]
    count += j - (mid + 1);
  }

  // Standard merge process
  const temp = [];
  let i = left; // Pointer for left subarray
  j = mid + 1; // Pointer for right subarray
  let k = 0; // Pointer for temp array

  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      temp[k++] = nums[i++];
    } else {
      temp[k++] = nums[j++];
    }
  }

  // Copy remaining elements from left subarray
  while (i <= mid) {
    temp[k++] = nums[i++];
  }

  // Copy remaining elements from right subarray
  while (j <= right) {
    temp[k++] = nums[j++];
  }

  // Copy merged elements back to original array
  for (let p = 0; p < temp.length; p++) {
    nums[left + p] = temp[p];
  }

  return count;
}

// Example usage
const nums1 = [1, 3, 2, 3, 1];
console.log(reversePairsMergeSort(nums1)); // Output: 2
