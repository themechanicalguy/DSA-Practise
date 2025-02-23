//LC-1155- Number of dice rolls with target sum

//recurssion
var numRollsToTarget = function (n, k, target) {
  //base cases
  if (n === 0 && target === 0) return 1;
  if ((n === 0 && target !== 0) || (n !== 0 && target === 0)) return 0;
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
    if (n === 0 && target === 0) return 1;
    if ((n === 0 && target !== 0) || (n !== 0 && target === 0)) return 0;

    if (dp[n][target] !== -1) return dp[n][target];

    let diceRolls = 0;
    for (let i = 1; i <= k; i++) {
      if (target - i >= 0) {
        diceRolls = (diceRolls + solveDice(dp, n - 1, k, target - i)) % mod;
      }
    }
    dp[n][target] = diceRolls;
    return dp[n][target];
  };
  return solveDice(dp, n, k, target);
}

//Solve Tabulation
function solveTabulation(n, k, t) {
  //step-1- Create DP arrays
  const dp = Array.from({ length: n + 1 }, () => Array(t + 1).fill(0));
  //step-2 - Observe base case of Top down approach
  dp[0][0] = 1;
  // Step-3- Reverse flow of top down approach
  for (let index = 1; index <= n; index++) {
    for (target = 1; target <= t; target++) {
      let diceRolls = 0;
      for (let face = 1; face <= k; face++) {
        if (target - face >= 0) {
          diceRolls = (diceRolls + dp[index - 1][target - face]) % mod;
        }
      }
      dp[index][target] = diceRolls;
    }
  }
  return dp[n][t];
}

//space optimization
const spaceOptimization = (n, k, t) => {
  let dp = new Array(t + 1).fill(0);
  dp[0] = 1; // There's one way to get a sum of 0 with 0 dice.

  // Iterate over each die
  for (let i = 1; i <= n; i++) {
    let newDp = new Array(t + 1).fill(0);

    // Calculate the number of ways to get each possible sum
    for (let target = 1; target <= t; target++) {
      for (let face = 1; face <= k; face++) {
        if (target - face >= 0) {
          newDp[target] = (newDp[target] + dp[target - face]) % mod;
        }
      }
    }

    dp = newDp;
  }

  return dp[t];
};
