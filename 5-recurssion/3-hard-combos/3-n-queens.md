# N-Queens Problem: Solutions and Analysis

The N-Queens problem is a classic backtracking problem where we need to place N queens on an N×N chessboard such that no two queens threaten each other.
Let's explore multiple approaches to solve this problem in JavaScript.

## Intuition

The key insight is that queens attack in rows, columns, and diagonals. Therefore, we need to:

1. Place exactly one queen in each row
2. Ensure no two queens share the same column
3. Ensure no two queens share the same diagonal

We can approach this problem systematically by trying to place queens one row at a time and backtracking when we hit a conflict.

## Approach 1: Backtracking with Sets for Conflict Tracking (Optimized)

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
  // Initialize an NxN board filled with '.' (empty spaces)
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  /**
   * Checks if placing a queen at (row, col) is safe.
   * @param {number} row - Current row
   * @param {number} col - Current column
   * @returns {boolean} - True if safe, false otherwise
   */
  function isSafe(row, col) {
    // Check if column or diagonals are already occupied
    // Positive diagonal: row + col, Negative diagonal: row - col
    return (
      !cols.has(col) && !posDiags.has(row + col) && !negDiags.has(row - col)
    );
  }

  /**
   * Recursive function to place queens row by row.
   * @param {number} row - Current row to place a queen
   */
  function backtrack(row) {
    // Base case: If all queens are placed (row equals n), add the solution
    if (row === n) {
      // Map each row to a string by joining its elements, and push to result
      result.push(board.map((r) => r.join("")));
      return;
    }
    // Try placing a queen in each column of the current row
    for (let col = 0; col < n; col++) {
      // Check if the current position is safe
      if (isSafe(row, col)) {
        // Place queen
        board[row][col] = "Q";
        // Mark the column and diagonals as occupied
        cols.add(col);
        posDiags.add(row + col);
        negDiags.add(row - col);

        // Recurse to next row
        backtrack(row + 1);

        // Backtrack: Remove the queen and clear the column/diagonals
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

---

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

---
