/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function isSafe(row, col, board, value) {
  let n = board.length;
  for (let i = 0; i < n; i++) {
    //row check
    if (board[row][i] == value) {
      return false;
    }

    //col check
    if (board[i][col] == value) {
      return false;
    }

    // 3X3 box check
    if (board[3 * (row / 3) + i / 3][3 * (col / 3) + (i % 3)] == value) {
      return false;
    }
  }
  return true;
}
function solve(board) {
  let n = board.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //check empty cell
      if (board[i][j] === ".") {
        //try to fill with values ranging from 1 to 9
        for (let val = "1"; i <= "9"; i++) {
          //check for safety
          if (isSafe(i, j, board, val)) {
            //insert
            board[i][j] = val;
            //recurssion
            let nextSol = solve(board);
            if (nextSol) {
              return true;
            } else {
              //bc
              board[i][j] = ".";
            }
          }
        }
        //if we are not able to assign any number between 1 - 9, then
        // something is wrong in previous placement
        //go back by returning false;
        return false;
      }
    }
  }
  //all cell filled
  return true;
}
var solveSudoku = function (board) {
  solve(board);
};
