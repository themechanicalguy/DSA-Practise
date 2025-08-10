# 1781. Sum of Beauty of All Substrings

The beauty of a string is defined as the difference between the frequency of the most frequent character and the least frequent character in that string. We need to find the sum of the beauty of all possible substrings of a given string `s`.

### Examples

**Example 1:**

- Input: "aabcb"
- Substrings with non-zero beauty: ["aab","aabc","aabcb","abcb","bcb"], each with beauty 1.
- Total beauty: 5.

**Example 2:**

- Input: "aabcbaa"
- Output: 17.

**Brute Force Approach:**

- Generate all possible substrings of `s`.
- For each substring, calculate the frequency of each character.
- Find the max and min frequency in the frequency map.
- Add the difference (max - min) to the sum if min is not zero (i.e., all characters are present).

```javascript
/**
 * Calculates the sum of beauty of all substrings of the given string.
 * Beauty of a substring is the difference between the max and min frequency of characters.
 * @param {string} s - The input string.
 * @return {number} - The sum of beauty of all substrings.
 */
function beautySum(s) {
  let sum = 0;
  const n = s.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const substring = s.substring(i, j + 1);
      const freq = {};

      // Count frequency of each character in the substring
      for (const char of substring) {
        freq[char] = (freq[char] || 0) + 1;
      }

      const frequencies = Object.values(freq);
      const maxFreq = Math.max(...frequencies);
      const minFreq = Math.min(...frequencies);

      sum += maxFreq - minFreq;
    }
  }

  return sum;
}

// Example usage:
console.log(beautySum("aabcb")); // Output: 5
console.log(beautySum("aabcbaa")); // Output: 17
```

**Time Complexity:** `O(n^3)`, where n is the length of the string. There are O(n^2) substrings, and for each substring, we may take O(n) time to compute frequencies.
**Space Complexity:** `O(n)` for the frequency map in each substring.

**Approach 2: Optimized Frequency Calculation with Sliding Window:**

- Idea: Instead of extracting substrings and recomputing frequencies, maintain a frequency map for each starting index and incrementally update it as the substring grows.

## How It Works:

1. **Initialization:** For each starting index `start`, initialize a frequency array to keep track of character counts.
2. **Expanding Substrings:** Expand the substring by incrementing the `end` index, updating the frequency of the newly added character.
3. **Recomputing Frequencies:** After each update, recompute `minFreq` and `maxFreq` by scanning the frequency array.
4. **Calculating Beauty:** Add the beauty (`maxFreq - minFreq`) to the total if the substring has at least two distinct characters.

```javascript
/**
 * Calculates the sum of beauty of all substrings using optimized frequency updates.
 * @param {string} s - Input string
 * @returns {number} - Sum of beauty of all substrings
 */
function beautySumSlidingWindow(s) {
  let totalBeauty = 0;
  const n = s.length;

  // For each starting index
  for (let start = 0; start < n; start++) {
    // Initialize frequency map for current starting index
    const freq = new Array(26).fill(0);
    let minFreq = Infinity,
      maxFreq = 0;

    // Expand substring from start to end
    for (let end = start; end < n; end++) {
      // Add new character to frequency map
      const charIndex = s.charCodeAt(end) - "a".charCodeAt(0);
      freq[charIndex]++;

      // Update min and max frequencies
      if (freq[charIndex] === 1) {
        // New character introduced
        minFreq = 1;
        maxFreq = Math.max(maxFreq, 1);
      } else {
        // Recalculate min and max frequencies
        minFreq = Infinity;
        maxFreq = 0;
        for (let count of freq) {
          if (count > 0) {
            minFreq = Math.min(minFreq, count);
            maxFreq = Math.max(maxFreq, count);
          }
        }
      }

      // Add beauty if substring has at least 2 distinct characters
      if (minFreq !== Infinity) {
        totalBeauty += maxFreq - minFreq;
      }
    }
  }

  return totalBeauty;
}
```
