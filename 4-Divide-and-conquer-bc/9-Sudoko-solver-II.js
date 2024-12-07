//LC-36
/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

*/

function isValidSudoku(board) {
  for (let row = 0; row < 9; row++) {
    let seen = new Set();
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") continue;
      if (seen.has(board[row][col])) return false;
      seen.add(board[row][col]);
    }
  }

  //validation cols
  for (let col = 0; col < 9; col++) {
    let seen = new Set();
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === ".") continue;
      if (seen.has(board[row][col])) return false;
      seen.add(board[row][col]);
    }
  }

  for (let cube = 0; cube < 9; cube++) {
    let seen = new Set();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let cubeRow = Math.floor(cube / 3) * 3 + row;
        let cubeCol = (cube % 3) * 3 + col;
        if (board[cubeRow][cubeCol] === ".") continue;
        if (seen.has(board[cubeRow][cubeCol])) return false;
        seen.add(board[cubeRow][cubeCol]);
      }
    }
  }
  return true;
}
