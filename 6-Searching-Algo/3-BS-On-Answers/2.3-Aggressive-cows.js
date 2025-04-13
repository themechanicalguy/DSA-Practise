//https://www.geeksforgeeks.org/problems/aggressive-cows/1
/*
You are given an array with unique elements of stalls[], which denote the position of a stall. You are also given an integer k which denotes the number of aggressive cows. Your task is to assign stalls to k cows such that the minimum distance between any two of them is the maximum possible.

Examples :

Input: stalls[] = [1, 2, 4, 8, 9], k = 3
Output: 3
Explanation: The first cow can be placed at stalls[0], 
the second cow can be placed at stalls[2] and 
the third cow can be placed at stalls[3]. 
The minimum distance between cows, in this case, is 3, which also is the largest among all possible ways.
*/

// Approach 1: Binary Search (Optimal Solution)

/**
 * Optimal Solution using Binary Search
 * @param {number[]} stalls - Array of stall positions
 * @param {number} k - Number of cows to place
 * @return {number} - Maximum minimum distance between cows
 */
function aggressiveCowsBinarySearch(stalls, k) {
  stalls.sort((a, b) => a - b);
  const n = stalls.length;
  let left = 1; // Minimum possible distance
  let right = stalls[n - 1] - stalls[0]; // Maximum possible distance
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canPlaceCows(stalls, k, mid)) {
      result = mid; // This is a possible answer, try for larger distance
      left = mid + 1;
    } else {
      right = mid - 1; // Try for smaller distance
    }
  }
  return result;
}

/**
 * Helper function to check if we can place k cows with minimum distance 'dist'
 */
function canPlaceCows(stalls, k, dist) {
  let count = 1; // Place first cow at first stall
  let lastPos = stalls[0];

  for (let i = 1; i < stalls.length; i++) {
    if (stalls[i] - lastPos >= dist) {
      count++;
      lastPos = stalls[i];
      if (count === k) return true;
    }
  }
  return false;
}

//Approach 2: Brute Force (Check all possible distances)

/**
 * Brute Force Solution for Aggressive Cows Problem
 * @param {number[]} stalls - Array of stall positions
 * @param {number} k - Number of cows to place
 * @return {number} - Maximum minimum distance between cows
 */
function aggressiveCowsBruteForce(stalls, k) {
  stalls.sort((a, b) => a - b);
  const n = stalls.length;
  let maxDist = stalls[n - 1] - stalls[0];
  let result = 0;

  // Check all possible distances from 1 to maxDist
  for (let dist = 1; dist <= maxDist; dist++) {
    if (canPlaceCows(stalls, k, dist)) {
      result = dist;
    } else {
      // Since we're checking in increasing order, the last possible dist is our answer
      break;
    }
  }
  return result;
}
