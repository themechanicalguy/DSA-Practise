# July 31th

# Median of 2 sorted arrays---1

We need to find the median of two sorted arrays without actually merging them (to achieve O(log(m+n)) time complexity).

### Intuition

The median divides a dataset into two equal halves. For two sorted arrays, we can find a partition that correctly divides the combined elements into left and right halves.

### Approach 1: Merge and Find Median (Brute Force)

- Merge both arrays into one sorted array
- Find the median of the merged array

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

Since the time complexity must be `O(log(m+n))`, a binary search is suggested, as it reduces the search space logarithmically.
The key idea is to partition both arrays into two parts (left and right halves) such that:

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
  - Compute `partitionLeft`: The number of elements to take from `nums1` for the `left` half, calculated as the midpoint of `left` and `right`.
  - Compute `partitionRight`: The number of elements to take from `nums2` for the `left` half, such that the total number of elements in the `left` half is `(totalLength + 1) / 2`.

This is derived as:

- Total elements in left half = `(m + n + 1) / 2` (using integer division).
- If we take `partitionLeft` elements from `nums1`, then `partitionRight` = (totalLength + 1) / 2 - `partitionLeft`.

Why `totalLength + 1`? This ensures the left half has at least as many elements as the right half (or one more for odd lengths), simplifying median calculation.

```javascript
while (left <= right) {
    const partitionLeft = Math.floor((left + right) / 2);
    const partitionRight = Math.floor((totalLength + 1) / 2) - partitionLeft;
```

#### Step 4: Determine Partition Elements

For the partition to be valid, we need to check the elements just before and after the partition points in both arrays:

- `leftArr1`: The last element in the left half of `nums1` (index `partitionLeft - 1`).
- `rightArr1`: The first element in the right half of `nums1` (index `partitionLeft`).
- `leftArr2`: The last element in the left half of `nums2` (index `partitionRight - 1`).
- `rightArr2`: The first element in the right half of `nums2` (index `partitionRight`).

Handle edge cases:

- If `partitionLeft = 0`, there are no elements in the left half of `nums1`, so `leftArr1 = -Infinity`.
- If `partitionLeft = m`, there are no elements in the right half of `nums1`, so `rightArr1 = Infinity`.
- Similarly for nums2: If `partitionRight = 0`, `leftArr2 = -Infinity`; if `partitionRight = n`, `rightArr2 = Infinity`.

- **Why Infinity?** Using `-Infinity` and `Infinity` handles edge cases (e.g., empty arrays or partitions at the boundaries) by ensuring comparisons work correctly.

```javascript
const leftArr1 = partitionLeft === 0 ? -Infinity : nums1[partitionLeft - 1];
const rightArr1 = partitionLeft === m ? Infinity : nums1[partitionLeft];
const leftArr2 = partitionRight === 0 ? -Infinity : nums2[partitionRight - 1];
const rightArr2 = partitionRight === n ? Infinity : nums2[partitionRight];
```

- **maxLeft1**: Largest element in nums1's left partition
- **minRight1**: Smallest element in nums1's right partition
- **maxLeft2**: Largest element in nums2's left partition
- **minRight2**: Smallest element in nums2's right partition
- **Edge Cases**: Handled with ±Infinity when partitions are at boundaries

#### Step 5: Validate the Partition

A valid partition satisfies:

- `leftArr1 <= rightArr2`: The largest element in the left half of `nums1` is less than or equal to the smallest element in the right half of `nums2`.
- `leftArr2 <= rightArr1`: The largest element in the left half of `nums2` is less than or equal to the smallest element in the right half of `nums1`.

These conditions ensure that all elements in the left half of the merged array are less than or equal to all elements in the right half, meaning the partition splits the merged array correctly around the median.

```javascript
if (leftArr1 <= rightArr2 && leftArr2 <= rightArr1) {
  // Valid partition found
}
```

#### Step 6: Compute the Median

If the partition is valid:

For odd total length `(totalLength % 2 === 1)`:

- The median is the largest element in the left half, i.e., `max(leftArr1, leftArr2)`.

For even total length (totalLength % 2 === 0):

- The median is the average of the largest element in the left half `(max(leftArr1, leftArr2))` and the smallest element in the right half `(min(rightArr1, rightArr2))`.

