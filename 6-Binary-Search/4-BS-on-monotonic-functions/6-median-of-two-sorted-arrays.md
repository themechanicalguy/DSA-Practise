# Finding Median of Two Sorted Arrays

## Problem Understanding

We need to find the median of two sorted arrays without actually merging them (to achieve O(log(m+n)) time complexity).

### Intuition

The median divides a dataset into two equal halves. For two sorted arrays, we can find a partition that correctly divides the combined elements into left and right halves.

## Approaches

### Approach 1: Merge and Find Median (Brute Force)

- Merge both arrays into one sorted array
- Find the median of the merged array

**Time Complexity**: O(m+n) - Doesn't meet the requirement
**Space Complexity**: O(m+n) - Needs extra space for merged array

```javascript
function findMedianSortedArrays(nums1, nums2) {
  const merged = [];
  let i = 0,
    j = 0;

  // Merge the two arrays
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  // Add remaining elements from nums1
  while (i < nums1.length) merged.push(nums1[i++]);

  // Add remaining elements from nums2
  while (j < nums2.length) merged.push(nums2[j++]);

  const n = merged.length;

  // Calculate median
  if (n % 2 === 0) {
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
  } else {
    return merged[Math.floor(n / 2)];
  }
}
```

- **Time Complexity**: O(m+n) - We iterate through all elements of both arrays
- **Space Complexity**: O(m+n) - We store all elements in a new merged array

### Approach 2: Binary Search on Smaller Array (Optimal)

**Intuition**

The goal is to find the median of the merged sorted array formed by two sorted arrays, `nums1` (size m) and `nums2` (size n), without explicitly merging them.
The median is:

- For an odd total length (m+n), the middle element.
- For an even total length, the average of the two middle elements.

Since the time complexity must be `O(log(m+n))`, a binary search is suggested, as it reduces the search space logarithmically. The key idea is to partition both arrays into two parts (left and right halves) such that:

- The left half of the merged array consists of elements from the left parts of both `nums1` and `nums2`.
- The right half consists of elements from the right parts of both arrays.
- The partition is valid when elements in the left halves are less than or equal to elements in the right halves.
- The median lies at the boundary between these halves.

To minimize the search space, we perform binary search on the smaller array (to reduce the number of iterations to `O(log(min(m,n)))`). For each partition in the smaller array, we compute the corresponding partition in the larger array to balance the number of elements in the left and right halves of the merged array. We then check if the partition satisfies the median condition and adjust the search space accordingly.

#### Step 1: Ensure the First Array is Smaller

- To optimize, perform binary search on the smaller array (fewer elements mean fewer iterations).
- If `nums1` has more elements than `nums2`, swap them so that `nums1` is always the smaller array.
- Why? Binary search on the smaller array ensures the time complexity is `O(log(min(m,n)))`, which is always `≤ O(log(m+n))`.

```javascript
if (nums1.length > nums2.length) {
  [nums1, nums2] = [nums2, nums1];
}
```

#### Step 2: Initialize VariablesDefine:

- `m`: Length of `nums1` (smaller array).
- `n`: Length of `nums2` (larger array).
- `totalLength`: `m + n`, the total number of elements in the merged array.
- `left` : Start of binary search range (0, as we can take 0 elements from `nums1`).
- `right`: End of binary search range (m, as we can take all elements from `nums1`).

Purpose: These variables set up the binary search on the number of elements to take from `nums1` for the left half of the merged array.

```javascript
const m = nums1.length;
const n = nums2.length;
const totalLength = m + n;
let left = 0;
let right = m;
```

#### Step 3: Binary Search to Find the Partition

- Use a while loop to perform binary search until `left <= right`.
- For each iteration:
  - Compute `partitionX`: The number of elements to take from `nums1` for the `left` half, calculated as the midpoint of `left` and `right`.
  - Compute `partitionY`: The number of elements to take from `nums2` for the `left` half, such that the total number of elements in the `left` half is `(totalLength + 1) / 2`.

This is derived as:

- Total elements in left half = `(m + n + 1) / 2` (using integer division).
- If we take `partitionX` elements from `nums1`, then `partitionY` = (totalLength + 1) / 2 - `partitionX`.

Why `totalLength + 1`? This ensures the left half has at least as many elements as the right half (or one more for odd lengths), simplifying median calculation.

```javascript
while (left <= right) {
    const partitionX = Math.floor((left + right) / 2);
    const partitionY = Math.floor((totalLength + 1) / 2) - partitionX;
```

#### Step 4: Determine Partition Elements

For the partition to be valid, we need to check the elements just before and after the partition points in both arrays:

- `leftX`: The last element in the left half of `nums1` (index `partitionX - 1`).
- `rightX`: The first element in the right half of `nums1` (index `partitionX`).
- `leftY`: The last element in the left half of `nums2` (index `partitionY - 1`).
- `rightY`: The first element in the right half of `nums2` (index `partitionY`).

Handle edge cases:

- If `partitionX = 0`, there are no elements in the left half of `nums1`, so `leftX = -Infinity`.
- If `partitionX = m`, there are no elements in the right half of `nums1`, so `rightX = Infinity`.
- Similarly for nums2: If `partitionY = 0`, `leftY = -Infinity`; if `partitionY = n`, `rightY = Infinity`.

- **Why Infinity?** Using `-Infinity` and `Infinity` handles edge cases (e.g., empty arrays or partitions at the boundaries) by ensuring comparisons work correctly.

