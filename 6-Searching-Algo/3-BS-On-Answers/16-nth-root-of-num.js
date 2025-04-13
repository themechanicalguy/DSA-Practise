//https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1
// // Given an integer n and a positive integer m, find the nth root of m.
// If the nth root is not an integer, return -1.
// For example, if n = 3 and m = 27, the answer is 3.
// If n = 2 and m = 8, the answer is 2.
// If n = 3 and m = 8, the answer is -1.

// Approach 1: Using Exponentiation and Rounding
/**
 * Finds the nth root of m using exponentiation and rounding
 * @param {number} rootDegree - The degree of the root (n)
 * @param {number} number - The number to find root of (m)
 * @returns {number} - The integer root or -1 if not exact
 */
function findNthRoot(rootDegree, number) {
  // Handle edge cases
  if (number === 0) return 0;
  if (rootDegree === 0) return -1; // Undefined

  // Calculate the root using exponentiation
  const root = Math.pow(number, 1 / rootDegree);

  // Round to nearest integer and check if it's exact
  const roundedRoot = Math.round(root);

  // Check if the rounded root raised to n equals m
  if (Math.pow(roundedRoot, rootDegree) === number) {
    return roundedRoot;
  }

  return -1;
}

//Approach 2: Binary Search (More Efficient for Large Numbers)
/**
 * Finds the nth root of m using binary search
 * @param {number} rootDegree - The degree of the root (n)
 * @param {number} number - The number to find root of (m)
 * @returns {number} - The integer root or -1 if not exact
 */
function findNthRootBinarySearch(rootDegree, number) {
  if (number === 0) return 0;
  if (rootDegree === 0) return -1;

  let low = 1;
  let high = number;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const power = Math.pow(mid, rootDegree);

    if (power === number) {
      return mid;
    } else if (power < number) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}
