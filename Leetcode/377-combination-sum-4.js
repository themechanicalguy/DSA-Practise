/**
Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.
The test cases are generated so that the answer can fit in a 32-bit integer.

Example 1:
Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.

Example 2:
Input: nums = [9], target = 3
Output: 0
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// Below solution is a brute force approach but it give timeout error 
var combinationSum4 = function(nums, target) {
    
    let ans = 0;
    const counter = (target) => {

        if (target < 0) return 0;
        if (target===0) return ans++;

        for(let i=0; i<nums.length; i++) {
            counter(target-nums[i])
        }
    }

    counter(target);
    return ans;
};

// Below is solved using DP and it works fine
var combinationSum4 = function(nums, target) {
        const dp = new Array(target + 1).fill(0);
        dp[0] = 1;
        for(let i = 1; i <= target; i++){
            for(const num of nums){
                dp[i] += i - num >= 0 ? dp[i - num]: 0;
            }
        }
        return dp[target];
};
