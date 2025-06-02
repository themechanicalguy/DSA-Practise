# Solving Subarray Problems: Patterns and Approaches

Subarray problems are common in coding interviews and competitive programming.
These problems typically ask you to find, count, or manipulate contiguous segments of an array that meet certain conditions.
Here's a structured approach to solving them:

## Common Patterns for Subarray Problems

### 1. Sliding Window Technique

#### When to use:

- When you need to find a subarray with a specific property (`sum, length` etc.) and the **array has non-negative numbers**.
- Find a subarray or substring that satisfies a specific condition (e.g.,` maximum sum, minimum length, specific sum`).
- Process a contiguous range of elements in an array or string.
- Optimize solutions that would otherwise require nested loops (e.g., checking every possible subarray).
- Solve problems involving constraints like maximum/minimum window size, sum, or frequency of elements.

#### Common problem types:

- Maximum/minimum sum of a subarray of size k.
- Longest/shortest substring with certain properties (e.g., at most k distinct characters).
- Finding a subarray with a specific sum.
- Problems involving running sums, averages, or counts over a range.

**Intuition**: Maintain a window that slides through the array while adjusting its size based on certain conditions.

**Example Problem**: Find the maximum sum of any contiguous subarray of size `k`.

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let windowSum = 0;

  // Calculate initial window sum
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum + arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3)); // Output: 9 (subarray [5, 1, 3])
```

### 2. Prefix Sum Technique

**When to use**: When you need to calculate sums of subarrays efficiently, especially with negative numbers.

**Intuition**: Precompute cumulative sums to allow O(1) range sum queries.

**Example Problem**: Find if there exists a subarray with sum equal to `k`.

```javascript
function subarraySum(nums, k) {
  const prefixSums = new Map();
  prefixSums.set(0, 1); // Base case: sum 0 occurs once
  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;
    if (prefixSums.has(sum - k)) {
      count += prefixSums.get(sum - k);
    }
    prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1);
  }

  return count;
}

console.log(subarraySum([1, 1, 1], 2)); // Output: 2 (subarrays [1,1] and [1,1])
```

# Prefix Sum vs. Sliding Window: When to Use Each Pattern

Both prefix sum and sliding window are powerful techniques for solving array-related problems, but they serve different purposes and are optimal in different scenarios. Here's a detailed comparison to help you decide which pattern to use:

## Key Differences

| Feature              | Prefix Sum                      | Sliding Window                                  |
| -------------------- | ------------------------------- | ----------------------------------------------- |
| **Primary Use Case** | Range sum queries               | Finding subarrays/substrings meeting conditions |
| **Time Complexity**  | O(n) preprocess, O(1) per query | Typically O(n)                                  |
| **Space Complexity** | O(n) for storage                | O(1) to O(n) depending on variant               |
| **Best For**         | Multiple random range queries   | Single pass problems with constraints           |

## When to Use Prefix Sum

### Optimal Scenarios:

1. **Multiple range sum queries** - When you need to answer many sum queries on different ranges

   - Example: "Find the sum between indices i and j for 100 different (i,j) pairs"

2. **Problems that can be transformed into sum/count problems**

   - Example: "Find number of subarrays with sum equal to k" (LeetCode 560)

3. **When you need to calculate cumulative values**

   - Example: "Find the pivot index where left sum equals right sum" (LeetCode 724)

4. **Matrix range queries** (using 2D prefix sum)
   - Example: "Calculate sum of any submatrix efficiently"

## When to Use Sliding Window

### Optimal Scenarios:

1. **Subarrays/substrings with constraints**

   - Example: "Find the longest subarray with sum ≤ k" or "Find the minimum window substring"

2. **Fixed-size window problems**

   - Example: "Find the maximum average of any contiguous subarray of length k"

3. **When you can maintain a window that grows/shrinks based on conditions**

   - Example: "Find the longest substring without repeating characters" (LeetCode 3)

4. **When the problem involves a running computation on a window**
   - Example: "Find all anagrams in a string" (LeetCode 438)

## Decision Flowchart

1. **Does the problem involve multiple range sum queries on a static array?**

   - Yes → Prefix Sum
   - No → Next question

2. **Is the problem about finding a contiguous subarray/substring that meets certain conditions?**

   - Yes → Sliding Window
   - No → Next question

3. **Can the problem be transformed into a sum/count problem?**
   - Yes → Prefix Sum
   - No → Consider other patterns

**Sliding Window Solution (Only works with positive numbers):**

## Key Takeaways

1. **Prefix Sum is your go-to for:**

   - Multiple range sum queries
   - Problems that can be transformed into sum/count problems
   - When you need to answer many random range queries efficiently

2. **Sliding Window is better for:**

   - Contiguous subarray/substring problems
   - Problems with window size constraints
   - When you can maintain a running computation as the window slides

3. **Remember**:
   - Sliding window often has better space complexity (O(1) for some variants)
   - Prefix sum provides O(1) range queries after O(n) preprocessing
   - Sliding window only works for contiguous elements, while prefix sum can handle non-contiguous ranges

By understanding these distinctions, you'll be able to quickly identify which pattern is more appropriate for a given problem, leading to more efficient and elegant solutions.

### 3. Two Pointers Technique

**When to use**: When dealing with sorted arrays or when you need to find subarrays with specific properties.

**Intuition**: Use two pointers to represent the current window and adjust them based on conditions.

**Example Problem**: Find the smallest subarray with sum ≥ target.

```javascript
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2 (subarray [4, 3])
```

### 4. Kadane's Algorithm

**When to use**: When you need to find the maximum sum subarray.

**Intuition**: Keep track of the maximum sum ending at each position.

**Example Problem**: Maximum subarray sum.

```javascript
function maxSubArray(nums) {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6 (subarray [4, -1, 2, 1])
```

## General Approach to Solve Subarray Problems

1. **Understand the Problem**: Identify if you need to find, count, or manipulate subarrays based on sum, length, or other properties.

2. **Identify the Pattern**:

   - Fixed size subarray → Sliding Window
   - Variable size subarray with sum condition → Two Pointers or Prefix Sum
   - Maximum sum subarray → Kadane's Algorithm
   - Subarray sum problems → Prefix Sum

3. **Edge Cases**: Consider empty arrays, negative numbers, and zero values.

4. **Optimize**: Look for O(n) or O(n log n) solutions rather than brute-force O(n²).

5. **Test**: Verify with sample inputs including edge cases.

## Practice Problems

1. Find all subarrays with product less than K (Sliding Window)
2. Longest subarray with distinct characters (Sliding Window + Hash Map)
3. Subarray sums divisible by K (Prefix Sum + Modulo Arithmetic)
4. Minimum size subarray sum (Two Pointers)
5. Maximum product subarray (Modified Kadane's)

Mastering these patterns will help you solve most subarray problems efficiently.
