# Selection Sort in JavaScript

## Intuition and Approach

Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element from the unsorted part of the array and putting it at the beginning.
The algorithm maintains two subarrays in a given array:

1. The subarray which is already sorted
2. The remaining subarray which is unsorted

**Key Intuition:**

- In each iteration, the smallest element from the unsorted subarray is selected and swapped with the leftmost unsorted element
- After each iteration, the sorted subarray grows by one element
- The algorithm is called "selection" sort because it repeatedly selects the next smallest element

![Sample Image](selectionSort.gif)

### 1. Standard Selection Sort

```javascript
function selectionSortBasic(array) {
  const length = array.length;

  // Outer loop for the boundary of the unsorted subarray
  for (let currentIndex = 0; currentIndex < length - 1; currentIndex++) {
    // Assume the current element is the smallest
    let minIndex = currentIndex;

    // Inner loop to find the minimum in the unsorted subarray
    for (
      let unsortedIndex = currentIndex + 1;
      unsortedIndex < length;
      unsortedIndex++
    ) {
      if (array[unsortedIndex] < array[minIndex]) {
        minIndex = unsortedIndex;
      }
    }

    // Swap the found minimum element with the first unsorted element
    if (minIndex !== currentIndex) {
      [array[currentIndex], array[minIndex]] = [
        array[minIndex],
        array[currentIndex],
      ];
    }
  }

  return array;
}
```

### 2. Selection Sort with Early Return (Optimized for Already Sorted)

```javascript
function selectionSortOptimized(array) {
  const length = array.length;

  for (let currentIndex = 0; currentIndex < length - 1; currentIndex++) {
    let minIndex = currentIndex;
    let isAlreadySorted = true;

    for (
      let unsortedIndex = currentIndex + 1;
      unsortedIndex < length;
      unsortedIndex++
    ) {
      if (array[unsortedIndex] < array[minIndex]) {
        minIndex = unsortedIndex;
        isAlreadySorted = false;
      }
      // Additional check to see if any element is out of order
      else if (array[unsortedIndex] < array[unsortedIndex - 1]) {
        isAlreadySorted = false;
      }
    }

    // If the remaining array is already sorted, we can return early
    if (isAlreadySorted) break;

    if (minIndex !== currentIndex) {
      [array[currentIndex], array[minIndex]] = [
        array[minIndex],
        array[currentIndex],
      ];
    }
  }

  return array;
}
```

### 3. Recursive Selection Sort

```javascript
function selectionSortRecursive(array, startIndex = 0) {
  // Base case: when we've reached the end of the array
  if (startIndex >= array.length - 1) return array;

  let minIndex = startIndex;

  // Find the index of the minimum element in the unsorted subarray
  for (
    let unsortedIndex = startIndex + 1;
    unsortedIndex < array.length;
    unsortedIndex++
  ) {
    if (array[unsortedIndex] < array[minIndex]) {
      minIndex = unsortedIndex;
    }
  }

  // Swap if the minimum element is not already in position
  if (minIndex !== startIndex) {
    [array[startIndex], array[minIndex]] = [array[minIndex], array[startIndex]];
  }

  // Recursively sort the remaining subarray
  return selectionSortRecursive(array, startIndex + 1);
}
```

## Complexity Analysis

### Time Complexity:

- **Worst Case:** O(n²) - For each of n elements, we check up to n elements to find the minimum
- **Best Case:** O(n²) - Even if the array is sorted, we still check all elements each time
- **Average Case:** O(n²)

### Space Complexity:

- All versions: O(1) - Selection sort is an in-place sorting algorithm
- (Except the recursive version which has O(n) space due to call stack)

## Optimal Approach (Standard Selection Sort) Dry Run

### Example 1: Normal Case

Array: [64, 25, 12, 22, 11]

**Pass 1:**

- Entire array is unsorted
- Find minimum: 11 at index 4
- Swap with first element (64) → [11, 25, 12, 22, 64]

**Pass 2:**

- Unsorted subarray: [25, 12, 22, 64]
- Find minimum: 12 at index 2
- Swap with first unsorted (25) → [11, 12, 25, 22, 64]

**Pass 3:**

- Unsorted subarray: [25, 22, 64]
- Find minimum: 22 at index 3
- Swap with first unsorted (25) → [11, 12, 22, 25, 64]

**Pass 4:**

- Unsorted subarray: [25, 64]
- Find minimum: 25 is already in place
- No swap needed

Final sorted array: [11, 12, 22, 25, 64]

### Example 2: Already Sorted (Edge Case)

Array: [10, 20, 30, 40, 50]

**Pass 1:**

- Find minimum: 10 is already in place
- No swap

**Pass 2:**

- Find minimum: 20 is already in place
- No swap

**Pass 3:**

- Find minimum: 30 is already in place
- No swap

**Pass 4:**

- Find minimum: 40 is already in place
- No swap

Final sorted array: [10, 20, 30, 40, 50]
(Note: Still performs all comparisons, showing why best case is O(n²))

### Example 3: Edge Case (Single Element)

Array: [7]

- Array length is 1
- Algorithm immediately returns
- No operations performed

Final sorted array: [7]

### Example 4: Edge Case (Empty Array)

Array: []

- Array length is 0
- Algorithm immediately returns
- No operations performed

Final sorted array: []

### Example 5: Reverse Sorted (Worst Case)

Array: [5, 4, 3, 2, 1]

**Pass 1:**

- Find minimum: 1 at index 4
- Swap with first element → [1, 4, 3, 2, 5]

**Pass 2:**

- Unsorted: [4, 3, 2, 5]
- Find minimum: 2 at index 3
- Swap → [1, 2, 3, 4, 5]

**Pass 3:**

- Unsorted: [3, 4, 5]
- Find minimum: 3 is in place
- No swap

**Pass 4:**

- Unsorted: [4, 5]
- Find minimum: 4 is in place
- No swap

Final sorted array: [1, 2, 3, 4, 5]

## Key Observations:

1. Selection sort always makes O(n²) comparisons regardless of input order
2. It performs at most O(n) swaps, which can be advantageous when writes are expensive
3. The algorithm is not stable (may change relative order of equal elements)
4. It performs well on small lists or when memory writes are costly
