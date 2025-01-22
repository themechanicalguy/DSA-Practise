//LC Premium
//gfg

//Recurssion Approach
function countWaysRecr(n, k) {
  // base cases
  if (n === 1) return k;
  if (n === 2) return k * k;
  // Ways in which last fence is of different color.
  let cnt1 = countWaysRecr(n - 1, k) * (k - 1);
  // Ways in which last 2 fences are of same color.
  let cnt2 = countWaysRecr(n - 2, k) * (k - 1);
  return cnt1 + cnt2;
}

let n = 3,
  k = 2;
console.log(countWaysRecr(n, k));

//Top-Down DP (Memoization) – O(n) Time and O(n) Space

function countWaysMemo(n, k, memo) {
  // base cases
  if (n === 1) return k;
  if (n === 2) return k * k;

  if (memo[n] !== -1) return memo[n];

  // Ways in which last fence
  // is of different color.
  let cnt1 = countWaysMemo(n - 1, k, memo) * (k - 1);

  // Ways in which last 2 fences
  // are of same color.
  let cnt2 = countWaysMemo(n - 2, k, memo) * (k - 1);

  memo[n] = cnt1 + cnt2;
  return memo[n];
}

//Using Bottom-Up DP (Tabulation) – O(n) Time and O(n) Space

function countWaysTabulation(n, k) {
  // base cases
  if (n === 1) return k;
  if (n === 2) return k * k;

  let dp = new Array(n + 1).fill(0);

  // Fill value for 1 and 2 fences
  dp[1] = k;
  dp[2] = k * k;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] * (k - 1) + dp[i - 2] * (k - 1);
  }

  return dp[n];
}

//Using Space Optimized DP – O(n) Time and O(1) Space

function countWays(n, k) {
  // base cases
  if (n === 1) return k;
  if (n === 2) return k * k;

  // Fill value for 1 and 2 fences
  let prev2 = k;
  let prev1 = k * k;

  for (let i = 3; i <= n; i++) {
    let curr = prev1 * (k - 1) + prev2 * (k - 1);

    // update the values
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