```javascript
if (totalLength % 2 === 1) {
  return Math.max(leftArr1, leftArr2);
}
return (Math.max(leftArr1, leftArr2) + Math.min(rightArr1, rightArr2)) / 2;
```

#### Step 7: Adjust the Search Space

If the partition is invalid:

- If `leftArr1 > rightArr2`: The partition in `nums1` includes too many elements (or too large elements), so move the partition to the left by setting `right = partitionLeft - 1`.
- If `leftArr2 > rightArr1`: The partition in `nums1` includes too few elements, so move the partition to the right by setting `left = partitionLeft + 1`.

**Why?** These adjustments reduce the search space by half, leveraging binary search to converge on the correct partition.

```javascript
} else if (leftArr1 > rightArr2) {
    right = partitionLeft - 1;
} else {
    left = partitionLeft + 1;
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
    const partitionLeft = Math.floor((left + right) / 2); //mid

    const partitionRight = Math.floor((totalLength + 1) / 2) - partitionLeft;

    // Step 4: Get elements around partitions
    const leftArr1 = partitionLeft === 0 ? -Infinity : nums1[partitionLeft - 1];
    const rightArr1 = partitionLeft === m ? Infinity : nums1[partitionLeft];
    const leftArr2 =
      partitionRight === 0 ? -Infinity : nums2[partitionRight - 1];
    const rightArr2 = partitionRight === n ? Infinity : nums2[partitionRight];

    // Step 5: Check if partition is valid
    if (leftArr1 <= rightArr2 && leftArr2 <= rightArr1) {
      // Step 6: Compute median based on total length
      if (totalLength % 2 === 1) {
        return Math.max(leftArr1, leftArr2);
      }
      return (
        (Math.max(leftArr1, leftArr2) + Math.min(rightArr1, rightArr2)) / 2
      );
    } else if (leftArr1 > rightArr2) {
      // Step 7: Adjust partition to the left
      right = partitionLeft - 1;
    } else {
      // Step 7: Adjust partition to the right
      left = partitionLeft + 1;
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

# Aug 1 2025

# Kth element of 2 sorted arrays -- 2

We need to find the element that would be at the k-th position (1-based index) in the merged sorted array of two given sorted arrays, without actually merging them.

## Approaches

### 1. Brute Force (Merge and Find)

**Intuition**: Merge both arrays into a new sorted array and return the k-th element.

**Approach**:

- Create a new array by merging both arrays in sorted order
- Return the element at index k-1 (since arrays are 0-based in JavaScript)

**Time Complexity**: O(m+n) where m and n are lengths of the arrays
**Space Complexity**: O(m+n) for the merged array

```javascript
function findKthElementBruteForce(a, b, k) {
  const merged = [];
  let i = 0,
    j = 0;

  // Merge the two arrays
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      merged.push(a[i++]);
    } else {
      merged.push(b[j++]);
    }
  }

  // Add remaining elements from a
  while (i < a.length) {
    merged.push(a[i++]);
  }

  // Add remaining elements from b
  while (j < b.length) {
    merged.push(b[j++]);
  }

  // Return k-th element (1-based to 0-based index)
  return merged[k - 1];
}
```

### 2. Optimized Space (Merge Without Storing)

**Intuition**: We can merge virtually without storing the merged array by counting elements until we reach the k-th element.

**Approach**:

- Use two pointers to traverse both arrays
- Compare elements and move the pointer with the smaller element
- Count the steps until we reach the k-th element

**Time Complexity**: O(k)
**Space Complexity**: O(1)

```javascript
function findKthElementOptimized(a, b, k) {
  let i = 0,
    j = 0;
  let count = 0;
  let result;

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result = a[i++];
    } else {
      result = b[j++];
    }
    count++;
    if (count === k) {
      return result;
    }
  }

  // If we reach here, one array is exhausted
  // Check remaining elements in a
  while (i < a.length) {
    result = a[i++];
    count++;
    if (count === k) {
      return result;
    }
  }

  // Check remaining elements in b
  while (j < b.length) {
    result = b[j++];
    count++;
    if (count === k) {
      return result;
    }
  }

  return -1; // k is out of bounds
}
```

### 3. Binary Search Approach (Optimal)

**Intuition**: We can use binary search to partition both arrays such that the combined left parts contain exactly k elements.

**Approach**:

1. Ensure the first array is smaller for simplicity
2. Perform binary search on the smaller array
3. Partition both arrays such that total left elements = k
4. Compare boundary elements to find the correct partition

**Time Complexity**: O(log(min(m,n)))
**Space Complexity**: O(1)

```javascript
function findKthElementBinarySearch(a, b, k) {
  // Ensure a is the smaller array
  if (a.length > b.length) {
    return findKthElementBinarySearch(b, a, k);
  }

  const m = a.length;
  const n = b.length;
  let low = 0,
    high = Math.min(m, k);

  while (low <= high) {
    // Partition a such that we take partitionA elements from a
    const partitionA = Math.floor((low + high) / 2);
    // Partition b such that partitionA + partitionB = k
    const partitionB = k - partitionA;

    // Handle edge cases where partitions are at boundaries
    const maxLeftA = partitionA === 0 ? -Infinity : a[partitionA - 1];
    const minRightA = partitionA === m ? Infinity : a[partitionA];

    const maxLeftB = partitionB === 0 ? -Infinity : b[partitionB - 1];
    const minRightB = partitionB === n ? Infinity : b[partitionB];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      // Correct partition found
      return Math.max(maxLeftA, maxLeftB);
    } else if (maxLeftA > minRightB) {
      // Too many elements from a, move partition left
      high = partitionA - 1;
    } else {
      // Too few elements from a, move partition right
      low = partitionA + 1;
    }
  }

  return -1; // k is out of bounds
}
```

## Dry Run of Binary Search Approach

### Example 1:

a = [2, 3, 6, 7, 9], b = [1, 4, 8, 10], k = 5

1. Initial: low=0, high=5 (min of a.length and k)
2. partitionA=2, partitionB=3

   - maxLeftA=3, minRightA=6
   - maxLeftB=4, minRightB=8
   - Check: 3 <= 8 && 4 <= 6 → true
   - Return max(3,4) = 4 ❌ (Incorrect, should be 6)

   Wait, this shows a problem with our initial approach. Actually, the correct answer is 6, but our binary search approach is giving 4. This indicates we need to adjust our approach.

   The issue is that we're not properly handling the case where the k-th element is in the right part of the arrays. Let me re-examine the binary search approach.

After re-evaluating, I realize the correct binary search approach should:

1. Make sure we're selecting k elements total from both arrays
2. The correct partition is when all elements in the left partitions are ≤ all elements in right partitions
3. Then the k-th element is the maximum of the two left partitions

In the example:

- With partitionA=3, partitionB=2
  - maxLeftA=6, minRightA=7
  - maxLeftB=4, minRightB=8
  - Check: 6 <= 8 && 4 <= 7 → true
  - Return max(6,4) = 6 ✅

This gives the correct answer. The initial partition was incorrect because it didn't satisfy the condition properly.

---

# Find the row with maximum number of 1's---4

You are given a 2D binary array arr[][] consisting of only 1s and 0s. Each row of the array is sorted in non-decreasing order.
Your task is to find and return the index of the first row that contains the maximum number of 1s. If no such row exists, return -1.

- Input: arr[][] = `[[0,1,1,1], [0,0,1,1], [1,1,1,1], [0,0,0,0]]`
- Output: 2
- Explanation: Row 2 contains the most number of 1s (4 1s). Hence, the output is 2.

BRUTE FORCE
FAILED APPROACH

```javascript
function rowWithMax1s(arr) {
  // code here

  // [[0,1,1,1],   R
  //  [0,0,1,1],
  //  [1,1,1,1],
  //  [0,0,0,0]]
  //   C

  // let cols = arr.length;
  // let rows = arr[0].length; // TRAVERSED COL WISE

  let cols = arr[0].length;
  let rows = arr.length;
  let maxSum = 0;
  let maxRow = -1;

  // loop over each cols
  for (let row = 0; row < rows; row++) {
    // LOOP1

    let currentSum = 0;
    for (let col = 0; col < cols; col++) {
      //LOOP 2
      if (arr[row][col] === 1) {
        currentSum++;
      }
      if (currentSum > maxSum) {
        maxSum = currentSum;
        maxRow = row;
      }
    }
  }
  // loop over each row in cols
  // maintain a max length variable and currentMax for counting 1's
  // if currentMax > maxLen
  //  maxLen = currentMax;
  // return row;

  return maxRow;
}
```

```javascript
//Approach 1: Brute Force - Count 1s in Each Row

