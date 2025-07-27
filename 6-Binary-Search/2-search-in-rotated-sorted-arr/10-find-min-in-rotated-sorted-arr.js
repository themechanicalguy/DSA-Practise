//LC- 153 Find Minimum in Rotated Sorted Array
//Given an integer array nums sorted in ascending order, rotated at some pivot unknown to you beforehand,
//return the minimum element of this array.
//You may assume no duplicates exist in the array.
//Example 1:
//Input: nums = [3,4,5,1,2]
//Output: 1
//Example 2:
//Input: nums = [4,5,6,7,0,1,2]
//Output: 0

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // brute force linear search
  // optimal - binary search
  let n = nums.length;
  let left = 0;
  let right = n - 1;
  let min = Infinity;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    // check which side is sorted
    if (nums[left] <= nums[mid]) {
      //left half is sorted
      //get min from left half
      min = Math.min(min, nums[left]);
      left = mid + 1;
    } else {
      //right half is sorted and arr[min] is probably min
      min = Math.min(min, nums[mid]);
      right = mid - 1;
    }
  }
  return min;
};

// author: Venkataramanan, Leetcode Submitted Anser by me
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] <= target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
