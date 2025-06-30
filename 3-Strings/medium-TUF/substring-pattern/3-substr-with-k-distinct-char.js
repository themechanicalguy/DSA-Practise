//https://https://www.geeksforgeeks.org/problems/count-number-of-substrings4528/1
// Given a string s of lowercase alphabets, count all possible substrings (not necessarily distinct)
// that have exactly distinct characters.

// Atmost K Distinct Characters means that the substring can have less than k distinct characters.
// For example, if k = 2, the substrings can have 1 or 2 distinct characters.
// For example, if s = "abc", the substrings with at most 2 distinct characters are:
// "a", "b", "c", "ab", "bc", "abc".

// Input: s = "aba", k = 2
// Output: 3
// Explanation: The substrings are: "ab", "ba" and "aba".
// Input: s = "abaaca", k = 1
// Output: 7
// Explanation: The substrings are: "a", "b", "a", "aa", "a", "c", "a".
// Input: s = "cdad", k = 4
// Output: 0

/*
Intuition
To solve this problem, we need to count all possible substrings of a given string that contain exactly k distinct characters. 
There are several approaches to solve this problem, but the most efficient ones involve sliding window techniques 
or brute-force checking with optimizations.

Approaches
1- Brute Force Approach: 
    Generate all possible substrings and check each one for exactly k distinct characters. 
    This has O(n^3) time complexity (O(n^2) substrings and O(n) time to check each).

2- Optimized Sliding Window Approach:
    Use a sliding window to maintain the current substring.
    Expand the window until we have at most k distinct characters.
    If we have exactly k distinct characters, count all valid substrings within that window.
    This approach reduces the time complexity to O(n^2) in the worst case.

3- At Most K Distinct Characters Trick:
    Calculate the number of substrings with at most k distinct characters.
    Calculate the number of substrings with at most k-1 distinct characters.
    Subtract the two to get the count of substrings with exactly k distinct characters.
    This approach uses O(n) time for each calculation, resulting in O(n) total time.
*/

//Approach 1: Brute Force
function countSubstringsWithKDistinctBruteForce(s, k) {
  let count = 0;
  const n = s.length;

  // Generate all possible substrings
  for (let i = 0; i < n; i++) {
    const seen = new Set();
    for (let j = i; j < n; j++) {
      seen.add(s[j]);
      if (seen.size === k) {
        count++;
      } else if (seen.size > k) {
        break; // No need to check further for this i
      }
    }
  }

  return count;
}

// Example usage:
console.log(countSubstringsWithKDistinctBruteForce("aba", 2)); // Output: 3

//Approach 2: Direct Sliding Window for Exactly K
/**
 * Main function to compute exactly k distinct characters.
 * @param {string} s - Input string
 * @param {number} k - Number of distinct characters
 * @returns {number} - Count of valid substrings
 */
function countSubstringsExactlyK(s, k) {
  // Return difference: at most k - at most (k-1)
  return countSubstringsAtMostK(s, k) - countSubstringsAtMostK(s, k - 1);
}

/**
 * Counts substrings with exactly k distinct characters using the at-most trick.
 * @param {string} s - Input string of lowercase alphabets
 * @param {number} k - Number of distinct characters required
 * @returns {number} - Count of valid substrings
 */
function countSubstringsAtMostK(s, k) {
  if (k === 0) return 0;

  let validSubstringCount = 0;
  let left = 0;
  const charFrequency = new Map();

  // Sliding window to count substrings with at most k distinct characters
  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    charFrequency.set(currentChar, (charFrequency.get(currentChar) || 0) + 1);

    // Shrink window while we have more than k distinct characters
    while (charFrequency.size > k) {
      const leftChar = s[left];
      charFrequency.set(leftChar, charFrequency.get(leftChar) - 1);
      if (charFrequency.get(leftChar) === 0) {
        charFrequency.delete(leftChar);
      }
      left++;
    }

    // All substrings ending at right with at most k distinct chars
    validSubstringCount += right - left + 1;
  }

  return validSubstringCount;
}

// Example usage
console.log(countSubstringsExactlyK("aba", 2)); // Output: 3

// Example usage:
console.log(countSubstringsWithKDistinctDirect("aba", 2)); // Output: 3
