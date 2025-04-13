// LC-532 -  K-diff Pairs in an Array
//Problem statement:
// Given an integer array nums and an integer k, return the number of unique k-diff pairs in the array.
// A k-diff pair is an integer pair (nums[i], nums[j]), where the following are true:
// 0 <= i < j < nums.length
// nums[i] - nums[j] == k
// Example 1:
// Input: nums = [3,1,4,1,5], k = 2
// Output: 2
// Explanation: There are two pairs that satisfy the condition: (3,1) and (5,3).

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k) {
  //using binary search
  let res = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    const target = nums[i] + k;
    let left = i + 1,
      right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] == target) {
        res++;
        break;
      } else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  }
  return res;
};
