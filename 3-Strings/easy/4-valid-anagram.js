//LC- 242 Valid Anagram
// Given two strings s and t, return true if t is an anagram of s and false otherwise.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
// Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:
// Input: s = "rat", t = "car"
// Output: false

//Approach 1: Character Frequency Count
/**
 * Check if two strings are anagrams by comparing character frequencies
 * @param {string} s - The first input string
 * @param {string} t - The second input string
 * @return {boolean} True if the strings are anagrams, false otherwise
 */
var isAnagram = function (s, t) {
  // If lengths are different, they can't be anagrams
  if (s.length !== t.length) return false;
  const freq = {};
  // Count frequency of characters in first string
  for (let ch of s) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  // Decrement frequency based on second string
  for (let char of t) {
    // Character doesn't exist or count is zero
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
};

//Approach 2: Sorting and Comparison
/**
 * Check if two strings are anagrams by sorting and comparing
 * @param {string} firstString - The first input string
 * @param {string} secondString - The second input string
 * @return {boolean} True if the strings are anagrams, false otherwise
 */
function isAnagramSort(firstString, secondString) {
  // If lengths are different, they can't be anagrams
  if (firstString.length !== secondString.length) {
    return false;
  }

  // Convert strings to arrays, sort them, and join back to strings
  const sortedFirst = firstString.split("").sort().join("");
  const sortedSecond = secondString.split("").sort().join("");

  // Compare the sorted strings
  return sortedFirst === sortedSecond;
}

// Example usage:
console.log(isAnagramSort("anagram", "nagaram")); // true
console.log(isAnagramSort("rat", "car")); // false

//Approach 3: Using Map Object -- handles unicode characters
function isAnagramUnicodeWithMap(s, t) {
  if (s.length !== t.length) return false;

  const frequencyMap = new Map();

  // Count characters in `s`
  for (const char of s) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  // Decrement counts using `t`
  for (const char of t) {
    if (!frequencyMap.has(char)) return false;
    const count = frequencyMap.get(char);
    if (count === 1) {
      frequencyMap.delete(char);
    } else {
      frequencyMap.set(char, count - 1);
    }
  }

  return frequencyMap.size === 0;
}

// Test with emojis (Unicode surrogate pairs)
console.log(isAnagramUnicodeWithMap("😀ab", "ba😀")); // ✅ true
console.log(isAnagramUnicodeWithMap("𠮷a", "a𠮷")); // ✅ true (𠮷 is a surrogate pair)
console.log(isAnagramUnicodeWithMap("😀", "👋")); // ❌ false
