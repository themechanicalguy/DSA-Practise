# Quick Sort in JavaScript

## Intuition and Approach

Quick Sort is a divide-and-conquer algorithm that works by:

1. **Selecting a pivot** element from the array
2. **Partitioning** the array into two subarrays:
   - Elements less than the pivot
   - Elements greater than the pivot
3. **Recursively sorting** the subarrays

**Key Intuition:**

- The pivot element finds its final sorted position during partitioning
- Each recursive call operates on a smaller portion of the array
- Efficient in practice due to good cache performance

### 1. Standard Quick Sort (Lomuto Partition Scheme)

```javascript
function quickSortLomuto(array, left = 0, right = array.length - 1) {
  if (left < right) {
    // Partition the array and get the pivot index
    const pivotIndex = partitionLomuto(array, left, right);

    // Recursively sort elements before and after partition
    quickSortLomuto(array, left, pivotIndex - 1);
    quickSortLomuto(array, pivotIndex + 1, right);
  }
  return array;
}

function partitionLomuto(array, left, right) {
  // Choose the rightmost element as pivot
  const pivotValue = array[right];
  let partitionIndex = left;

  // Rearrange elements smaller than pivot to the left
  for (let currentIndex = left; currentIndex < right; currentIndex++) {
    if (array[currentIndex] < pivotValue) {
      // Swap current element with partition index element
      [array[currentIndex], array[partitionIndex]] = [
        array[partitionIndex],
        array[currentIndex],
      ];
      partitionIndex++;
    }
  }

  // Swap pivot with the element at partition index
  [array[partitionIndex], array[right]] = [array[right], array[partitionIndex]];

  return partitionIndex;
}
// left item as pivot
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Step 1: Partition the array with the first element as the pivot
    let pivotIndex = partitionLow(arr, low, high);

    // Step 2: Recursively sort the left and right subarrays
    quickSort(arr, low, pivotIndex - 1); // Sort left part
    quickSort(arr, pivotIndex + 1, high); // Sort right part
  }
  return arr;
}

// Partition function (Using the first element as pivot)
function partitionLow(arr, low, high) {
  let pivot = arr[low]; // Choosing first element as pivot
  let i = low; // Pointer for smaller elements

  for (let j = low + 1; j <= high; j++) {
    // Iterate forward from left to right
    if (arr[j] < pivot) {
      // If current element is smaller than pivot
      i++; // Move the boundary of smaller elements
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
  }

  // Swap pivot to its correct position
  [arr[i], arr[low]] = [arr[low], arr[i]];
  return i; // Return pivot index
}

// Example usage
let nums = [8, 4, 6, 2, 9, 1];
quickSort(nums);
console.log(nums); // Output: [1, 2, 4, 6, 8, 9]
```

### 2. Quick Sort with Hoare Partition Scheme

```javascript
function quickSortHoare(array, left = 0, right = array.length - 1) {
  if (left < right) {
    const pivotIndex = partitionHoare(array, left, right);
    quickSortHoare(array, left, pivotIndex);
    quickSortHoare(array, pivotIndex + 1, right);
  }
  return array;
}

function partitionHoare(array, left, right) {
  // Choose middle element as pivot
  const pivot = array[Math.floor((left + right) / 2)];

  while (true) {
    // Find element on left that should be on right
    while (array[left] < pivot) left++;

    // Find element on right that should be on left
    while (array[right] > pivot) right--;

    if (left >= right) return right;

    // Swap the out-of-place elements
    [array[left], array[right]] = [array[right], array[left]];
    left++;
    right--;
  }
}
```

### 3. Optimized Quick Sort (Median-of-Three Pivot)

