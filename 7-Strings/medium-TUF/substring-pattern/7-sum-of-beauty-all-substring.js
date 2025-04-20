//LC- 1781. Sum of Beauty of All Substrings
// The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.
// For example, the beauty of "abaacc" is 3 - 1 = 2.
// Given a string s, return the sum of beauty of all of its substrings.
// Example 1:
// Input: s = "aabcb"
// Output: 5
// Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.
/**
 * Calculates the sum of beauty of all substrings in a string.
 * Beauty is the difference between max and min character frequencies.
 * @param {string} s - Input string
 * @returns {number} - Sum of beauty of all substrings
 */
function beautySum(s) {
  const n = s.length;
  let totalBeauty = 0;

  // Generate all substrings using start and end indices
  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      // Extract substring from start to end
      const substring = s.slice(start, end + 1);
      // Calculate beauty of the substring
      const beauty = calculateBeauty(substring);
      // Add to total
      totalBeauty += beauty;
    }
  }

  return totalBeauty;
}

// Approach 2: Optimized Brute Force with Frequency Array

/**
 * Calculates the beauty of a string as max frequency - min frequency.
 * @param {string} str - Input string
 * @returns {number} - Beauty value
 */
function calculateBeauty(str) {
  // Count frequency of each character
  const freqMap = {};
  for (const char of str) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  // Get frequencies as an array
  const frequencies = Object.values(freqMap);
  if (frequencies.length === 0) return 0; // No characters

  // Find max and min frequencies
  const maxFreq = Math.max(...frequencies);
  const minFreq = Math.min(...frequencies);

  return maxFreq - minFreq;
}

// Test
console.log(beautySum("aabcb")); // Output: 5

const n = s.length;
let totalBeauty = 0;

// Iterate over all starting points
for (let start = 0; start < n; start++) {
  // Initialize frequency array for 26 lowercase letters
  const freq = new Array(26).fill(0);
  // Iterate over ending points
  for (let end = start; end < n; end++) {
    // Increment frequency of current character
    const charCode = s.charCodeAt(end) - 97; // 'a' = 97
    freq[charCode]++;
    // Calculate beauty for current substring
    const beauty = calculateBeautyFromFreq(freq);
    totalBeauty += beauty;
  }
}

return totalBeauty;
