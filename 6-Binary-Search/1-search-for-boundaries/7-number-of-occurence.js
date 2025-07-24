//https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1
//Given a sorted array, arr[] and a number target, you need to find the number of occurrences of target in arr[].

//Example 1:
//Input:
//arr[] = {1, 2, 2, 2, 3}
//target = 2
//Output: 3
//Explanation: 2 occurs 3 times in the array.
//Example 2:
//Input:
//arr[] = {1, 1, 2, 2, 2, 3}
//target = 1
//Output: 2

//Linear Search Approach (O(n) time)
/**
 * Counts occurrences of target in a sorted array using linear search
 * @param {number[]} sortedArray - The sorted array to search
 * @param {number} target - The value to count occurrences of
 * @return {number} - The count of target occurrences
 */
function countOccurrencesLinear(sortedArray, target) {
  let count = 0;

  // Iterate through each element in the array
  for (const num of sortedArray) {
    if (num === target) {
      count++;
    }
    // Since array is sorted, we can break early if we've passed the target
    else if (num > target) {
      break;
    }
  }

  return count;
}

// Binary Search Approach (O(log n) time)
/**
 * Counts occurrences of target in a sorted array using binary search
 * @param {number[]} sortedArray - The sorted array to search
 * @param {number} target - The value to count occurrences of
 * @return {number} - The count of target occurrences
 */
function countOccurrencesBinary(sortedArray, target) {
  // Find first occurrence index
  function findFirstOccurrence() {
    let left = 0;
    let right = sortedArray.length - 1;
    let firstOccurrence = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedArray[mid] === target) {
        firstOccurrence = mid;
        right = mid - 1; // Continue searching left half
      } else if (sortedArray[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return firstOccurrence;
  }

  // Find last occurrence index
  function findLastOccurrence() {
    let left = 0;
    let right = sortedArray.length - 1;
    let lastOccurrence = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedArray[mid] === target) {
        lastOccurrence = mid;
        left = mid + 1; // Continue searching right half
      } else if (sortedArray[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return lastOccurrence;
  }

  const firstIndex = findFirstOccurrence();
  const lastIndex = findLastOccurrence();

  // If target not found, return 0, else calculate count
  return firstIndex !== -1 ? lastIndex - firstIndex + 1 : 0;
}
