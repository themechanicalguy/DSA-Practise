//Recurssive Approach

// A greedy solution will fail in this problem because there is no ‘uniformity’ in data.
// While selecting a local better choice we may choose an item that will in the long term give less value.

function coinChangeRecr(coins, amt) {
  if (amt === 0) return 0;
  let mini = Infinity;
  for (let coin of coins) {
    if (amt - coin >= 0) {
      let temp = coinChangeRecr(coins, amt - coin) + 1; //when infinity is returned, temp becomes 0
      mini = Math.min(mini, temp);
    }
  }
  return mini === Infinity ? -1 : mini;
  // THis recurssive solution will not work because for case [2] target 3, it would give 0 when it should return -1
}

//- Working code
function recurssiveSoln(coins, amt) {
  const solve = (amt) => {
    if (amt === 0) return 0;
    if (amt < 0) return Infinity; //// way to ignore negative amount value
    let mini = Infinity;
    for (let coin of coins) {
      // if (amt - coin >= 0) { // way to ignore negative amount value
      let temp = solve(amt - coin) + 1;
      if (temp !== Infinity) {
        mini = Math.min(mini, temp);
      }
      // }
    }
    return mini;
  };

  const minVal = solve(amt);

  return minVal === Infinity ? -1 : minVal;
}

//DP- Top Down Approach -- dont use object for memoization in dynamic programming -- GOOD PRACTISE
function coinChange(coins, amount) {
  let memo = {};
  const dfs = (amount) => {
    if (amount === 0) return 0;
    if (memo[amount]) return memo[amount];
    let mini = Infinity;
    for (let coin of coins) {
      if (amount - coin >= 0) {
        mini = Math.min(mini, 1 + dfs(amount - coin));
      }
    }
    memo[amount] = mini;
    return mini;
  };
  const minCoins = dfs(amount);
  return minCoins === Infinity ? -1 : minCoins;
}

coinChange([1, 2, 5], 11);

//Tabulation - Bottom up

function coinChange(coins, amt) {
  let dp = new Array(amt + 1).fill(amt + 1);
  dp[0] = 0;
  for (let target = 1; target <= amt; target++) {
    for (let j = 0; j < coins.length; j++) {
      if (target - coins[j] >= 0) {
        dp[target] = Math.min(dp[target], 1 + dp[target - coins[j]]);
      }
    }
  }

  return dp[amt] > amt ? -1 : dp[amt];
}
