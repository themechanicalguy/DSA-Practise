//https://www.geeksforgeeks.org/problems/rotation4723/1

// Find out how many times has an array been rotated
// Given an array of size n, the task is to find the number of times the array has been rotated.
// The rotation of the array is done by moving the first element to the end of the array.
// The rotation of the array is done k times.
// Example 1:
// Input: arr[] = {1, 2, 3, 4, 5}
// Output: 0
// Explanation: The array is not rotated.
// Example 2:
// Input: arr[] = {3, 4, 5, 1, 2}
// Output: 3
// Explanation: The array is rotated 3 times.

// Approach 1: Linear Search (Brute Force)
/**
 * Finds the number of rotations using linear search
 * @param {number[]} rotatedArray - The rotated array
 * @return {number} - The number of rotations
 */
function findRotationsLinear(rotatedArray) {
  // The number of rotations is equal to the index of the minimum element
  for (let i = 0; i < rotatedArray.length - 1; i++) {
    if (rotatedArray[i] > rotatedArray[i + 1]) {
      return i + 1;
    }
  }
  // If array is not rotated, return 0
  return 0;
}

// Example usage:
console.log(findRotationsLinear([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationsLinear([3, 4, 5, 1, 2])); // Output: 3

//Approach 2: Binary Search (Optimal for Sorted Arrays)
/**
 * Finds the number of rotations using binary search
 * @param {number[]} rotatedArray - The rotated array
 * @return {number} - The number of rotations
 */
function findRotationsBinary(rotatedArray) {
  const n = rotatedArray.length;
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    // If array is already sorted
    if (rotatedArray[low] <= rotatedArray[high]) {
      return low;
    }

    const mid = Math.floor((low + high) / 2);
    const next = (mid + 1) % n;
    const prev = (mid - 1 + n) % n;

    // Check if mid element is the smallest
    if (
      rotatedArray[mid] <= rotatedArray[next] &&
      rotatedArray[mid] <= rotatedArray[prev]
    ) {
      return mid;
    }
    // Decide which half to search
    else if (rotatedArray[mid] <= rotatedArray[high]) {
      high = mid - 1;
    } else if (rotatedArray[mid] >= rotatedArray[low]) {
      low = mid + 1;
    }
  }
  return 0;
}

// Example usage:
console.log(findRotationsBinary([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationsBinary([3, 4, 5, 1, 2])); // Output: 3
