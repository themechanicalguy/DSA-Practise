//User function Template for javascript

/**
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */

class Solution {
  //Function is to check whether two strings are anagram of each other or not.
  isAnagram(a, b) {
    // code here
    if (a.length !== b.length) return false;

    const fCounter = {};
    for (let i = 0; i < a.length; i++) {
      fCounter[a[i]] = (fCounter[a[i]] ? fCounter[a[i]] : 0) + 1;
      fCounter[b[i]] = (fCounter[b[i]] ? fCounter[b[i]] : 0) - 1;
    }
    return !Object.values(fCounter).some((count) => count != 0);
  }
}

const sol = new Solution();
sol.isAnagram('abc', 'cab');
sol.isAnagram('cat', 'tca');
