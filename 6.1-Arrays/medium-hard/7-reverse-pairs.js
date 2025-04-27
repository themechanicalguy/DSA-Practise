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
function reversePairsMergeSort(nums) {
  // Start the merge sort process
  return mergeSort(nums, 0, nums.length - 1);
}

function mergeSort(arr, start, end) {
  if (start >= end) return 0;

  const mid = Math.floor((start + end) / 2);
  let count = 0;

  // Recursively count pairs in left and right halves
  count += mergeSort(arr, start, mid);
  count += mergeSort(arr, mid + 1, end);

  // Count cross-subarray reverse pairs
  count += countCrossPairs(arr, start, mid, end);

  // Merge the sorted subarrays
  merge(arr, start, mid, end);

  return count;
}

// Counts reverse pairs between left and right subarrays
function countCrossPairs(arr, start, mid, end) {
  let count = 0;
  let rightIndex = mid + 1;

  // For each element in left subarray, find elements in right subarray
  for (let leftIndex = start; leftIndex <= mid; leftIndex++) {
    // Use BigInt to handle large numbers safely
    while (rightIndex <= end && arr[leftIndex] > 2 * arr[rightIndex]) {
      rightIndex++;
    }
    count += rightIndex - (mid + 1);
  }

  return count;
}

// Merges two sorted subarrays while maintaining sorted order
function merge(arr, start, mid, end) {
  const temp = [];
  let leftIndex = start;
  let rightIndex = mid + 1;

  // Merge elements in sorted order
  while (leftIndex <= mid && rightIndex <= end) {
    if (arr[leftIndex] <= arr[rightIndex]) {
      temp.push(arr[leftIndex++]);
    } else {
      temp.push(arr[rightIndex++]);
    }
  }

  // Copy remaining elements from left subarray
  while (leftIndex <= mid) {
    temp.push(arr[leftIndex++]);
  }

  // Copy remaining elements from right subarray
  while (rightIndex <= end) {
    temp.push(arr[rightIndex++]);
  }

  // Copy merged elements back to original array
  for (let i = 0; i < temp.length; i++) {
    arr[start + i] = temp[i];
  }
}

// Example usage
const nums1 = [1, 3, 2, 3, 1];
console.log(reversePairsMergeSort(nums1)); // Output: 2
