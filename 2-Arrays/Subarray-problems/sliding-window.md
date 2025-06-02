# Sliding Window Technique

- The Sliding Window pattern is a powerful algorithmic technique used to solve problems involving arrays, strings, or sequences by maintaining a "window" of elements that can shrink, expand, or slide over the data structure to efficiently compute a result.
- It is particularly useful for optimizing problems that require **finding subarrays, substrings, or subsequences that satisfy specific conditions**.
- This pattern reduces time complexity from O(n²) (naive approaches) to O(n) or better in many cases.

## 1. When to Use the Sliding Window Pattern

The sliding window pattern is applicable when you need to:

- When you need to find a subarray with a specific property (`sum, length` etc.) and the **array has non-negative numbers**.
- Find a subarray or substring that satisfies a specific condition (e.g.,` maximum sum, minimum length, specific sum`).
- Process a contiguous range of elements in an array or string.
- Optimize solutions that would otherwise require nested loops (e.g., checking every possible subarray).
- Solve problems involving constraints like maximum/minimum window size, sum, or frequency of elements.

## 2. How to Identify a Problem Suitable for Sliding Window

To determine if a problem can be solved using the sliding window pattern, look for these characteristics:

1. **Input Type:** The problem involves an `array, string, or sequence of elements`.
2. **Contiguous Range:** The solution requires finding or processing a `contiguous subarray or substring`.
3. **Constraints or Conditions:** The problem specifies conditions on the `subarray/substring`, such as:

   - Fixed window size (e.g., "subarray of length k").
   - Variable window size with constraints (e.g., "sum less than or equal to target").
   - Properties like `distinct characters, sum, or frequency`.

4. **Optimization Goal:** The problem asks for the `maximum, minimum, longest, or shortest subarray/substring satisfying a condition `.
5. **Avoid Nested Loops:** Naive solutions using nested loops (O(n²)) can often be optimized to O(n) with a sliding window.

### Examples of problem statements:

- Find the maximum sum of a subarray of size k.
- Find the longest substring with at most k distinct characters.
- Find the minimum window substring that contains all characters of a given pattern.
- Find the number of subarrays with sum equal to k.

If the problem involves iterating over a range and updating results based on a moving window, sliding window is likely applicable.

## 3. Intuition Toward Solving Sliding Window Problems

The intuition behind the sliding window pattern is to `avoid redundant calculations` by maintaining a window of elements and updating it incrementally as you move through the array or string. Instead of recomputing properties for every possible subarray, you:

- Keep track of the properties (e.g., sum, count, frequency) of the current window.
- **Slide** the window by adding elements at the end (expanding) and removing elements from the start (shrinking) as needed.
- Use the window’s properties to check if it satisfies the problem’s conditions.

### **Key Concepts:**

- **Window:** A range of elements (subarray or substring) defined by two pointers (start and end) or a fixed size.
- **Expand:** Add elements to the window by moving the end pointer forward.
- **Shrink:** Remove elements from the window by moving the start pointer forward when the window no longer satisfies the condition.
- **Track State:** Use variables (e.g., sum, frequency map) to track properties of the window efficiently.

### Types of Sliding Windows:

**Fixed-Size Window:** The window has a constant size (e.g., subarray of size k). Slide the window by moving both pointers together.
**Variable-Size Window:** The window size changes dynamically based on conditions (e.g., expand until the condition is met, then shrink).

## 4. Approach Toward Solving Sliding Window Problems

Here’s a general approach to solve sliding window problems:

1. **Understand the Problem:**

- Identify the input (array, string) and the required output (e.g., max sum, min length).
- Determine if the window is `fixed-size or variable-size`.
- Identify the condition that the window must satisfy (e.g., sum == k, at most k distinct characters).

2. **Initialize Variables:**

- Use two pointers: start (left boundary) and end (right boundary) of the window.
- Initialize variables to track the window’s state (e.g., sum, count, or a frequency map).
- Initialize result variables (e.g., maxSum, minLength).

3. **Process the Window:**

- For **fixed-size windows:**

  - Move the window by incrementing both start and end together.
  - Update the state (e.g., add new element, remove old element).
  - Check if the window satisfies the condition and update the result.

- For **variable-size windows:**
  - Expand the window by moving end forward and updating the state.
  - If the window satisfies the condition, update the result and try to shrink the window by moving start forward.
  - If the window violates the condition, shrink it until valid again.

4. **Optimize:**

- Use appropriate data structures (e.g., hash map for frequency, set for distinct elements).
- Avoid recomputing values that can be updated incrementally.
- Handle edge cases (e.g., empty arrays, invalid inputs).

