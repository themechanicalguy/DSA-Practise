//Recurssive Approach
function coinChangeRecr(coins, amt) {
  if (amt === 0) return 0;
  let mini = Infinity;
  for (let coin of coins) {
    if (amt - coin >= 0) {
      mini = Math.min(mini, coinChange(coins, amt - coin) + 1);
    }
  }
  return mini === Infinity ? -1 : mini;
}

// ReferenceError: coinChange is not defined -- you may get this error in some compilers
//So other approach is

//DP- Top Down Approach
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
