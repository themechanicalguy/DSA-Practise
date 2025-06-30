# Prefix Sum Pattern:

- The prefix sum pattern is a powerful algorithmic technique used to efficiently compute cumulative sums over a range of elements in an array, enabling fast query processing for problems involving subarray sums, ranges, or aggregations.
- It’s particularly useful in scenarios where you need to repeatedly calculate sums or other cumulative properties over different segments of an array.

## What is the Prefix Sum Pattern?

- The prefix sum pattern involves precomputing an array (called the prefix sum array) where each element at index i represents the cumulative sum (or another aggregate) of all elements from the start of the original array up to index `i`.
- This precomputation allows you to answer queries about subarray sums (or other properties) in constant time, O(1), after an initial O(n) preprocessing step.

For an array arr = `[a₀, a₁, a₂, ..., aₙ₋₁]`, the prefix sum array prefix is defined as:

- prefix[0] = arr[0]
- prefix[1] = arr[0] + arr[1]
- prefix[2] = arr[0] + arr[1] + arr[2]

...

prefix[i] = arr[0] + arr[1] + ... + arr[i]

- To find the sum of elements in the range [left, right] in the original array:
  - `sum[left, right]` = `prefix[right] - prefix[left - 1]` (if left > 0)
  - `sum[0, right]` = `prefix[right]` (if left == 0)

This works because prefix[right] contains the sum up to index right, and subtracting prefix[left - 1] removes the sum of elements before left, leaving the sum of the range [left, right].

### Basic Example:

For an array `[1, 2, 3, 4]`, the prefix sum array would be `[1, 3, 6, 10]`.

## When to Use the Prefix Sum Pattern

Use the prefix sum pattern when:

1. **You need to compute sums (or other cumulative aggregates) over multiple subarrays or ranges** in an array.
2. **Queries are frequent**, and computing the sum for each query from scratch would be too slow (e.g., O(n) per query).
3. **The array is static** or updates are infrequent, making precomputation worthwhile.
4. **The problem involves finding subarrays** that satisfy certain conditions, such as a specific sum, maximum/minimum sum, or count of subarrays meeting a criterion.

Common use cases include:

- Calculating range sums (e.g., sum of elements from index left to right).
- Finding subarrays with a given sum.
- Checking if a subarray meets a condition (e.g., sum equals a target).
- Problems involving cumulative properties like running totals, differences, or frequencies.

## How to Identify a Problem for the Prefix Sum Pattern

To determine if a problem can be solved using the prefix sum pattern, look for these characteristics:

- **The problem involves an array** and requires computing properties (e.g., sum, count, or other aggregates) over subarrays or ranges.
- **Multiple queries** are made on the same array, such as finding the sum of elements in different ranges.
- **The problem asks for subarrays** that satisfy a condition, like a specific sum or a property that can be derived from cumulative values.
- **Naive solutions are slow** (e.g., O(n) per query or O(n²) for iterating over all subarrays), suggesting precomputation could help.

## Intuition Behind the Prefix Sum Approach

The key insight is that by precomputing cumulative sums, any subarray sum can be calculated in constant time using simple arithmetic:

`sum(arr[i..j]) = prefix[j+1] - prefix[i]`

This transforms what would normally be an O(n) operation (summing elements each time) into an O(1) operation after O(n) preprocessing.

Think of the prefix sum array as a "running total" that captures the state of the array up to each index. By storing these running totals, you can quickly compute the difference between two points to get the sum of any subarray. This is especially powerful when the array doesn’t change (static array) or when updates can be handled efficiently.

For problems like finding subarrays with a specific sum, the prefix sum pattern transforms the problem into a search for pairs of indices where the difference in prefix sums equals the target sum, often using a hash map to track seen prefix sums.

## General Approach to Solve Problems

1. **Understand the Problem:**

- Identify if the problem involves range queries, subarray sums, or cumulative properties.
- Check if the array is static or if updates are involved (updates may require a more advanced data structure like a Fenwick tree).

