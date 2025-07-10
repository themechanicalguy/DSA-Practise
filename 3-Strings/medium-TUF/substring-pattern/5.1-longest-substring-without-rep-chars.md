# LC 3. Longest Substring Without Repeating Characters

### Problem Statement

Given a string `s`, find the length of the longest substring without repeating characters.

### Intuition

To solve this problem, we need to find the longest contiguous sequence of characters in a string where no character is repeated. The key is to efficiently track characters we've seen and adjust our window of consideration dynamically to exclude duplicates when they're encountered.

### Approaches

#### 1. Brute Force Approach

- **Intuition**: Check all possible substrings and determine if they have duplicate characters. Keep track of the maximum length found.
- **Approach**:
  - Iterate through all possible starting indices of the substring.
  - For each starting index, iterate through the remaining characters to extend the substring until a duplicate is found.
  - Use a set to keep track of characters in the current substring to check for duplicates.

```javascript
function lengthOfLongestSubstringBruteForce(s) {
  let maxLength = 0;
  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    let currentLength = 0;
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) {
        break;
      }
      seen.add(s[j]);
      currentLength++;
    }
    maxLength = Math.max(maxLength, currentLength);
  }
  return maxLength;
}
```

- **Time Complexity**: O(n^3) - For each starting index, we potentially check all ending indices, and for each substring, we check for duplicates.
- **Space Complexity**: O(min(n, m)) - Where `n` is the length of the string and `m` is the size of the character set (for the set).

#### 2. Sliding Window with HashSet

- **Intuition**: Use a sliding window to represent the current substring without duplicates. Adjust the window by moving the left pointer when a duplicate is found.
- **Approach**:
  - Use two pointers, `left` and `right`, to represent the current window.
  - Use a set to keep track of characters in the current window.
  - Move the `right` pointer to expand the window and add characters to the set.
  - If a duplicate is found, move the `left` pointer to the right of the previous occurrence of the duplicate character, removing characters from the set as you go.

```javascript
function lengthOfLongestSubstringSlidingWindowSet(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
```

- **Time Complexity**: O(n) - Each character is visited at most twice (once by `left` and once by `right`).
- **Space Complexity**: O(min(n, m)) - For the set.

#### 3. Sliding Window with HashMap(Optimal)

- **Intuition**: Optimize the sliding window by storing the index of each character, allowing the `left` pointer to jump directly to the correct position when a duplicate is found.
- **Approach**:
  - Use a hash map to store the most recent index of each character.
  - Use two pointers, `left` and `right`, to represent the current window.
  - If a duplicate is found at `right`, update `left` to be the maximum of its current value or one past the last occurrence of the duplicate character.

```javascript
function lengthOfLongestSubstring(s) {
  const charIndexMap = new Map();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    if (charIndexMap.has(currentChar)) {
      left = Math.max(left, charIndexMap.get(currentChar) + 1);
    }
    charIndexMap.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
```

- **Time Complexity**: O(n) - Single pass through the string.
- **Space Complexity**: O(min(n, m)) - For the hash map.

### Dry Run of Optimal Approach (Sliding Window with HashMap)

#### Example 1: "abcabcbb"

- Initialize: `left = 0`, `maxLength = 0`, `charIndexMap = {}`
- Iterate:
  - right=0 ('a'): map={'a':0}, maxLength=1
  - right=1 ('b'): map={'a':0, 'b':1}, maxLength=2
  - right=2 ('c'): map={'a':0, 'b':1, 'c':2}, maxLength=3
  - right=3 ('a'): duplicate, left=max(0, 0+1)=1, map={'a':3, 'b':1, 'c':2}, maxLength=3
  - right=4 ('b'): duplicate, left=max(1, 1+1)=2, map={'a':3, 'b':4, 'c':2}, maxLength=3
  - right=5 ('c'): duplicate, left=max(2, 2+1)=3, map={'a':3, 'b':4, 'c':5}, maxLength=3
  - right=6 ('b'): duplicate, left=max(3, 4+1)=5, map={'a':3, 'b':6, 'c':5}, maxLength=3
  - right=7 ('b'): duplicate, left=max(5, 6+1)=7, map={'a':3, 'b':7, 'c':5}, maxLength=3
- Final `maxLength`: 3

#### Example 2: "bbbbb"

- Initialize: `left = 0`, `maxLength = 0`, `charIndexMap = {}`
- Iterate:
  - right=0 ('b'): map={'b':0}, maxLength=1
  - right=1 ('b'): duplicate, left=1, map={'b':1}, maxLength=1
  - ... (similar for all 'b's)
- Final `maxLength`: 1

#### Example 3: "pwwkew"

- Initialize: `left = 0`, `maxLength = 0`, `charIndexMap = {}`
- Iterate:
  - right=0 ('p'): map={'p':0}, maxLength=1
  - right=1 ('w'): map={'p':0, 'w':1}, maxLength=2
  - right=2 ('w'): duplicate, left=2, map={'p':0, 'w':2}, maxLength=2
  - right=3 ('k'): map={'p':0, 'w':2, 'k':3}, maxLength=2
  - right=4 ('e'): map={'p':0, 'w':2, 'k':3, 'e':4}, maxLength=3
  - right=5 ('w'): duplicate, left=max(2, 2+1)=3, map={'p':0, 'w':5, 'k':3, 'e':4}, maxLength=3
- Final `maxLength`: 3

### Edge Cases

- Empty string: should return 0.
- All characters the same: should return 1.
- No duplicates: should return the length of the string.
- Substring after the first duplicate is longer: e.g., "dvdf" should return 3 ("vdf").

The optimal approach efficiently handles all these cases by dynamically adjusting the window and storing the most recent indices of characters.
