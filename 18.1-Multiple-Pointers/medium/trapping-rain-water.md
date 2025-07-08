# LC 42. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9

## Problem Understanding

The problem requires us to compute the amount of water that can be trapped after raining given an elevation map represented by an array of non-negative integers. Each integer represents the height of a bar, and the width of each bar is 1. The water is trapped between the bars, and the amount of water at any point is determined by the minimum of the highest bars on the left and right minus the height of the current bar.

### Approaches

There are several approaches to solve this problem:

1. **Brute Force Approach**: For each element, find the maximum height to its left and right, then compute the trapped water.

```javascript
/**
 * Brute Force Approach
 * Time Complexity: O(n^2) - For each element, we iterate the entire array to find left and right maxima.
 * Space Complexity: O(1) - No additional space is used.
 */
function trapBruteForce(height) {
  let totalWater = 0;
  const n = height.length;

  for (let i = 0; i < n; i++) {
    let maxLeft = 0;
    let maxRight = 0;

    // Find the maximum height to the left of the current bar
    for (let j = i; j >= 0; j--) {
      maxLeft = Math.max(maxLeft, height[j]);
    }

    // Find the maximum height to the right of the current bar
    for (let j = i; j < n; j++) {
      maxRight = Math.max(maxRight, height[j]);
    }

    // The water trapped at the current bar is the minimum of maxLeft and maxRight minus the current height
    totalWater += Math.min(maxLeft, maxRight) - height[i];
  }

  return totalWater;
}
```

For each bar, it calculates the highest bars to its left and right by scanning the entire array each time. This leads to a time complexity of O(n^2), which is inefficient for large arrays.

#### 2. Dynamic Programming (DP) Approach

Precompute the maximum heights to the left and right of each element in two separate arrays, then use these to compute the trapped water.

```javascript
/**
 * Dynamic Programming Approach
 * Time Complexity: O(n) - We traverse the array three times (once for left max, once for right max, and once for computation).
 * Space Complexity: O(n) - Additional space is used to store left and right max arrays.
 */
function trapDP(height) {
  if (height.length === 0) return 0;

  const n = height.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);
  let totalWater = 0;

  // Fill leftMax array: leftMax[i] contains the maximum height to the left of i
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // Fill rightMax array: rightMax[i] contains the maximum height to the right of i
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // Compute the trapped water for each bar
  for (let i = 0; i < n; i++) {
    totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return totalWater;
}
```

This approach precomputes the highest bars to the left and right of each bar using two additional arrays. This reduces the time complexity to O(n) but uses O(n) space to store the left and right max arrays.

#### 3. Two Pointer Approach (Optimal)

Use two pointers to traverse the array from both ends, maintaining the maximum heights encountered so far from both ends, and compute the trapped water on the fly.

```javascript
/**
 * Two Pointer Approach
 * Time Complexity: O(n) - Single pass through the array.
 * Space Complexity: O(1) - No additional space is used.
 */
function trapTwoPointer(height) {
  let totalWater = 0;
  let left = 0;
  let right = height.length - 1;
  let maxLeft = height[left];
  let maxRight = height[right];

  // Traverse the array from both ends
  while (left < right) {
    // Decide which pointer to move based on the current max heights
    if (maxLeft <= maxRight) {
      left++;
      // Update the maximum height encountered from the left
      maxLeft = Math.max(maxLeft, height[left]);
      // Calculate the water trapped at the current position
      totalWater += maxLeft - height[left];
    } else {
      right--;
      // Update the maximum height encountered from the right
      maxRight = Math.max(maxRight, height[right]);
      // Calculate the water trapped at the current position
      totalWater += maxRight - height[right];
    }
  }

  return totalWater;
}
```

3. **Two Pointer Approach**: This approach optimizes space by using two pointers to traverse the array from both ends, maintaining the maximum heights encountered so far. It computes the trapped water on the fly, achieving O(n) time and O(1) space complexity.

### Dry Run of Optimal Approach (Two Pointer)