5. **Return the Result:**

- Return the computed result (e.g., max sum, min length, count of valid subarrays).

## 5. Examples with JavaScript Code

Below are three examples of sliding window problems (fixed-size and variable-size) with detailed explanations and JavaScript code.

### Example 1: Maximum Sum Subarray of Size K (Fixed-Size Window)

Problem: Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.

**Intuition:**

- Use a fixed-size window of size k.
- Compute the sum of the first k elements.
- Slide the window by adding the next element and removing the first element of the previous window.
- Track the maximum sum seen so far.

```javascript
function maxSumSubarray(arr, k) {
  if (arr.length < k) return null;

  // Initialize window sum for first k elements
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  // Initialize maxSum with the first window's sum
  let maxSum = windowSum;

  // Slide the window and update maxSum
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum + arr[i] - arr[i - k]; // Add new element, remove first element
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Test
console.log(maxSumSubarray([1, 4, 2, 10, 2, 3, 1, 0, 20], 4)); // Output: 24 (sum of [4, 2, 10, 2])
```

**Time Complexity:** O(n), where n is the array length. We compute the first window sum in O(k) and slide the window in O(n-k).
**Space Complexity:** O(1), as we only use a few variables.

### Example 2: Longest Substring with At Most K Distinct Characters (Variable-Size Window)

Problem: Given a string s and an integer k, find the length of the longest substring with at most k distinct characters.

**Intuition:**

- Use a variable-size window with two pointers (start and end).
- Maintain a frequency map to track the number of distinct characters in the window.
- Expand the window by moving end and adding characters to the map.
- If the number of distinct characters exceeds k, shrink the window by moving start until valid.
- Track the maximum window size.

```javascript
function longestSubstringKDistinct(s, k) {
  if (k === 0) return 0;

  let start = 0;
  let maxLength = 0;
  const charCount = new Map(); // Frequency map for characters

  for (let end = 0; end < s.length; end++) {
    // Add new character to window
    charCount.set(s[end], (charCount.get(s[end]) || 0) + 1);

    // Shrink window if distinct characters exceed k
    while (charCount.size > k) {
      charCount.set(s[start], charCount.get(s[start]) - 1);
      if (charCount.get(s[start]) === 0) {
        charCount.delete(s[start]);
      }
      start++;
    }

    // Update maxLength
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Test
console.log(longestSubstringKDistinct("eceba", 2)); // Output: 3 (substring "ece")
```

## Example 3: Number of Subarrays with Sum Equal to K (Variable-Size Window)

Given an array of integers nums and an integer k, return the number of contiguous subarrays with sum equal to k.

**Intuition:**

- Use a variable-size window with a prefix sum approach.
- Maintain a map of cumulative sums and their frequencies to count subarrays with sum k.
- For each end pointer, compute the cumulative sum and check if sum - k exists in the map to find valid subarrays.
- This is a variation of the sliding window where we use prefix sums instead of explicit pointers.

```javascript
function subarraySum(nums, k) {
  let count = 0;
  let sum = 0;
  const sumFreq = new Map();
  sumFreq.set(0, 1); // Initialize for subarrays starting from index 0

  for (let end = 0; end < nums.length; end++) {
    sum += nums[end]; // Add current element to cumulative sum

    // Check if there exists a prefix sum such that sum - k exists
    if (sumFreq.has(sum - k)) {
      count += sumFreq.get(sum - k);
    }

    // Update frequency of current cumulative sum
    sumFreq.set(sum, (sumFreq.get(sum) || 0) + 1);
  }

  return count;
}

// Test
console.log(subarraySum([1, 1, 1], 2)); // Output: 2 (subarrays [1,1])
console.log(subarraySum([1, 2, 3], 3)); // Output: 2 (subarrays [1,2], [3])
```

## 6. Summary

**Sliding Window Pattern:** Efficiently processes contiguous subarrays/substrings by maintaining a window that slides over the data.

**When to Use:** Problems involving arrays/strings, contiguous ranges, and optimization of subarray/substring properties.

**Identification:** Look for keywords like "subarray," "substring," "maximum," "minimum," or constraints on sum, length, or distinct elements.

**Intuition:** Avoid recomputing by incrementally updating the window’s state while sliding.

**Approach:** Use two pointers (start, end), track window properties, and adjust the window based on conditions.

**Examples:** Fixed-size (max sum of k elements), variable-size (longest substring with k distinct characters), and prefix-sum-based (subarrays with sum k).

The sliding window pattern is versatile and can be adapted to many problems with practice. Let me know if you need more examples or clarification on any specific aspect!
