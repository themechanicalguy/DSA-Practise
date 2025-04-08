//https://www.geeksforgeeks.org/problems/square-root/0
// Given a positive integer n, find the square root of n. If n is not a perfect square, then return the floor value.
// Floor value of any number is the greatest Integer which is less than or equal to that number

/**  Brute Force Approach (Linear Search)
 * Finds the square root of a positive integer using brute force.
 * @param {number} num - The positive integer to find the square root of
 * @return {number} - The square root if perfect square, else floor value
 */
function squareRootBruteForce(num) {
  // Handle edge case where num is 0 or 1
  if (num === 0 || num === 1) {
    return num;
  }
  // Initialize counter
  let counter = 1;
  // Loop until counter squared exceeds num
  while (counter * counter <= num) {
    counter++;
  }
  // Return counter - 1 since we overshot in the loop
  return counter - 1;
}

/**
 * Finds the square root of a positive integer using binary search.
 * @param {number} num - The positive integer to find the square root of
 * @return {number} - The square root if perfect square, else floor value
 */
function squareRootBinarySearch(num) {
  // Handle edge cases
  if (num === 0 || num === 1) {
    return num;
  }

  let left = 1;
  let right = num;
  let result = 0;

  while (left <= right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);

    // If mid squared equals num, we found the exact root
    if (mid * mid === num) {
      return mid;
    }

    // If mid squared is less than num, search right half
    if (mid * mid < num) {
      left = mid + 1;
      result = mid; // Update result to the floor value
    }
    // Else search left half
    else {
      right = mid - 1;
    }
  }

  return result;
}

const testNumber = 25; // Perfect square
const nonPerfectSquare = 30; // Non-perfect square

console.log("Brute Force:", squareRootBruteForce(testNumber)); // 5
console.log("Brute Force:", squareRootBruteForce(nonPerfectSquare)); // 5

console.log("Binary Search:", squareRootBinarySearch(testNumber)); // 5
console.log("Binary Search:", squareRootBinarySearch(nonPerfectSquare)); // 5
