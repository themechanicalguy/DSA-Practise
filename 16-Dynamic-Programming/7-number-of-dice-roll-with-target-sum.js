//LC-1155- Number of dice rolls with target sum

//recurssion

/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  //base cases
  if (n === 0 && target !== 0) return 0;
  if (n === 0 && target === 0) return 1;
  if (n !== 0 && target === 0) return 0;
  let ans = 0;
  for (let i = 1; i <= k; i++) {
    ans = ans + numRollsToTarget(n - 1, k, target - i);
  }
  return ans;
};

//Top Down -memoization

class Solution {
  constructor() {
    this.mod = Math.pow(10, 9) + 7;
  }

  numRollsToTarget(n, k, target) {
    const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(-1));
    return this.recursion(dp, n, k, target);
  }

  recursion(dp, n, k, target) {
    if (target === 0 && n === 0) return 1;
    if (n === 0 || target <= 0) return 0;

    if (dp[n][target] !== -1) return dp[n][target] % this.mod;

    let ways = 0;
    for (let i = 1; i <= k; i++) {
      ways = (ways + this.recursion(dp, n - 1, k, target - i)) % this.mod;
    }
    dp[n][target] = ways % this.mod;
    return dp[n][target];
  }
}