function findRowWithMaxOnesBruteForce(binaryMatrix) {
  let maxCount = 0;
  let resultRow = -1;

  for (let row = 0; row < binaryMatrix.length; row++) {
    let currentCount = 0;
    // Count 1s in current row (since it's sorted, we can stop at first 0)
    for (let col = 0; col < binaryMatrix[row].length; col++) {
      if (binaryMatrix[row][col] === 1) currentCount++;
    }
    // Update max count and result if current row has more 1s
    if (currentCount > maxCount) {
      maxCount = currentCount;
      resultRow = row;
    }
  }

  return resultRow;
}
```

OPTIMIZED APPROACH

```javascript
// Approach 2: Binary Search to Count 1s in Each Row
/**
 * Finds the first row with maximum number of 1s using binary search per row.
 * @param {number[][]} binaryMatrix - The 2D binary array with rows sorted in non-decreasing order
 * @return {number} - Index of the first row with max 1s, or -1 if no 1s exist
 */
function findRowWithMaxOnesBinarySearch(binaryMatrix) {
  let maxCount = 0;
  let resultRow = -1;

  for (let row = 0; row < binaryMatrix.length; row++) {
    // Use binary search to find the first occurrence of 1
    const firstOneIndex = findFirstOne(binaryMatrix[row]);
    const currentCount =
      firstOneIndex === -1 ? 0 : binaryMatrix[row].length - firstOneIndex;

    // Update max count and result if current row has more 1s
    if (currentCount > maxCount) {
      maxCount = currentCount;
      resultRow = row;
    }
  }

  return resultRow;
}

