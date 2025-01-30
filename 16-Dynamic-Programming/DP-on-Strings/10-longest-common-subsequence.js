//LC-1143

//Recurssive Approach
function longestCommonSubsequence(txt1, txt2) {
  const dfs = (i, j) => {
    if (i === txt1.length || j === txt2.length) return 0;
    //1 character is matching so 1 + rest things
    if (txt1[i] === txt2[j]) return 1 + dfs(i + 1, j + 1);
    return Math.max(dfs(i, j + 1), dfs(i + 1, j));
  };
  return dfs(0, 0);
}

//using memoization --Top Down
function lcs(txt1, txt2) {
  const memo = Array(txt1.length)
    .fill()
    .map(() => Array(txt2.length).fill(-1));
  const dfs = (i, j) => {
    if (i === txt1.length || j === txt2.length) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    if (txt1[i] === txt2[j]) {
      memo[i][j] = 1 + dfs(i + 1, j + 1);
    } else {
      memo[i][j] = Math.max(dfs(i, j + 1), dfs(i + 1, j));
    }
    return memo[i][j];
  };
  console.log(memo);
  return dfs(0, 0);
}

//using tabulation - Bottom Up

function longestCommonSubsequenceTab(txt1, txt2) {
  const dp = Array(txt1.length + 1)
    .fill()
    .map(() => Array(txt2.length + 1).fill(0));

  for (let i = text1.length - 1; i >= 0; i--) {
    for (let j = text2.length - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][0];
}

//space optimization
