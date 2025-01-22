//LC-416

//Using Recurssion
function solveRecr(nums, index, target) {
  if (target === 0) return true;
  if (index >= nums.length) return false;
  if (target < 0) return false;

  let inc = solveRecr(nums, index + 1, target - nums[index]);
  let exc = solveRecr(nums, index + 1, target);

  return inc || exc;
}
var canPartition = function (nums) {
  let sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;

  return solveRecr(nums, 0, sum / 2);
};

class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  canPartition(nums) {
    let sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) {
      return false;
    }
    const n = nums.length;
    this.memo = Array.from(Array(n + 1), () => Array(sum / 2 + 1).fill(null));

    return this.dfs(nums, 0, sum / 2);
  }

  /**
   * @params {number[]} nums
   * @params {number} i
   * @params {number} target
   * @return {boolean}
   */
  dfs(nums, i, target) {
    if (i === nums.length) {
      return target === 0;
    }
    if (target < 0) {
      return false;
    }
    if (this.memo[i][target] != null) {
      return this.memo[i][target];
    }

    this.memo[i][target] =
      this.dfs(nums, i + 1, target) || this.dfs(nums, i + 1, target - nums[i]);
    return this.memo[i][target];
  }
}
