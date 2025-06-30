// LC- 1539 Kth Missing Positive Number
// Prolem Statement
// Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
// Find the kth positive integer that is missing from this array.
// Example 1:
// Input: arr = [2,3,4,7,11], k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,...]. The 5th missing positive integer is 9.
// Example 2:
// Input: arr = [1,2,3,4], k = 2
// Output: 6
// Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

/**
 * Finds the kth missing positive integer using a Set for lookups
 * @param {number[]} sortedArray - Strictly increasing sorted array of positive integers
 * @param {number} k - The kth missing positive integer to find
 * @return {number} The kth missing positive integer
 */
function findKthMissingSetLookup(sortedArray, k) {
  const numberSet = new Set(sortedArray);
  let missingCount = 0;
  let currentNumber = 1;

  while (true) {
    if (!numberSet.has(currentNumber)) {
      missingCount++;
      if (missingCount === k) {
        return currentNumber;
      }
    }
    currentNumber++;
  }
}

/**
 * Finds the kth missing positive integer using binary search
 * @param {number[]} sortedArray - Strictly increasing sorted array of positive integers
 * @param {number} k - The kth missing positive integer to find
 * @return {number} The kth missing positive integer
 */
function findKthMissingBinarySearch(sortedArray, k) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Calculate how many numbers are missing before arr[mid]
    const missingCount = sortedArray[mid] - (mid + 1);

    if (missingCount < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // At this point, right is the index where the missing count is < k
  // The kth missing number is arr[right] + (k - (arr[right] - (right + 1)))
  // Simplified to:
  return left + k;
}
