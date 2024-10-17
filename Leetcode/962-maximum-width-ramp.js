// 962. Maximum Width Ramp
// https://leetcode.com/problems/maximum-width-ramp/
// Diff: Medium

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxWidthRamp = function(nums) {
    let ans = 0;
    const stack = [];

    for (let i=0; i<nums.length; i++) {
        if (stack.length==0 || nums[i] < nums[stack[stack.length-1]]) {
            stack.push(i);
        }
    }
    for (let i =nums.length-1; i>0; i--) {
        while (stack.length>0 && nums[i] >= nums[stack[stack.length-1]])
            ans = Math.max(ans, i - stack.pop());
    }
    return ans;
};