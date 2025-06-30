https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1

# Longest Subarray with Sum K

Given an array arr[] containing integers and an integer k, your task is to find the length of the longest subarray where the sum of its elements is equal to the given value k. If there is no subarray with sum equal to k, return 0.

Examples:

Input: arr[] = `[10, 5, 2, 7, 1, -10]`, k = `15`
Output: 6
Explanation: Subarrays with sum = `15` are `[5, 2, 7, 1], [10, 5]` and `[10, 5, 2, 7, 1, -10]`.
The length of the longest subarray with a sum of 15 is 6.

## Problem Understanding

- We need to find the longest contiguous subarray in an array of integers where the sum of the elements equals a given integer k.
- If no such subarray exists, we return 0.
- The array may contain positive, negative, or zero values, which makes the problem interesting and requires careful handling of edge cases.

## Approach 1: Brute Force (Nested Loops)

- Check every possible subarray by iterating over all start and end indices, compute their sum, and track the maximum length when the sum equals k.
- This is straightforward but inefficient for large arrays.

```javascript
function longestSubarrayWithSumBruteForce(arr, k) {
  // Variable to store the maximum length of subarray with sum k
  let maxLength = 0;

  // Iterate over each possible starting index
  for (let start = 0; start < arr.length; start++) {
    // Initialize sum for the current subarray
    let currentSum = 0;

    // Iterate over each possible ending index
    for (let end = start; end < arr.length; end++) {
      // Add the current element to the sum
      currentSum += arr[end];

      // If the sum equals k, update maxLength if necessary
      if (currentSum === k) {
        maxLength = Math.max(maxLength, end - start + 1);
      }
    }
  }

  return maxLength;
}

// Test case
const arr = [10, 5, 2, 7, 1, -10];
const k = 15;
console.log(longestSubarrayWithSumBruteForce(arr, k)); // Output: 6
```

**Time Complexity:** O(n²), where n is the length of the array, as we use nested loops to check all subarrays.

**Space Complexity:** O(1), as we only use a few variables Drawbacks: Inefficient for large arrays due to quadratic time complexity.

---

### **Approach 2: Prefix Sum (Works for All Cases, Including Negatives)**

- For arrays with negative numbers, we use the prefix sum technique.
- The sum of a subarray from index `i` to `j` is `prefixSum[j] - prefixSum[i-1]`.
- If this equals k, then `prefixSum[j] - prefixSum[i-1] = k`, or `prefixSum[i-1] = prefixSum[j] - k`.
- By storing prefix sums in a hash map, we can efficiently find if a previous prefix sum matches `prefixSum[j] - k`, indicating a subarray with sum `k`. The length of the subarray is `j - i`.
- The **prefix sum** approach works for all cases (positive, negative, and zero values). It uses a hashmap to store the earliest occurrence of each prefix sum.

**Prefix Sum Algorithm:**

1. Initialize `prefixSum = 0`, `maxLen = 0`, and a hashmap `prefixMap` with `{0: -1}` (sum `0` occurs at index `-1` before the array starts).
2. Iterate over the array:
   - Compute `prefixSum += arr[i]`.
   - If `(prefixSum - k)` exists in `prefixMap`, update `maxLen` if the current subarray is longer.
   - If `prefixSum` is not in `prefixMap`, store it with its index.
3. Return `maxLen`.

**Prefix Sum - Optimal for All Cases:**

```javascript
function longestSubarrayPrefixSum(arr, k) {
  const prefixSumMap = new Map(); // Stores prefix sum and its earliest index
  let prefixSum = 0; // Running prefix sum
  let maxLength = 0; // Tracks the maximum length of subarray with sum k

  // Initialize map with prefix sum 0 at index -1 (before array starts)
  prefixSumMap.set(0, -1);

  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
    prefixSum += arr[i]; // Update prefix sum

    // If prefixSum - k exists in map, a subarray with sum k is found
    if (prefixSumMap.has(prefixSum - k)) {
      const startIndex = prefixSumMap.get(prefixSum - k);
      maxLength = Math.max(maxLength, i - startIndex); // Update max length
    }

    // Store prefix sum only if not seen or if this index is earlier
    if (!prefixSumMap.has(prefixSum)) {
      prefixSumMap.set(prefixSum, i);
    }
  }

  return maxLength;
}

// Test Case
const arr = [10, 5, 2, 7, 1, -10];
const k = 15;
console.log(longestSubarrayWithSumK(arr, k)); // Output: 6 (Correct)
```

