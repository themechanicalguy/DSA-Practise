# LC-79 Word Search

# Problem Description

Given an `m x n` grid of characters board and a string word, return true if the word can be found in the grid, false otherwise.
The word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring (up, down, left, right). The same letter cell may not be used more than once.

Example 1:
Input: board = `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, word = "ABCCED"
Output: true

**Constraints:**

- The board is an `m x n` grid of characters.
- The word is a string of length ( k ).
- Cells can only be used once, requiring tracking of visited cells.
- Moves are restricted to horizontal or vertical neighbors.

## Intuition

**Problem Nature:** This is a path-finding problem on a 2D grid, where we need to find a sequence of cells that matches the given word by moving to adjacent cells (up, down, left, right) without reusing any cell.
The Word Search problem involves finding a given word in an `m x n` grid of characters by forming a path of sequentially adjacent cells (horizontally or vertically) without reusing cells.
This can be considered a graph traversal problem where each cell is a node, and edges connect to its four neighbors (up, down, left, right).
The goal is to explore all possible paths starting from each cell to check if the word can be formed.

**Key Observations:**

- The word must be formed by a continuous path of adjacent cells.
- Each cell can be used only once, requiring us to track visited cells.
- We can start the search from any cell that matches the first character of the word.
- Early termination is possible if a path's prefix doesn't match the word.
- The problem is suited for depth-first search (DFS) due to the need to explore all possible paths.

**Backtracking:** For each cell in the grid, we can attempt to start the word from that cell and explore all possible paths using depth-first search (DFS). At each step, we:

- Check if the current cell matches the current character of the word.
- Mark the cell as visited to avoid reuse.
- Recursively explore all four adjacent cells for the next character.
- Backtrack by unmarking the cell to allow other paths to use it.

**Base Cases:**

- If all characters of the word are matched, return true.
- If the current cell doesn’t match, is out of bounds, or is visited, return false.

**Edge Cases:**

- Empty board or word: Return false (or true for empty word, depending on interpretation).
- Word longer than board cells: Impossible to find, return false.
- Single cell board or single character word.

**Approaches:**

1. **DFS with Backtracking (Optimal)**: Use DFS to explore paths, temporarily marking cells as visited (e.g., by modifying the board) and restoring them when backtracking.
2. **DFS with Visited Array**: Use a separate boolean array to track visited cells instead of modifying the board.

---

#### Approach 1: DFS with Backtracking (Optimal)

This approach uses DFS to explore paths and modifies the board temporarily to mark visited cells, restoring them during backtracking.

```javascript
/**
 * Checks if a word exists in the grid using DFS with backtracking.
 * @param {character[][]} board - The m x n grid of characters.
 * @param {string} word - The word to search for.
 * @return {boolean} - True if the word exists, false otherwise.
 */
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  // Helper function for DFS
  function dfs(row, col, index) {
    // Base case: if all characters are matched
    if (index === word.length) return true;

    // Checks for invalid conditions: out-of-bounds, character mismatch, or visited cell.
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      board[row][col] !== word[index] ||
      board[row][col] === "#" // Already visited
    )
      return false;

    // Store original character and mark as visited
    const originalChar = board[row][col];
    // Marks the current cell as visited by replacing it with a special character (#).
    board[row][col] = "#";

    // Recursively explores all four directions.
    const found =
      dfs(row + 1, col, index + 1) || // Down
      dfs(row - 1, col, index + 1) || // Up
      dfs(row, col + 1, index + 1) || // Right
      dfs(row, col - 1, index + 1); // Left

    // Restore the original character (backtrack)
    board[row][col] = originalChar;

    return found;
  }

  // Try starting from each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      //Iterate through each cell; if it matches the first character of the word, start DFS.
      if (board[row][col] === word[0] && dfs(row, col, 0)) {
        return true;
      }
    }
  }
  //True if a valid path is found, false otherwise.
  return false;
}
```

### Approach 2: DFS with Visited Matrix (Alternative)

```javascript
function existWithVisited(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );

  function dfs(row, col, index) {
    if (index === word.length) return true;

    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    visited[row][col] = true;

    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    visited[row][col] = false;

    return found;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === word[0] && dfs(row, col, 0)) {
        return true;
      }
    }
  }

  return false;
}
```

## Complexity Analysis

### Approach 1 (Optimal):

- **Time Complexity**: O(N \* 3^L)
  - N is the number of cells in the grid (rows \* cols)
  - L is the length of the word
  - For each cell, we potentially explore 3 directions (not going back) for each character in the word
- **Space Complexity**: O(L)
  - The recursion stack depth is at most the length of the word

### Approach 2 (With Visited Matrix):

- **Time Complexity**: Same as Approach 1, O(N \* 3^L)
- **Space Complexity**: O(N + L)
  - N for the visited matrix
  - L for the recursion stack

## Dry Runs

### Example 1 (Given Example):

```
Board:
[
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]
Word: "ABCCED"
```

### Step-by-Step Execution:

1. **Initial Setup**:

   - Word: "ABCCED" (length = 6)
   - Start by scanning the board for the first character 'A'

2. **First Match at (0,0) - 'A'**:

   - Start DFS at (0,0)
   - Current character: 'A' (matches word[0])
   - Mark (0,0) as visited by setting board[0][0] = ''
   - Now look for 'B' (next character) in adjacent cells

3. **DFS from (0,0) - Looking for 'B'**:

   - Check adjacent cells:
     - (0,1): 'B' (matches) → proceed
     - Other directions (down, left, up) are either out of bounds or don't match

4. **Move to (0,1) - 'B'**:

   - Mark (0,1) as visited (board[0][1] = '')
   - Now look for 'C' in adjacent cells:
     - From (0,1), check:
       - Right: (0,2) 'C' → proceed
       - Down: (1,1) 'F' → doesn't match
       - Left: (0,0) '' (visited) → skip
       - Up: out of bounds

5. **Move to (0,2) - 'C'**:

   - Mark (0,2) as visited (board[0][2] = '')
   - Now look for 'C' in adjacent cells:
     - From (0,2), check:
       - Right: (0,3) 'E' → doesn't match
       - Down: (1,2) 'C' → proceed
       - Left: (0,1) '' (visited) → skip
       - Up: out of bounds

6. **Move to (1,2) - 'C'**:

   - Mark (1,2) as visited (board[1][2] = '')
   - Now look for 'E' in adjacent cells:
     - From (1,2), check:
       - Right: (1,3) 'S' → doesn't match
       - Down: (2,2) 'E' → proceed
       - Left: (1,1) 'F' → doesn't match
       - Up: (0,2) '' (visited) → skip

7. **Move to (2,2) - 'E'**:

   - Mark (2,2) as visited (board[2][2] = '')
   - Now look for 'D' in adjacent cells:
     - From (2,2), check:
       - Right: (2,3) 'E' → doesn't match
       - Down: out of bounds
       - Left: (2,1) 'D' → proceed
       - Up: (1,2) '' (visited) → skip

8. **Move to (2,1) - 'D'**:
   - Mark (2,1) as visited (board[2][1] = '')
   - We've matched all characters ("ABCCED")!
   - Return true

### Backtracking Visualization:

Path taken: (0,0) → (0,1) → (0,2) → (1,2) → (2,2) → (2,1)

At each step:

1. Mark current cell as visited by setting to ''
2. Explore all 4 directions (right, down, left, up)
3. If a direction leads to the next character, proceed
4. If no directions work, backtrack by restoring the cell's value

### Alternative Paths That Don't Work:

Let's examine why some other initial paths don't work:

1. Starting at (2,0) - 'A':

   - Path: (2,0) → (1,0) 'S' → doesn't match 'B' → dead end

2. Starting at (0,0) - 'A':

   - Alternative path: (0,0) → (1,0) 'S' → doesn't match 'B' → dead end

3. Starting at (0,0) - 'A':
   - Another path: (0,0) → (0,1) → (1,1) 'F' → doesn't match 'C' → dead end

### Final Answer:

After exploring all possible paths, we find that the path (0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1) successfully spells "ABCCED" without reusing any cells.

**Output: true**
**Result**: true

### Example 2 (Edge Case - Single Letter):

```
Board: [["A"]]
Word: "A"
```

1. Only cell matches first (and only) character

**Result**: true

### Example 3 (Edge Case - No Solution):

```
Board:
[
  ["A","B"],
  ["C","D"]
]
Word: "ABCDA"
```

1. Try all paths starting with 'A':
   - (0,0) → (0,1) → (1,1) → (1,0) (can't reuse cells)
   - No path can form "ABCDA"

**Result**: false

### Example 4 (Edge Case - Reuse Cells):

```
Board:
[
  ["A","A"],
  ["A","A"]
]
Word: "AAAAA"
```

1. Even though there are many 'A's, maximum path length is 4 (can't reuse cells)

**Result**: false

The optimal approach efficiently handles all cases by exploring possible paths while backtracking when paths don't lead to solutions, making it suitable for this problem.
