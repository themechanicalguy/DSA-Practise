# Insertion Sort in JavaScript

## Intuition and Approach

Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. It works similarly to how you might sort playing cards in your hands - you pick one card and insert it into its correct position among the already sorted cards.

**Key Intuition:**

- The array is virtually split into a sorted and an unsorted part
- Values from the unsorted part are picked and placed at the correct position in the sorted part
- The algorithm is efficient for small data sets or nearly sorted data

![Sample Image](Insertion-sort.gif)

### 1. Standard Insertion Sort

```javascript
function insertionSortBasic(array) {
  const length = array.length;

  // Start from the second element (index 1)
  for (let currentIndex = 1; currentIndex < length; currentIndex++) {
    // The element to be inserted
    const currentElement = array[currentIndex];
    let comparisonIndex = currentIndex - 1;

    // Move elements of array[0..currentIndex-1] that are greater than currentElement
    // to one position ahead of their current position
    while (comparisonIndex >= 0 && array[comparisonIndex] > currentElement) {
      array[comparisonIndex + 1] = array[comparisonIndex];
      comparisonIndex--;
    }

    // Insert the currentElement at its correct position
    array[comparisonIndex + 1] = currentElement;
  }

  return array;
}
```

### 2. Insertion Sort with Binary Search (Optimized)

```javascript
function binarySearch(array, item, low, high) {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (array[mid] === item) return mid + 1;
    else if (array[mid] < item) low = mid + 1;
    else high = mid - 1;
  }
  return low;
}

function insertionSortWithBinarySearch(array) {
  const length = array.length;

  for (let currentIndex = 1; currentIndex < length; currentIndex++) {
    const currentElement = array[currentIndex];

    // Find position to insert using binary search
    const insertPosition = binarySearch(
      array,
      currentElement,
      0,
      currentIndex - 1
    );

    // Shift all elements from insertPosition to currentIndex - 1
    for (
      let shiftIndex = currentIndex;
      shiftIndex > insertPosition;
      shiftIndex--
    ) {
      array[shiftIndex] = array[shiftIndex - 1];
    }

    // Insert the element at the correct position
    array[insertPosition] = currentElement;
  }

  return array;
}
```

### 3. Recursive Insertion Sort

```javascript
function insertionSortRecursive(array, currentIndex = 1) {
  // Base case: when we've processed all elements
  if (currentIndex >= array.length) return array;

  const currentElement = array[currentIndex];
  let comparisonIndex = currentIndex - 1;

  // Shift elements greater than currentElement to the right
  while (comparisonIndex >= 0 && array[comparisonIndex] > currentElement) {
    array[comparisonIndex + 1] = array[comparisonIndex];
    comparisonIndex--;
  }

  // Insert the currentElement at its correct position
  array[comparisonIndex + 1] = currentElement;

  // Recursively sort the next element
  return insertionSortRecursive(array, currentIndex + 1);
}
```

## Complexity Analysis

### Time Complexity:

- **Worst Case (Reverse Sorted):** O(n²) - Each element needs to be compared with all previous elements
- **Best Case (Already Sorted):** O(n) - Only one comparison per element
- **Average Case:** O(n²)

### Space Complexity:

- All versions: O(1) - Insertion sort is an in-place sorting algorithm
- (Except the recursive version which has O(n) space due to call stack)

## Optimal Approach (Standard Insertion Sort) Dry Run

### Example 1: Normal Case

Array: [12, 11, 13, 5, 6]

**Pass 1:**

- Current element: 11 (at index 1)
- Compare with 12 → shift 12 right → [12, 12, 13, 5, 6]
- Insert 11 at index 0 → [11, 12, 13, 5, 6]

**Pass 2:**

- Current element: 13 (at index 2)
- Compare with 12 → already in correct position
- No shifts needed → [11, 12, 13, 5, 6]

**Pass 3:**

- Current element: 5 (at index 3)
- Compare with 13 → shift → [11, 12, 13, 13, 6]
- Compare with 12 → shift → [11, 12, 12, 13, 6]
- Compare with 11 → shift → [11, 11, 12, 13, 6]
- Insert 5 at index 0 → [5, 11, 12, 13, 6]

**Pass 4:**

- Current element: 6 (at index 4)
- Compare with 13 → shift → [5, 11, 12, 13, 13]
- Compare with 12 → shift → [5, 11, 12, 12, 13]
- Compare with 11 → shift → [5, 11, 11, 12, 13]
- Compare with 5 → insert at index 1 → [5, 6, 11, 12, 13]

Final sorted array: [5, 6, 11, 12, 13]

### Example 2: Already Sorted (Best Case)

Array: [1, 2, 3, 4, 5]

**Pass 1:**

- Current element: 2 → already in place
  **Pass 2:**
- Current element: 3 → already in place
  **Pass 3:**
- Current element: 4 → already in place
  **Pass 4:**
- Current element: 5 → already in place

Final sorted array: [1, 2, 3, 4, 5]
(Only n-1 comparisons, no shifts - O(n) time)

### Example 3: Edge Case (Single Element)

Array: [7]

- Only one element
- Algorithm immediately returns
- No operations performed

Final sorted array: [7]

### Example 4: Edge Case (Empty Array)

Array: []

- Empty array
- Algorithm immediately returns
- No operations performed

Final sorted array: []

### Example 5: Reverse Sorted (Worst Case)

Array: [5, 4, 3, 2, 1]

**Pass 1:**

- Current element: 4 → shift 5 → [5, 5, 3, 2, 1]
- Insert 4 → [4, 5, 3, 2, 1]

**Pass 2:**

- Current element: 3 → shift 5 → [4, 5, 5, 2, 1]
- Shift 4 → [4, 4, 5, 2, 1]
- Insert 3 → [3, 4, 5, 2, 1]

**Pass 3:**

- Current element: 2 → shift 5 → [3, 4, 5, 5, 1]
- Shift 4 → [3, 4, 4, 5, 1]
- Shift 3 → [3, 3, 4, 5, 1]
- Insert 2 → [2, 3, 4, 5, 1]

**Pass 4:**

- Current element: 1 → shift 5 → [2, 3, 4, 5, 5]
- Shift 4 → [2, 3, 4, 4, 5]
- Shift 3 → [2, 3, 3, 4, 5]
- Shift 2 → [2, 2, 3, 4, 5]
- Insert 1 → [1, 2, 3, 4, 5]

Final sorted array: [1, 2, 3, 4, 5]
(Maximum number of comparisons and shifts - O(n²) time)

## Key Observations:

1. Insertion sort is efficient for small datasets or nearly sorted data
2. It is stable (maintains relative order of equal elements)
3. It is adaptive (performance improves when input is partially sorted)
4. It has low overhead and is easy to implement
5. The binary search optimization reduces comparisons but not shifts, so it's still O(n²)
