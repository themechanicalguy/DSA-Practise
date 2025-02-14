//LC-1155- Number of dice rolls with target sum

//recurssion
var numRollsToTarget = function (n, k, target) {
  //base cases
  if (n === 0 && target !== 0) return 0;
  if (n === 0 && target === 0) return 1;
  if (n !== 0 && target === 0) return 0;
  let ans = 0;
  for (let i = 1; i <= k; i++) {
    if (target - i >= 0) {
      ans = ans + numRollsToTarget(n - 1, k, target - i);
    }
  }
  return ans;
};

//Top Down -memoization
const mod = Math.pow(10, 9) + 7;
function numRollsToTarget(n, k, target) {
  const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(-1));

  const solveDice = (dp, n, k, target) => {
    if (n < 0) return 0;
    if (n === 0 && target !== 0) return 0;
    if (n === 0 && target === 0) return 1;
    if (n !== 0 && target === 0) return 0;

    if (dp[n][target] !== -1) return dp[n][target];

    let ways = 0;
    for (let i = 1; i <= k; i++) {
      if (target - i >= 0) {
        ways = (ways + solveDice(dp, n - 1, k, target - i)) % mod;
      }
    }
    dp[n][target] = ways;
    return dp[n][target];
  };
  return solveDice(dp, n, k, target);
}
