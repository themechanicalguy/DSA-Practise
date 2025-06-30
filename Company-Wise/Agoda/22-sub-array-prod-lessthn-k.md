# LC 713. Subarray Product Less Than K

### **Problem Understanding**

We need to find the number of contiguous subarrays where the product of all elements in the subarray is strictly less than a given integer `k`.

**Key Observations:**

1. A subarray is a contiguous part of the array.
2. The product of elements in the subarray must be strictly less than `k`.
3. All elements in `nums` are integers (can be positive, negative, or zero), but if `k` is 0, any subarray containing even a single zero will have a product of 0, which is not strictly less than 0. Hence, the answer will be 0 in such cases unless `nums` has no zeros (but `k=0` makes it impossible since product of any non-empty subarray will be at least `1*... >= 1 > 0` if all are positive, but if negatives are present, it's tricky).

### **Approaches to Solve the Problem**

#### **1. Brute Force Approach (Check All Subarrays)**

- **Intuition:** Generate all possible contiguous subarrays, compute their product, and count those with product `< k`.
- **Time Complexity:** O(n²) - There are `n*(n+1)/2` subarrays, and computing each product takes O(n) in the worst case (if done naively). If we compute product incrementally, it's O(n²).
- **Space Complexity:** O(1) - No extra space is used.

#### **2. Optimized Sliding Window Approach**

- **Intuition:** Use a sliding window to maintain the current subarray whose product is `< k`. For each new element, expand the window to include it and adjust the window's start if the product exceeds `k`. The number of new subarrays added is `right - left + 1`.
- **Time Complexity:** O(n) - Each element is processed at most twice (once when added to the window, once when removed).
- **Space Complexity:** O(1) - Only a few variables are used.

### **Solution Code in JavaScript**

#### **1. Brute Force Approach**

```javascript
/**
 * Counts the number of contiguous subarrays where the product is less than k.
 * @param {number[]} nums - The input array of integers.
 * @param {number} k - The threshold product value.
 * @return {number} - The count of valid subarrays.
 */
function numSubarrayProductLessThanKBruteForce(nums, k) {
  let count = 0;
  const n = nums.length;

  for (let start = 0; start < n; start++) {
    let product = 1;
    for (let end = start; end < n; end++) {
      product *= nums[end];
      if (product < k) {
        count++;
      } else {
        break; // Further products will only increase or stay same (if nums[end] is 1 or 0)
      }
    }
  }

  return count;
}
```

#### **2. Sliding Window Approach (Optimal)**

```javascript
/**
 * Counts the number of contiguous subarrays where the product is less than k using sliding window.
 * @param {number[]} nums - The input array of integers.
 * @param {number} k - The threshold product value.
 * @return {number} - The count of valid subarrays.
 */
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0; // Since product will be at least 1 (if nums are positive) or negative/zero.

  let count = 0;
  let product = 1;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    while (product >= k) {
      product /= nums[left];
      left++;
    }
    count += right - left + 1;
  }

  return count;
}
```

### **Explanation of the Optimal Approach (Sliding Window)**

1. **Initialization:** Start with `count = 0`, `product = 1`, and `left = 0`.
2. **Expand Window:** For each `right` (end of the window), multiply `product` by `nums[right]`.
3. **Shrink Window:** If `product >= k`, divide `product` by `nums[left]` and increment `left` until `product < k`.
4. **Count Subarrays:** The number of valid subarrays ending at `right` is `right - left + 1`. Add this to `count`.
5. **Edge Handling:** If `k <= 1`, no subarray can have product `< k` (since min product is 1 for positive numbers or zero/negative otherwise), so return 0 immediately.

### **Dry Run with Examples**

#### **Example 1: nums = [10,5,2,6], k = 100**

- Initialize: count = 0, product = 1, left = 0
- right = 0: product = 10 (<100), count += 1 → count = 1
- right = 1: product = 50 (<100), count += 2 → count = 3 (subarrays: [5], [10,5])
- right = 2: product = 100 (>=100), divide by nums[0]=10 → product=10, left=1
  - product = 10 (<100), count += 2 → count = 5 (subarrays: [2], [5,2])
- right = 3: product = 60 (<100), count += 3 → count = 8 (subarrays: [6], [2,6], [5,2,6])
- Final count: 8

#### **Example 2: nums = [1,2,3], k = 0**

- k = 0 → immediately return 0 (since no subarray can have product < 0)

#### **Example 3: nums = [1,1,1], k = 2**

- right = 0: product = 1 (<2), count += 1 → count = 1
- right = 1: product = 1 (<2), count += 2 → count = 3
- right = 2: product = 1 (<2), count += 3 → count = 6
- Subarrays: [1], [1], [1], [1,1], [1,1], [1,1,1] → total 6

### **Time and Space Complexity Analysis**

- **Brute Force:**
  - Time: O(n²) - Nested loops over all subarrays.
  - Space: O(1) - No extra space.
- **Sliding Window:**
  - Time: O(n) - Single pass over the array.
  - Space: O(1) - Constant space for variables.

### **Edge Cases Covered**

1. **All elements are 1 and k is 2:** Many subarrays possible.
2. **k is 0:** No subarrays possible unless nums is empty (but constraints say nums.length >= 1).
3. **k is 1:** Only possible if nums has zeros or negatives, but product must be < 1 (e.g., nums=[0.5, 0.5] but nums are integers, so no such case). Hence, return 0 if k <= 1.
