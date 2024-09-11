/**
Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].

Return true if there is a 132 pattern in nums, otherwise, return false.

 

Example 1:

Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.
Example 2:

Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
Example 3:

Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
 

Constraints:

n == nums.length
1 <= n <= 2 * 105
-109 <= nums[i] <= 109
*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    const stack = []; // decreasing stack
    let ak = -Infinity;                // We want to find a seq ai < ak < aj.

    for (let i = nums.length - 1; i >= 0; --i) {
      // ai < ak, we're done because ai must also smaller than aj
      if (nums[i] < ak)
        return true;
      while (stack.length !== 0 && stack[stack.length-1] < nums[i])
        ak = stack.pop();
      stack.push(nums[i]); // nums[i] is a candidate of aj.
    }

    return false;
};