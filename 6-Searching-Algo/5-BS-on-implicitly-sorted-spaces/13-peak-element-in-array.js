//LC - 162 Find Peak Element
// Given an array of integers, find a peak element in the array.
// An element is considered a peak if it is greater than or equal to its neighbors.
// For corner elements, we need to consider only one neighbor.
// For example, in the array [1, 2, 3, 1], 3 is a peak element.
// In the array [1, 2, 1, 3, 5, 6, 4], 6 is a peak element.
// The problem can be solved using binary search.
// The idea is to compare the middle element with its neighbors.

//Brute force approach

/**
 * Finds a peak element using linear scan
 * @param {number[]} nums - Array of integers
 * @return {number} - Index of a peak element
 */
function findPeakElementLinear(nums) {
  let peak = -1;
  for (let i = 0; i < nums.length; i++) {
    // Check if current element is greater than both neighbors
    const isGreaterThanLeft = i === 0 || nums[i] > nums[i - 1];
    const isGreaterThanRight = i === nums.length - 1 || nums[i] > nums[i + 1];

    if (isGreaterThanLeft && isGreaterThanRight) {
      peak = i;
    }
  }
  return peak; // should never reach here for valid input
}

/**
 * Finds a peak element in an array using binary search.
 * @param {number[]} nums - Array of integers
 * @return {number} - Index of a peak element
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If mid is in a decreasing sequence, peak is to the left
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      // Otherwise, peak is to the right
      left = mid + 1;
    }
  }

  return left;
}

console.log(peakElement([0, 10, 5, 2]));
