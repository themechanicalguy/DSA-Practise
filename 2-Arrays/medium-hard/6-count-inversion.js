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
/**
 * Counts the number of inversions in the array using Merge Sort.
 * An inversion is a pair (i, j) where i < j and arr[i] > arr[j].
 * @param {number[]} arr - Input array of integers
 * @return {number} - Number of inversions
 */
function countInversions(arr) {
  // Helper function to perform merge sort and count inversions
  function mergeSort(array, start, end) {
    if (start >= end) return 0; // Base case: single element or empty array

    const mid = Math.floor((start + end) / 2);
    let inversionCount = 0;

    // Recursively count inversions in left and right halves
    inversionCount += mergeSort(array, start, mid);
    inversionCount += mergeSort(array, mid + 1, end);

    // Count inversions during the merge step
    inversionCount += mergeAndCount(array, start, mid, end);

    return inversionCount;
  }

  // Merges two sorted subarrays and counts inversions
  function mergeAndCount(array, start, mid, end) {
    const leftSubarray = array.slice(start, mid + 1); // Left subarray
    const rightSubarray = array.slice(mid + 1, end + 1); // Right subarray
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
