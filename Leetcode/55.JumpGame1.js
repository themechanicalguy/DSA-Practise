// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.

// Brute force the time complexity is O (n^n)

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// greedy solution
var canJump = function (nums) {
  let len = nums.length - 1,
    next = 0,
    i;
  for (i = 0; i < len; i++) {
    next = Math.max(next, nums[i] + i);
    if (i === next) {
      return false;
    }
  }
  return true;
};
