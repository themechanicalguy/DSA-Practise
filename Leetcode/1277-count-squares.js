// 1277. Count Square Submatrices with All Ones
// https://leetcode.com/problems/count-square-submatrices-with-all-ones/
// Diff: Medium

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function(matrix) {
    for (let i = 0; i < matrix.length; ++i)
      for (let j = 0; j < matrix[0].length; ++j)
        if (matrix[i][j] == 1 && i > 0 && j > 0)
          matrix[i][j] +=
              Math.min(matrix[i - 1][j - 1], Math.min(matrix[i - 1][j], matrix[i][j - 1]));
    return matrix.reduce((a, b) => b.reduce((c, d) => c + d) + a, 0);
};