```javascript
function quickSortOptimized(array, left = 0, right = array.length - 1) {
  if (left < right) {
    // For small subarrays, use insertion sort (optimization)
    if (right - left < 16) {
      insertionSortRange(array, left, right);
      return array;
    }

    const pivotIndex = partitionOptimized(array, left, right);
    quickSortOptimized(array, left, pivotIndex - 1);
    quickSortOptimized(array, pivotIndex + 1, right);
  }
  return array;
}

function partitionOptimized(array, left, right) {
  // Median-of-three pivot selection
  const mid = Math.floor((left + right) / 2);

  // Sort left, mid, right elements
  if (array[left] > array[mid]) {
    [array[left], array[mid]] = [array[mid], array[left]];
  }
  if (array[left] > array[right]) {
    [array[left], array[right]] = [array[right], array[left]];
  }
  if (array[mid] > array[right]) {
    [array[mid], array[right]] = [array[right], array[mid]];
  }

  // Place median at right-1 position
  [array[mid], array[right - 1]] = [array[right - 1], array[mid]];

  const pivotValue = array[right - 1];
  let i = left;
  let j = right - 1;

  while (true) {
    do {
      i++;
    } while (array[i] < pivotValue);
    do {
      j--;
    } while (array[j] > pivotValue);

    if (i < j) {
      [array[i], array[j]] = [array[j], array[i]];
    } else {
      break;
    }
  }

  // Restore pivot
  [array[i], array[right - 1]] = [array[right - 1], array[i]];
  return i;
}

function insertionSortRange(array, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const current = array[i];
    let j = i - 1;

    while (j >= left && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
}
```

## Complexity Analysis

### Time Complexity:

- **Best Case:** O(n log n) - When pivot divides array into equal parts
- **Average Case:** O(n log n)
- **Worst Case:** O(n²) - When pivot is smallest/largest element (already sorted/reverse sorted)

### Space Complexity:

- **Worst Case:** O(n) - Due to recursion stack (unbalanced partitions)
- **Best Case:** O(log n) - Balanced partitions

## Optimal Approach (Optimized Quick Sort) Dry Run

### Example 1: Normal Case

Array: [10, 80, 30, 90, 40, 50, 70]

**First Partition:**

- Choose median of [10, 40, 70] → 40 as pivot
- After partitioning: [10, 30, 40, 90, 80, 50, 70]
- Pivot index: 2 (value 40)

**Left Subarray [10, 30]:**

- Already sorted (base case)

**Right Subarray [90, 80, 50, 70]:**

- Choose median of [90, 50, 70] → 70 as pivot
- After partitioning: [50, 70, 80, 90]
- Pivot index: 5 (value 70)

**Subarray [50]:**

- Base case

**Subarray [80, 90]:**

- Choose median → 80 as pivot
- After partitioning: [80, 90]
- Pivot index: 6 (value 80)

Final sorted array: [10, 30, 40, 50, 70, 80, 90]

### Example 2: Already Sorted

Array: [1, 2, 3, 4, 5]

**First Partition:**

- Choose median of [1, 3, 5] → 3 as pivot
- After partitioning: [1, 2, 3, 4, 5]
- Pivot index: 2 (value 3)

**Left Subarray [1, 2]:**

- Already sorted

**Right Subarray [4, 5]:**

- Already sorted

Final sorted array: [1, 2, 3, 4, 5]

### Example 3: Edge Case (Empty Array)

Array: []

- Immediately returns
- No operations performed

Final sorted array: []

### Example 4: Edge Case (Single Element)

Array: [7]

- Base case (length ≤ 1)
- Returns immediately

Final sorted array: [7]

### Example 5: Reverse Sorted (Worst Case)

Array: [5, 4, 3, 2, 1]

**First Partition:**

- Choose median of [5, 3, 1] → 3 as pivot
- After partitioning: [1, 2, 3, 4, 5]
- Pivot index: 2 (value 3)

**Left Subarray [1, 2]:**

- Already sorted

**Right Subarray [4, 5]:**

- Already sorted

Final sorted array: [1, 2, 3, 4, 5]

## Key Observations:

1. Quick Sort is generally faster in practice than other O(n log n) algorithms
2. The choice of pivot significantly affects performance
3. Median-of-three helps avoid worst-case scenarios
4. Switching to insertion sort for small subarrays improves performance
5. Not stable (may change relative order of equal elements)
6. Memory efficient (in-place for most implementations)
