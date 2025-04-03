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

//find the pivot and return it

var findMin = function (nums) {
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

  return nums[left];
};
