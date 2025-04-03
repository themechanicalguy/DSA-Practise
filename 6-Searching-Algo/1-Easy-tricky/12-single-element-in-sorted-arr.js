//LC 540 Single Element in a Sorted Array
// Given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once.
// Your solution should run in O(log n) time complexity.
// Example 1:
// Input: nums = [1,1,2,2,3,3,4,5,5]
// Output: 4
// Explanation: The single element is 4.
// Example 2:
// Input: nums = [1,2,2,3,3,4,4,5,5]
// Output: 1
// Explanation: The single element is 1.

/**
 * Finds the single non-duplicate element in a sorted array using binary search.
 * @param {number[]} nums - Sorted array of integers where every element appears twice except one
 * @return {number} - The single element
 */
function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // Find the middle index
    let mid = Math.floor((left + right) / 2);

    // Ensure mid is even to check pairs properly
    if (mid % 2 === 1) {
      mid--;
    }

    // If the pair is intact, the single element is on the right
    if (nums[mid] === nums[mid + 1]) {
      left = mid + 2;
    } else {
      // Otherwise, it's on the left (including current mid)
      right = mid;
    }
  }

  return nums[left];
}
