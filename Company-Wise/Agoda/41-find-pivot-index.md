# LC- 724. Find Pivot Index

- A peak element is an element that is strictly greater than its neighbors.
- Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
- You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
- You must write an algorithm that runs in O(log n) time.
- Example 1:
  Input: nums = [1,2,3,1] , Output: 2
  Explanation: 3 is a peak element and your function should return the index number 2.
- Example 2:
  Input: nums = [1,2,1,3,5,6,4] , Output: 5
  Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.

### **Problem Understanding**

The pivot index of an array is defined as the index where the sum of all elements to the left of the index is equal to the sum of all elements to the right of the index. If no such index exists, we return -1.

**Key Points:**

- If the pivot index is `0`, the left sum is `0` (no elements to the left).
- If the pivot index is `nums.length - 1`, the right sum is `0` (no elements to the right).
- We need to return the leftmost pivot index if multiple exist.

### **Intuition and Approaches**

To solve this problem, we can consider the following approaches:

1. **Brute Force Approach:**

   - For each index `i`, calculate the left sum (sum of elements from `0` to `i-1`) and the right sum (sum of elements from `i+1` to `nums.length - 1`).
   - Compare the left and right sums. If they are equal, return `i`.
   - If no such index is found after checking all indices, return `-1`.

2. **Prefix Sum Optimization:**
   - Compute the total sum of the array.
   - Iterate through the array while maintaining a running left sum.
   - For each index `i`, the right sum can be calculated as `totalSum - leftSum - nums[i]`.
   - If `leftSum === rightSum`, return `i`.
   - Update the left sum by adding `nums[i]` for the next iteration.
   - If no pivot index is found, return `-1`.

### **Approach 1: Brute Force**

**Time Complexity:** O(n²) - For each element, we calculate left and right sums by iterating through the array.
**Space Complexity:** O(1) - No extra space is used.

```javascript
/**
 * Finds the pivot index using brute force.
 * @param {number[]} nums - The input array.
 * @return {number} - The leftmost pivot index or -1 if not found.
 */
function pivotIndexBruteForce(nums) {
  for (let i = 0; i < nums.length; i++) {
    let leftSum = 0;
    let rightSum = 0;

    // Calculate left sum (0 to i-1)
    for (let j = 0; j < i; j++) {
      leftSum += nums[j];
    }

    // Calculate right sum (i+1 to end)
    for (let j = i + 1; j < nums.length; j++) {
      rightSum += nums[j];
    }

    if (leftSum === rightSum) {
      return i;
    }
  }
  return -1;
}
```

### **Approach 2: Prefix Sum Optimization**

**Time Complexity:** O(n) - We traverse the array twice (once for total sum, once for finding pivot).
**Space Complexity:** O(1) - Only a few variables are used.

```javascript
/**
 * Finds the pivot index using prefix sum optimization.
 * @param {number[]} nums - The input array.
 * @return {number} - The leftmost pivot index or -1 if not found.
 */
function pivotIndex(nums) {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    if (leftSum === rightSum) {
      return i;
    }
    leftSum += nums[i];
  }
  return -1;
}
```

### **Dry Run of Optimal Approach (Prefix Sum)**

#### **Example 1: Normal Case**

**Input:** `[1, 7, 3, 6, 5, 6]`  
**Total Sum:** `1 + 7 + 3 + 6 + 5 + 6 = 28`

| i   | nums[i] | leftSum    | rightSum = totalSum - leftSum - nums[i] | Check (leftSum == rightSum) |
| --- | ------- | ---------- | --------------------------------------- | --------------------------- |
| 0   | 1       | 0          | 28 - 0 - 1 = 27                         | 0 == 27? No                 |
| 1   | 7       | 0 + 1 = 1  | 28 - 1 - 7 = 20                         | 1 == 20? No                 |
| 2   | 3       | 1 + 7 = 8  | 28 - 8 - 3 = 17                         | 8 == 17? No                 |
| 3   | 6       | 8 + 3 = 11 | 28 - 11 - 6 = 11                        | 11 == 11? Yes → Return 3    |

**Output:** `3`

---

#### **Example 2: No Pivot Index**

**Input:** `[1, 2, 3]`  
**Total Sum:** `1 + 2 + 3 = 6`

| i   | nums[i] | leftSum   | rightSum = totalSum - leftSum - nums[i] | Check (leftSum == rightSum) |
| --- | ------- | --------- | --------------------------------------- | --------------------------- |
| 0   | 1       | 0         | 6 - 0 - 1 = 5                           | 0 == 5? No                  |
| 1   | 2       | 0 + 1 = 1 | 6 - 1 - 2 = 3                           | 1 == 3? No                  |
| 2   | 3       | 1 + 2 = 3 | 6 - 3 - 3 = 0                           | 3 == 0? No                  |

**Output:** `-1` (No pivot index found)

---

#### **Example 3: Pivot at Edge (Leftmost)**

**Input:** `[2, 1, -1]`  
**Total Sum:** `2 + 1 + (-1) = 2`

| i   | nums[i] | leftSum | rightSum = totalSum - leftSum - nums[i] | Check (leftSum == rightSum) |
| --- | ------- | ------- | --------------------------------------- | --------------------------- |
| 0   | 2       | 0       | 2 - 0 - 2 = 0                           | 0 == 0? Yes → Return 0      |

**Output:** `0` (Pivot at the first index)

---

### **Conclusion**

- The **prefix sum optimization** is the most efficient approach with **O(n) time and O(1) space**.
- The brute force method is less efficient but straightforward.
- Edge cases (pivot at start/end, no pivot) are handled correctly.

**My Solution in LC**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let prefixSumArr = new Array(nums.length);
  let sum = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    sum = sum + nums[i];
    prefixSumArr[i] = sum;
  }
  for (let i = 0; i < prefixSumArr.length; i++) {
    let leftSum;
    if (i === 0) leftSum = 0;
    else {
      leftSum = prefixSumArr[i - 1];
    }
    let rightSum;
    if (i === n - 1) rightSum = 0;
    else {
      rightSum = prefixSumArr[n - 1] - prefixSumArr[i];
    }

    if (leftSum === rightSum) {
      return i;
    }
  }
  return -1;
};
```
