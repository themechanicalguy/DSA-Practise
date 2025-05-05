# Understanding Kadane's Algorithm

Kadane's Algorithm is an efficient solution for finding the maximum sum of a contiguous subarray within a one-dimensional array of numbers. It's a dynamic programming approach that solves the problem in O(n) time with O(1) space complexity.

## How Kadane's Algorithm Works

The algorithm works by maintaining two variables as it iterates through the array:

1. `maxCurrent`: Maximum sum of the subarray ending at the current position
2. `maxGlobal`: Maximum sum found so far

At each element, the algorithm decides whether to:

- Start a new subarray at the current element, or
- Continue the previous subarray by adding the current element

### JavaScript Implementation

```javascript
function kadanesAlgorithm(nums) {
  if (nums.length === 0) return 0;

  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Decide whether to start new subarray or continue current one
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);

    // Update global maximum if current maximum is greater
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
}
```

## Example Walkthrough

Let's use the array `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

1. Initialize: maxCurrent = -2, maxGlobal = -2
2. i=1 (1): maxCurrent = max(1, -2+1) = 1, maxGlobal = max(-2, 1) = 1
3. i=2 (-3): maxCurrent = max(-3, 1-3) = -2, maxGlobal = max(1, -2) = 1
4. i=3 (4): maxCurrent = max(4, -2+4) = 4, maxGlobal = max(1, 4) = 4
5. i=4 (-1): maxCurrent = max(-1, 4-1) = 3, maxGlobal = max(4, 3) = 4
6. i=5 (2): maxCurrent = max(2, 3+2) = 5, maxGlobal = max(4, 5) = 5
7. i=6 (1): maxCurrent = max(1, 5+1) = 6, maxGlobal = max(5, 6) = 6
8. i=7 (-5): maxCurrent = max(-5, 6-5) = 1, maxGlobal = max(6, 1) = 6
9. i=8 (4): maxCurrent = max(4, 1+4) = 5, maxGlobal = max(6, 5) = 6

Final result: 6 (from subarray [4, -1, 2, 1])

## Problems That Can Be Solved Using This Pattern

Kadane's pattern is useful for various problems involving contiguous subsequences:

### 1. Maximum Subarray Sum (Classic Problem)

```javascript
// Already shown above
```

### 2. Maximum Product Subarray

```javascript
function maxProductSubarray(nums) {
  if (nums.length === 0) return 0;

  let maxCurrent = nums[0];
  let minCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Store previous maxCurrent as it will be overwritten
    const temp = maxCurrent;

    // Update maxCurrent and minCurrent
    maxCurrent = Math.max(nums[i], maxCurrent * nums[i], minCurrent * nums[i]);
    minCurrent = Math.min(nums[i], temp * nums[i], minCurrent * nums[i]);

    // Update global maximum
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
}
```

### 3. LC-978 Longest Turbulent Subarray

```javascript
function maxTurbulenceSize(arr) {
  if (arr.length < 2) return arr.length;

  let maxLen = 1;
  let currentLen = 1;
  let prevSign = 0;

  for (let i = 1; i < arr.length; i++) {
    const currSign = Math.sign(arr[i] - arr[i - 1]);

    if (currSign === 0) {
      currentLen = 1;
    } else if (currSign === -prevSign || prevSign === 0) {
      currentLen++;
      maxLen = Math.max(maxLen, currentLen);
    } else {
      currentLen = 2;
    }

    prevSign = currSign;
  }

  return maxLen;
}
```

### 4. Maximum Sum Circular Subarray

```javascript
function maxSubarraySumCircular(nums) {
  // Regular Kadane's algorithm
  let maxCurrent = nums[0],
    maxGlobal = nums[0];
  let minCurrent = nums[0],
    minGlobal = nums[0];
  let total = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // For maximum subarray
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);

    // For minimum subarray
    minCurrent = Math.min(nums[i], minCurrent + nums[i]);
    minGlobal = Math.min(minGlobal, minCurrent);

    total += nums[i];
  }

  // If all numbers are negative, return the maximum one
  if (maxGlobal < 0) return maxGlobal;

  // Compare maximum subarray and circular maximum (total - minGlobal)
  return Math.max(maxGlobal, total - minGlobal);
}
```

### 5. Maximum Absolute Sum of Any Subarray

```javascript
function maxAbsoluteSum(nums) {
  let maxCurrent = 0,
    minCurrent = 0;
  let maxSum = 0,
    minSum = 0;

  for (const num of nums) {
    maxCurrent = Math.max(num, maxCurrent + num);
    maxSum = Math.max(maxSum, maxCurrent);

    minCurrent = Math.min(num, minCurrent + num);
    minSum = Math.min(minSum, minCurrent);
  }

  return Math.max(maxSum, -minSum);
}
```

## How to Identify This Pattern

Look for these characteristics to identify when Kadane's algorithm might be applicable:

1. **Contiguous Subsequence Requirement**: The problem involves finding a contiguous sequence (subarray) in an array or list.

2. **Optimization Goal**: The problem asks for maximizing or minimizing some property (sum, product, length, etc.) of a contiguous subsequence.

3. **Overlapping Subproblems**: The optimal solution at each position depends on the solution at previous positions.

4. **Negative Values Handling**: The array may contain negative numbers that affect the optimization goal.

5. **O(n) Solution Possible**: When a brute force solution would be O(n²) but you suspect an O(n) solution exists.

Common problem phrases:

- "Find the contiguous subarray with..."
- "Maximum sum/product of any sequence..."
- "Longest subarray where..."
- "Best time to buy/sell stock..." (for single transaction problems)

Kadane's algorithm is particularly powerful because it can often be adapted to solve variations of the maximum subarray problem with minimal modifications to the core logic.