2. **Precompute the Prefix Sum Array:**:

   - Create an array `prefix` where `prefix[i]` is the sum of elements from `arr[0] to arr[i]`.
   - Initialize a prefix array with length `n+1` (where `n` is the length of the input array)
   - Set `prefix[0] = 0` For a 0-based index: `prefix[i] = prefix[i-1] + arr[i]` (with `prefix[-1] = 0` for convenience).
   - For each index `i`, compute `prefix[i+1] = prefix[i] + arr[i]`
   - To get the sum from index `i` to `j` (inclusive), compute `prefix[j+1] - prefix[i]`

3. **Handle Queries or Conditions:**:

   - For range sum queries `[left, right]`, compute `prefix[right] - prefix[left-1]` (if left > 0).
   - For subarray sum problems (e.g., sum equals k), use the fact that for indices `i` and `j` (where j > i),
     the sum of subarray `[i+1, j]` is `prefix[j] - prefix[i]`.
   - Look for pairs where prefix[j] - prefix[i] = k.

4. **Optimize with Data Structures (if needed):**

   - For problems like counting subarrays with a sum equal to k, use a hash map to store the frequency of prefix sums.
   - For dynamic arrays (with updates), consider advanced structures like segment trees or Fenwick trees.

5. **Handle Edge Cases:**

   - Empty arrays or invalid ranges (`left > right`).
   - Negative numbers or zero in the array.
   - Special cases like `left = 0` (no subtraction needed).

## Example Problems

### 1. Basic Prefix Sum Implementation

```javascript
function prefixSum(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
}

const arr = [1, 2, 3, 4];
const prefix = prefixSum(arr);
console.log(prefix); // [0, 1, 3, 6, 10]

// Get sum from index 1 to 2 (inclusive)
const sum = prefix[3] - prefix[1];
console.log(sum); // 5 (2 + 3)
```

### 2. Subarray Sum Equals K (LeetCode 560)

**Problem**: Given an array of integers and an integer k, find the total number of continuous subarrays whose sum equals to k.

```javascript
function subarraySum(nums, k) {
  let count = 0;
  let sum = 0;
  const map = new Map();
  map.set(0, 1); // Base case: sum 0 occurs once

  for (let num of nums) {
    sum += num;
    // If (sum - k) exists in map, we found subarrays that sum to k
    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }
    // Update the frequency of current sum
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2
console.log(subarraySum([1, 2, 3, 4, 5], 9)); // 2 ([2,3,4] and [4,5])
```

### 3. Find Pivot Index (LeetCode 724)

**Problem**: Return the leftmost pivot index where the sum of all numbers to the left equals the sum of all numbers to the right.

```javascript
function pivotIndex(nums) {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  const totalSum = prefix[nums.length];

  for (let i = 0; i < nums.length; i++) {
    const leftSum = prefix[i];
    const rightSum = totalSum - prefix[i + 1];
    if (leftSum === rightSum) {
      return i;
    }
  }

  return -1;
}

console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
console.log(pivotIndex([1, 2, 3])); // -1
```

### 4. Product of Array Except Self (LeetCode 238)

**Problem**: Return an array where each element is equal to the product of all the elements of the original array except the one at that index.

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const prefix = new Array(n).fill(1);
  const suffix = new Array(n).fill(1);
  const result = new Array(n);

  // Compute prefix products
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // Compute suffix products
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  // Combine prefix and suffix
  for (let i = 0; i < n; i++) {
    result[i] = prefix[i] * suffix[i];
  }

  return result;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
```

## Time and Space Complexity

- **Construction**: O(n) time, O(n) space
- **Query**: O(1) time per query
- **Overall**: Excellent for problems with many range sum queries

## Variations of the Prefix Sum Pattern

1. **2D Prefix Sum**: For matrix problems where you need to calculate submatrix sums
2. **Prefix Product**: Similar concept but with multiplication instead of addition
3. **Prefix XOR**: Useful for certain bit manipulation problems
4. **Prefix Count**: Counting occurrences up to certain indices

The prefix sum pattern is a powerful tool that can dramatically optimize solutions to many array-based problems, especially those involving range queries or subarray operations.
