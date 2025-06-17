# LC-1283. Find the Smallest Divisor Given a Threshold

### Understanding the Problem

We are given an array of integers `nums` and an integer `threshold`. We need to find the smallest positive integer `divisor` such that when we divide each element in `nums` by this `divisor` and take the ceiling of the result (rounding up to the nearest integer), the sum of these values is less than or equal to `threshold`.

**Key Points:**

1. **Division and Ceiling**: For each number in `nums`, we perform division by `divisor` and round up the result. For example, `7 / 3 = 2.333...` which rounds up to `3`.
2. **Sum Constraint**: The sum of these rounded-up divisions must be ≤ `threshold`.
3. **Smallest Divisor**: Among all possible divisors that satisfy the above condition, we need the smallest one.

### Intuition

1. **Brute Force Approach**: Start from `divisor = 1` and keep increasing it until the sum of the ceiling divisions is ≤ `threshold`. The first divisor that satisfies this condition is our answer. However, this can be inefficient for large numbers.
2. **Binary Search Approach**: Since the problem is about finding the smallest divisor in a range where the sum condition is satisfied, binary search can be applied efficiently. The possible divisors range from `1` to `max(nums)` (since any divisor larger than `max(nums)` will turn all ceiling divisions to `1`, and the sum would be `nums.length`, which might or might not satisfy the threshold).

### Approaches

1. **Brute Force**:

   - Start with `divisor = 1`.
   - For each `divisor`, compute the sum of ceiling divisions.
   - If the sum ≤ `threshold`, return the current `divisor`.
   - Otherwise, increment `divisor` and repeat.

2. **Binary Search**:
   - Initialize `left = 1` and `right = max(nums)`.
   - While `left < right`:
     - Compute `mid = left + Math.floor((right - left) / 2)`.
     - Calculate the sum of ceiling divisions with `divisor = mid`.
     - If the sum ≤ `threshold`, it means we can try a smaller divisor, so set `right = mid`.
     - Else, set `left = mid + 1`.
   - Return `left` (or `right`) as the smallest divisor.

### Solution Code

#### 1. Brute Force Approach

```javascript
/**
 * Finds the smallest divisor such that the sum of ceiling divisions is <= threshold.
 * @param {number[]} nums - Array of integers.
 * @param {number} threshold - Maximum allowed sum.
 * @return {number} - Smallest divisor satisfying the condition.
 */
function smallestDivisorBruteForce(nums, threshold) {
  let divisor = 1;
  while (true) {
    let sum = 0;
    for (const num of nums) {
      sum += Math.ceil(num / divisor);
      if (sum > threshold) {
        break; // Early exit if sum exceeds threshold
      }
    }
    if (sum <= threshold) {
      return divisor;
    }
    divisor++;
  }
}
```

**Time Complexity**: O(n \* m), where `n` is the length of `nums` and `m` is the maximum possible divisor (up to `max(nums)` in the worst case).
**Space Complexity**: O(1), as we use a constant amount of extra space.

#### 2. Binary Search Approach

```javascript
/**
 * Finds the smallest divisor using binary search.
 * @param {number[]} nums - Array of integers.
 * @param {number} threshold - Maximum allowed sum.
 * @return {number} - Smallest divisor satisfying the condition.
 */
function smallestDivisorBinarySearch(nums, threshold) {
  let left = 1;
  let right = Math.max(...nums);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const sum = computeSum(nums, mid);
    if (sum <= threshold) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

/**
 * Helper function to compute the sum of ceiling divisions.
 * @param {number[]} nums - Array of integers.
 * @param {number} divisor - Current divisor.
 * @return {number} - Sum of ceiling divisions.
 */
function computeSum(nums, divisor) {
  let sum = 0;
  for (const num of nums) {
    sum += Math.ceil(num / divisor);
  }
  return sum;
}
```

**Time Complexity**: O(n log m), where `n` is the length of `nums` and `m` is the maximum value in `nums`. The binary search runs in O(log m) and each sum computation is O(n).
**Space Complexity**: O(1), as no additional space is used apart from a few variables.

### Dry Run with Examples

#### Example 1:

**Input**: nums = [1, 2, 5, 9], threshold = 6

**Binary Search Steps**:

1. `left = 1`, `right = 9` (max of nums).
2. `mid = 5`:
   - computeSum([1,2,5,9], 5) = ceil(1/5) + ceil(2/5) + ceil(5/5) + ceil(9/5) = 1 + 1 + 1 + 2 = 5 ≤ 6 → `right = 5`.
3. `left = 1`, `right = 5`, `mid = 3`:
   - computeSum: ceil(1/3) + ceil(2/3) + ceil(5/3) + ceil(9/3) = 1 + 1 + 2 + 3 = 7 > 6 → `left = 4`.
4. `left = 4`, `right = 5`, `mid = 4`:
   - computeSum: 1 + 1 + 2 + 3 = 7 > 6 → `left = 5`.
5. `left = 5`, `right = 5` → exit loop.
   **Output**: 5.

#### Example 2:

**Input**: nums = [44, 22, 33, 11, 1], threshold = 5

**Binary Search Steps**:

1. `left = 1`, `right = 44`.
2. `mid = 22`:
   - computeSum: ceil(44/22) + ceil(22/22) + ceil(33/22) + ceil(11/22) + ceil(1/22) = 2 + 1 + 2 + 1 + 1 = 7 > 5 → `left = 23`.
3. `left = 23`, `right = 44`, `mid = 33`:
   - computeSum: 2 + 1 + 1 + 1 + 1 = 6 > 5 → `left = 34`.
4. `left = 34`, `right = 44`, `mid = 39`:
   - computeSum: 2 + 1 + 1 + 1 + 1 = 6 > 5 → `left = 40`.
5. `left = 40`, `right = 44`, `mid = 42`:
   - computeSum: 2 + 1 + 1 + 1 + 1 = 6 > 5 → `left = 43`.
6. `left = 43`, `right = 44`, `mid = 43`:
   - computeSum: 2 + 1 + 1 + 1 + 1 = 6 > 5 → `left = 44`.
7. `left = 44`, `right = 44` → exit loop.
   **Output**: 44.

#### Example 3 (Edge Case):

**Input**: nums = [2, 3, 5, 7, 11], threshold = 11

**Binary Search Steps**:

1. `left = 1`, `right = 11`.
2. `mid = 6`:
   - computeSum: ceil(2/6) + ceil(3/6) + ceil(5/6) + ceil(7/6) + ceil(11/6) = 1 + 1 + 1 + 2 + 2 = 7 ≤ 11 → `right = 6`.
3. `left = 1`, `right = 6`, `mid = 3`:
   - computeSum: 1 + 1 + 2 + 3 + 4 = 11 ≤ 11 → `right = 3`.
4. `left = 1`, `right = 3`, `mid = 2`:
   - computeSum: 1 + 2 + 3 + 4 + 6 = 16 > 11 → `left = 3`.
5. `left = 3`, `right = 3` → exit loop.
   **Output**: 3.

### Conclusion

The binary search approach is optimal for this problem, efficiently narrowing down the search space to find the smallest divisor. The brute force method, while straightforward, is not suitable for large inputs due to its higher time complexity. The binary search approach ensures logarithmic time complexity relative to the maximum value in the array, making it scalable for larger inputs.
