// 198 LC
// https://leetcode.com/problems/house-robber/
/**
 * @param {number[]} nums
 * @return {number}
 */

// REc solution
var rob = function(nums) {
    const _rob = (nums, ind) => {
        if (ind >= nums.length) return 0;

        const noPick = _rob(nums, ind+1);
        const pick = nums[ind] + _rob(nums, ind+2)

        return Math.max(pick, noPick);
    }

    return _rob(nums, 0)    
};

// Memoization
var robMemo = function(nums) {
    const dp = new Array(nums.length+1).fill(-1);
    const _rob = (nums, ind) => {
        if (ind >= nums.length) return 0;
        if (dp[ind] !== -1) return dp[ind];

        const noPick = _rob(nums, ind+1);
        const pick = nums[ind] + _rob(nums, ind+2)

        return dp[ind] = Math.max(pick, noPick);
    }

    return _rob(nums, 0)    
};

// Tabulation Approach
var robTab = function(nums) {

    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    const dp = new Array(nums.length).fill(Infinity);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i=2; i<nums.length; i++) {
        dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2]);
    }

    return dp[nums.length-1]   
};

// Tabulation Approach
var robSpace = function(nums) {

    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // const dp = new Array(nums.length).fill(Infinity);
    let prev2 = nums[0];
    let prev = Math.max(nums[0], nums[1]);
    for (let i=2; i<nums.length; i++) {
        const cur = Math.max(prev, nums[i] + prev2);
        prev2 = prev;
        prev =cur

    }

    return prev;   
};