### **Explanation of Prefix Sum Approach:**

1. **Initialization:**

   - `prefixSum = 0`, `maxLen = 0`.
   - `prefixMap = {0: -1}` (sum `0` occurs before the array starts).

2. **Iteration:**

   - At `i=0`, `prefixSum = 10`.
     - `prefixSum - k = -5` (not in map).
     - Store `{10: 0}`.
   - At `i=1`, `prefixSum = 15`.
     - `prefixSum - k = 0` (exists in map at `-1`).
     - Length `= 1 - (-1) = 2` → `maxLen = 2`.
   - At `i=2`, `prefixSum = 17`.
     - `prefixSum - k = 2` (not in map).
     - Store `{17: 2}`.
   - At `i=3`, `prefixSum = 24`.
     - `prefixSum - k = 9` (not in map).
     - Store `{24: 3}`.
   - At `i=4`, `prefixSum = 25`.
     - `prefixSum - k = 10` (exists at `0`).
     - Length `= 4 - 0 = 4` → `maxLen = 4`.
   - At `i=5`, `prefixSum = 15`.
     - `prefixSum - k = 0` (exists at `-1`).
     - Length `= 5 - (-1) = 6` → `maxLen = 6`.

3. **Final Result:**  
   The longest subarray with sum `15` is `[10, 5, 2, 7, 1, -10]` with length `6`.

### **Time & Space Complexity:**

- **Time Complexity:** `O(n)` (single pass over the array).
- **Space Complexity:** `O(n)` (due to the hashmap).

### **Conclusion:**

- **Sliding Window** works only for **positive numbers** (`O(n)` time, `O(1)` space).
- **Prefix Sum** works for **all cases** (`O(n)` time, `O(n)` space).

For the given problem (which includes negative numbers), the **prefix sum** approach is the correct solution. 🚀

---

### **Approach 3: Sliding Window - Variable Sized (Works for Positive Numbers Only)**

- If the array contains only non-negative integers, we can use a sliding window to maintain a subarray with a sum close to k.
- We expand the window by adding elements and shrink it when the sum exceeds k.
- However, this approach fails when negative numbers are present, as the sum can decrease, breaking the monotonic property. So this approach **won’t work** for this case. Still, I’ll include it for completeness.

#### **Sliding Window Algorithm:**

1. Initialize `left = 0`, `currentSum = 0`, and `maxLen = 0`.
2. Iterate over the array with `right` pointer:
   - Add `arr[right]` to `currentSum`.
   - While `currentSum > k`, subtract `arr[left]` from `currentSum` and increment `left`.
   - If `currentSum == k`, update `maxLen` if the current window is longer.
3. Return `maxLen`.

#### **Javascript Code (Sliding Window - Positive Numbers Only):**

```javascript
function longestSubarraySlidingWindow(arr, k) {
  let maxLength = 0; // Tracks the maximum length of subarray with sum k
  let currentSum = 0; // Current sum of the sliding window
  let start = 0; // Start of the sliding window

  // Iterate over the array
  for (let end = 0; end < arr.length; end++) {
    currentSum += arr[end]; // Expand window by adding element

    // Shrink window while sum exceeds k
    while (currentSum > k && start <= end) {
      currentSum -= arr[start];
      start++;
    }

    // Check if current window sum equals k
    if (currentSum === k) {
      maxLength = Math.max(maxLength, end - start + 1); // Update max length
    }
  }

  return maxLength;
}
// Test Case
const arr = [10, 5, 2, 7, 1, -10];
const k = 15;
console.log(longestSubarrayWithSumK(arr, k)); // Output: 4 (But expected 6, so this fails due to -10)
```

