/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  let prev = new Array(amount + 1).fill(0);
  const n = coins.length;

  //Initializing base condition
  for (let i = 0; i <= amount; i++) {
    if (i % coins[0] == 0) prev[i] = 1;
    // Else condition is automatically fulfilled,
    // as prev array is initialized to zero
  }

  for (let ind = 1; ind < n; ind++) {
    let cur = new Array(amount + 1).fill(0);
    for (let target = 0; target <= amount; target++) {
      const notTaken = prev[target];

      let taken = 0;
      if (coins[ind] <= target) taken = cur[target - coins[ind]];

      cur[target] = notTaken + taken;
    }
    prev = cur;
  }

  return prev[amount];
};

change(5, [1, 2, 5]);
