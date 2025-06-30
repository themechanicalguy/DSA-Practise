# Rat in a Maze Problem

https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1

## Problem Understanding

We need to find all possible paths for a rat to move from the top-left corner (0,0) to the bottom-right corner (n-1,n-1) in an n×n matrix where:

- 1 represents a free cell the rat can move through
- 0 represents a blocked cell the rat cannot pass
  The rat can move in 4 directions (Up, Down, Left, Right) but cannot revisit any cell in the same path.

  **Constraints:**

- Moves must stay within matrix bounds.
- The rat cannot pass through blocked cells (0).
- The rat cannot revisit cells in the same path.
- If no path exists, return an empty list.
- Paths must be returned in lexicographically sorted order (e.g., 'D' comes before 'R').

## Intuition

- This is a pathfinding problem that can be solved using backtracking, as we need to explore all possible paths from (0,0) to (n-1,n-1).
- We can model the problem as a graph where each cell (i,j) is a node, and edges connect to adjacent cells (up, down, left, right) if they are valid (within bounds and unblocked).
- To find all paths use classic backtracking problem where we:

  - Start at (0,0) and explore all valid moves recursively.
  - Use a visited matrix to prevent revisiting cells.
  - Track the current path as a string of moves ('U', 'D', 'L', 'R').
  - When the rat reaches (n-1,n-1), add the path to the result.
  - Sort the result lexicographically before returning.

- Edge cases to consider:
  - If (0,0) or (n-1,n-1) is blocked, no paths are possible.
  - If n=1 and mat[0][0]=1, the path is empty (rat is already at destination).
  - If no path exists due to blockages, return an empty list.

## Approaches

### 1. Backtracking with DFS (Optimal Approach)

The most efficient approach is to use backtracking with DFS:

1. Start at (0,0)
2. For each move, check if it's valid
3. Mark the cell as visited
4. Recursively explore all directions
5. Backtrack by unmarking the cell when returning

### Approach 1: Backtracking with DFS (Optimal)

```javascript
/**
 * Finds all possible paths for the rat to reach the destination
 * @param {number[][]} maze - The n x n matrix representing the maze
 * @return {string[]} - Array of path strings in lexicographical order
 */
function findPaths(maze) {
  const n = maze.length;
  const paths = [];
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));

  /**
   * DFS helper function to explore paths
   * @param {number} row - Current row position
   * @param {number} col - Current column position
   * @param {string} path - Current path taken
   */
  function dfs(row, col, path) {
    // Base case: reached destination
    if (row === n - 1 && col === n - 1) {
      paths.push(path);
      return;
    }

    // Mark current cell as visited
    visited[row][col] = true;

    // Explore all 4 directions in lexicographical order (D, L, R, U)

    // Down
    if (row + 1 < n && maze[row + 1][col] === 1 && !visited[row + 1][col]) {
      dfs(row + 1, col, path + "D");
    }

    // Left
    if (col - 1 >= 0 && maze[row][col - 1] === 1 && !visited[row][col - 1]) {
      dfs(row, col - 1, path + "L");
    }

    // Right
    if (col + 1 < n && maze[row][col + 1] === 1 && !visited[row][col + 1]) {
      dfs(row, col + 1, path + "R");
    }

    // Up
    if (row - 1 >= 0 && maze[row - 1][col] === 1 && !visited[row - 1][col]) {
      dfs(row - 1, col, path + "U");
    }

    // Backtrack: unmark current cell
    visited[row][col] = false;
  }

  // Start DFS only if starting cell is not blocked
  if (maze[0][0] === 1) {
    dfs(0, 0, "");
  }

  // Return paths sorted lexicographically
  return paths.sort();
}
```

## Complexity Analysis

- **Time Complexity**: O(4^(n²))
  - In the worst case, we explore all 4 directions from each cell
  - The upper bound is 4^(n²) since there are n² cells
- **Space Complexity**: O(n²)
  - For the visited matrix
  - Recursion stack depth can go up to n² in the worst case

## Dry Runs

### Example 1 (Given Example):

```
Maze:
[
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1]
]
```

1. Start at (0,0)
2. Can only move Down to (1,0) (path: 'D')
3. From (1,0):
   - Down to (2,0) (path: 'DD')
   - Right to (1,1) (path: 'DR')
4. Path 'DD...':

   - (2,0) → (2,1) (path: 'DDR')
   - (2,1) → (3,1) (path: 'DDRD')
   - (3,1) → (3,2) (path: 'DDRDR')
   - (3,2) → (3,3) (path: 'DDRDRR') → Found path!

5. Path 'DR...':
   - (1,1) → (2,1) (path: 'DRD')
   - (2,1) → (3,1) (path: 'DRDD')
   - (3,1) → (3,2) (path: 'DRDDR')
   - (3,2) → (3,3) (path: 'DRDDRR') → Found path!

**Output**: ["DDRDRR", "DRDDRR"]

### Example 2 (No Path):

```
Maze:
[
  [1, 0],
  [0, 1]
]
```

1. Start at (0,0)
2. Can only move Right to (0,1) but it's blocked
3. Can only move Down to (1,0) but it's blocked
4. No possible moves → No path exists

**Output**: []

### Example 3 (Single Path):

```
Maze:
[
  [1, 1],
  [0, 1]
]
```

1. Start at (0,0)
2. Move Right to (0,1) (path: 'R')
3. From (0,1):
   - Down to (1,1) (path: 'RD') → Found path!
   - Left to (0,0) but already visited
4. Alternative start:
   - Down from (0,0) is blocked

**Output**: ["RD"]

The DFS backtracking approach is optimal for this problem as it efficiently explores all possible paths while maintaining the constraints, and the lexicographical order is naturally maintained by exploring directions in D-L-R-U order.
