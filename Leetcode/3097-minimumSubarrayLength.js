// 3097. Shortest Subarray With OR at Least K II
// https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/?envType=daily-question
// Diff: Medium
// Used Help


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function(nums, k) {
    const kMaxBit = 30;

    function undoOrNum(ors, num, count) {
        for (let i = 0; i < kMaxBit; ++i)
        if ((num >> i & 1) == 1 && --count[i] == 0)
            ors -= 1 << i;
        return ors;
    }

    function orNum(ors, num, count) {
        for (let i = 0; i < kMaxBit; ++i)
        if ((num >> i & 1) == 1 && ++count[i] == 1)
            ors += 1 << i;
        return ors;
    }

    const kMax = 50;
    const n = nums.length;
    let ans = n + 1;
    let ors = 0;
    let count = new Array(kMax + 1).fill(0);

    for (let l = 0, r = 0; r < n; ++r) {
      ors = orNum(ors, nums[r], count);
      while (ors >= k && l <= r) {
        ans = Math.min(ans, r - l + 1);
        ors = undoOrNum(ors, nums[l], count);
        ++l;
      }
    }

    return (ans == n + 1) ? -1 : ans;

};