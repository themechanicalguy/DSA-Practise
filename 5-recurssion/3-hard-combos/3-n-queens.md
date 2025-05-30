# N-Queens Problem: Solutions and Analysis

The N-Queens problem is a classic backtracking problem where we need to place N queens on an N×N chessboard such that no two queens threaten each other. Let's explore multiple approaches to solve this problem in JavaScript.

## Intuition

The key insight is that queens attack in rows, columns, and diagonals. Therefore, we need to:

1. Place exactly one queen in each row
2. Ensure no two queens share the same column
3. Ensure no two queens share the same diagonal

We can approach this problem systematically by trying to place queens one row at a time and backtracking when we hit a conflict.

## Approach 1: Backtracking with Sets for Conflict Tracking

**Intuition:**

- Use backtracking to place one queen per row.
- Track occupied columns, positive diagonals `(row + col)`, and negative diagonals `(row - col)` using sets for O(1) lookup.
- When placing a queen, ensure its column and diagonals are not already occupied.
- Build the board configuration once a solution is found.

```javascript
/**
 * Solves the N-Queens puzzle using backtracking with sets for conflict tracking.
 * @param {number} n - Size of the chessboard (n x n)
 * @return {string[][]} - Array of all valid board configurations
 */
function solveNQueens(n) {
  // Initialize sets to track occupied columns and diagonals
  const cols = new Set(); // Tracks occupied columns
  const posDiags = new Set(); // Tracks occupied positive diagonals (row + col)
  const negDiags = new Set(); // Tracks occupied negative diagonals (row - col)
  const result = []; // Stores all valid board configurations
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  /**
   * Checks if placing a queen at (row, col) is safe.
   * @param {number} row - Current row
   * @param {number} col - Current column
   * @returns {boolean} - True if safe, false otherwise
   */
  function isSafe(row, col) {
    return (
      !cols.has(col) && !posDiags.has(row + col) && !negDiags.has(row - col)
    );
  }

  /**
   * Recursive function to place queens row by row.
   * @param {number} row - Current row to place a queen
   */
  function backtrack(row) {
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        // Place queen
        board[row][col] = "Q";
        cols.add(col);
        posDiags.add(row + col);
        negDiags.add(row - col);

        // Recurse to next row
        backtrack(row + 1);

        // Backtrack: remove queen and clear sets
        board[row][col] = ".";
        cols.delete(col);
        posDiags.delete(row + col);
        negDiags.delete(row - col);
      }
    }
  }

  backtrack(0);
  return result;
}
```

### Complexity Analysis

- **Time Complexity**: `O(N!)`, where N is the board size. For each row, we try up to N columns, but pruning (due to conflicts) reduces the number of valid placements. The worst-case is exploring all permutations, bounded by N!.

- **Space Complexity**: `O(N²)`for the board and O(N) for the recursion stack and sets. The result array stores solutions, each of size N², but this is output space, not auxiliary space.

## Approach 2: Basic Backtracking

```javascript
/**
 * Solves N-Queens problem using basic backtracking
 * @param {number} n - Size of the chessboard
 * @return {string[][]} - All possible solutions
 */
function solveNQueens(n) {
  const solutions = [];
  c;
  /**
   * Checks if placing a queen at (row, col) is safe
   * @param {number} row - Row to check
   * @param {number} col - Column to check
   * @return {boolean} - True if safe, false otherwise
   */
  function isSafe(row, col) {
    // Check same column upwards
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }

    // Check upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }

    // Check upper right diagonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }

    return true;
  }

  /**
   * Backtracking helper function
   * @param {number} row - Current row to place queen
   */
  function backtrack(row) {
    if (row === n) {
      // Found a valid solution
      solutions.push(board.map((r) => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = "Q"; // Place queen
        backtrack(row + 1); // Recurse for next row
        board[row][col] = "."; // Backtrack
      }
    }
  }

  backtrack(0);
  return solutions;
}
```

