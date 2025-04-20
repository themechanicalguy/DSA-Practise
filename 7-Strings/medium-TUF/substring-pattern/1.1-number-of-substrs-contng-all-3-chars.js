//LC 1358. Number of Substrings Containing All Three Characters
//https://www.geeksforgeeks.org/problems/count-substring/1
// Given string s consisting only a,b,c. return the number of substrings containing at least one occurrence of all these characters a, b, and c.
// Example 1:
// Input:abcabc
// Output:10
// Explanation:
// The required substrings  are "abc", "abca", "abcab", "abcabc",
// "bca", "bcab", "bcabc", "cab", "cabc" and "abc".
// Example 2:
// Input:aaacb
// Output:3
// Explanation:

//Approach 1: Brute Force
/**
 * Counts the number of substrings containing at least one 'a', 'b', and 'c' using brute force.
 * @param {string} s
 * @return {number}
 */
function countSubstringsBruteForce(s) {
  let count = 0;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      const substring = s.substring(i, j);
      if (
        substring.includes("a") &&
        substring.includes("b") &&
        substring.includes("c")
      ) {
        count++;
      }
    }
  }
  return count;
}

// Example usage:
console.log(countSubstringsBruteForce("abcabc")); // Output: 10
console.log(countSubstringsBruteForce("aaacb")); // Output: 3

//Approach 2: Sliding Window (Optimal)

/**
 * Counts the number of substrings containing at least one 'a', 'b', and 'c' using sliding window.
 * @param {string} s
 * @return {number}
 */
function countSubstringsSlidingWindow(s) {
  let count = 0;
  const n = s.length;
  const charCount = { a: 0, b: 0, c: 0 };
  let left = 0;

  for (let right = 0; right < n; right++) {
    charCount[s[right]]++;
    // While the current window contains all three characters, try to shrink from the left
    while (charCount["a"] > 0 && charCount["b"] > 0 && charCount["c"] > 0) {
      // All substrings starting from left to right are valid
      count += n - right;
      charCount[s[left]]--;
      left++;
    }
  }
  return count;
}

// Example usage:
console.log(countSubstringsSlidingWindow("abcabc")); // Output: 10
console.log(countSubstringsSlidingWindow("aaacb")); // Output: 3
