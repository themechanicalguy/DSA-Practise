// LC-48 Rotate Image
// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
// DO NOT allocate another 2D matrix and do the rotation.

// Approach 1: Transpose and Reverse
var rotate = function (mat) {
  mat.reverse();
  let n = mat.length;
  // Transpose mat (swap elements across diagonal)
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      //j is starting from i because we don't want to swap the elements again
      let temp = mat[i][j];
      mat[i][j] = mat[j][i];
      mat[j][i] = temp;
    }
  }
  return mat;
};

//Approach 2: Layer-by-Layer Rotation
function rotate(matrix) {
  let n = matrix.length;
  for (let layer = 0; layer < Math.floor(n / 2); layer++) {
    let first = layer;
    let last = n - 1 - layer;
    for (let i = first; i < last; i++) {
      let offset = i - first;
      // Save top
      let top = matrix[first][i];
      // Left -> Top
      matrix[first][i] = matrix[last - offset][first];
      // Bottom -> Left
      matrix[last - offset][first] = matrix[last][last - offset];
      // Right -> Bottom
      matrix[last][last - offset] = matrix[i][last];
      // Top -> Right
      matrix[i][last] = top;
    }
  }
}
