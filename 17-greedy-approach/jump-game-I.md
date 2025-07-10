### **Problem Understanding**

The problem is to determine if you can reach the last index of an array where each element represents the maximum jump length from that position. You start at the first index and need to find if there's a path to the last index.

### **Intuition**

The key observation is that we need to keep track of the farthest index we can reach at any point. If at any point, the current index exceeds the farthest index we can reach, it means we cannot proceed further, and thus, we cannot reach the last index.

## **1. Greedy Approach (Optimal)**

- **Idea**: Traverse the array and keep updating the farthest index that can be reached. If at any point, the current index is beyond the farthest reachable index, return false. If the farthest reachable index is >= last index, return true.

```javascript
/**
 * Determines if the last index can be reached using greedy approach.
 * @param {number[]} nums - Array representing maximum jump lengths.
 * @return {boolean} - True if last index is reachable, false otherwise.
 */
function canJumpGreedy(nums) {
  const destination = nums.length;
  let farthestReachable = 0; // Tracks the farthest index that can be reached.
  for (let currentIndex = 0; currentIndex < destination; currentIndex++) {
    // If current index is beyond the farthest reachable, return false.
    if (currentIndex > farthestReachable) {
      return false;
    }
    // Update farthest reachable index.
    farthestReachable = Math.max(
      farthestReachable,
      currentIndex + nums[currentIndex]
    );
    // If farthest reachable is beyond or at last index, return true.
    if (farthestReachable >= destination - 1) {
      return true;
    }
  }
  return farthestReachable >= destination - 1;
}

// Example Usage:
console.log(canJumpGreedy([2, 3, 1, 1, 4])); // true
console.log(canJumpGreedy([3, 2, 1, 0, 4])); // false
console.log(canJumpGreedy([0])); // true (edge case: single element)
```

- **Time Complexity**: O(n) - Single pass through the array.
- **Space Complexity**: O(1) - Only a few variables are used.

## **2. Dynamic Programming (Tabulation)** -- Not Optimal

- **Idea**: Use a DP array where `dp[i]` represents whether the last index can be reached from index `i`. Start from the end and move backward, filling the DP array.

```javascript
/**
 * Determines if the last index can be reached using dynamic programming.
 * @param {number[]} nums - Array representing maximum jump lengths.
 * @return {boolean} - True if last index is reachable, false otherwise.
 */
function canJumpDP(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(false);
  dp[n - 1] = true; // Last index is reachable from itself.

  for (let i = n - 2; i >= 0; i--) {
    const maxJump = Math.min(i + nums[i], n - 1); // Avoid going out of bounds.
    for (let j = i + 1; j <= maxJump; j++) {
      if (dp[j]) {
        dp[i] = true;
        break; // No need to check further if reachable.
      }
    }
  }
  return dp[0]; // Can we reach last index from first index?
}

// Example Usage:
console.log(canJumpDP([2, 3, 1, 1, 4])); // true
console.log(canJumpDP([3, 2, 1, 0, 4])); // false
console.log(canJumpDP([0])); // true
```

- **Time Complexity**: O(n^2) - For each index, we may check all subsequent indices.
- **Space Complexity**: O(n) - Additional space for the DP array.

## **3. Backtracking (Brute Force)** -- Not Optimal

- **Idea**: Try all possible jumps from the current index and recursively check if any of them leads to the last index.

```javascript
/**
 * Determines if the last index can be reached using backtracking.
 * @param {number[]} nums - Array representing maximum jump lengths.
 * @return {boolean} - True if last index is reachable, false otherwise.
 */
function canJumpBacktracking(nums, startIndex = 0) {
  if (startIndex === nums.length - 1) {
    return true; // Reached the last index.
  }
  const maxJump = Math.min(startIndex + nums[startIndex], nums.length - 1);
  for (let nextIndex = startIndex + 1; nextIndex <= maxJump; nextIndex++) {
    if (canJumpBacktracking(nums, nextIndex)) {
      return true;
    }
  }
  return false;
}

// Example Usage:
console.log(canJumpBacktracking([2, 3, 1, 1, 4])); // true
console.log(canJumpBacktracking([3, 2, 1, 0, 4])); // false
console.log(canJumpBacktracking([0])); // true
```

- **Time Complexity**: O(2^n) - Exponential due to recursive calls.
- **Space Complexity**: O(n) - Recursion stack space.

### **Dry Run of Optimal (Greedy) Approach**

#### **Example 1: nums = [2, 3, 1, 1, 4]**

- Initialize `farthestReachable = 0`.
- Iterate:
  - i = 0: `farthestReachable = max(0, 0 + 2) = 2`.
  - i = 1: `farthestReachable = max(2, 1 + 3) = 4` (>= last index, return true).

#### **Example 2: nums = [3, 2, 1, 0, 4]**

- Initialize `farthestReachable = 0`.
- Iterate:
  - i = 0: `farthestReachable = max(0, 0 + 3) = 3`.
  - i = 1: `farthestReachable = max(3, 1 + 2) = 3`.
  - i = 2: `farthestReachable = max(3, 2 + 1) = 3`.
  - i = 3: `currentIndex (3) > farthestReachable (3)` → return false.

#### **Example 3: nums = [0] (Edge Case)**

- Only one element, so already at last index → return true.

### **Conclusion**

- The **greedy approach** is optimal with O(n) time and O(1) space.
- The **DP approach** is less efficient but systematic.
- The **backtracking approach** is impractical for large inputs due to exponential time complexity.

The greedy method is the best choice for this problem.
