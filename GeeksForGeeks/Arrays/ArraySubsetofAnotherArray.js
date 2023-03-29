//User function Template for javascript

/**
 * @param {number[]} a1
 * @param {number[]} a2
 * @param {number} n
 * @param {number} m
 * @returns {string}
 */

// Own Definition: Given 2 arrays a1, a2, find if a2 is subset of a1
// a1[] = {1, 2, 3, 4, 5, 6}
// a2[] = {1, 2, 4}
// true;

// input
// a1[] = {10, 5, 2, 23, 19}
// a2[] = {19, 5, 3}
// false
/**
 * Output: true, false predictable
 * Variablesfc1 and fc2 (frequencyCounter)
 *
 * SOLUTION;
 * 1. create 2 empty objects fc1 and fc2
 * 2. count frequency of a1 and a2 and put them in fc1 and fc2 respectively
 * 3. compare each key of fc2 is always less or equal to fc1, if something fails return false
 * 4. else return true
 */

class Solution {
  isSubset(a1, a2, n, m) {
    //code here
    const fc1 = {},
      fc2 = {};

    for (const val of a1) fc1[val] = (fc1[val] || 0) + 1;
    for (const val of a2) fc2[val] = (fc2[val] || 0) + 1;

    for (const [key, value] of Object.entries(fc2)) {
      if (!fc1[key]) return 'No';
      if (fc2[key] > fc1[key]) {
        return 'No';
      }
    }
    return 'Yes';
  }
}