**Time Complexity:** O(n), where n is the array length. Each element is added and removed at most once (the start pointer moves forward only).

**Space Complexity:** O(1), as we use only a few variables (maxLength, currentSum, start).

**Issue:** This fails for arrays with negative numbers because shrinking the window (`left++`) might skip valid subarrays.

---

### **Why Sliding Window Fails with Negative Numbers**

The **sliding window approach** works efficiently for arrays with **only positive numbers** because:

1. **Expanding the window (`right++`)** always **increases** the sum.
2. **Shrinking the window (`left++`)** always **decreases** the sum.

However, when **negative numbers** are present:

- Expanding the window (`right++`) can **decrease** the sum (if the new element is negative).
- Shrinking the window (`left++`) can **increase** the sum (if the removed element is negative).

This breaks the **monotonicity** assumption required for the sliding window technique, causing it to **miss valid subarrays**.

---

### **Example Where Sliding Window Fails**

Consider the array:  
`arr = [10, 5, 2, 7, 1, -10]`  
`k = 15`

#### **Correct Subarrays (Sum = 15):**

1. `[10, 5]` → Sum = `15` (Length = `2`)
2. `[5, 2, 7, 1]` → Sum = `15` (Length = `4`)
3. `[10, 5, 2, 7, 1, -10]` → Sum = `15` (Length = `6`)

The **longest valid subarray** is `[10, 5, 2, 7, 1, -10]` with length `6`.

---

#### **How Sliding Window Behaves (Incorrectly):**

1. **Initial State:**  
   `left = 0`, `currentSum = 0`, `maxLen = 0`

2. **Step-by-Step Execution:**

   - **`right=0` (arr[0] = 10):**  
     `currentSum = 10`  
     (`10 < 15`) → Do nothing.  
     `maxLen` remains `0`.

   - **`right=1` (arr[1] = 5):**  
     `currentSum = 15`  
     (`15 == 15`) → Update `maxLen = 2`.  
     (Sliding window records `[10, 5]` correctly here.)

   - **`right=2` (arr[2] = 2):**  
     `currentSum = 17`  
     (`17 > 15`) → Shrink window:

     - Subtract `arr[left=0] = 10` → `currentSum = 7`.
     - `left = 1`.  
       (`7 < 15`) → Stop shrinking.  
       `maxLen` remains `2`.

   - **`right=3` (arr[3] = 7):**  
     `currentSum = 14`  
     (`14 < 15`) → Do nothing.  
     `maxLen` remains `2`.

   - **`right=4` (arr[4] = 1):**  
     `currentSum = 15`  
     (`15 == 15`) → Update `maxLen = 4` (`[5, 2, 7, 1]`).  
     (Sliding window records this correctly.)

   - **`right=5` (arr[5] = -10):**  
     `currentSum = 5`  
     (`5 < 15`) → Do nothing.  
     **Problem:** The window never expands to include `arr[0] = 10` again, so it **misses** the valid subarray `[10, 5, 2, 7, 1, -10]`.

3. **Final Output:**  
   The sliding window returns `maxLen = 4` (from `[5, 2, 7, 1]`), but the **correct answer is `6`**.

---

### **Why It Fails:**

- When `right=5`, `currentSum = 5` (too small).
- The sliding window **cannot re-expand leftward** to include `arr[0] = 10` because it only moves `left` forward.
- Thus, it **never checks** the subarray `[10, 5, 2, 7, 1, -10]`, which sums to `15`.

### **Key Insight:**

- Negative numbers **break the assumption** that shrinking the window (`left++`) always reduces the sum.
- In this case, removing `10` (at `left=0`) **reduced the sum from `15` to `5`**, but later, adding `-10` **could have balanced it back to `15`** if the window had included `10`.

---

### **Conclusion:**

The **sliding window approach fails for negative numbers** because:

1. It cannot "undo" shrinking when a negative number later compensates for an earlier positive number.
2. It **misses valid subarrays** that require including negative numbers to balance the sum.

---
