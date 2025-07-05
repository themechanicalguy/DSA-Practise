# LC 238. Product of Array Except Self

Given an integer array `nums`, return an array answer such that answer[i] is equal to the product of all the elements of nums except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in `O(n)` time and `without using the division operation`.

Example 1:

Input: nums = `[1,2,3,4]`
Output: `[24,12,8,6]`

Example 2:
Input: nums = `[-1,1,0,-3,3]`
Output: `[0,0,9,0,0]`

## Problem Understanding

We need to create an array where each element at index `i` is the product of all other elements in the original array except the element at `i` itself.

**Constraints:**

- Must run in O(n) time
- Cannot use division operation
- 32-bit integer products are guaranteed

## Intuition

The straightforward approach would be to calculate the product of all elements and then divide by each element to get the result. However, the problem explicitly forbids using division, and this approach would fail when there are zeros in the array.

The optimal approach involves using prefix and suffix products:

1. Calculate the product of all elements to the left of each element (prefix)
2. Calculate the product of all elements to the right of each element (suffix)
3. Multiply prefix and suffix for each position to get the final result

## Approach 1: Brute Force (Not optimal - just for demonstration)

For each element, calculate the product of all other elements by iterating through the array for each element.

```javascript
function productExceptSelfBruteForce(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        answer[i] *= nums[j];
      }
    }
  }

  return answer;
}
```

**Time Complexity:** O(n²) - Not acceptable per problem requirements
**Space Complexity:** O(1) (excluding output array)

## 2. Using Prefix and Suffix Products (Optimal)

- Create a prefix array where each element is the product of all elements before it
- Create a suffix array where each element is the product of all elements after it
- Multiply prefix and suffix for each position

```javascript
function productExceptSelfPrefixSuffix(nums) {
  const n = nums.length;
  const answer = new Array(n);
  const prefix = new Array(n);
  const suffix = new Array(n);

  // Calculate prefix products
  prefix[0] = 1;
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  // Calculate suffix products
  suffix[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  // Multiply prefix and suffix
  for (let i = 0; i < n; i++) {
    answer[i] = prefix[i] * suffix[i];
  }

  return answer;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

### 3. Optimized Space Approach (Most Optimal)

- Use the output array to first store prefix products
- Then use a variable to keep track of suffix products and multiply with prefix products

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n);

  // First pass: store prefix products in answer array
  answer[0] = 1;
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
  }

  // Second pass: calculate suffix products on the fly and multiply with prefix
  let suffixProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * suffixProduct;
    suffixProduct *= nums[i];
  }

  return answer;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(1) (excluding output array)

## Dry Run with Examples

### Example 1: [1, 2, 3, 4]

**Approach 3 Steps:**

1. Initialize answer = [1, 0, 0, 0]
2. Calculate prefixes:
   - answer[1] = answer[0] _ nums[0] = 1 _ 1 = 1 → [1, 1, 0, 0]
   - answer[2] = answer[1] _ nums[1] = 1 _ 2 = 2 → [1, 1, 2, 0]
   - answer[3] = answer[2] _ nums[2] = 2 _ 3 = 6 → [1, 1, 2, 6]
3. Calculate suffixes:
   - Start with suffixProduct = 1
   - i=3: answer[3] = 6 _ 1 = 6, suffixProduct = 1 _ 4 = 4 → [1,1,2,6]
   - i=2: answer[2] = 2 _ 4 = 8, suffixProduct = 4 _ 3 = 12 → [1,1,8,6]
   - i=1: answer[1] = 1 _ 12 = 12, suffixProduct = 12 _ 2 = 24 → [1,12,8,6]
   - i=0: answer[0] = 1 _ 24 = 24, suffixProduct = 24 _ 1 = 24 → [24,12,8,6]
4. Final answer: [24, 12, 8, 6]

### Example 2: [-1, 1, 0, -3, 3]

**Approach 3 Steps:**

1. Initialize answer = [1, 0, 0, 0, 0]
2. Calculate prefixes:
   - [1, -1, -1, 0, 0]
3. Calculate suffixes:
   - Start with suffixProduct = 1
   - i=4: answer[4] = 0 _ 1 = 0, suffixProduct = 1 _ 3 = 3 → [1,-1,-1,0,0]
   - i=3: answer[3] = 0 _ 3 = 0, suffixProduct = 3 _ -3 = -9 → [1,-1,-1,0,0]
   - i=2: answer[2] = -1 _ -9 = 9, suffixProduct = -9 _ 0 = 0 → [1,-1,9,0,0]
   - i=1: answer[1] = -1 _ 0 = 0, suffixProduct = 0 _ 1 = 0 → [1,0,9,0,0]
   - i=0: answer[0] = 1 _ 0 = 0, suffixProduct = 0 _ -1 = 0 → [0,0,9,0,0]
4. Final answer: [0, 0, 9, 0, 0]

### Example 3: [0, 0] (Edge case with all zeros)

**Approach 3 Steps:**

1. Initialize answer = [1, 0]
2. Calculate prefixes:
   - answer[1] = answer[0] _ nums[0] = 1 _ 0 = 0 → [1, 0]
3. Calculate suffixes:
   - Start with suffixProduct = 1
   - i=1: answer[1] = 0 _ 1 = 0, suffixProduct = 1 _ 0 = 0 → [1,0]
   - i=0: answer[0] = 1 _ 0 = 0, suffixProduct = 0 _ 0 = 0 → [0,0]
4. Final answer: [0, 0]

The optimized approach handles all cases efficiently including those with zeros.
