// Quick Sort is a divide and conquer sorting algorithm that selects a pivot element,
// partitions the array into two subarrays (smaller than pivot and greater than pivot), and recursively sorts them.
// It is one of the fastest sorting algorithms in practice due to its efficient partitioning mechanism.

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

//-------------------------------------------------------------------------------------------------------------------------

function quickSort_2(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Step 1: Partition the array and get pivot index
    let pivotIndex = partitionHigh(arr, low, high);

    // Step 2: Recursively sort the left and right subarrays
    quickSort_2(arr, low, pivotIndex - 1); // Left of pivot
    quickSort_2(arr, pivotIndex + 1, high); // Right of pivot
  }
  return arr;
}

// Partition function (Rearranges elements around pivot)
function partitionHigh(arr, low, high) {
  let pivot = arr[high]; // Choosing last element as pivot
  let i = low - 1; // Pointer for smaller elements

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
  }

  // Swap pivot to its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1; // Return pivot index
}

// Example usage
let numbers = [8, 4, 6, 2, 9, 1];
quickSort_2(numbers);
console.log(numbers); // Output: [1, 2, 4, 6, 8, 9]
