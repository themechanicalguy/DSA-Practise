//LC  5. Longest Palindromic Substring
// Given a string s, return the longest palindromic substring in s.
// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

//1. Brute Force Approach
/**
 * Finds the longest palindromic substring using brute force
 * @param {string} s - Input string
 * @return {string} - Longest palindromic substring
 */
function longestPalindromeBruteForce(s) {
  if (s.length < 2) return s;

  let longest = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const substring = s.slice(i, j);
      if (isPalindrome(substring) && substring.length > longest.length) {
        longest = substring;
      }
    }
  }

  return longest;
}

/**
 * Helper function to check if a string is a palindrome
 * @param {string} str - String to check
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

//Appriach 2. Expand Around Center Approach
/**
 * Finds the longest palindromic substring by expanding around centers
 * @param {string} s - Input string
 * @return {string} - Longest palindromic substring
 */
function longestPalindromeExpand(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLength = 1;

  /**
   * Helper function to expand around center
   * @param {number} left - Left index
   * @param {number} right - Right index
   * @return {number} - Length of the palindrome
   */
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    // Check for odd length palindromes
    const len1 = expandAroundCenter(i, i);
    // Check for even length palindromes
    const len2 = expandAroundCenter(i, i + 1);

    const currentMax = Math.max(len1, len2);
    if (currentMax > maxLength) {
      maxLength = currentMax;
      start = i - Math.floor((currentMax - 1) / 2);
    }
  }

  return s.slice(start, start + maxLength);
}

// Approach 3. Dynamic Programming Approach
