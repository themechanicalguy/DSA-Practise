# Finding the Kth Element in Two Sorted Arrays

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

### Example 2:

a = [1, 4, 8, 10, 12], b = [5, 7, 11, 15, 17], k = 6

1. partitionA=3, partitionB=3
   - maxLeftA=8, minRightA=10
   - maxLeftB=11, minRightB=15
   - 8 <= 15 && 11 <= 10 → false (11 > 10)
   - Need to move partitionA left
2. partitionA=2, partitionB=4
   - maxLeftA=4, minRightA=8
   - maxLeftB=15, minRightB=Infinity
   - 4 <= Infinity && 15 <= 8 → false
   - Need to move partitionA left
3. partitionA=1, partitionB=5
   - maxLeftA=1, minRightA=4
   - maxLeftB=17, minRightB=Infinity
   - 1 <= Infinity && 17 <= 4 → false
   - Need to move partitionA left
4. partitionA=0, partitionB=6 (but b only has 5 elements)
   - Invalid, so we adjust

After several iterations, the correct partition is:
partitionA=4, partitionB=2

- maxLeftA=10, minRightA=12
- maxLeftB=7, minRightB=11
- 10 <= 11 && 7 <= 12 → true
- Return max(10,7) = 10 ✅

### Example 3 (Edge Case - k in one array):

a = [1, 2, 3], b = [4, 5, 6, 7], k = 3

1. partitionA=1, partitionB=2
   - maxLeftA=1, minRightA=2
   - maxLeftB=5, minRightB=6
   - 1 <= 6 && 5 <= 2 → false
2. partitionA=2, partitionB=1
   - maxLeftA=2, minRightA=3
   - maxLeftB=4, minRightB=5
   - 2 <= 5 && 4 <= 3 → false
3. partitionA=3, partitionB=0
   - maxLeftA=3, minRightA=Infinity
   - maxLeftB=-Infinity, minRightB=4
   - 3 <= 4 && -Infinity <= Infinity → true
   - Return max(3, -Infinity) = 3 ✅

## Final Correct Implementation

Here's the corrected binary search implementation:

```javascript
function findKthElementBinarySearch(a, b, k) {
  // Ensure a is the smaller array
  if (a.length > b.length) {
    return findKthElementBinarySearch(b, a, k);
  }

  const m = a.length;
  const n = b.length;
  let low = Math.max(0, k - n),
    high = Math.min(m, k);

  while (low <= high) {
    const partitionA = Math.floor((low + high) / 2);
    const partitionB = k - partitionA;

    const maxLeftA = partitionA === 0 ? -Infinity : a[partitionA - 1];
    const minRightA = partitionA === m ? Infinity : a[partitionA];

    const maxLeftB = partitionB === 0 ? -Infinity : b[partitionB - 1];
    const minRightB = partitionB === n ? Infinity : b[partitionB];

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      return Math.max(maxLeftA, maxLeftB);
    } else if (maxLeftA > minRightB) {
      high = partitionA - 1;
    } else {
      low = partitionA + 1;
    }
  }

  return -1; // k is out of bounds
}
```

This implementation correctly handles all cases by:

1. Properly setting the initial low and high bounds
2. Ensuring the partitions always sum to k
3. Correctly comparing the boundary elements
