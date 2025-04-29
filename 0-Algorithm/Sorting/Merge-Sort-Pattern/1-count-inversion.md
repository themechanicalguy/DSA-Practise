# Inversion Count using Merge Sort in JavaScript

## Intuition and Approach

The inversion count problem can be solved efficiently using a modified merge sort algorithm. Here's why merge sort is suitable:

1. **Divide and Conquer**: Merge sort naturally divides the array into smaller subarrays, making it easier to count inversions at different levels.
2. **Merge Process**: During the merging of sorted subarrays, we can count inversions when we take elements from the right subarray before the left subarray (since they're out of order).

### Key Insight:

When merging two sorted halves, if an element in the right half is smaller than an element in the left half, it forms inversions with all remaining elements in the left half because the left half is sorted.

## Solution Code

```javascript
function countInversions(arr) {
  // Helper function to perform merge sort and count inversions
  function mergeSort(array, start, end) {
    if (start >= end) return 0; // Base case: single element or empty array

    const mid = Math.floor((start + end) / 2);
    let inversionCount = 0;

    // Recursively count inversions in left and right halves
    inversionCount += mergeSort(array, start, mid);
    inversionCount += mergeSort(array, mid + 1, end);

    const leftSubarray = array.slice(start, mid + 1); // Left subarray
    const rightSubarray = array.slice(mid + 1, end + 1); // Right subarray

    // Count inversions during the merge step
    inversionCount += mergeAndCount(leftSubarray, rightSubarray);

    return inversionCount;
  }

  // Merges two sorted subarrays and counts inversions
  function mergeAndCount(leftSubarray, rightSubarray) {
    let inversionCount = 0;

    let leftIndex = 0; // Index for left subarray
    let rightIndex = 0; // Index for right subarray
    let mergedIndex = start; // Index for merged array

    // Merge the two subarrays while counting inversions
    while (
      leftIndex < leftSubarray.length &&
      rightIndex < rightSubarray.length
    ) {
      if (leftSubarray[leftIndex] <= rightSubarray[rightIndex]) {
        // No inversion: copy from left subarray
        array[mergedIndex++] = leftSubarray[leftIndex++];
      } else {
        // Inversion: leftSubarray[leftIndex] > rightSubarray[rightIndex]
        // All elements from leftIndex to end of leftSubarray form inversions
        array[mergedIndex++] = rightSubarray[rightIndex++];
        inversionCount += leftSubarray.length - leftIndex;
      }
    }

    // Copy remaining elements from left subarray, if any
    while (leftIndex < leftSubarray.length) {
      array[mergedIndex++] = leftSubarray[leftIndex++];
    }

    // Copy remaining elements from right subarray, if any
    while (rightIndex < rightSubarray.length) {
      array[mergedIndex++] = rightSubarray[rightIndex++];
    }

    return inversionCount;
  }

  // Create a copy of the input array to avoid modifying it
  const arrayCopy = [...arr];
  return mergeSort(arrayCopy, 0, arrayCopy.length - 1);
}

// Example usage
const arr = [2, 4, 1, 3, 5];
console.log(countInversions(arr)); // Output: 3
```

## Code Explanation

1. **mergeAndCount()**:

   - Merges two sorted subarrays and counts inversions during the merge.
   - When an element from the right subarray is placed before elements in the left subarray, it means it's smaller than all remaining elements in the left subarray (hence we add leftSubarray.length - leftIndex; to the count).

2. **mergeSortAndCount()**:

   - Recursively divides the array into halves until single elements remain.
   - Combines inversion counts from left half, right half, and during merging.

3. **inversionCount()**:
   - Wrapper function that initiates the merge sort process and returns the total inversion count.

Let's perform a dry run of the `countInversions` function with three different examples to understand how it works.

### Example 1: [2, 4, 1, 3, 5]

**Expected Output: 3** (Inversions: (2,1), (4,1), (4,3))

#### Dry Run:

1. Initial call: `mergeSort([2,4,1,3,5], 0, 4)`

   - mid = 2
   - Recursive calls:
     - `mergeSort([2,4,1,3,5], 0, 2)` → left half [2,4,1]
     - `mergeSort([2,4,1,3,5], 3, 4)` → right half [3,5]
   - Merge and count inversions between [1,2,4] and [3,5]

2. `mergeSort([2,4,1,3,5], 0, 2)` → [2,4,1]

   - mid = 1
   - Recursive calls:
     - `mergeSort([2,4,1,3,5], 0, 1)` → [2,4]
     - `mergeSort([2,4,1,3,5], 2, 2)` → [1]
   - Merge [2,4] and [1]:
     - Compare 2 and 1 → inversion (2 > 1), count += 2 (since left has 2 elements left)
     - Array becomes [1,2,4]
     - Total inversions: 2

3. `mergeSort([2,4,1,3,5], 0, 1)` → [2,4]

   - mid = 0
   - Recursive calls:
     - `mergeSort([2,4,1,3,5], 0, 0)` → [2]
     - `mergeSort([2,4,1,3,5], 1, 1)` → [4]
   - Merge [2] and [4]:
     - No inversions
     - Array remains [2,4]
     - Total inversions: 0

4. `mergeSort([2,4,1,3,5], 3, 4)` → [3,5]

   - mid = 3
   - Recursive calls:
     - `mergeSort([2,4,1,3,5], 3, 3)` → [3]
     - `mergeSort([2,4,1,3,5], 4, 4)` → [5]
   - Merge [3] and [5]:
     - No inversions
     - Array remains [3,5]
     - Total inversions: 0

5. Final merge of [1,2,4] and [3,5]:
   - Compare 1 and 3 → no inversion
   - Compare 2 and 3 → no inversion
   - Compare 4 and 3 → inversion (4 > 3), count += 1 (since left has 1 element left)
   - Array becomes [1,2,3,4,5]
   - Total inversions: 1

**Total Inversions**: 2 (from merging [2,4] and [1]) + 1 (from merging [1,2,4] and [3,5]) = 3

---

### Example 2: [5, 4, 3, 2, 1]

**Expected Output: 10** (Maximum inversions for length 5)

#### Dry Run:

1. Initial call: `mergeSort([5,4,3,2,1], 0, 4)`

   - mid = 2
   - Recursive calls:
     - `mergeSort([5,4,3,2,1], 0, 2)` → [5,4,3]
     - `mergeSort([5,4,3,2,1], 3, 4)` → [2,1]
   - Merge [3,4,5] and [1,2]

2. `mergeSort([5,4,3,2,1], 0, 2)` → [5,4,3]

   - mid = 1
   - Recursive calls:
     - `mergeSort([5,4,3,2,1], 0, 1)` → [5,4]
     - `mergeSort([5,4,3,2,1], 2, 2)` → [3]
   - Merge [4,5] and [3]:
     - Compare 4 and 3 → inversion (4 > 3), count += 2 (left has 2 elements left)
     - Array becomes [3,4,5]
     - Total inversions: 2

3. `mergeSort([5,4,3,2,1], 0, 1)` → [5,4]

   - mid = 0
   - Recursive calls:
     - `mergeSort([5,4,3,2,1], 0, 0)` → [5]
     - `mergeSort([5,4,3,2,1], 1, 1)` → [4]
   - Merge [5] and [4]:
     - Compare 5 and 4 → inversion (5 > 4), count += 1 (left has 1 element left)
     - Array becomes [4,5]
     - Total inversions: 1

4. `mergeSort([5,4,3,2,1], 3, 4)` → [2,1]

   - mid = 3
   - Recursive calls:
     - `mergeSort([5,4,3,2,1], 3, 3)` → [2]
     - `mergeSort([5,4,3,2,1], 4, 4)` → [1]
   - Merge [2] and [1]:
     - Compare 2 and 1 → inversion (2 > 1), count += 1 (left has 1 element left)
     - Array becomes [1,2]
     - Total inversions: 1

5. Final merge of [3,4,5] and [1,2]:
   - Compare 3 and 1 → inversion (3 > 1), count += 3 (left has 3 elements left)
   - Compare 3 and 2 → inversion (3 > 2), count += 3 (left has 3 elements left)
   - Array becomes [1,2,3,4,5]
   - Total inversions: 6

**Total Inversions**: 1 (from [5,4]) + 2 (from [4,5] and [3]) + 1 (from [2,1]) + 6 (from [3,4,5] and [1,2]) = 10

---

### Example 3: [1, 2, 3, 4, 5]

**Expected Output: 0** (Already sorted, no inversions)

#### Dry Run:

1. Initial call: `mergeSort([1,2,3,4,5], 0, 4)`

   - mid = 2
   - Recursive calls:
     - `mergeSort([1,2,3,4,5], 0, 2)` → [1,2,3]
     - `mergeSort([1,2,3,4,5], 3, 4)` → [4,5]
   - Merge [1,2,3] and [4,5]

2. `mergeSort([1,2,3,4,5], 0, 2)` → [1,2,3]

   - mid = 1
   - Recursive calls:
     - `mergeSort([1,2,3,4,5], 0, 1)` → [1,2]
     - `mergeSort([1,2,3,4,5], 2, 2)` → [3]
   - Merge [1,2] and [3]:
     - No inversions
     - Array remains [1,2,3]
     - Total inversions: 0

3. `mergeSort([1,2,3,4,5], 0, 1)` → [1,2]

   - mid = 0
   - Recursive calls:
     - `mergeSort([1,2,3,4,5], 0, 0)` → [1]
     - `mergeSort([1,2,3,4,5], 1, 1)` → [2]
   - Merge [1] and [2]:
     - No inversions
     - Array remains [1,2]
     - Total inversions: 0

4. `mergeSort([1,2,3,4,5], 3, 4)` → [4,5]

   - mid = 3
   - Recursive calls:
     - `mergeSort([1,2,3,4,5], 3, 3)` → [4]
     - `mergeSort([1,2,3,4,5], 4, 4)` → [5]
   - Merge [4] and [5]:
     - No inversions
     - Array remains [4,5]
     - Total inversions: 0

5. Final merge of [1,2,3] and [4,5]:
   - No inversions
   - Array remains [1,2,3,4,5]
   - Total inversions: 0

**Total Inversions**: 0 (already sorted)

---

### Summary of Results:

1. `[2,4,1,3,5]` → 3 inversions ✅
2. `[5,4,3,2,1]` → 10 inversions ✅
3. `[1,2,3,4,5]` → 0 inversions ✅

The function correctly counts inversions using the merge sort approach. The key insight is counting inversions during the merge step when elements from the right subarray are placed before elements in the left subarray.
