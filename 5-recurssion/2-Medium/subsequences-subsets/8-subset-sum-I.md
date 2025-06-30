# Subset Sum I

https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1

The subset sum problem is a classic decision problem in computer science: given a set of integers and a target sum, determine whether there's a subset of those integers that adds up exactly to the target sum.

## Approaches to Solve the Problem

### 1. Recursive Approach (Brute Force)

**Intuition**: For each element, we have two choices - either include it in the subset or exclude it. We explore both possibilities recursively.

```javascript
/**
 * Recursive solution for subset sum problem
 * @param {number[]} numbers - Array of positive integers
 * @param {number} targetSum - Target sum to find
 * @param {number} currentIndex - Current index in array (defaults to 0)
 * @return {boolean} - True if subset exists, false otherwise
 */
function hasSubsetSumRecursive(numbers, targetSum, currentIndex = 0) {
  // Base cases
  if (targetSum === 0) return true; // Found a subset
  if (currentIndex >= numbers.length || targetSum < 0) return false; // Reached end or sum exceeded

  // Recursive cases: include current number or exclude it
  const includeCurrent = hasSubsetSumRecursive(
    numbers,
    targetSum - numbers[currentIndex],
    currentIndex + 1
  );
  const excludeCurrent = hasSubsetSumRecursive(
    numbers,
    targetSum,
    currentIndex + 1
  );

  return includeCurrent || excludeCurrent;
}

// Time Complexity: O(2^n) - Exponential, since each element has 2 choices
// Space Complexity: O(n) - Recursion stack depth
```

### 2. Memoization (Top-Down DP)

**Intuition**: Store already computed results to avoid redundant calculations in the recursive approach.

```javascript
/**
 * Memoized solution for subset sum problem
 * @param {number[]} numbers - Array of positive integers
 * @param {number} targetSum - Target sum to find
 * @return {boolean} - True if subset exists, false otherwise
 */
function hasSubsetSumMemo(numbers, targetSum) {
  const memo = new Map();

  function helper(currentSum, currentIndex) {
    const key = `${currentSum}_${currentIndex}`;

    // Check memo first
    if (memo.has(key)) return memo.get(key);

    // Base cases
    if (currentSum === 0) return true;
    if (currentIndex >= numbers.length || currentSum < 0) return false;

    // Recursive cases
    const include = helper(
      currentSum - numbers[currentIndex],
      currentIndex + 1
    );
    const exclude = helper(currentSum, currentIndex + 1);

    memo.set(key, include || exclude);
    return include || exclude;
  }

  return helper(targetSum, 0);
}

// Time Complexity: O(n*sum) - Each unique subproblem is solved once
// Space Complexity: O(n*sum) - For memoization storage
```

### 3. Dynamic Programming (Bottom-Up)

**Intuition**: Build a 2D table where dp[i][j] is true if a subset of first i elements can sum to j.

```javascript
/**
 * Dynamic Programming solution for subset sum problem
 * @param {number[]} numbers - Array of positive integers
 * @param {number} targetSum - Target sum to find
 * @return {boolean} - True if subset exists, false otherwise
 */
function hasSubsetSumDP(numbers, targetSum) {
  const n = numbers.length;
  // Create a DP table of (n+1) x (targetSum+1)
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(targetSum + 1).fill(false)
  );

  // Base case: sum 0 can always be achieved with empty subset
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= targetSum; j++) {
      if (numbers[i - 1] > j) {
        // If current number is greater than current sum, exclude it
        dp[i][j] = dp[i - 1][j];
      } else {
        // Either include or exclude the current number
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - numbers[i - 1]];
      }
    }
  }

  return dp[n][targetSum];
}

// Time Complexity: O(n*sum) - Filling the DP table
// Space Complexity: O(n*sum) - For the DP table
```

### 4. Optimized DP (Space Optimized)

**Intuition**: Since we only need the previous row to compute the current row, we can optimize space to O(sum).

```javascript
/**
 * Space-optimized DP solution for subset sum problem
 * @param {number[]} numbers - Array of positive integers
 * @param {number} targetSum - Target sum to find
 * @return {boolean} - True if subset exists, false otherwise
 */
function hasSubsetSumOptimized(numbers, targetSum) {
  const dp = new Array(targetSum + 1).fill(false);
  dp[0] = true; // Base case: sum 0

  for (const num of numbers) {
    // Iterate backwards to avoid overwriting values we need later
    for (let j = targetSum; j >= num; j--) {
      if (dp[j - num]) {
        dp[j] = true;
      }
    }
  }

  return dp[targetSum];
}

// Time Complexity: O(n*sum) - Same as regular DP
// Space Complexity: O(sum) - Only single array of size sum+1
```

## Dry Run of Optimal Approach (Space Optimized DP)

### Example 1: Normal Case

Input: arr = [3, 34, 4, 12, 5, 2], sum = 9

Initial dp: [T, F, F, F, F, F, F, F, F, F]

After processing:

- num = 3: dp becomes [T, F, F, T, F, F, F, F, F, F]
- num = 34: too big, skip
- num = 4: dp becomes [T, F, F, T, T, F, F, T, F, F]
- num = 12: too big, skip
- num = 5: dp becomes [T, F, F, T, T, T, F, T, T, T]
- num = 2: dp becomes [T, F, T, T, T, T, T, T, T, T]

Final dp[9] = true (4+3+2 = 9)

### Example 2: No Subset Exists

Input: arr = [3, 34, 4, 12, 5, 2], sum = 30

After processing all numbers, dp[30] remains false (no combination sums to 30)

### Example 3: Edge Case - Empty Subset

Input: arr = [1, 2, 3], sum = 0

Initial dp[0] = true (empty subset always sums to 0)
Returns true immediately

## Analysis

1. **Recursive Approach**:

   - Time: O(2^n) - Exponential time due to all possible subsets
   - Space: O(n) - Recursion stack depth

2. **Memoization**:

   - Time: O(n\*sum) - Each subproblem solved once
   - Space: O(n\*sum) - For memoization storage

3. **DP Approach**:

   - Time: O(n\*sum) - Filling the DP table
   - Space: O(n\*sum) - For the DP table

4. **Optimized DP**:
   - Time: O(n\*sum) - Same as regular DP
   - Space: O(sum) - Only single array needed

The optimized DP approach is generally the best for this problem when dealing with reasonable sum sizes, as it provides polynomial time complexity while using less space. However, for very large sums, the problem becomes pseudo-polynomial and may not be practical.
