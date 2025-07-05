# LC 76. Minimum Window Substring

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

### Problem Understanding

We need to find the smallest substring in `s` that contains all characters of `t` (including duplicates). If no such substring exists, return an empty string.

### Intuition

1. **Sliding Window Technique**: This problem is a classic example of the sliding window technique where we maintain a window (substring) that can expand and shrink based on certain conditions.
2. **Frequency Count**: We need to keep track of the characters in `t` and how many times each character appears in the current window of `s`.
3. **Valid Window**: A window is valid if it contains all characters of `t` with the required frequencies. We aim to find the smallest such window.

### Approaches

#### 1. Sliding Window with Frequency Count (Optimal Approach)

- **Steps**:

  1. Create a frequency map for characters in `t`.
  2. Use two pointers, `left` and `right`, to represent the window.
  3. Expand the `right` pointer to include more characters until the window has all characters of `t`.
  4. Once the window is valid, move the `left` pointer to try to minimize the window size while keeping it valid.
  5. Keep track of the minimum valid window encountered.

- **Complexity**:
  - **Time**: O(m + n), where `m` is the length of `s` and `n` is the length of `t`. Each character is processed at most twice (once by `right` and once by `left`).
  - **Space**: O(1) or O(m + n) depending on the character set (since we store frequency counts).

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // Edge case: if t is empty or s is shorter than t, return ""
  if (!t || s.length < t.length) return "";

  let countT = {};

  for (let char of t) {
    countT[char] = (countT[char] || 0) + 1;
  }

  let window = {};

  // Variables for sliding window
  let have = 0, // Number of chars matched with required frequency
    need = Object.keys(countT).length; // // Number of unique chars to match
  let windowTrack = [-1, -1]; // Track minimum window string
  let minWindowLen = Infinity; // Track minimum window length
  let left = 0;

  // Expand window by moving right pointer
  for (let right = 0; right < s.length; right++) {
    // Add character at right to window
    let char = s[right];
    window[char] = (window[char] || 0) + 1;
    // Check if this character contributes to forming a valid window
    if (countT[char] && window[char] === countT[char]) {
      have++;
    }

    // Shrink window from left while still valid
    while (have === need) {
      // Update minimum window if current window is smaller
      if (right - left + 1 < minWindowLen) {
        minWindowLen = right - left + 1;
        windowTrack = [left, right];
      }
      // Once minWindowLength is track first remove from window to slide to next
      window[s[left]]--;
      // Remove character at left from window
      if (countT[s[left]] && window[s[left]] < countT[s[left]]) {
        have--;
      }
      //increment left
      left++;
    }
  }

  return minWindowLen === Infinity
    ? ""
    : s.slice(windowTrack[0], windowTrack[1] + 1);
};
```

### Dry Run

#### Example 1: s = "ADOBECODEBANC", t = "ABC"

- **Frequency Map**: { 'A': 1, 'B': 1, 'C': 1 }
- **Steps**:
  - right expands to include 'A', 'D', 'O', 'B', 'E', 'C' (window "ADOBEC"): formedChars = 3 (valid).
  - left moves to 'D' (window "DOBEC"): invalid.
  - right expands to 'O', 'D', 'E', 'B', 'A', 'N', 'C' (window "CODEBANC"): valid.
  - left moves to 'O' (window "ODEBANC"): invalid.
  - left moves to 'E' (window "EBANC"): invalid.
  - left moves to 'B' (window "BANC"): valid (min length 4).
- **Result**: "BANC"

#### Example 2: s = "a", t = "a"

- **Frequency Map**: { 'a': 1 }
- **Steps**:
  - right at 'a': valid (window "a").
- **Result**: "a"

#### Example 3: s = "a", t = "aa"

- **Frequency Map**: { 'a': 2 }
- **Steps**:
  - right at 'a': count = 1 < 2 (never valid).
- **Result**: ""
