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

//memoization
var canPartitionMemo = function (nums) {
  let sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  let target = sum / 2;
  const n = nums.length;
  let memo = Array.from(Array(n + 1), () => Array(sum / 2 + 1).fill(-1));
  solve = (ind, target) => {
    if (target === 0) return true;
    if (ind >= nums.length) return false;
    if (target < 0) return false;

    if (memo[ind][target] !== -1) return memo[ind][target];

    let inc = solve(ind + 1, target - nums[ind]);
    let exc = solve(ind + 1, target);

    memo[ind][target] = inc || exc;

    return memo[ind][target];
  };
  return solve(0, target);
};

//Bottom-up / Tabulation

function canPartitionTab(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  const n = nums.length;

  //Create DP Array
  let dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
  //Observe base case from memo and handle accordingly
  for (let i = 0; i <= n; i++) dp[i][0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      if (nums[i - 1] <= j) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  console.log(dp);
  return dp[n][target];
}

canPartition([1, 5, 11, 5]);
