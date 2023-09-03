/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // const move = (x, y) => {
  //     if (x == m-1 && y == n-1) return 1;
  //     if (x >= m || y >= n) return 0;

  //     return move(x+1, y) + move(x, y+1);
  // }

  // return move(0, 0)

  let dp = new Array(m).fill(0).map(() => new Array(n).fill(1));
  // Arrays.stream(dp).forEach(A -> Arrays.fill(A, 1));

  for (let i = 1; i < m; ++i)
    for (let j = 1; j < n; ++j) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];

  return dp[m - 1][n - 1];
};

console.log(uniquePaths(3, 7)); // 28