```javascript
const leftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
const rightX = partitionX === m ? Infinity : nums1[partitionX];
const leftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
const rightY = partitionY === n ? Infinity : nums2[partitionY];
```

- **maxLeft1**: Largest element in nums1's left partition
- **minRight1**: Smallest element in nums1's right partition
- **maxLeft2**: Largest element in nums2's left partition
- **minRight2**: Smallest element in nums2's right partition
- **Edge Cases**: Handled with ±Infinity when partitions are at boundaries

#### Step 5: Validate the Partition

A valid partition satisfies:

- `leftX <= rightY`: The largest element in the left half of `nums1` is less than or equal to the smallest element in the right half of `nums2`.
- `leftY <= rightX`: The largest element in the left half of `nums2` is less than or equal to the smallest element in the right half of `nums1`.

These conditions ensure that all elements in the left half of the merged array are less than or equal to all elements in the right half, meaning the partition splits the merged array correctly around the median.

```javascript
if (leftX <= rightY && leftY <= rightX) {
  // Valid partition found
}
```

#### Step 6: Compute the Median

If the partition is valid:

For odd total length `(totalLength % 2 === 1)`:

- The median is the largest element in the left half, i.e., `max(leftX, leftY)`.

For even total length (totalLength % 2 === 0):

- The median is the average of the largest element in the left half `(max(leftX, leftY))` and the smallest element in the right half `(min(rightX, rightY))`.

```javascript
if (totalLength % 2 === 1) {
  return Math.max(leftX, leftY);
}
return (Math.max(leftX, leftY) + Math.min(rightX, rightY)) / 2;
```

#### Step 7: Adjust the Search Space

If the partition is invalid:

- If `leftX > rightY`: The partition in `nums1` includes too many elements (or too large elements), so move the partition to the left by setting `right = partitionX - 1`.
- If `leftY > rightX`: The partition in `nums1` includes too few elements, so move the partition to the right by setting `left = partitionX + 1`.

**Why?** These adjustments reduce the search space by half, leveraging binary search to converge on the correct partition.

```javascript
} else if (leftX > rightY) {
    right = partitionX - 1;
} else {
    left = partitionX + 1;
}
```

#### Step 8: Handle Invalid Input

If the binary search loop exits without finding a valid partition (i.e., `left > right`), it indicates the input arrays are not sorted or invalid. Throw an error in this case.

```javascript
throw new Error("Input arrays are not sorted");
```

## Full Code for Reference

```javascript
/**
 * Finds the median of two sorted arrays using binary search.
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @returns {number} - Median of the merged array
 */
function findMedianSortedArrays(nums1, nums2) {
  // Step 1: Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  // Step 2: Initialize variables
  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  let left = 0;
  let right = m;

  //  Binary search on the smaller array
  while (left <= right) {
    // Step 3: Compute partition points
    const partitionX = Math.floor((left + right) / 2);
    const partitionY = Math.floor((totalLength + 1) / 2) - partitionX;

    // Step 4: Get elements around partitions
    const leftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const rightX = partitionX === m ? Infinity : nums1[partitionX];
    const leftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const rightY = partitionY === n ? Infinity : nums2[partitionY];

    // Step 5: Check if partition is valid
    if (leftX <= rightY && leftY <= rightX) {
      // Step 6: Compute median based on total length
      if (totalLength % 2 === 1) {
        return Math.max(leftX, leftY);
      }
      return (Math.max(leftX, leftY) + Math.min(rightX, rightY)) / 2;
    } else if (leftX > rightY) {
      // Step 7: Adjust partition to the left
      right = partitionX - 1;
    } else {
      // Step 7: Adjust partition to the right
      left = partitionX + 1;
    }
  }

  // Step 8: Handle invalid input
  throw new Error("Input arrays are not sorted");
}
```

- **Time Complexity**: O(log(min(m,n))) - We perform binary search on the smaller array
- **Space Complexity**: O(1) - We use only constant extra space

## Dry Run of Optimal Approach

### Example 1:

**Input**: nums1 = [1,3], nums2 = [2]

1. nums1 is smaller (length 2), nums2 length 1
2. totalLength = 3, halfLength = 2
3. Initial left=0, right=2
4. partition1=1, partition2=1
   - maxLeft1=1, minRight1=3
   - maxLeft2=2, minRight2=Infinity
   - Check: 1 <= Infinity && 2 <= 3 → true
5. totalLength is odd → return max(1,2) = 2

### Example 2:

**Input**: nums1 = [1,2], nums2 = [3,4]

1. nums1 is smaller (length 2), nums2 length 2
2. totalLength = 4, halfLength = 2
3. Initial left=0, right=2
4. First iteration:
   - partition1=1, partition2=1
   - maxLeft1=1, minRight1=2
   - maxLeft2=3, minRight2=4
   - Check: 1 <= 4 && 3 <= 2 → false (3 <= 2 fails)
   - Move left (since maxLeft2 > minRight1)
5. Second iteration:
   - partition1=2, partition2=0
   - maxLeft1=2, minRight1=Infinity
   - maxLeft2=-Infinity, minRight2=3
   - Check: 2 <= 3 && -Infinity <= Infinity → true
6. totalLength is even → return (max(2,-Infinity) + min(Infinity,3))/2 = (2+3)/2 = 2.5

### Example 3 (Edge Case: Empty Array):

**Input**: nums1 = [], nums2 = [1]

1. nums1 is empty, automatically return median of nums2 which is 1

The optimal approach efficiently finds the median without merging by using binary search to find the correct partition point.
