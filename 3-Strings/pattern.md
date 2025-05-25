# Problem Patterns for Solving String Questions in DSA

When tackling string problems in Data Structures and Algorithms (DSA), recognizing common patterns can significantly improve your problem-solving efficiency. Here are the key patterns with identification techniques, approaches, and JavaScript examples:

---

## 1. Sliding Window Pattern

### **Identification**:

- Problems involving substrings or subarrays with specific conditions.
- Often asks for "longest", "shortest", or "containing exactly K" something.
- Examples: longest substring without repeating characters, smallest window containing all characters.

### **Key Indicators**:

- Keywords like "longest," "shortest," or "substring."
- Need to track a contiguous portion of the string.
- Conditions involve counts, sums, or constraints within a window (e.g., at most k distinct characters).

### **Common Problems**:

- Longest substring without repeating characters.
- Minimum window substring.
- String matching with constraints.

### **Approach**:

1. Use two pointers (left and right) to define a window.
2. Expand the window by moving `right` until the condition is met or violated.
3. Shrink the window by moving `left` to optimize or restore the condition.
4. Track the result (e.g., window size, substring) during iterations.
5. Use a hash map or set to store character frequencies or track constraints.

### **Example**: Longest Substring Without Repeating Characters

```javascript
function lengthOfLongestSubstring(s) {
  let charMap = new Map(); // Tracks character positions
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    // If char is seen and its last position is >= left, move left pointer
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }
    charMap.set(char, right); // Update char position
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Example usage
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb")); // Output: 1 ("b")
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3 ("abc")
```

### **Explanation**:

1. Use a `Map` to store the last position of each character.
2. Iterate with the `right` pointer, expanding the window.
3. If a repeating character is found within the window, move `left` to the position after the last occurrence.
4. Update `maxLength` with the current window size (`right - left + 1`).

**Time Complexity**: O(n), where `n` is the string length.  
**Space Complexity**: O(min(m, n)), where `m` is the size of the character set.

---

## 2. Two Pointers Pattern

### **Identification**:

- Problems involving comparing or manipulating two positions in a string.
- Often moving pointers toward each other or in specific directions.
- Examples: Reversing a string, checking palindromes.

### **Key Indicators**:

- Problems requiring comparison of characters from both ends.
- Operations like reversing, validating symmetry, or finding pairs.

### **Common Problems**:

- Valid palindrome.
- Reverse a string.
- Pairwise character comparisons.

### **Approach**:

1. Initialize two pointers (e.g., `left` at start, `right` at end).
2. Move pointers based on the problem’s requirements (e.g., toward each other).
3. Perform comparisons or modifications at each step.
4. Handle edge cases like ignoring non-alphanumeric characters or case sensitivity.

### **Example**: Valid Palindrome

```javascript
function isPalindrome(s) {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
```

### **Explanation**:

1. Clean the string by converting to lowercase and removing non-alphanumeric characters using a regex.
2. Use `left` and `right` pointers to compare characters from both ends.
3. If characters don’t match, return `false`. If the loop completes, return `true`.

**Time Complexity**: O(n) for cleaning and scanning.  
**Space Complexity**: O(1) if in-place, O(n) if storing the cleaned string.

---

## 3. Hash Map (Frequency Count) Pattern

### **Identification**:

- Problems involving counting character frequencies or anagrams.
- Often asks for finding duplicates, permutations, or character counts.
- Examples: valid anagram, first unique character, group anagrams.

### **Key Indicators**:

- Keywords like "anagram," "group," or "same characters."
- Need to compare or match character counts between strings.

### **Common Problems**:

- Valid anagram.
- Group anagrams.
- Find all anagrams in a string.

### **Approach**:

1. Use a hash map or array to store character frequencies.
2. Compare frequencies between strings or substrings.
3. For sliding window variants, combine with the sliding window pattern.
4. Optimize by using a fixed-size array for lowercase letters (size 26).

### **Example**: Valid Anagram

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - "a".charCodeAt(0)]++;
    freq[t.charCodeAt(i) - "a".charCodeAt(0)]--;
  }

  return freq.every((count) => count === 0);
}

console.log(isAnagram("anagram", "nagaram")); // true
```

### **Explanation**:

1. Check if lengths are equal (anagrams must have the same length).
2. Use a frequency array of size 26 for lowercase letters.
3. Increment frequency for `s` characters, decrement for `t`.
4. If all frequencies are `0`, the strings are anagrams.

**Time Complexity**: O(n), where `n` is the string length.  
**Space Complexity**: O(1) since the array size is fixed.

---

## 4. String Manipulation/Simulation Pattern

### **Identification**:

- Problems requiring direct string operations.
- Often involve parsing, formatting, or transforming strings.
- Examples: string compression, zigzag conversion, count and say.

### **Approach**:

1. Process the string character by character.
2. Build a new string or modify the existing one based on rules.
3. Handle edge cases and special characters.

### **Example**: String Compression

```javascript
function compress(chars) {
  let write = 0,
    read = 0;

  while (read < chars.length) {
    const currentChar = chars[read];
    let count = 0;

    while (read < chars.length && chars[read] === currentChar) {
      read++;
      count++;
    }

    chars[write++] = currentChar;

    if (count > 1) {
      for (const digit of count.toString()) {
        chars[write++] = digit;
      }
    }
  }

  return write;
}

const chars = ["a", "a", "b", "b", "c", "c", "c"];
console.log(compress(chars)); // Returns 6, chars becomes ['a','2','b','2','c','3']
```

---

## 5. Trie (Prefix Tree) Pattern

### **Identification**:

- Problems involving prefix matching or dictionary lookups.
- Often asks for autocomplete, word search, or prefix-based operations.
- Examples: implement trie, word search II, longest word in dictionary.

### **Approach**:

1. Implement a trie node structure with children and an end-of-word marker.
2. Insert words into the trie.
3. Search or traverse based on prefix or complete word requirements.

### **Example**: Implement Trie (Prefix Tree)

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // false
console.log(trie.startsWith("app")); // true
```

---

## 6. KMP (Knuth-Morris-Pratt) Pattern

### **Identification**:

- Problems involving substring search or pattern matching.
- Need efficient O(n) solution for string matching.
- Examples: implement strStr(), repeated substring pattern.

### **Approach**:

1. Preprocess the pattern to create the longest prefix suffix (LPS) array.
2. Use the LPS array to skip unnecessary comparisons during the search.

### **Example**: Implement strStr() (Needle in Haystack)

```javascript
function strStr(haystack, needle) {
  if (needle.length === 0) return 0;

  // Build LPS array
  const lps = [0];
  let len = 0,
    i = 1;

  while (i < needle.length) {
    if (needle[i] === needle[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // Search using LPS
  i = 0; // index for haystack
  let j = 0; // index for needle

  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;

      if (j === needle.length) {
        return i - j;
      }
    } else {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return -1;
}

console.log(strStr("hello", "ll")); // 2
```

---

## Pattern Selection Guide

To identify which pattern to use:

1. **Sliding Window**: When you need to find a substring/subarray satisfying certain constraints.
2. **Two Pointers**: When you can process the string from both ends.
3. **Hash Map**: When you need to count or track character frequencies.
4. **String Manipulation**: When the problem requires direct string operations.
5. **Trie**: When dealing with prefix searches or dictionary words.
6. **KMP**: When you need efficient substring search.

Remember that many string problems can be solved using a combination of these patterns. Practice is key to developing intuition for which pattern to apply in different scenarios.
