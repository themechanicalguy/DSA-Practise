//LC- 451 Sort Character by Frequency
// Given a string s, sort it in decreasing order based on the frequency of the characters.
// The frequency of a character is the number of times it appears in the string.
// Sort the characters in descending order by frequency.
// Return the sorted string.
// Note: It is guaranteed that the answer is unique.
// Example 1:
// Input: s = "tree"
// Output: "eert"
// Explanation: 'e' appears twice while 't' and 'r' both appear once.
// So 'e' must appear before both 't' and 'r'.
// Example 2:
// Input: s = "cccaaa"
// Output: "aaaccc"
// Explanation: 'c' appears three times while 'a' appears twice.
// So 'c' must appear before 'a' in the result.

//Approach: 1-Using Array and Custom Sorting
function frequencySort(s) {
  // Convert string to array of characters
  const chars = [...s];

  // Count frequencies
  const frequency = {};
  for (const char of chars) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Sort characters based on frequency
  chars.sort((a, b) => {
    // If frequencies are different, sort by frequency (descending)
    if (frequency[b] !== frequency[a]) {
      return frequency[b] - frequency[a];
    }
    // If frequencies are same, sort by character code (ascending)
    return a.localeCompare(b);
  });

  return chars.join("");
}

//Approach 2: Using Hash Map and Sorting
/**
 * Sorts characters in a string by frequency (descending order)
 * @param {string} s - Input string
 * @return {string} - Sorted string by character frequency
 */
function frequencySort(s) {
  // Create a frequency map to count character occurrences
  const frequencyMap = new Map();

  // Populate the frequency map
  for (const char of s) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  // Convert the map to an array of [char, frequency] pairs and sort by frequency
  const sortedChars = Array.from(frequencyMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // Build the result string by repeating each character according to its frequency
  let result = "";
  for (const [char, freq] of sortedChars) {
    result += char.repeat(freq);
  }

  return result;
}

//Approach 3: Using Object and Sorting
function frequencySort(s) {
  // Create a frequency object
  const frequency = {};

  // Count character frequencies
  for (const char of s) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Get all characters, sort them by frequency
  const chars = Object.keys(frequency).sort(
    (a, b) => frequency[b] - frequency[a]
  );

  // Build the result string
  let result = "";
  for (const char of chars) {
    result += char.repeat(frequency[char]);
  }

  return result;
}