/**
 * Helper function to find the first occurrence of 1 in a sorted binary array
 * @param {number[]} arr - Sorted binary array
 * @return {number} - Index of first 1, or -1 if no 1s exist
 */
function findFirstOne(arr) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 1) {
      result = mid;
      right = mid - 1; // Look for earlier 1s
    } else {
      left = mid + 1;
    }
  }

  return result;
}
```

---

# LC- 74 Search a 2D Matrix --5

Given an n x m matrix, find a target value in the matrix.

The matrix has the following properties:

1. Integers in each row are sorted from left to right.
2. The first integer of each row is greater than the last integer of the previous row.

- Example 1: I: matrix = `[[1,3,5],[7,9,11],[13,15,17]]`, target = 9, O: true
  Explanation: The target value 9 is found in the matrix.

```javascript
/**
 * Searches for a target value in a 2D matrix where:
 * - Each row is sorted in ascending order
 * - The first integer of each row is greater than the last integer of the previous row
 *
 * @param {number[][]} binaryMatrix - The 2D matrix with sorted rows and columns
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists in matrix, false otherwise
 */
var searchMatrix = function (binaryMatrix, target) {
  // Handle edge cases: empty matrix or empty rows
  if (!binaryMatrix.length || !binaryMatrix[0].length) {
    return false;
  }

  // Iterate through each row in the matrix
  for (let row = 0; row < binaryMatrix.length; row++) {
    // perform binary search in the current row
    const targetIndex = binarySearchInRow(binaryMatrix[row], target);
    if (targetIndex) return true;
  }

  return false;
};

/**
 * Helper function to perform binary search on a sorted array
 *
 * @param {number[]} sortedArray - The sorted array to search
 * @param {number} target - The value to search for
 * @return {boolean} - True if target exists in array, false otherwise
 */
