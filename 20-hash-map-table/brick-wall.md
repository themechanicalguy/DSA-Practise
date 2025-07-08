# LC 554. Brick Wall

## Problem Understanding

We have a rectangular brick wall represented by a 2D array `wall`, where each sub-array represents a row of bricks. Each brick in a row has the same height (1 unit) but can vary in width. The total width of each row is the same. We need to draw a vertical line from the top to the bottom of the wall that crosses the least number of bricks. If the line passes through the edge between two bricks, it doesn't count as crossing a brick. We cannot draw the line along the far left or far right edges of the wall.

### Intuition

The key observation here is that the line will cross the least number of bricks if it passes through the most edges between bricks. For each possible position where edges align across rows, the number of bricks crossed will be the total number of rows minus the number of edges at that position. Therefore, we need to find the position where the maximum number of edges align across rows, and the answer will be `number of rows - maximum edges`.

### Approaches

1. **Hash Map to Track Edge Positions**:
   - For each row, calculate the cumulative width (prefix sum) of bricks up to each brick except the last one (since the edge after the last brick is the end of the wall, which we cannot use).
   - Use a hash map to count how many times each cumulative width (edge position) occurs across all rows.
   - The position with the highest count in the hash map is where the maximum edges align. The minimum bricks crossed will be `number of rows - maximum edges`.

### Solution Code

```javascript
/**
 * Finds the minimum number of bricks crossed by a vertical line through the wall.
 * @param {number[][]} wall - 2D array where wall[i] is the widths of bricks in row i.
 * @return {number} - Minimum number of bricks crossed.
 */
function leastBricks(wall) {
  const edgeCount = new Map(); // Map to store frequency of edge positions
  const totalRows = wall.length; // Number of rows in the wall
  let maxEdges = 0; // Maximum number of rows with an edge at the same position

  // Iterate through each row
  for (const row of wall) {
    let currentWidth = 0; // Cumulative width in the current row
    // Process all bricks except the last one to avoid rightmost edge
    for (let i = 0; i < row.length - 1; i++) {
      currentWidth += row[i]; // Calculate edge position
      edgeCount.set(currentWidth, (edgeCount.get(currentWidth) || 0) + 1);
      maxEdges = Math.max(maxEdges, edgeCount.get(currentWidth)); // Update max edges
    }
  }

  // If no edges found (e.g., all rows have one brick), return total rows
  return totalRows - maxEdges;
}
```

### Explanation

1. **Initialization**: We initialize a hash map `edgeCountMap` to keep track of how many times each edge position (cumulative width) occurs across all rows. `maxEdges` will store the highest count of edges at any position.
2. **Processing Each Row**: For each row in the wall, we calculate the cumulative width (prefix sum) of bricks up to each brick except the last one. This is because the edge after the last brick is the end of the wall, which we cannot use.
3. **Updating Edge Counts**: For each cumulative width (edge position), we update its count in the hash map. If this count exceeds `maxEdges`, we update `maxEdges`.
4. **Result Calculation**: The minimum bricks crossed is calculated as the total number of rows minus `maxEdges`. This is because at the position with the most edges, the line will cross the least number of bricks (`total rows - edges at that position`).

### Time and Space Complexity

- **Time Complexity**: O(N \* M), where N is the number of rows and M is the average number of bricks per row. We process each brick in each row once.
- **Space Complexity**: O(L), where L is the total number of unique edge positions. In the worst case, this could be up to the total width of the wall if all edge positions are unique.

### Dry Run Examples

**Example 1:**

```
Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
```

- Row 1 edges at positions: 1, 3, 5
- Row 2 edges at positions: 3, 4
- Row 3 edges at positions: 1, 4
- Row 4 edges at positions: 2
- Row 5 edges at positions: 3, 4
- Row 6 edges at positions: 1, 4, 5
- Edge counts: {1:3, 2:1, 3:4, 4:4, 5:2}
- `maxEdges` is 4 (positions 3 and 4)
- Minimum bricks crossed = 6 (rows) - 4 = 2

**Example 2:**

```
Input: wall = [[1],[1],[1]]
```

- No edges except the end of the wall (which we cannot use)
- `maxEdges` is 0
- Minimum bricks crossed = 3 - 0 = 3

**Example 3:**

```
Input: wall = [[1,1],[1,1],[1,1]]
```

- All rows have an edge at position 1
- `maxEdges` is 3
- Minimum bricks crossed = 3 - 3 = 0
