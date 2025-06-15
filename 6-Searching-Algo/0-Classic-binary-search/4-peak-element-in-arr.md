# LC 162. Find Peak Element

## Problem Understanding

A peak element is an element that is strictly greater than its neighbors. Given that elements outside the array are considered as negative infinity, the first and last elements can also be peaks if they're greater than their single neighbor.

## Approaches

### 1. Linear Scan (O(n) time)

The simplest approach is to scan through the array and check each element to see if it's a peak.

```javascript
/**
 * Finds a peak element using linear scan
 * @param {number[]} nums - The input array
 * @return {number} Index of a peak element
 */
function findPeakElementLinear(nums) {
  for (let i = 0; i < nums.length; i++) {
    // Check if current element is greater than both neighbors
    const greaterThanLeft = i === 0 || nums[i] > nums[i - 1];
    const greaterThanRight = i === nums.length - 1 || nums[i] > nums[i + 1];

    if (greaterThanLeft && greaterThanRight) {
      return i;
    }
  }
  return -1; // This line is theoretically unreachable for valid inputs
}

// Time Complexity: O(n) - We might need to scan the entire array
// Space Complexity: O(1) - Only using constant extra space
```

### 2. Binary Search (O(log n) time)

Since we can return any peak and the array has some sorted-like properties (ascending and descending sequences), we can use binary search to find a peak efficiently.

```javascript
/**
 * Finds a peak element using binary search
 * @param {number[]} nums - The input array
 * @return {number} Index of a peak element
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If mid element is less than next element, peak is in right half
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      // Otherwise, peak is in left half (including mid)
      right = mid;
    }
  }

  // When left == right, we've found a peak
  return left;
}

// Time Complexity: O(log n) - We halve the search space each iteration
// Space Complexity: O(1) - Only using constant extra space
```

## Explanation of Binary Search Approach

The key intuition is that:

1. If nums[mid] < nums[mid+1], there must be a peak in the right half because:
   - Either the numbers keep increasing to the end (then last element is peak)
   - Or they start decreasing at some point (that point is a peak)
2. Otherwise, there must be a peak in the left half (including mid) because:
   - Either the numbers keep decreasing to the start (then first element is peak)
   - Or they start increasing at some point (that point is a peak)

This approach efficiently narrows down the search space by half each time.

## Dry Run Examples

### Example 1: [1, 2, 3, 1]

- Initial: left = 0, right = 3
- mid = 1, nums[1]=2 < nums[2]=3 → left = 2
- mid = 2, nums[2]=3 > nums[3]=1 → right = 2
- left == right → return 2

### Example 2: [1, 2, 1, 3, 5, 6, 4]

- Initial: left = 0, right = 6
- mid = 3, nums[3]=3 < nums[4]=5 → left = 4
- mid = 5, nums[5]=6 > nums[6]=4 → right = 5
- mid = 4, nums[4]=5 < nums[5]=6 → left = 5
- left == right → return 5

### Edge Case Example: [5, 4, 3, 2, 1] (Peak at start)

- Initial: left = 0, right = 4
- mid = 2, nums[2]=3 > nums[3]=2 → right = 2
- mid = 1, nums[1]=4 > nums[2]=3 → right = 1
- mid = 0, nums[0]=5 > nums[1]=4 → right = 0
- left == right → return 0

### Edge Case Example: [1, 2, 3, 4, 5] (Peak at end)

- Initial: left = 0, right = 4
- mid = 2, nums[2]=3 < nums[3]=4 → left = 3
- mid = 3, nums[3]=4 < nums[4]=5 → left = 4
- left == right → return 4

### Edge Case Example: [10] (Single element)

- Initial: left = 0, right = 0
- Immediately returns 0 (single element is always a peak)

The binary search approach efficiently handles all these cases in logarithmic time.
