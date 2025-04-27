//https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1
// Given an array of integers arr[]. Find the Inversion Count in the array.
// Two elements arr[i] and arr[j] form an inversion if arr[i] > arr[j] and i < j.
// Inversion Count: For an array, inversion count indicates how far (or close) the array is from being sorted. If the array is already sorted then the inversion count is 0.
// If an array is sorted in the reverse order then the inversion count is the maximum.
// Examples:
// Input: arr[] = [2, 4, 1, 3, 5]
// Output: 3
// Explanation: The sequence 2, 4, 1, 3, 5 has three inversions (2, 1), (4, 1), (4, 3).

//Approach 1: Brute Force
// Intuition: Check all possible pairs in the array and count inversions.

function countInversions(arr) {
  let inversionCount = 0;
  const n = arr.length;

  // Check all possible pairs
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] > arr[j]) {
        inversionCount++;
      }
    }
  }

  return inversionCount;
}

// Example usage
console.log(countInversions([2, 4, 1, 3, 5])); // Output: 3
// Time Complexity: O(n^2)
// Space Complexity: O(1)

// Approach 2: Enhanced Merge Sort
function countInversions(arr) {
  // Temporary array for merge sort
  const temp = new Array(arr.length);
  return mergeSortAndCount(arr, temp, 0, arr.length - 1);
}

function mergeSortAndCount(arr, temp, left, right) {
  let inversionCount = 0;

  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Count inversions in left half
    inversionCount += mergeSortAndCount(arr, temp, left, mid);

    // Count inversions in right half
    inversionCount += mergeSortAndCount(arr, temp, mid + 1, right);

    // Count inversions during merging
    inversionCount += mergeAndCount(arr, temp, left, mid, right);
  }

  return inversionCount;
}

function mergeAndCount(arr, temp, left, mid, right) {
  let i = left; // Pointer for left subarray
  let j = mid + 1; // Pointer for right subarray
  let k = left; // Pointer for temp array
  let inversionCount = 0;

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      // All remaining elements in left subarray will be greater than arr[j]
      inversionCount += mid - i + 1;
      temp[k++] = arr[j++];
    }
  }

  // Copy remaining elements
  while (i <= mid) {
    temp[k++] = arr[i++];
  }

  while (j <= right) {
    temp[k++] = arr[j++];
  }

  // Copy back to original array
  for (let x = left; x <= right; x++) {
    arr[x] = temp[x];
  }

  return inversionCount;
}

// Example usage
console.log(countInversions([2, 4, 1, 3, 5])); // Output: 3
