# Merge Sort in JavaScript

## Intuition and Approach

Merge Sort is a divide-and-conquer algorithm that works by:

1. **Dividing** the unsorted array into n subarrays until each subarray contains only one element
2. **Conquering** by recursively merging subarrays to produce new sorted subarrays
3. **Combining** until there's only one sorted array remaining

**Key Intuition:**

- A single-element array is inherently sorted
- Merging two sorted arrays is efficient (O(n) per merge)
- The division creates a binary tree of recursive calls (log n levels)

![Sample Image](Merge-sort.gif)

### 1. Standard Merge Sort (Top-Down)

```javascript
// Recursive function to divide array and sort
function mergeSort(arr) {
  // Base case: if array has 1 or fewer elements, it's already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle point to split the array
  const midPoint = Math.floor(arr.length / 2);

  // Split into left and right halves
  const leftHalf = arr.slice(0, midPoint);
  const rightHalf = arr.slice(midPoint);

  // Recursively sort both halves
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}
// Function to merge two sorted arrays into one sorted array
function merge(leftArray, rightArray) {
  let mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and merge in sorted order
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      mergedArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      mergedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from leftArray, if any
  while (leftIndex < leftArray.length) {
    mergedArray.push(leftArray[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from rightArray, if any
  while (rightIndex < rightArray.length) {
    mergedArray.push(rightArray[rightIndex]);
    rightIndex++;
  }

  return mergedArray;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Recursive Merge Sort:", mergeSort(unsortedArray));
```

## Complexity Analysis

### Time Complexity:

- **All Cases:** O(n log n) - The array is divided log n times, and each merge is O(n)
- Consistently efficient regardless of input order

### Space Complexity:

- **Standard Implementation:** O(n) - Needs auxiliary space for merging
- **Optimized Version:** O(n) for buffer array (but more space efficient in practice)

## Optimal Approach (Standard Top-Down) Dry Run

### Example 1: Normal Case

Array: [38, 27, 43, 3, 9, 82, 10]

**Division Phase:**

1. Split into [38, 27, 43] and [3, 9, 82, 10]
2. [38, 27, 43] splits to [38] and [27, 43]
   - [27, 43] splits to [27] and [43]
3. [3, 9, 82, 10] splits to [3, 9] and [82, 10]
   - [3, 9] splits to [3] and [9]
   - [82, 10] splits to [82] and [10]

**Merge Phase:**

1. Merge [27] and [43] → [27, 43]
2. Merge [38] and [27, 43] → [27, 38, 43]
3. Merge [3] and [9] → [3, 9]
4. Merge [82] and [10] → [10, 82]
5. Merge [3, 9] and [10, 82] → [3, 9, 10, 82]
6. Merge [27, 38, 43] and [3, 9, 10, 82] → [3, 9, 10, 27, 38, 43, 82]

Final sorted array: [3, 9, 10, 27, 38, 43, 82]

### Example 2: Already Sorted

Array: [10, 20, 30, 40, 50]

**Division Phase:**

1. Split into [10, 20] and [30, 40, 50]
2. [10, 20] splits to [10] and [20]
3. [30, 40, 50] splits to [30] and [40, 50]
   - [40, 50] splits to [40] and [50]

**Merge Phase:**

1. Merge [10] and [20] → [10, 20]
2. Merge [40] and [50] → [40, 50]
3. Merge [30] and [40, 50] → [30, 40, 50]
4. Merge [10, 20] and [30, 40, 50] → [10, 20, 30, 40, 50]

Final sorted array: [10, 20, 30, 40, 50]

### Example 3: Edge Case (Empty Array)

Array: []

- Immediately returns as length is 0
- No operations performed

Final sorted array: []

### Example 4: Edge Case (Single Element)

Array: [7]

- Immediately returns as length is 1
- No operations performed

Final sorted array: [7]

### Example 5: Reverse Sorted

Array: [5, 4, 3, 2, 1]

**Division Phase:**

1. Split into [5, 4] and [3, 2, 1]
2. [5, 4] splits to [5] and [4]
3. [3, 2, 1] splits to [3] and [2, 1]
   - [2, 1] splits to [2] and [1]

**Merge Phase:**

1. Merge [5] and [4] → [4, 5]
2. Merge [2] and [1] → [1, 2]
3. Merge [3] and [1, 2] → [1, 2, 3]
4. Merge [4, 5] and [1, 2, 3] → [1, 2, 3, 4, 5]

Final sorted array: [1, 2, 3, 4, 5]

## Key Observations:

1. Merge Sort has consistent O(n log n) performance
2. It's a stable sort (maintains relative order of equal elements)
3. Well-suited for large datasets and external sorting
4. Not in-place (requires additional O(n) space)
5. The recursive implementation is more intuitive but has higher stack overhead
6. The iterative version is better for very large arrays to avoid stack overflow
