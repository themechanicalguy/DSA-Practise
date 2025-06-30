//LC-354

//recurssive approach -TLE

var maxEnvelopes = function (env) {
  //sort
  env.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  // console.log(env);
  const solve = (curr, prev) => {
    if (curr >= env.length) return 0;
    //pick
    let inc = 0;
    if (
      prev === -1 ||
      (env[curr][0] > env[prev][0] && env[curr][1] > env[prev][1])
    ) {
      inc = 1 + solve(curr + 1, curr);
    }

    let exc = solve(curr + 1, prev);

    return Math.max(inc, exc);
  };

  return solve(0, -1);
};

//Top Down Memo - TLE
var maxEnvelopes = function (env) {
  let n = env.length;
  //sort
  env.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));

  // console.log(env);
  const solve = (curr, prev) => {
    if (curr >= env.length) return 0;
    if (dp[curr][prev + 1] !== -1) return dp[curr][prev + 1];
    //pick
    let inc = 0;
    if (
      prev === -1 ||
      (env[curr][0] > env[prev][0] && env[curr][1] > env[prev][1])
    ) {
      inc = 1 + solve(curr + 1, curr);
    }

    let exc = solve(curr + 1, prev);

    let ans = Math.max(inc, exc);
    return (dp[curr][prev + 1] = ans);
  };

  return solve(0, -1);
};

function maxEnvelopes1D(envelopes) {
  if (!envelopes.length) return 0;

  // Sort by width ascending, if width equal then height descending
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  const n = envelopes.length;
  const dp = new Array(n).fill(1); // dp[i] is max nesting ending at i

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (
        envelopes[i][0] > envelopes[j][0] &&
        envelopes[i][1] > envelopes[j][1]
      ) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

//DP- Binary Search

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}
var maxEnvelopes = function (envelopes) {
  if (!envelopes.length) return 0;

  // Sort by width ascending, if width equal then height descending
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  const dp = []; // Stores height of smallest tail for each length

  for (let [_, h] of envelopes) {
    if (!dp.length || h > dp[dp.length - 1]) {
      dp.push(h);
    } else {
      const idx = binarySearch(dp, h);
      dp[idx] = h;
    }
  }

  return dp.length;
};
