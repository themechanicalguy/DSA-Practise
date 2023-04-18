function printSolution(board, n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j];
    }
    console.log("\n");
  }
}

function isSafe(row, col, board, n) {
  //can we place queen or not
  //Check 3 direction -> upper diagonal left, bottom diagonal left & left
  let i = row;
  let j = col;
  //left row checking
  while (j >= 0) {
    if (board[i][j] === 1) return false;
    j--;
  }

  //bottom left diagonal
  i = row;
  j = col;
  while (i < n && j >= 0) {
    if (board[i][j] === 1) return false;
    i++;
    j--;
  }

  //upper diagonal left
  i = row;
  j = col;
  while (i >= 0 && j >= 0) {
    if (board[i][j] === 1) return false;
    i--;
    j--;
  }
}

function solve(board, col, n) {
  //base case
  if (col >= n) {
    printSolution(structuredClone(board), n);
    return;
  }

  //solve 1 case, rest recursion will hanlde
  for (let row = 0; row < n; row++) {
    if (isSafe(row, col, board, n)) {
      //safe place- place queen
      board[row][col] = 1;
      //recurssively call for next column
      solve(structuredClone(board), col + 1, n);
      //backtracking -> recreate original state
      board[row][col] = 0;
    }
  }
}

function main() {
  const n = 4;
  const board = [];
  // creating an nxn board
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill(0));
  }

  let col = 0;
  solve(structuredClone(board), col, n);
  return 0;
}
main();
