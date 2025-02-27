//LC-97

//recurssive approach
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  const dfs = (i, j, k) => {
    // If we've processed all characters in s3, check if we've used all characters from s1 and s2
    if (k === s3.length) {
      return i === s1.length && j === s2.length;
    }

    // Try using current character from s1
    let useS1 = false;
    if (i < s1.length && s1[i] === s3[k]) {
      useS1 = dfs(i + 1, j, k + 1);
    }

    // Try using current character from s2
    let useS2 = false;
    if (j < s2.length && s2[j] === s3[k]) {
      useS2 = dfs(i, j + 1, k + 1);
    }

    // Return true if either approach works
    return useS1 || useS2;
  };

  return dfs(0, 0, 0);
};

//Top Down/ Memoization

var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  // Create memoization cache
  const memo = new Array(s1.length + 1)
    .fill(0)
    .map(() => new Array(s2.length + 1).fill(null));

  function dfs(i, j, k) {
    // If we've processed all characters in s3, check if we've used all characters from s1 and s2
    if (k === s3.length) {
      return i === s1.length && j === s2.length;
    }

    // Check if we've already computed this state
    if (memo[i][j] !== null) {
      return memo[i][j];
    }

    // Try using current character from s1
    let useS1 = false;
    if (i < s1.length && s1[i] === s3[k]) {
      useS1 = dfs(i + 1, j, k + 1);
    }

    // Try using current character from s2
    let useS2 = false;
    if (j < s2.length && s2[j] === s3[k]) {
      useS2 = dfs(i, j + 1, k + 1);
    }

    // Cache and return the result
    memo[i][j] = useS1 || useS2;
    return memo[i][j];
  }

  return dfs(0, 0, 0);
};

//Using map - Memoizrtion
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;

  let memo = new Map();

  function dfs(i, j, k) {
    if (k === s3.length) return i === s1.length && j === s2.length;

    let key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    let matchS1 = i < s1.length && s1[i] === s3[k] && dfs(i + 1, j, k + 1);
    let matchS2 = j < s2.length && s2[j] === s3[k] && dfs(i, j + 1, k + 1);

    memo.set(key, matchS1 || matchS2);
    return memo.get(key);
  }

  return dfs(0, 0, 0);
};

/**
 * Approach 3: Dynamic Programming (Bottom-up)
 * Time Complexity: O(m*n) where m and n are lengths of s1 and s2
 * Space Complexity: O(m*n) for the DP table
 */
function isInterleaveDP(s1, s2, s3) {
  // Base case: if lengths don't match, it's impossible
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  // Create DP table where dp[i][j] indicates whether s3[0...i+j-1]
  // is an interleaving of s1[0...i-1] and s2[0...j-1]
  const dp = new Array(s1.length + 1)
    .fill(0)
    .map(() => new Array(s2.length + 1).fill(false));

  // Base case: empty strings interleave to form an empty string
  dp[0][0] = true;

  // Fill the first row: s3[0:j] is an interleaving of empty string and s2[0:j]
  for (let j = 1; j <= s2.length; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }

  // Fill the first column: s3[0:i] is an interleaving of s1[0:i] and empty string
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }

  // Fill the DP table
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      dp[i][j] =
        (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }

  return dp[s1.length][s2.length];
}

/**
 * Approach 4: Space-Optimized Dynamic Programming
 * Time Complexity: O(m*n) where m and n are lengths of s1 and s2
 * Space Complexity: O(n) where n is the length of s2
 */
function isInterleaveOptimized(s1, s2, s3) {
  // Base case: if lengths don't match, it's impossible
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  // We only need to keep track of the current row
  const dp = new Array(s2.length + 1).fill(false);

  // Base case: empty strings interleave to form an empty string
  dp[0] = true;

  // Initialize first row: s3[0:j] is an interleaving of empty string and s2[0:j]
  for (let j = 1; j <= s2.length; j++) {
    dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
  }

  // Fill the DP table row by row
  for (let i = 1; i <= s1.length; i++) {
    dp[0] = dp[0] && s1[i - 1] === s3[i - 1];

    for (let j = 1; j <= s2.length; j++) {
      dp[j] =
        (dp[j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }

  return dp[s2.length];
}
