# LC-79 Word Search

# Problem Description

Given an `m x n` grid of characters board and a string word, return true if the word can be found in the grid, false otherwise.
The word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring (up, down, left, right). The same letter cell may not be used more than once.

Example 1:
Input: board = `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, word = "ABCCED"
Output: true

## Intuition

**Problem Nature:** This is a path-finding problem on a 2D grid, where we need to find a sequence of cells that matches the given word by moving to adjacent cells (up, down, left, right) without reusing any cell.

**Backtracking:** For each cell in the grid, we can attempt to start the word from that cell and explore all possible paths using depth-first search (DFS). At each step, we:

- Check if the current cell matches the current character of the word.
- Mark the cell as visited to avoid reuse.
- Recursively explore all four adjacent cells for the next character.
- Backtrack by unmarking the cell to allow other paths to use it.

**Constraints:**

- The board is an `m x n` grid of characters.
- The word is a string of length ( k ).
- Cells can only be used once, requiring tracking of visited cells.
- Moves are restricted to horizontal or vertical neighbors.

**Base Cases:**

- If all characters of the word are matched, return true.
- If the current cell doesn’t match, is out of bounds, or is visited, return false.

**Edge Cases:**

- Empty board or word: Return false (or true for empty word, depending on interpretation).
- Word longer than board cells: Impossible to find, return false.
- Single cell board or single character word.

## Approach

**Iterate Over Board:** Try starting the word from each cell in the grid.

**DFS/Backtracking:**

- For each cell, use DFS to explore paths matching the word.
- Track the current position in the word and mark visited cells.
- Explore all four directions (up, down, left, right) if valid.
- Backtrack by unmarking cells to allow other paths.

**Handle Edge Cases:** Check for empty inputs or invalid conditions.

We’ll explore three approaches in JavaScript:

**Backtracking with Temporary Board Modification:** Modify the board to mark visited cells.
**Backtracking with Separate Visited Set:** Use a set to track visited cells.
**Backtracking with Coordinate Hashing:** Use a hash set for visited coordinates, avoiding board modification.

## Solution 1: Backtracking with Temporary Board Modification