function binarySearchInRow(sortedArray, target) {
  let leftPointer = 0;
  let rightPointer = sortedArray.length - 1;

  while (leftPointer <= rightPointer) {
    const middleIndex = Math.floor((leftPointer + rightPointer) / 2);
    const middleValue = sortedArray[middleIndex];

    if (middleValue === target) {
      return true;
    } else if (middleValue < target) {
      // Search the right half
      leftPointer = middleIndex + 1;
    } else {
      // Search the left half
      rightPointer = middleIndex - 1;
    }
  }

  return false;
}
```

---

# 240. Search a 2D Matrix II --6

Write an efficient algorithm that searches for a value target in an `m x n` integer matrix matrix. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

Example 1:
Input: matrix = `[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]`, target = 5, O: true
Input: matrix = `[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]`, target = 20, Output: false

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (binaryMatrix, target) {
  // Handle edge cases: empty matrix or empty rows
  if (!binaryMatrix.length || !binaryMatrix[0].length) {
    return false;
  }

  // Iterate through each row in the matrix
  for (let row = 0; row < binaryMatrix.length; row++) {
    // perform binary search in the current row
    const targetIndex = binarySearchInRow(binaryMatrix[row], target);
    if (targetIndex) return true;
  }

  return false;
};

// refer to binarySearchInRow function in above
```

---

# 2nd Aug 2025

---

# Minimizing Maximum Distance Between Gas Stations --3

We have a horizontal number line. On that number line, we have gas stations at positions `stations[0], stations[1], ..., stations[n-1]`,
where `n` is the size of the stations array.
Now, we add `k` more gas stations so that `d`, the maximum distance between adjacent gas stations, is minimized.
We have to find the smallest possible value of `d`. Find the answer exactly to 2 decimal places.
Note: stations is in a strictly increasing order.

**Example 1:**

- Input: n = `10`, stations[] = `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`,- k = `9`, Output: `0.50`
- Explanation: Each of the 9 stations can be added mid way between all the existing adjacent stations.

**Example 2:**

- Input: n = `10`, stations[] = `[3, 6, 12, 19, 33, 44, 67, 72, 89, 95]` k = `2` Output: `14.00`
- Explanation: Construction of gas stations at 8th(between 72 and 89) and 6th(between 44 and 67) locations.

## Problem Intuition and Approach

The problem involves `minimizing the maximum distance` between adjacent gas stations by strategically placing `k` new stations.

- **Understanding the Objective:** The maximum distance `d` between any two adjacent stations after adding `k` stations is determined by the largest gap between consecutive stations (including new ones). Our goal is to place the new stations such that this largest gap is as small as possible.
- **Key Insight:** For a given maximum distance `d`, we can calculate how many new stations are needed to ensure that every gap between adjacent stations is at most `d`. If we can achieve this with `≤k` stations, then `d` is feasible. The smallest such `d` is our answer.
- **Binary Search on the Answer:** Since `d` is a real number and we need the answer to two decimal places, binary search is an efficient approach to find the smallest `d`. We can search over possible values of `d` and check if it’s possible to place ( k ) or fewer stations to make all gaps at most `d`.
- **Feasibility Check:** For a given `d`, compute the number of new stations needed in each existing gap (between `stations[i]` and `stations[i+1]`).
  If the gap size is `g`, we need `⌊g/d⌋` new stations to break the gap into segments of size at most `d`. Sum these across all gaps and check if the total is `≤k`.
- **Edge Cases**:
  - If `k=0`, no new stations are added, so `d` is the maximum of the current gaps.
  - If the gaps are uneven, we prioritize placing stations in larger gaps to reduce the maximum distance.
  - The answer should be precise to two decimal places, so we handle floating-point precision carefully.

**Binary Search Approach:**

Use binary search to find the smallest `d`. This is optimal for large inputs due to its logarithmic time complexity in searching for ( d ).

```javascript
function canAchieveMaxDist(stations, d, k) {
  let stationsNeeded = 0;
  // Check each gap between consecutive stations
  for (let i = 1; i < stations.length; i++) {
    const gap = stations[i] - stations[i - 1];
    // Number of stations needed to make this gap have segments <= d
    stationsNeeded += Math.floor(gap / d);
  }
  // Return true if we can achieve max distance d with k or fewer stations
  return stationsNeeded <= k;
}

function findSmallestMaxDist(stations, k) {
  const n = stations.length;

  // Binary search for the smallest possible max distance
  let left = 0; // Minimum possible max distance
  let right = stations[n - 1] - stations[0]; // Maximum possible gap
  let precision = 1e-6; // Precision for binary search
  let result = right;

  while (right - left > precision) {
    let mid = (left + right) / 2;
    if (canAchieveMaxDist(stations, mid, k)) {
      // If feasible, try a smaller max distance
      result = mid;
      right = mid;
    } else {
      // If not feasible, need a larger max distance
      left = mid;
    }
  }

  // Return result rounded to 2 decimal places
  return Number(result.toFixed(2));
}
// Test the function
const stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const k = 9;
console.log(findSmallestMaxDist(stations, k)); // Output: 0.50
```

