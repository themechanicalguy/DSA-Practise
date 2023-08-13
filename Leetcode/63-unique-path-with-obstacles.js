/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  let n = obstacleGrid.length;
  let m = obstacleGrid[0].length;
  let dp = new Array(n).fill(0).map(() => new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i == 0 && j == 0) {
        if (obstacleGrid[i][j] == 0) {
          dp[i][j] = 1;
        }
      } else if (i == 0) {
        if (obstacleGrid[i][j] == 0) {
          dp[i][j] = dp[i][j - 1];
        }
      } else if (j == 0) {
        if (obstacleGrid[i][j] == 0) {
          dp[i][j] = dp[i - 1][j];
        }
      } else {
        if (obstacleGrid[i][j] == 0) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
      }
    }
  }
  return dp[n - 1][m - 1];
};

const main = () => {
  const arr = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const ans = uniquePathsWithObstacles(arr);
  console.log('ans', ans);
};

main();
