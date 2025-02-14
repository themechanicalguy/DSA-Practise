//gfg - https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/
//-> https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1?itm_source=geeksforgeeks&itm_medium=article&itm_campaign=practice_card

//recurssive approach
function knapSack(capacity, val, wt) {
  let n = wt.length;
  const solve = (cap, index) => {
    if (index === n || cap === 0) return 0;
    let inc = 0;
    if (wt[index] <= cap) {
      inc = val[index] + solve(cap - wt[index], index + 1);
    }
    let exc = solve(cap, index + 1);
    return Math.max(inc, exc);
  };

  return solve(capacity, 0, 0);
}

//memoization

function knapSack(capacity, val, wt) {
  let n = wt.length;
  let dp = Array.from({ length: n }, () => new Array(capacity + 1).fill(-1));
  const solve = (cap, index) => {
    if (index === n || cap === 0) return 0;
    if (dp[index][cap] !== -1) return dp[index][cap];
    let inc = 0;
    if (wt[index] <= cap) {
      inc = val[index] + solve(cap - wt[index], index + 1);
    }
    let exc = solve(cap, index + 1);
    dp[index][cap] = Math.max(inc, exc);
    return dp[index][cap];
  };
  solve(capacity, 0, 0);
  console.log(dp);
  //doubt - why getting the ans from dp[0][cap] not from dp[n][cap]
  return dp[0][capacity];
}

//Tabulation

function knapSackTab(W, wt, val) {
  let n = wt.length;
  let dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  //Build table dp[][] in bottom-up manner
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      //base case
      if (i === 0 || w === 0) dp[i][w] = 0;
      //include case
      else if (wt[i - 1] <= w)
        dp[i][w] = Math.max(
          val[i - 1] + dp[i - 1][w - wt[i - 1]],
          dp[i - 1][w]
        );
      //exclude case
      else dp[i][w] = dp[i - 1][w];
    }
  }
}
