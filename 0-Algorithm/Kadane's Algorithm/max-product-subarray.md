### **LC - 152. Maximum Product Subarray**

The problem requires us to find the contiguous subarray within a given array of integers that has the largest product. A subarray is a contiguous part of the array. The product of a subarray is the multiplication of all its elements.

**Example:**

- Input: `[2, 3, -2, 4]`
- Output: `6` (from subarray `[2, 3]`)

### **Approaches to Solve**

There are three approaches to solve this problem in JavaScript:

- Dynamic Programming (Kadane’s Variant): Track maximum and minimum products at each position, updating them based on the current number.

- Brute Force: Check every possible subarray and compute its product (inefficient but straightforward).

- Optimized Two-Pass Approach: Handle zeros separately by splitting the array into segments and applying a product-based approach within each segment.

### **Intuition and Approach of Dynamic Programming (Kadane’s Variant)**

- At each index, the maximum product subarray ending at that index depends on the current number and the maximum/minimum products of the subarray ending at the previous index.
- If the current number is positive, multiply it with the previous maximum product to get a larger product.
- If the current number is negative, multiply it with the previous minimum product (since negative \* negative = positive) to potentially get a large positive product.
- Track the global maximum product across all indices.
- Handle zeros by resetting the local maximum and minimum products.

Time Complexity: O(n), where n is the length of the array.
Space Complexity: O(1), as we only use a few variables.

#### 1. Dynamic Programming (Kadane’s Variant)

```javascript
/**
 * Finds the maximum product of a contiguous subarray.
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum product
 */
function maxProductDP(nums) {
  if (!nums || nums.length === 0) return 0;

  // Initialize global maximum product
  let globalMax = nums[0];
  // Local maximum and minimum products ending at current index
  let localMax = nums[0];
  let localMin = nums[0];

  // Iterate through the array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    // Store previous localMax to avoid overwriting issues
    const prevMax = localMax;

    // Maximum product at current index is the max of:
    // 1. Current number alone
    // 2. Current number * previous maximum product
    // 3. Current number * previous minimum product (if both are negative)
    localMax = Math.max(
      nums[i],
      Math.max(nums[i] * prevMax, nums[i] * localMin)
    );

    // Minimum product at current index is the min of:
    // 1. Current number alone
    // 2. Current number * previous maximum product
    // 3. Current number * previous minimum product
    localMin = Math.min(
      nums[i],
      Math.min(nums[i] * prevMax, nums[i] * localMin)
    );

    // Update global maximum product
    globalMax = Math.max(globalMax, localMax);
  }

  return globalMax;
}
```

### **Dry Run Examples**

#### **Example 1: [2, 3, -2, 4]**

- **Initial**: globalMax = 2, localMax = 2, localMin = 2
- **i=1 (3)**:

  - prevMax = 2
  - localMax = max(3, 3*2, 3*2) = max(3, 6, 6) = 6
  - localMin = min(3, 3*2, 3*2) = min(3, 6, 6) = 3
  - globalMax = max(2, 6) = 6

- **i=2 (-2)**:

  - prevMax = 6
  - localMax = max(-2, -2*6, -2*3) = max(-2, -12, -6) = -2
  - localMin = min(-2, -2*6, -2*3) = min(-2, -12, -6) = -12
  - globalMax = max(6, -2) = 6

- **i=3 (4)**:

  - prevMax = -2
  - localMax = max(4, 4*-2, 4*-12) = max(4, -8, -48) = 4
  - localMin = min(4, 4*-2, 4*-12) = min(4, -8, -48) = -48
  - globalMax = max(6, 4) = 6

- **Output**: 6
