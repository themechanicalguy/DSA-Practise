// 1590. Make Sum Divisible by P
// https://leetcode.com/problems/make-sum-divisible-by-p/
// Diff: Medium
// tag: prefix subarray

/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function(nums, p) {
    let total = nums.reduce((a,b) => a+b);
    let remain = total%p;

    if (remain ==0) return 0;
    let res = nums.length;
    let cur_sum = 0;
    const remain_to_idx ={
        0: -1
    }

    nums.forEach((n, i) => {
        cur_sum = (cur_sum + n) % p;
        prefix = (cur_sum - remain + p) % p;
        if (prefix in remain_to_idx) {
            const length = i - remain_to_idx[prefix];
            res = Math.min(res, length);
        }
        remain_to_idx[cur_sum] = i;
    });

    if (res === nums.length) return -1;
    return res;
};