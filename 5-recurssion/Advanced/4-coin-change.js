// Given an array of size n and n distinct positive elements. we have been given some target, find the minimum number
// of elements required to reach target

function solve(arr, target) {
  //base cases
  if (target === 0) {
    return 0;
  }

  if (target < 0) {
    return Infinity;
  }
  let mini = Infinity;
  for (let i = 0; i < arr.length; i++) {
    let ans = solve(arr, target - arr[i]);
    if (ans !== Infinity) {
      mini = Math.min(ans + 1, mini);
      // ans = ans +1;
    }
  }
  return mini;
}

solve([1, 2, 5], 5);

// LC - 322
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  //base cases
  let result = countCoinChange(coins, amount);
  return result === Infinity ? -1 : result;
};

const countCoinChange = (coins, amount, memo = {}) => {
  if (amount === 0) return 0;
  if (amount < 0) return Infinity;
  if (memo[amount] !== undefined) return memo[amount];

  let min = Infinity;
  for (let item of coins) {
    const restAmt = amount - item;
    min = Math.min(countCoinChange(coins, restAmt, memo) + 1, min);
  }

  memo[amount] = min;
  return memo[amount];
};
