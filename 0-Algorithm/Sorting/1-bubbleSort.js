// Implement bubble sort
// the concept of bubble sort is that on the first iteration the largest element would
// be reaching its right position and similarly for others as well.

function bubbleSort(arr) {
  //start a loop with a variable i from array index 0 to end
  for (let i = 0; i < arr.length - 1; i++) {
    //start a inner loop with a variable j from 0 to n-i
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // swap if arr[j] > arr[j+1]
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 8, 3, 2, 1]));

// The optimized version uses a swapped flag to stop early if the array becomes sorted.
// Bubble Sort is stable (preserves the order of equal elements).
// It is not efficient for large datasets due to its O(n²) complexity.

function bubbleSort(arr) {
  let n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    // Compare adjacent elements and swap if needed
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps occurred, the array is already sorted
    if (!swapped) break;
  }
  return arr;
}

// Example usage
let arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(arr)); // Output: [11, 12, 22, 25, 34, 64, 90]

//Recurssive Bubble Sort

function recursiveBubbleSort(arr, n = arr.length) {
  // Base case: If the array has one or no elements, it's already sorted
  if (n === 1) return;

  // Perform one pass of bubble sort
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      // Swap if elements are in wrong order
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }

  // Largest element is now at the end, sort the remaining n-1 elements
  recursiveBubbleSort(arr, n - 1);
}

// Example usage
let numbers = [8, 4, 6, 2, 9, 1];
recursiveBubbleSort(numbers);
console.log(numbers); // Output: [1, 2, 4, 6, 8, 9]
