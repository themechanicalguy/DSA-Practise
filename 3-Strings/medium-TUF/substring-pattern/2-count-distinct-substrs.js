//https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1
// Approach 1: Brute Force with Set
function distinctSubstring(str) {
  // Use a Set to store distinct substrings
  const result = new Set();

  // List all substrings
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      // Add each substring to the Set
      result.add(str.substring(i, j));
    }
  }

  // Return the Set containing distinct substrings
  return result;
}

// Driver Code
const str = "aaaa";
const subs = distinctSubstring(str);

//Approach 2: Sliding Window with Set
/**
 * Finds all distinct substrings using a sliding window and a Set.
 * @param {string} str - The input string.
 * @returns {string[]} - Array of distinct substrings.
 */
function findDistinctSubstringsSlidingWindow(str) {
  // Initialize a Set to store unique substrings
  const uniqueSubstrings = new Set();

  // Iterate over all possible window sizes
  for (let windowSize = 1; windowSize <= str.length; windowSize++) {
    // Slide the window of current size across the string
    for (let start = 0; start <= str.length - windowSize; start++) {
      // Extract substring of current window size
      const substring = str.slice(start, start + windowSize);
      uniqueSubstrings.add(substring);
    }
  }

  // Convert Set to array for return
  return uniqueSubstrings.size;
}

// Test cases
// console.log(findDistinctSubstringsSlidingWindow("abcd")); // ["a", "b", "c", "d", "ab", "bc", "cd", "abc", "bcd", "abcd"]
console.log(findDistinctSubstringsSlidingWindow("aaa")); // ["a", "aa", "aaa"]
