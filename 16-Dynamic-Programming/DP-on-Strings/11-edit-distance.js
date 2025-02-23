//recurssive
var minDistance = function (word1, word2) {
  if (word1.length === 0) return word2.length;
  if (word2.length === 0) return word1.length;

  const solve = (i, j) => {
    if (i === word1.length) return word2.length - j;

    if (j === word2.length) return word1.length - i;

    let ans = 0;
    if (word1[i] === word2[j]) {
      ans = solve(i + 1, j + 1);
    } else {
      let ins = 1 + solve(i, j + 1);
      let del = 1 + solve(i + 1, j);
      let rep = 1 + solve(i + 1, j + 1);

      ans = Math.min(ins, del, rep);
    }
    return ans;
  };

  return solve(0, 0);
};

//memo

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const dp = Array.from({ length: word1.length }, () =>
    Array(word2.length).fill(-1)
  );
  if (word1.length === 0) return word2.length;
  if (word2.length === 0) return word1.length;

  const solve = (i, j) => {
    if (i === word1.length) return word2.length - j;

    if (j === word2.length) return word1.length - i;

    if (dp[i][j] !== -1) return dp[i][j];

    let ans = 0;
    //character matching
    if (word1[i] === word2[j]) {
      ans = solve(i + 1, j + 1);
    } else {
      //not matching
      //insert op
      let ins = 1 + solve(i, j + 1);
      let del = 1 + solve(i + 1, j);
      let rep = 1 + solve(i + 1, j + 1);

      ans = Math.min(ins, del, rep);
    }
    return (dp[i][j] = ans);
  };

  return solve(0, 0);
};
