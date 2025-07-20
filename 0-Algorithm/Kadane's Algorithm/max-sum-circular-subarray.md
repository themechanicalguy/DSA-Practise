# LC 918 Maximum Sum Circular Subarray

### Problem Understanding

- We need to find the maximum sum of a non-empty subarray in a circular array.
- A circular array means that the end of the array connects to the beginning, allowing subarrays to wrap around from the end to the start.

### Key Observations

1. **Non-Circular Maximum Subarray (Kadane's Algorithm):** In a normal array, the maximum subarray sum can be found using Kadane's algorithm.
2. **Circular Maximum Subarray:** In a circular array, the maximum subarray could be:
   - A standard subarray (same as non-circular case).
   - A subarray that wraps around the end to the beginning. This can be thought of as the total sum of the array minus the minimum subarray sum.
3. **Edge Cases:**
   - If all numbers are negative, the maximum subarray is the largest single element.
   - The circular sum could be the entire array if all elements are positive.

### Approaches

1. **Kadane's Algorithm for Non-Circular and Circular Cases:**

   - Compute the maximum subarray sum using Kadane's algorithm (non-circular case).
   - Compute the minimum subarray sum using a modified Kadane's algorithm.
   - The circular maximum is the total sum minus the minimum subarray sum.
   - The result is the maximum between the non-circular maximum and the circular maximum, except when all numbers are negative.

2. **Handling All Negative Numbers:**
   - If the maximum subarray sum is negative, return it directly (since the circular sum would be zero if we subtract the entire array, but the subarray cannot be empty).

### Solution Code

```javascript
/**
 * Finds the maximum subarray sum in a circular array.
 * @param {number[]} nums - The circular array of integers.
 * @return {number} - The maximum subarray sum.
 */
function maxSubarraySumCircular(nums) {
  let totalSum = 0;
  let maxSum = nums[0];
  let currentMax = 0;
  let minSum = nums[0];
  let currentMin = 0;
  let allNegative = true;

  for (const num of nums) {
    totalSum += num;

    // Check if all numbers are negative
    if (num >= 0) {
      allNegative = false;
    }

    // Kadane's algorithm for max subarray
    currentMax = Math.max(num, currentMax + num);
    maxSum = Math.max(maxSum, currentMax);

    // Kadane's algorithm for min subarray
    currentMin = Math.min(num, currentMin + num);
    minSum = Math.min(minSum, currentMin);
  }

  // If all numbers are negative, return the maximum element
  if (allNegative) {
    return maxSum;
  }

  // The maximum is either the max subarray or the total sum minus the min subarray
  return Math.max(maxSum, totalSum - minSum);
}

// Example 1
console.log(maxSubarraySumCircular([1, -2, 3, -2])); // Output: 3

// Example 2
console.log(maxSubarraySumCircular([5, -3, 5])); // Output: 10

// Example 3
console.log(maxSubarraySumCircular([-3, -2, -3])); // Output: -2
```

### Explanation

1. **Initialization:** We initialize variables to keep track of the total sum, maximum subarray sum (`maxSum`), current maximum subarray sum (`currentMax`), minimum subarray sum (`minSum`), and current minimum subarray sum (`currentMin`). We also check if all numbers are negative.
2. **Iterate Through Array:** For each number in the array:
   - Update `totalSum` with the current number.
   - Check if the current number is non-negative to determine if all numbers are negative.
   - Apply Kadane's algorithm to find the maximum subarray sum ending at the current number.
   - Similarly, find the minimum subarray sum ending at the current number.
3. **Handle All Negative Numbers:** If all numbers are negative, the maximum subarray sum is simply the largest single element.
4. **Compute Result:** The result is the maximum between the non-circular maximum subarray sum and the circular maximum (total sum minus minimum subarray sum).

### Time and Space Complexity

- **Time Complexity:** O(n), where n is the number of elements in the array. We traverse the array once.
- **Space Complexity:** O(1), as we use a constant amount of extra space.

### Dry Run

**Example 1: nums = [1, -2, 3, -2]**

- Initialize: totalSum = 0, maxSum = 1, currentMax = 0, minSum = 1, currentMin = 0, allNegative = true
- Iteration:
  - num = 1: totalSum = 1, allNegative = false, currentMax = max(1, 0+1) = 1, maxSum = max(1,1) = 1, currentMin = min(1,0+1)=1, minSum=min(1,1)=1
  - num = -2: totalSum = -1, allNegative remains false, currentMax = max(-2, 1-2)=-1, maxSum=max(1,-1)=1, currentMin=min(-2,1-2)=-2, minSum=min(1,-2)=-2
  - num = 3: totalSum = 2, allNegative remains false, currentMax=max(3, -1+3)=3, maxSum=max(1,3)=3, currentMin=min(3,-2+3)=1, minSum=min(-2,1)=-2
  - num = -2: totalSum = 0, allNegative remains false, currentMax=max(-2,3-2)=1, maxSum=max(3,1)=3, currentMin=min(-2,1-2)=-2, minSum=min(-2,-2)=-2
- After loop: allNegative is false, so return max(maxSum, totalSum - minSum) = max(3, 0 - (-2)) = max(3, 2) = 3
- **Output: 3**

**Example 2: nums = [5, -3, 5]**

- Initialize: totalSum = 0, maxSum = 5, currentMax = 0, minSum = 5, currentMin = 0, allNegative = true
- Iteration:
  - num = 5: totalSum = 5, allNegative = false, currentMax = max(5,0+5)=5, maxSum=max(5,5)=5, currentMin=min(5,0+5)=5, minSum=min(5,5)=5
  - num = -3: totalSum = 2, allNegative remains false, currentMax=max(-3,5-3)=2, maxSum=max(5,2)=5, currentMin=min(-3,5-3)=-3, minSum=min(5,-3)=-3
  - num = 5: totalSum = 7, allNegative remains false, currentMax=max(5,2+5)=7, maxSum=max(5,7)=7, currentMin=min(5,-3+5)=2, minSum=min(-3,2)=-3
- After loop: allNegative is false, return max(7, 7 - (-3)) = max(7, 10) = 10
- **Output: 10**

**Example 3: nums = [-3, -2, -3]**

- Initialize: totalSum = 0, maxSum = -3, currentMax = 0, minSum = -3, currentMin = 0, allNegative = true
- Iteration:
  - num = -3: totalSum = -3, allNegative remains true, currentMax=max(-3,0-3)=-3, maxSum=max(-3,-3)=-3, currentMin=min(-3,0-3)=-3, minSum=min(-3,-3)=-3
  - num = -2: totalSum = -5, allNegative remains true, currentMax=max(-2,-3-2)=-2, maxSum=max(-3,-2)=-2, currentMin=min(-2,-3-2)=-5, minSum=min(-3,-5)=-5
  - num = -3: totalSum = -8, allNegative remains true, currentMax=max(-3,-2-3)=-3, maxSum=max(-2,-3)=-2, currentMin=min(-3,-5-3)=-8, minSum=min(-5,-8)=-8
- After loop: allNegative is true, return maxSum = -2
- **Output: -2**

This approach efficiently handles all edge cases and provides the correct maximum subarray sum for circular arrays.