**Brute Force**

```javascript
function findSmallestMaxDist(stations, k) {
  // placedCount: will be like a imaginary space where we keep track of how many stations are placed
  const placedCount = new Array(stations.length - 1).fill(0);

  // loop to find out the placedcount, so it can be used later to find the maxDistance
  for (let i = 0; i < k; i++) {
    // find maxi, maxInd
    let maxi = 0,
      maxInd = -1;
    for (let j = 0; j < stations.length - 1; j++) {
      // find diff,
      const diff = (stations[j + 1] - stations[j]) / (placedCount[j] + 1);
      if (maxi < diff) {
        maxi = diff;
        maxInd = j;
      }
    }

    placedCount[maxInd]++;
  }

  // loop to find the maxDisatance from obtained placedCount
  let maxAns = 0;
  for (let j = 0; j < stations.length - 1; j++) {
    // find diff,
    const diff = (stations[j + 1] - stations[j]) / (placedCount[j] + 1);
    maxAns = Math.max(maxAns, diff);
  }
  return maxAns;
}
```

# Find Peak Element (2D Matrix) ---7

# Matrix Median --- 8

Given a `row-wise sorted` matrix `mat[][]` where the `number of rows and columns is always odd`.
Return the median of the matrix.

Examples:

- Input: `mat[][]` = `[[1, 3, 5],[2, 6, 9],[3, 6, 9]]` Output: `5` Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9]. Hence, 5 is median.
- Input: `mat[][]` = `[[2, 4, 9],[3, 6, 7],[4, 7, 10]]` Output: `6` Explanation: Sorting matrix elements gives us [2, 3, 4, 4, 6, 7, 7, 9, 10]. Hence, 6 is median.
- Input: `mat` = `[[3], [4], [8]]` Output: `4` Explanation: Sorting matrix elements gives us [3, 4, 8]. Hence, 4 is median.

```javascript
//Approach 1: Flatten and Sort (Brute Force)
/**
 * Finds the median of a row-wise sorted matrix by flattening and sorting
 * Time Complexity: O(mn log mn) where m is rows, n is columns
 * Space Complexity: O(mn) for storing all elements
 */
function matrixMedianFlattenSort(matrix) {
  // Flatten the matrix into a single array
  const flattened = matrix.flat();

  // Sort the flattened array in ascending order
  flattened.sort((a, b) => a - b);

  // Find the middle index (since matrix size is always odd)
  const middleIndex = Math.floor(flattened.length / 2);

  // Return the middle element
  return flattened[middleIndex];
}

const mat = [
  [1, 3, 5],
  [2, 6, 9],
  [3, 6, 9],
];
console.log(matrixMedianFlattenSort(mat)); // Output: 5

/**
 * Finds the median using binary search on the median value
 * Time Complexity: O(m log n log max-min) where m is rows, n is columns
 * Space Complexity: O(1)
 */
function matrixMedianBinarySearch(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const totalElements = rows * cols;
  const medianPosition = Math.floor(totalElements / 2);

  // Find the minimum and maximum in the matrix
  let min = matrix[0][0];
  let max = matrix[0][cols - 1];

  for (let i = 1; i < rows; i++) {
    min = Math.min(min, matrix[i][0]);
    max = Math.max(max, matrix[i][cols - 1]);
  }

  // Binary search between min and max
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    let count = 0;

    // Count numbers less than or equal to mid in each row
    for (let i = 0; i < rows; i++) {
      let left = 0;
      let right = cols - 1;

      // Binary search in current row
      while (left <= right) {
        const midCol = Math.floor((left + right) / 2);
        if (matrix[i][midCol] <= mid) {
          left = midCol + 1;
        } else {
          right = midCol - 1;
        }
      }
      count += left;
    }

    if (count <= medianPosition) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min;
}

console.log(matrixMedianBinarySearch(mat)); // Output: 5
```
