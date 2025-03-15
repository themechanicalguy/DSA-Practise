//insertion sort
//Insertion Sort is a simple and intuitive sorting algorithm that builds the sorted array one element at a time.
// It works by taking one element from the unsorted portion and inserting it into its correct position in the sorted portion.

// Assume the first element is already sorted.
// Pick the next element and compare it with the elements in the sorted portion.
// Shift elements to the right until you find the correct position for the current element.
// Insert the element in its correct position.
// Repeat until all elements are sorted.

function insertionSort(arr) {
  //start by picking the 2nd element from array
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    //compare the second with one before & swap if necessary
    let j = i - 1;

    // Shift elements that are greater than key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert the key at the correct position
    arr[j + 1] = key;
  }
  return arr;
}

// Example usage
let numbers = [8, 4, 6, 2, 9, 1];
console.log(insertionSort(numbers)); // Output: [1, 2, 4, 6, 8, 9]

function insertionSortRecursive(arr, n = arr.length) {
  // Base case: if array has 1 or fewer elements, it's already sorted
  if (n <= 1) {
    return arr;
  }

  // Recursively sort first n-1 elements
  insertionSortRecursive(arr, n - 1);

  // Insert last element at its correct position in sorted array
  let last = arr[n - 1];
  let j = n - 2;

  // Shift elements that are greater than last to the right
  while (j >= 0 && arr[j] > last) {
    arr[j + 1] = arr[j];
    j--;
  }

  // Place last element in its correct position
  arr[j + 1] = last;

  return arr;
}

// Example usage:
let arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);
insertionSortRecursive(arr);
console.log("Sorted array:", arr);

// Test with different cases
let arr2 = [5, 2, 8, 1, 9];
console.log("Original array:", arr2);
insertionSortRecursive(arr2);
console.log("Sorted array:", arr2);

function insert(arr, element, pos) {
  while (pos >= 0 && arr[pos] > element) {
    arr[pos + 1] = arr[pos];
    pos--;
  }
  arr[pos + 1] = element;
}

function insertionSortRecursive(arr, n = arr.length) {
  if (n <= 1) {
    return arr;
  }

  insertionSortRecursive(arr, n - 1);
  let last = arr[n - 1];
  insert(arr, last, n - 2);

  return arr;
}

// Example usage:
let arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);
insertionSortRecursive(arr);
console.log("Sorted array:", arr);