**Example 1:**
Input: `[0,1,0,2,1,0,1,3,2,1,2,1]`
Indices: 0 1 2 3 4 5 6 7 8 9 10 11

Initial:

- left = 0 (height[0] = 0)
- right = 11 (height[11] = 1)
- maxLeft = 0
- maxRight = 1
- totalWater = 0

Step-by-Step Execution:

1. maxLeft (0) <= maxRight (1):

   - Move left to 1 (height[1] = 1)
   - maxLeft = max(0,1) = 1
   - Water = maxLeft - height[1] = 1 - 1 = 0
   - totalWater = 0 + 0 = 0

2. maxLeft (1) <= maxRight (1):

   - Move left to 2 (height[2] = 0)
   - maxLeft = max(1,0) = 1
   - Water = 1 - 0 = 1
   - totalWater = 0 + 1 = 1

3. maxLeft (1) <= maxRight (1):

   - Move left to 3 (height[3] = 2)
   - maxLeft = max(1,2) = 2
   - Water = 2 - 2 = 0
   - totalWater = 1 + 0 = 1

4. maxLeft (2) > maxRight (1):

   - Move right to 10 (height[10] = 2)
   - maxRight = max(1,2) = 2
   - Water = 2 - 2 = 0
   - totalWater = 1 + 0 = 1

5. maxLeft (2) <= maxRight (2):

   - Move left to 4 (height[4] = 1)
   - maxLeft = max(2,1) = 2
   - Water = 2 - 1 = 1
   - totalWater = 1 + 1 = 2

6. maxLeft (2) <= maxRight (2):

   - Move left to 5 (height[5] = 0)
   - maxLeft = max(2,0) = 2
   - Water = 2 - 0 = 2
   - totalWater = 2 + 2 = 4

7. maxLeft (2) <= maxRight (2):

   - Move left to 6 (height[6] = 1)
   - maxLeft = max(2,1) = 2
   - Water = 2 - 1 = 1
   - totalWater = 4 + 1 = 5

8. maxLeft (2) > maxRight (2):

   - Move right to 9 (height[9] = 1)
   - maxRight = max(2,1) = 2
   - Water = 2 - 1 = 1
   - totalWater = 5 + 1 = 6

9. maxLeft (2) <= maxRight (2):

   - Move left to 7 (height[7] = 3)
   - maxLeft = max(2,3) = 3
   - Water = 3 - 3 = 0
   - totalWater = 6 + 0 = 6

10. maxLeft (3) > maxRight (2):

    - Move right to 8 (height[8] = 2)
    - maxRight = max(2,2) = 2
    - Water = 2 - 2 = 0
    - totalWater = 6 + 0 = 6

11. maxLeft (3) > maxRight (2):
    - Move right to 7
    - Now left (7) >= right (7), loop ends

Final totalWater = 6

**Example 2:**
Input: `[4,2,0,3,2,5]`

- Initial: left = 0, right = 5, maxLeft = 4, maxRight = 5, totalWater = 0
- Steps:
  1. maxLeft (4) <= maxRight (5): left++ to 1, maxLeft = max(4,2) = 4, water += 4 - 2 = 2
  2. maxLeft (4) <= maxRight (5): left++ to 2, maxLeft = max(4,0) = 4, water += 4 - 0 = 6
  3. maxLeft (4) <= maxRight (5): left++ to 3, maxLeft = max(4,3) = 4, water += 4 - 3 = 7
  4. maxLeft (4) <= maxRight (5): left++ to 4, maxLeft = max(4,2) = 4, water += 4 - 2 = 9
  5. maxLeft (4) <= maxRight (5): left++ to 5, loop ends
- Final totalWater = 9

**Example 3 (Edge Case - Empty Array):**
Input: `[]`

- Initial: left = 0, right = -1, loop doesn't run
- Final totalWater = 0

This demonstrates that the two-pointer approach efficiently computes the trapped water with optimal time and space complexity.

You're absolutely right to double-check the dry run for Example 1. Let me carefully re-examine the steps to ensure accuracy.

### Corrected Dry Run for Two Pointer Approach (Example 1)
