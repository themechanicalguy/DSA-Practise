//https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1
// Given a string s, you need to print the size of the longest possible substring with exactly k unique characters.
// If no possible substring exists, print -1.
// Examples:
// Input: s = "aabacbebebe", k = 3
// Output: 7
// Explanation: "cbebebe" is the longest substring with 3 distinct characters.
// Input: s = "aaaa", k = 2
// Output: -1
// Explanation: There's no substring with 2 distinct characters.
// Input: s = "aabaaab", k = 2
// Output: 7
// Explanation: "aabaaab" is the longest substring with 2 distinct characters.

//Approach 1: Brute Force (For Comparison)
function longestSubstringWithKUniqueCharsBruteForce(s, k) {
  const n = s.length;
  let maxLength = -1;

  for (let i = 0; i < n; i++) {
    const uniqueChars = new Set();
    for (let j = i; j < n; j++) {
      uniqueChars.add(s[j]);

      if (uniqueChars.size === k) {
        maxLength = Math.max(maxLength, j - i + 1);
      } else if (uniqueChars.size > k) {
        break;
      }
    }
  }

  return maxLength;
}

// Example usage
console.log(longestSubstringWithKUniqueCharsBruteForce(s, k)); // Output: 7

//Approach 2: Sliding Window (Optimal)
function longestSubstringWithKUniqueChars(s, k) {
  const n = s.length;
  if (n === 0 || k === 0 || k > n) return -1;

  let left = 0;
  let maxLength = -1;
  let maxSubstring = "";
  const charFrequency = new Map();

  for (let right = 0; right < n; right++) {
    const currentChar = s[right];

    // Update frequency count for current character
    charFrequency.set(currentChar, (charFrequency.get(currentChar) || 0) + 1);

    // If we have more than k unique chars, move left pointer
    while (charFrequency.size > k) {
      const leftChar = s[left];
      charFrequency.set(leftChar, charFrequency.get(leftChar) - 1);

      if (charFrequency.get(leftChar) === 0) {
        charFrequency.delete(leftChar);
      }

      left++;
    }

    // Update maxLength if we have exactly k unique chars
    if (charFrequency.size === k) {
      maxLength = Math.max(maxLength, right - left + 1);
      maxSubstring = s.substring(left, right + 1);
    }
  }

  return maxLength;
}

// Example usage
const s = "aabacbebebe";
const k = 3;
console.log(longestSubstringWithKUniqueChars(s, k)); // Output: 7
