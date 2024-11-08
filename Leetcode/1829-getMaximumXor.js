// https://leetcode.com/problems/maximum-xor-for-each-query/
// 1829. Maximum XOR for Each Query
// Diff: Medium
// Self Done

/**
 * @param {number[]} nums
 * @param {number} maximumBit
 * @return {number[]}
 */
var getMaximumXor = function(nums, maximumBit) {
    let initial = nums.reduce((a, b) => a ^ b);
    const ans = [];

    const selector = 2 ** maximumBit - 1;

    for (let i =nums.length-1; i >=0; i--) {
        let k = selector & initial;
        k = k ^ selector;
        ans.push(k);
        initial = initial ^ nums[i];
    }
    return ans;
};


// optimal solution
/*
class Solution {
  public int[] getMaximumXor(int[] nums, int maximumBit) {
    final int n = nums.length;
    final int mx = (1 << maximumBit) - 1;
    int[] ans = new int[n];
    int xors = 0;

    for (int i = 0; i < n; ++i) {
      xors ^= nums[i];
      ans[n - 1 - i] = xors ^ mx;
    }

    return ans;
  }
}
  */