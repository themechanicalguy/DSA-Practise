# LC 45. Jump Game II

You are given a 0-indexed array of integers `nums` of length n. You are initially positioned at `nums[0]`.

Each element `nums[i]` represents the maximum length of a forward jump from index i. In other words, if you are at `nums[i]`, you can jump to any nums[i + j] where:

- 0 <= j <= nums[i] and
- i + j < n
- Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

Example 1:

- Input: nums = [2,3,1,1,4]
- Output: 2
- Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:

- Input: nums = [2,3,0,1,4]
- Output: 2

### Problem Understanding

The problem is about finding the minimum number of jumps required to reach the last index of an array, where each element at a given index represents the maximum number of steps you can jump forward from that position.

### Intuition

To solve this problem, we need to find the optimal path that requires the least number of jumps to reach the end. The key is to explore the farthest reachable positions with the minimum jumps, ensuring that we don't miss any potential optimal paths.

### Approaches

2. **Dynamic Programming (DP) Approach**:

   - **Idea**: Use an array to store the minimum jumps required to reach each index. Initialize all positions with infinity except the first index (0 jumps). For each index, update the minimum jumps for all reachable indices.
   - **Steps**:
     1. Initialize a DP array with `Infinity` and set `dp[0] = 0`.
     2. For each index `i`, update `dp[i + j]` to the minimum of its current value and `dp[i] + 1` for all `j` up to `nums[i]`.
   - **Time Complexity**: O(n^2) - For each element, potentially update all reachable elements.
   - **Space Complexity**: O(n) - Additional space for the DP array.

3. **Breadth-First Search (BFS) Approach**:

   - **Idea**: Treat the problem as a graph where each node is an index, and edges represent jumps. Use BFS to find the shortest path (minimum jumps) to the last index.
   - **Steps**:
     1. Use a queue to track current positions and jumps taken.
     2. For each position, enqueue all reachable positions with incremented jump count.
     3. The first time we reach the last index, return the jump count.
   - **Time Complexity**: O(n^2) - In the worst case, each node can be visited multiple times.
   - **Space Complexity**: O(n) - Queue can store up to n elements.

4. **Greedy Approach (Optimal)**:

   - **Idea**: Track the farthest position that can be reached at each step. When we reach the current farthest, increment the jump count and update the farthest to the maximum reachable from the current segment.
   - **Steps**:
     1. Initialize `jumps`, `currentEnd`, and `farthest` to 0.
     2. Iterate through the array except the last element.
     3. Update `farthest` to the maximum of `farthest` and `i + nums[i]`.
     4. If `i` reaches `currentEnd`, increment `jumps` and set `currentEnd` to `farthest`.
   - **Time Complexity**: O(n) - Single pass through the array.
   - **Space Complexity**: O(1) - Constant space is used.

### Solution Code (Greedy Approach - Optimal)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function jump(nums) {
  // Initialize the number of jumps to 0
  let jumps = 0;
  // The farthest index that can be reached with the current number of jumps
  let currentEnd = 0;
  // The farthest index that can be reached from the current segment
  let farthest = 0;

  // Iterate through each element except the last one
  for (let i = 0; i < nums.length - 1; i++) {
    // Update the farthest position that can be reached from the current index
    farthest = Math.max(farthest, i + nums[i]);

    // If we've reached the end of the current segment, it's time to jump
    if (i === currentEnd) {
      jumps++;
      // Update the current end to the farthest position reachable
      currentEnd = farthest;

      // If we can already reach the last index, break early to save time
      if (currentEnd >= nums.length - 1) {
        break;
      }
    }
  }

  // Return the total number of jumps needed
  return jumps;
}
```

### Explanation (Greedy Approach)

- **Initialization**: We start with `jumps` set to 0, `currentEnd` (the boundary of the current jump) at 0, and `farthest` (the farthest position reachable) at 0.
- **Iteration**: For each index, we update `farthest` to the maximum of its current value and the position reachable from the current index (`i + nums[i]`).
- **Jump Decision**: When we reach `currentEnd`, it means we've explored all positions up to the current boundary, so we increment `jumps` and set `currentEnd` to `farthest`. If `currentEnd` reaches or exceeds the last index, we exit early.
- **Efficiency**: This approach ensures that we only make necessary jumps, optimizing the path with a single pass through the array.

### Dry Run (Greedy Approach)

**Example 1**: `nums = [2, 3, 1, 1, 4]`

- Initial: jumps = 0, currentEnd = 0, farthest = 0
- i = 0:
  - farthest = max(0, 0 + 2) = 2
  - i == currentEnd: jumps = 1, currentEnd = 2
- i = 1:
  - farthest = max(2, 1 + 3) = 4
  - i == currentEnd (2)? No
- i = 2:
  - farthest = max(4, 2 + 1) = 4
  - i == currentEnd (2): jumps = 2, currentEnd = 4
- currentEnd >= 4 (last index), break
- **Output**: 2

**Example 2**: `nums = [2, 3, 0, 1, 4]`

- Initial: jumps = 0, currentEnd = 0, farthest = 0
- i = 0:
  - farthest = max(0, 0 + 2) = 2
  - i == currentEnd: jumps = 1, currentEnd = 2
- i = 1:
  - farthest = max(2, 1 + 3) = 4
  - i == currentEnd? No
- i = 2:
  - farthest = max(4, 2 + 0) = 4
  - i == currentEnd (2): jumps = 2, currentEnd = 4
- currentEnd >= 4, break
- **Output**: 2

**Edge Case Example**: `nums = [1, 1, 1, 1, 1]`

- Initial: jumps = 0, currentEnd = 0, farthest = 0
- i = 0:
  - farthest = max(0, 0 + 1) = 1
  - i == currentEnd: jumps = 1, currentEnd = 1
- i = 1:
  - farthest = max(1, 1 + 1) = 2
  - i == currentEnd (1): jumps = 2, currentEnd = 2
- i = 2:
  - farthest = max(2, 2 + 1) = 3
  - i == currentEnd (2): jumps = 3, currentEnd = 3
- i = 3:
  - farthest = max(3, 3 + 1) = 4
  - i == currentEnd (3): jumps = 4, currentEnd = 4
- **Output**: 4 (Each step requires a jump)

This approach efficiently finds the minimum jumps by always extending the reach in the least number of steps.