### Complexity Analysis

- **Time Complexity**: O(N!) - In the worst case, we explore all possible permutations of queen placements.
- **Space Complexity**: O(N²) - For the board storage, plus O(N) for recursion stack.

## Approach 2: Optimized Backtracking with Column and Diagonal Tracking

We can optimize the `isSafe` check by using sets to track occupied columns and diagonals.

```javascript
function solveNQueensOptimized(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const occupiedCols = new Set();
  const occupiedDiag1 = new Set(); // For diagonals (row - col)
  const occupiedDiag2 = new Set(); // For anti-diagonals (row + col)

  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map((r) => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      const diag1 = row - col;
      const diag2 = row + col;

      if (
        !occupiedCols.has(col) &&
        !occupiedDiag1.has(diag1) &&
        !occupiedDiag2.has(diag2)
      ) {
        // Place queen
        board[row][col] = "Q";
        occupiedCols.add(col);
        occupiedDiag1.add(diag1);
        occupiedDiag2.add(diag2);

        // Recurse
        backtrack(row + 1);

        // Backtrack
        board[row][col] = ".";
        occupiedCols.delete(col);
        occupiedDiag1.delete(diag1);
        occupiedDiag2.delete(diag2);
      }
    }
  }

  backtrack(0);
  return solutions;
}
```

### Complexity Analysis

- **Time Complexity**: O(N!) - Still factorial, but with more efficient conflict checking.
- **Space Complexity**: O(N) - We've replaced the O(N²) board with sets that take O(N) space.

## Approach 3: Bitmask Backtracking (Most Optimized)

For even better performance, we can use bitmasks to represent occupied columns and diagonals.

```javascript
function solveNQueensBitmask(n) {
  const solutions = [];

  function backtrack(row, cols, diag1, diag2, board) {
    if (row === n) {
      solutions.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      const currDiag1 = row - col + n; // To avoid negative numbers
      const currDiag2 = row + col;

      // Check if column and diagonals are available
      if (
        !(cols & (1 << col)) &&
        !(diag1 & (1 << currDiag1)) &&
        !(diag2 & (1 << currDiag2))
      ) {
        // Place queen
        const newRow = ".".repeat(col) + "Q" + ".".repeat(n - col - 1);
        board.push(newRow);

        // Recurse with updated bitmasks
        backtrack(
          row + 1,
          cols | (1 << col),
          diag1 | (1 << currDiag1),
          diag2 | (1 << currDiag2),
          board
        );

        // Backtrack
        board.pop();
      }
    }
  }

  backtrack(0, 0, 0, 0, []);
  return solutions;
}
```

### Complexity Analysis

- **Time Complexity**: O(N!) - Still factorial, but with constant-time conflict checking.
- **Space Complexity**: O(N) - Only uses space for the recursion stack and solution storage.

## Dry Run with Examples

### Example 1: n = 4 (Standard Case)

1. Place Q at (0,0)

   - Conflicts when placing in row 1 (col 0 and diagonals invalid)
   - Try (1,2), then (2) fails, backtrack
   - Eventually find solution: [".Q..","...Q","Q...","..Q."]

2. Similar process finds the second solution: ["..Q.","Q...","...Q",".Q.."]

### Example 2: n = 1 (Edge Case)

- Only one possible placement: [["Q"]]

### Example 3: n = 2 (No Solution Case)

- No possible way to place 2 queens on 2x2 board without conflict
- Returns empty array []

## Conclusion

The N-Queens problem beautifully demonstrates backtracking. While all approaches have factorial time complexity in the worst case, the optimized versions significantly reduce the constant factors and auxiliary space usage. The bitmask approach is particularly efficient for larger N values due to its constant-time conflict checking.

For practical purposes, the optimized backtracking with sets (Approach 2) provides a good balance between code readability and performance for typical problem sizes (N ≤ 20).
