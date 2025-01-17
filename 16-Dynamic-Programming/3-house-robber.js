//LC-198

//recurssive
function robRecr(nums) {
  const dfs = (i) => {
    if (i >= nums.length) {
      return 0;
    }
    let inc = nums[i] + dfs(i + 2);
    let exc = dfs(i + 1);
    return Math.max(inc, exc);
  };
  return dfs(0);
}

//bottom-up
function robBottomUp(nums) {
  let n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  const dp = new Array(n).fill(-1);

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    let inc = dp[i - 2] + nums[i];
    let exc = dp[i - 1];
    dp[i] = Math.max(inc, exc);
  }
  return dp[n - 1];
}

//Space optimization
var rob = function (nums) {
  let rob1 = 0;
  let rob2 = 0;

  for (const num of nums) {
    const temp = Math.max(num + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
};
