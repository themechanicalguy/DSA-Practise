# 37. Sudoku Solver

## Understanding the Problem

Sudoku is a logic-based number placement puzzle where we need to fill a 9×9 grid with digits so that:

1. Each row contains all digits from 1 to 9 exactly once
2. Each column contains all digits from 1 to 9 exactly once
3. Each of the nine 3×3 subgrids contains all digits from 1 to 9 exactly once

The empty cells are represented by '.' and we need to fill them with appropriate digits.

## Approach 1: Basic Backtracking

**Intuition**: Try every possible number (1-9) in each empty cell and backtrack when a number leads to an invalid solution.

**Algorithm**:

1. Find an empty cell
2. Try numbers 1-9 in that cell
3. For each number, check if it's valid in current row, column and 3x3 box
4. If valid, place the number and recursively try to solve the rest
5. If recursion leads to solution, return true
6. Else, backtrack (remove the number) and try next number
7. If no number works, return false (triggers backtracking)

**Implementation**:

```javascript
function solveSudoku(board) {
  solve(board);
  return board;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") {
        for (let num = 1; num <= 9; num++) {
          const char = num.toString();
          if (isValid(board, row, col, char)) {
            board[row][col] = char;
            if (solve(board)) {
              return true;
            }
            board[row][col] = "."; // backtrack
          }
        }
        return false; // trigger backtracking
      }
    }
  }
  return true; // all cells filled
}

function isValid(board, row, col, char) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === char) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === char) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === char) return false;
    }
  }

  return true;
}
```

**Time Complexity**: O(9^(n\*n)) where n is the size of the board (9). In worst case, we try all possibilities for each empty cell.

**Space Complexity**: O(n\*n) for the recursion stack in worst case (all cells empty).

---

## Approach 2: Backtracking with Constraint Propagation (Optimal)

**Intuition**: Reduce the search space by tracking possible numbers for each cell using three arrays (rows, cols, boxes) that keep track of which numbers are already used.

**Algorithm**:

1. First pass: Record all already used numbers in rows, columns and boxes
2. For each empty cell, try only numbers that aren't already in its row, column or box
3. Recursively solve with this constraint
4. Backtrack if needed

**Implementation**:

```javascript
function solveSudoku(board) {
  // Initialize sets to track used numbers
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  // Populate the sets with initial numbers
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== ".") {
        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        rows[row].add(num);
        cols[col].add(num);
        boxes[boxIndex].add(num);
      }
    }
  }

  solve(board, rows, cols, boxes);
  return board;
}

function solve(board, rows, cols, boxes) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") {
        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        for (let num = 1; num <= 9; num++) {
          const char = num.toString();
          if (
            !rows[row].has(char) &&
            !cols[col].has(char) &&
            !boxes[boxIndex].has(char)
          ) {
            // Place the number
            board[row][col] = char;
            rows[row].add(char);
            cols[col].add(char);
            boxes[boxIndex].add(char);

            // Recursively solve
            if (solve(board, rows, cols, boxes)) {
              return true;
            }

            // Backtrack
            board[row][col] = ".";
            rows[row].delete(char);
            cols[col].delete(char);
            boxes[boxIndex].delete(char);
          }
        }
        return false; // trigger backtracking
      }
    }
  }
  return true; // solved
}
```

**Time Complexity**: Still O(9^(n\*n)) in worst case but much faster in practice due to constraints.

**Space Complexity**: O(n\*n) for the recursion stack and O(n) for the sets (where n=9).

---

## Dry Run of Optimal Approach

### Example 1: Given Input

```javascript
const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
```

1. Initialize sets tracking used numbers in rows, columns, boxes
2. Start at (0,2) - empty cell
   - Possible numbers: 1,2,4 (others conflict)
   - Try 4: valid, place it
3. Move to next empty cell (0,3)
   - Possible numbers: 2,6
   - Try 6: valid, place it
4. Continue this process recursively
5. If stuck, backtrack and try alternatives
6. Eventually finds the correct solution

### Example 2: Almost Solved Sudoku

```javascript
const board = [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", ".", "7", "9"],
];
```

Only one empty cell at (8,6). The algorithm will quickly find that only '1' fits there.

### Example 3: Empty Board (Edge Case)

```javascript
const board = [
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
];
```

This will take the longest time as it needs to explore many possibilities, but the constraint propagation will still help by eliminating invalid options early.

---

## Conclusion

The backtracking with constraint propagation is the most practical approach for solving Sudoku in JavaScript. While the worst-case time complexity remains high, the actual performance is much better due to the constraints reducing the search space significantly.

For very hard Sudoku puzzles, more advanced techniques like "Dancing Links" (Algorithm X) can be used, but the backtracking approach is sufficient for most practical purposes.
