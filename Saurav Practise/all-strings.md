# Aug 4th

# 1021. Remove Outermost Parentheses --1

We need to decompose a valid parentheses string into its primitive components, remove the outermost parentheses from each primitive, and then concatenate the results. A primitive valid parentheses string is one that cannot be split into two non-empty valid parentheses strings.

### Key Observations:

- A valid parentheses string is balanced, so the count of `(` equals the count of `)`.
- Primitive strings are the smallest units that are themselves valid and cannot be split further.
- To identify primitive strings, we can track the balance of parentheses (e.g., `(` increases balance by 1, `)` decreases by 1). A primitive string ends when the balance returns to 0.
- For each primitive string, we exclude the first `(` and the last `)` and keep the inner content.

### Intuition for Solution:

- Parse the string character by character.
- Track the balance of parentheses to identify boundaries of primitive strings.
- When a primitive string is found (balance returns to 0), exclude its outermost parentheses and include the inner part in the result.
- Handle edge cases like empty strings or single primitive strings like `()`.

1. **Using Balance Counter**:
   - Iterate through the string while keeping track of the balance (number of open parentheses).
   - When the balance returns to zero, we've found a primitive.
   - Extract the primitive, remove its outermost parentheses, and add the result to the output.

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  //create a balance variable for managing valid parenthesis.
  // if balance becomes 0, push start to end to result
  let res = "";
  let balance = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    char === "(" ? balance++ : balance--;
    if (balance === 0) {
      res += s.slice(start + 1, i);
      start = i + 1;
    }
  }
  return res;
};
```

- **Time Complexity**: O(n), where n is the length of the string. We traverse the string once.
- **Space Complexity**: O(n), for storing the result. In the worst case, the result could be as long as the input string.

### Dry Run with Examples

**Example 1: s = "(()())(())"**

- Initial: balance = 0, start = 0, result = []
- i=0: '(', balance=1
- i=1: '(', balance=2
- i=2: ')', balance=1
- i=3: '(', balance=2
- i=4: ')', balance=1
- i=5: ')', balance=0 → primitive="()()" (slices 1-4), result=["()()"], start=6
- i=6: '(', balance=1
- i=7: '(', balance=2
- i=8: ')', balance=1
- i=9: ')', balance=0 → primitive="()" (slices 7-8), result=["()()", "()"], start=10
- Result: "()()" + "()" = "()()()"

---

# 151. Reverse Words in a String --2

We need to reverse the order of words in a given string `s`. A word is defined as a sequence of non-space characters, and words are separated by one or more spaces. The resulting string should have words in reverse order, separated by a single space, with no leading or trailing spaces.

## Intuition

1. **Trim and Split**: First, we need to trim any leading or trailing spaces from the string and then split the string into an array of words, handling multiple spaces between words by treating them as a single delimiter.
2. **Reverse the Array**: Once we have the array of words, reversing the array will give us the words in the desired order.
3. **Join with Single Space**: Finally, we join the reversed array into a string with each word separated by a single space.

## Approach 1: Using Built-in Methods

- Trim the string to remove leading and trailing spaces.
- Split the string into an array of words using a regular expression to handle multiple spaces.
- Reverse the array.
- Join the array back into a string with single spaces.

1. **Trim and Split**: The `trim()` method removes leading and trailing spaces. The `split(/\s+/)` splits the string into an array of words, where `\s+` matches one or more spaces.
2. **Reverse and Join**: The `reverse()` method reverses the array, and `join(' ')` combines the words into a string with single spaces.

### Approach 1: Using Built-in Methods

```javascript
var reverseWords = function (inputString) {
  // Trim leading/trailing spaces and split by single space
  const wordsWithSpaces = inputString.trim().split(" ");

  // Filter out empty strings caused by multiple spaces
  const wordsArray = wordsWithSpaces.filter((word) => word !== "");

  // Reverse the array of words
  const reversedWords = wordsArray.reverse();

  // Join words with a single space
  return reversedWords.join(" ");
};
```

**Time Complexity**: O(n), where n is the length of the string. Trimming, splitting, reversing, and joining all operate in linear time.
**Space Complexity**: O(n), for storing the array of words.

### Dry Run with Examples

**Example 1: s = "the sky is blue"**

- Trim: "the sky is blue"
- Split: ["the", "sky", "is", "blue"]
- Reverse: ["blue", "is", "sky", "the"]
- Join: "blue is sky the"

**Example 2: s = " hello world "**

- Trim: "hello world"
- Split: ["hello", "world"]
- Reverse: ["world", "hello"]
- Join: "world hello"

# 1903. Largest Odd Number in String --3

You are given a string num, representing a large integer.
Return the largest-valued odd integer (as a string) that is a `non-empty substring` of num,
or an empty string "" if no odd integer exists.

A `substring` is a contiguous sequence of characters within a string.

- Example 1: Input: num = "52", Output: "5", Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
- Example 2: Input: num = "4206", Output: "", Explanation: There are no odd numbers in "4206".
- Example 3: Input: num = "35427", Output: "35427", Explanation: "35427" is already odd, so we return it.

```javascript
//Approach 1: Greedy Search from the End

/**
 * Finds the largest odd substring in a number string.
 * @param {string} num - The input number as a string
 * @return {string} - The largest odd substring or empty string
 */
function largestOddNumberFromEnd(num) {
  // Iterate from the end of the string towards the beginning
  for (let i = num.length - 1; i >= 0; i--) {
    // Check if the current digit is odd
    if (parseInt(num[i]) % 2 !== 0) {
      // Return the substring from start to current index (inclusive)
      return num.substring(0, i + 1);
    }
  }
  // If no odd digit found, return empty string
  return "";
}
```

# 14. Longest Common Prefix --4

92 of 167 PASSED
MISSING EDGE CASES

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 1) return strs[0];

  let res = "";
  let prev = strs[0];

  for (let i = 1; i < strs.length; i++) {
    let curr = strs[i];
    let j = 0;

    while (j < curr?.length) {
      if (prev[j] !== curr[[j]]) {
        res = curr.substring(0, j);
        break;
      }
      j++;
    }
  }

  return res;
};
```

```javascript
//Approach 1: Horizontal Scanning
/**
 * Finds the longest common prefix by comparing each string with the current prefix
 * @param {string[]} stringsArray - Array of strings to compare
 * @return {string} - Longest common prefix
 */
function longestCommonPrefixHorizontal(stringsArray) {
  if (stringsArray.length === 0) return "";

  // Start with the first string as the initial prefix
  let prefix = stringsArray[0];

  // Compare the current prefix with each subsequent string
  for (let i = 1; i < stringsArray.length; i++) {
    const currentString = stringsArray[i];
    let j = 0;

    // Find the matching characters between prefix and current string
    while (
      j < prefix.length &&
      j < currentString.length &&
      prefix[j] === currentString[j]
    ) {
      j++;
    }

    // Update the prefix to the common part
    prefix = prefix.slice(0, j);

    // If prefix becomes empty, no common prefix exists
    if (prefix === "") break;
  }

  return prefix;
}
```

# 242. Valid Anagram --5

Given two strings s and t, return true if t is an anagram of s and false otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

- Example 1: Input: s = "anagram", t = "nagaram" Output: true
- Example 2: Input: s = "rat", t = "car", Output: false

```javascript
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
```

---

# 49. Group Anagrams

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

Example 1: Input: strs = ["eat","tea","tan","ate","nat","bat"]nOutput: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:
There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const fMap = new Map();
  const res = [];
  for (let item of strs) {
    const key = item.split("").sort().join("");
    if (fMap.has(key)) {
      fMap.get(key).push(item);
    } else {
      fMap.set(key, [item]);
    }
  }
  for (let [key, value] of fMap) {
    res.push(value);
  }
  return res;
};
```

---

# AUG 5th

# 205. Isomorphic Strings --1

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t` with the following rules:

1. **Preservation of Order**: The order of characters must remain the same.
2. **Consistent Mapping Rule**:

- **Every occurrence of a character in `s` must be replaced with the same character in `t`**:

  This means if a character `x` in `s` is mapped to `y` in `t`, then **all** occurrences of `x` in `s` must be replaced with `y` in `t`. You cannot map the same character in `s` to different characters in `t`.

**Example**:

- Let `s = "egg"` and `t = "add"`.

1. First character: `e` in `s` maps to `'a'` in `t`.
2. Second character: `'g'` in `s` maps to `'d'` in `t`.
3. Third character: `'g'` in `s` maps to `'d'` in `t` (same as the second character).

**Check for Consistent Mapping**:

- `e` in `s` always maps to `'a'` in `t` (only one occurrence, so trivially consistent).
- `'g'` in `s` appears twice, and both times it maps to `'d'` in `t`. This is consistent.

**Conclusion**: The strings `"egg"` and `"add"` are **isomorphic** because the mapping is consistent.

**Example**:

- Let `s = "foo"` and `t = "bar"`.

1. First character: `'f'` in `s` maps to `'b'` in `t`.
2. Second character: `'o'` in `s` maps to `'a'` in `t`.
3. Third character: `'o'` in `s` maps to `'r'` in `t`.

**Problem**:

- The character `'o'` in `s` is mapped to `'a'` in the second position but to `'r'` in the third position. This violates the **consistent mapping rule** because `'o'` cannot map to two different characters (`'a'` and `'r'`) in `t`.

**Conclusion**: The strings `"foo"` and `"bar"` are **not isomorphic** because the mapping is inconsistent.

3. **Bijective Mapping Rule**:

- **No two characters in `s` can map to the same character in `t`**:

This means each character in `t` must be uniquely mapped from a character in `s`. In other words, if `'a'` in `s` maps to `x` in `t`, then no other character in `s` (like `'b'`) can also map to `x` in `t`.

- **Vice versa**: Similarly, no two characters in `t` can map to the same character in `s`. If `x` in `t` maps back to `'a'` in `s`, then no other character in `t` (like `y`) can map back to `'a'` in `s`.

**Example**:

- Let `s = "badc"` and `t = "baba"`.

1. `'b'` in `s` maps to `'b'` in `t`.
2. `'a'` in `s` maps to `'a'` in `t`.
3. `'d'` in `s` maps to `'b'` in `t`.
4. `'c'` in `s` maps to `'a'` in `t`.

**Violation of Bijective Mapping**:

- Here, `'b'` in `t` is being mapped by both `'b'` and `'d'` from `s`. This violates the rule that no two characters in `s` can map to the same character in `t`.
- Similarly, `'a'` in `t` is being mapped by both `'a'` and `'c'` from `s`, which is also a violation.

**Conclusion**: The strings `"badc"` and `"baba"` are **not isomorphic** because the mapping is not bijective.

**Example**:

- Let `s = "paper"` and `t = "title"`.

**Mapping**:

1. `'p'` in `s` maps to `'t'` in `t`.
2. `'a'` in `s` maps to `'i'` in `t`.
3. `'p'` in `s` maps to `'t'` in `t` (consistent with previous mapping).
4. `e` in `s` maps to `'l'` in `t`.
5. `'r'` in `s` maps to `e` in `t`.

**Check for Bijective Mapping**:

- Each character in `s` maps to a unique character in `t`:
  - `'p'` → `'t'`
  - `'a'` → `'i'`
  - `e` → `'l'`
  - `'r'` → `e`
- No two characters in `s` map to the same character in `t`:
  - `'p'` and `'a'` map to `'t'` and `'i'` respectively (unique).
  - `e` and `'r'` map to `'l'` and `e` respectively (unique).
- Similarly, no two characters in `t` map to the same character in `s`:
  - `'t'` in `t` maps back to `'p'` in `s`.
  - `'i'` in `t` maps back to `'a'` in `s`.
  - `'l'` in `t` maps back to `e` in `s`.
  - `e` in `t` maps back to `'r'` in `s`.

**Conclusion**: The strings `"paper"` and `"title"` are **isomorphic** because the mapping is bijective.

### Key Takeaway

For two strings to be isomorphic, the mapping between their characters must be **one-to-one and onto** (bijective). This ensures that:

1. Every character in `s` maps to exactly one unique character in `t`.
2. Every character in `t` is mapped by exactly one unique character in `s`.

This prevents any overlaps or conflicts in the mappings, ensuring the strings can be perfectly transformed into each other by character replacements.

### Approach 1: Two Hash Maps (Bijective Mapping Check)

- **Intuition**: We need to ensure that each character in `s` maps to exactly one character in `t` and vice versa.
- **Steps**:
  1. If lengths of `s` and `t` are different, return `false`.
  2. Create two maps: `sToT` (maps characters from `s` to `t`) and `tToS` (maps characters from `t` to `s`).
  3. Iterate through each character in `s` and `t` simultaneously:
     - If `s[i]` is in `sToT` but `sToT[s[i]] !== t[i]`, return `false`.
     - If `t[i]` is in `tToS` but `tToS[t[i]] !== s[i]`, return `false`.
     - Otherwise, add mappings `sToT[s[i]] = t[i]` and `tToS[t[i]] = s[i]`.
  4. If loop completes, return `true`.

```javascript
/**
 * Determines if two strings are isomorphic using two hash maps.
 * @param {string} s - The first string.
 * @param {string} t - The second string.
 * @return {boolean} - True if isomorphic, false otherwise.
 */
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map(); // Maps characters from s to t
  const tToS = new Map(); // Maps characters from t to s

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // Check if charS is already mapped to a different charT
    if (sToT.has(charS)) {
      if (sToT.get(charS) !== charT) {
        return false;
      }
    } else {
      sToT.set(charS, charT);
    }

    // Check if charT is already mapped to a different charS
    if (tToS.has(charT)) {
      if (tToS.get(charT) !== charS) {
        return false;
      }
    } else {
      tToS.set(charT, charS);
    }
  }

  return true;
}
```

- **Time Complexity**: O(n), where n is the length of the strings. We iterate through each character once.
- **Space Complexity**: O(1) or O(min(m, n)), where m is the size of the character set (ASCII has 256 characters, so O(1)).

---

# 796. Rotate String --2

The problem requires us to determine if one string (`s`) can be transformed into another string (`goal`) by performing a series of shifts. A shift is defined as moving the leftmost character of `s` to the rightmost position. For example, shifting "abcde" once results in "bcdea", and shifting it again results in "cdeab", and so on.

## Intuition

To check if `s` can become `goal` after some number of shifts, we can consider the following:

1. If `s` and `goal` are of different lengths, it's impossible to make them equal through shifts, so we can immediately return `false`.
2. If we concatenate `s` with itself (`s + s`), the resulting string will contain all possible shifted versions of `s` as substrings. For example, if `s = "abcde"`, then `s + s = "abcdeabcde"`, which includes "bcdea", "cdeab", etc., as substrings.
3. Therefore, if `goal` is a substring of `s + s`, then `s` can be shifted to become `goal`; otherwise, it cannot.

## Concatenation and Substring Check approach:

- Check if the lengths of `s` and `goal` are the same. If not, return `false`.
- Concatenate `s` with itself and check if `goal` is a substring of this concatenated string.
- This approach leverages the fact that all possible shifts of `s` are contained within `s + s`.

```javascript
/**
 * Check if string `s` can become `goal` after some number of shifts.
 * @param {string} s - The original string.
 * @param {string} goal - The target string.
 * @return {boolean} - True if `s` can become `goal` via shifts, false otherwise.
 */
function canBecomeGoal(s, goal) {
  // If lengths are different, it's impossible
  if (s.length !== goal.length) {
    return false;
  }
  // Concatenate s with itself and check if goal is a substring
  const concatenated = s + s;
  return concatenated.includes(goal);
}
```

- **Time Complexity**: O(n), because `includes` is O(n) for each character, and we do this for each of the n characters.
- **Space Complexity**: O(n)

## Approach 1: Using Modular Arithmetic -partially similar to the right rotate array

```javascript
/**
 * Checks if string s can become goal after some number of left-to-right shifts.
 * A shift moves the leftmost character to the rightmost position.
 * @param {string} s - The original string.
 * @param {string} goal - The target string to match.
 * @return {boolean} - True if s can become goal after some shifts, false otherwise.
 */
var rotateString = function (s, goal) {
  if (s.length !== goal.length) return false; // Early exit if lengths differ.

  for (let rotation = 0; rotation < s.length; rotation++) {
    let matchedChars = 0;
    // Compare s with goal rotated by 'rotation' positions.
    while (
      matchedChars < s.length &&
      s[matchedChars] === goal[(matchedChars + rotation) % s.length]
    ) {
      matchedChars++;
    }
    if (matchedChars === s.length) return true; // All characters matched.
  }
  return false; // No rotation matched.
};
```

**Time Complexity**: O(n^2)

### **Dry Run 1: `s = "abcde"`, `goal = "cdeab"`**

**Goal:** Check if rotating `"abcde"` can become `"cdeab"`.

#### **Step-by-Step Execution:**

1. **Initial Check:** - Lengths of `s` (`5`) and `goal` (`5`) are equal → Proceed.

2. **Rotation `i = 0`:** - Compare `s[0]` (`'a'`) with `goal[(0 + 0) % 5]` (`goal[0] = 'c'`).

   - `'a' === 'c'`? **No** → Break inner loop, try next rotation.

3. **Rotation `i = 1`:**

   - Compare `s[0]` (`'a'`) with `goal[(0 + 1) % 5]` (`goal[1] = 'd'`).
     - `'a' === 'd'`? **No** → Break inner loop, try next rotation.

4. **Rotation `i = 2`:**

   - Compare `s[0]` (`'a'`) with `goal[(0 + 2) % 5]` (`goal[2] = 'e'`).
     - `'a' === 'e'`? **No** → Break inner loop, try next rotation.

5. **Rotation `i = 3`:**
   - Compare `s[0]` (`'a'`) with `goal[(0 + 3) % 5]` (`goal[3] = 'a'`).
     - `'a' === 'a'`? **Yes** → Move to next character (`matchedChars = 1`).
   - Compare `s[1]` (`'b'`) with `goal[(1 + 3) % 5]` (`goal[4] = 'b'`).
     - `'b' === 'b'`? **Yes** → Move to next character (`matchedChars = 2`).
   - Compare `s[2]` (`'c'`) with `goal[(2 + 3) % 5]` (`goal[0] = 'c'`).
     - `'c' === 'c'`? **Yes** → Move to next character (`matchedChars = 3`).
   - Compare `s[3]` (`'d'`) with `goal[(3 + 3) % 5]` (`goal[1] = 'd'`).
     - `'d' === 'd'`? **Yes** → Move to next character (`matchedChars = 4`).
   - Compare `s[4]` (`'e'`) with `goal[(4 + 3) % 5]` (`goal[2] = 'e'`).
     - `'e' === 'e'`? **Yes** → `matchedChars = 5` (equal to `s.length`).
   - **All characters matched for `i = 3`** → Return `true`.

---

# 451. Sort Characters By Frequency --3

Given a string `s`, sort it in decreasing order based on the frequency of the characters.
The frequency of a character is the number of times it appears in the string.
Sort the characters in descending order by frequency.Return the sorted string.

Note: It is guaranteed that the answer is unique.

- Example 1: Input: s = `tree` Output: `eert` Explanation: `e` appears twice while `t` and `r` both appear once. So `e` must appear before both `t` and `r`.
- Example 2: Input: s = `cccaaa` Output: `aaaccc` Explanation: `c` appears three times while `a` appears twice. So `c` must appear before `a` in the result.

## Approach: 1-Using Array and Custom Sorting

```javascript
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
```

---

# 1614. Maximum Nesting Depth of the Parentheses --4

Given a valid parentheses string s, return the nesting depth of s. The nesting depth is the maximum number of nested parentheses.

- Example 1: Input: s = `(1+(2*3)+((8)/4))+1` Output: 3, Explanation: Digit 8 is inside of 3 nested parentheses in the string.

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let balance = 0;
  let max = -Infinity;

  for (let ch of s) {
    if (ch === "(") {
      balance += 1;
    } else if (ch === ")") {
      balance -= 1;
    }
    max = Math.max(max, balance);
  }
  return max;
};
```

---

# 13. Roman to Integer --5

```javascript
/**
 * Converts Roman numerals to integer using left-to-right approach
 * @param {string} s - Roman numeral string
 * @return {number} - Converted integer
 */
function romanToInt(s) {
  // Create a mapping of Roman numeral characters to their values
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0; // Initialize the total value

  // Loop through each character in the string from left to right
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanValues[s[i]]; // Get value of current character
    const nextValue = romanValues[s[i + 1]]; // Get value of next character

    // Check if subtraction case exists (current value < next value)
    if (nextValue > currentValue) {
      // Add the difference (nextValue - currentValue) to total
      total += nextValue - currentValue;
      i++; // Skip the next character since we've already processed it
    } else {
      // Normal case: add current value to total
      total += currentValue;
    }
  }

  return total; // Return the computed total
}
```

**Time Complexity:** O(n) - We traverse the string once
**Space Complexity:** O(1) - We use constant space for the value mapping

### Example 3: "MCMXCIV" (Edge case with all subtraction combinations)

1. i=6: 'V' (5), prev=0 → add 5 (total=5)
2. i=5: 'I' (1), prev=5 → subtract 1 (total=4)
3. i=4: 'C' (100), prev=1 → add 100 (total=104)
4. i=3: 'X' (10), prev=100 → subtract 10 (total=94)
5. i=2: 'M' (1000), prev=10 → add 1000 (total=1094)
6. i=1: 'C' (100), prev=1000 → subtract 100 (total=994)
7. i=0: 'M' (1000), prev=100 → add 1000 (total=1994)
   Result: 1994

---

# 12. Integer to Roman --6

The goal is to convert a positive integer into a Roman numeral string based on the given rules.
Roman numerals are constructed by processing the decimal place values (thousands, hundreds, tens, units) from `highest to lowest`, converting each into the appropriate symbols `(M, D, C, L, X, V, I)` while respecting the subtractive notation (e.g., IV for 4, IX for 9) and the rule against repeating certain symbols more than three times.

## Intuition

The problem requires converting a decimal number to a Roman numeral following specific rules. Roman numerals are constructed by combining letters from a fixed set where each letter represents a specific value. The key challenges are:

1. Handling subtractive combinations (like IV for 4 or IX for 9)
2. Ensuring symbols aren't repeated more than allowed (max 3 for I, X, C, M)
3. Building the numeral from largest to smallest value

```javascript
function intToRoman(num) {
  // Create an array of value-symbol pairs in descending order
  // This includes both regular symbols and subtractive combinations
  const valueSymbols = [
    [1000, "M"], // 1000 -> M
    [900, "CM"], // 900 -> CM (subtractive)
    [500, "D"], // 500 -> D
    [400, "CD"], // 400 -> CD (subtractive)
    [100, "C"], // 100 -> C
    [90, "XC"], // 90 -> XC (subtractive)
    [50, "L"], // 50 -> L
    [40, "XL"], // 40 -> XL (subtractive)
    [10, "X"], // 10 -> X
    [9, "IX"], // 9 -> IX (subtractive)
    [5, "V"], // 5 -> V
    [4, "IV"], // 4 -> IV (subtractive)
    [1, "I"], // 1 -> I
  ];

  let roman = ""; // Initialize the result string

  // Iterate through each value-symbol pair
  for (const [value, symbol] of valueSymbols) {
    // While the current number is greater than or equal to the current value
    while (num >= value) {
      roman += symbol; // Append the symbol to the result
      num -= value; // Subtract the value from the number
    }
    // Early exit if we've reduced the number to zero
    if (num === 0) break;
  }

  return roman; // Return the constructed Roman numeral
}
```

## Dry Run Examples

### Example 1: 3749

1. Greedy Approach:

   - 3749 >= 1000: 'M', num = 2749
   - 2749 >= 1000: 'MM', num = 1749
   - 1749 >= 1000: 'MMM', num = 749
   - 749 >= 500: 'MMMD', num = 249
   - 249 >= 100: 'MMMDC', num = 149
   - 149 >= 100: 'MMMDCC', num = 49
   - 49 >= 40: 'MMMDCCXL', num = 9
   - 9 >= 9: 'MMMDCCXLIX', num = 0
   - Result: "MMMDCCXLIX"

---

# Aug 6th

# 8. String to Integer (atoi) --1

Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

- **Whitespace**: Ignore any leading whitespace (" ").
- **Signedness**: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
- **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
- **Rounding**: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
  Return the integer as the final result.

**Example** 1:Input: s = "42" Output: 42

Explanation:
The underlined characters are what is read in and the caret is the current reader position.

- Step 1: "42" (no characters read because there is no leading whitespace)
- Step 2: "42" (no characters read because there is neither a '-' nor '+')
- Step 3: "42" ("42" is read in)

**Example** 2: Input: s = " -042" Output: -42

Explanation:

- Step 1: " -042" (leading whitespace is read and ignored)
- Step 2: " -042" ('-' is read, so the result should be negative)
- Step 3: " -042" ("042" is read in, leading zeros ignored in the result)

**Example** 3: Input: s = "1337c0d3" Output: 1337

Explanation:

- Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
- Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
- Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)

**Example** 4: Input: s = "0-1" Output: 0

Explanation:

- Step 1: "0-1" (no characters read because there is no leading whitespace)
- Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
- Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)

**Example** 5: Input: s = "words and 987", Output: 0

Explanation:
Reading stops at the first non-digit character 'w'.

**Constraints:**

- 0 <= s.length <= 200
- s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.

LESS RELEVANT IN JAVASCRIPT

```javascript
/**
 * Converts a string to a 32-bit signed integer using parseInt.
 * @param {string} s - Input string
 * @return {number} - Converted integer
 */
function myAtoiParseInt(s) {
  // Define 32-bit integer boundaries
  const INT_MAX = 2 ** 31 - 1; // 2147483647
  const INT_MIN = -(2 ** 31); // -2147483648

  // Trim leading whitespace
  s = s.trim();

  // If empty after trimming, return 0
  if (!s) return 0;

  // Use parseInt to extract number
  const num = parseInt(s, 10);

  // Check if result is NaN (invalid number)
  if (isNaN(num)) return 0;

  // Handle overflow
  if (num > INT_MAX) return INT_MAX;
  if (num < INT_MIN) return INT_MIN;

  return num;
}
```

---

# Count no of substrings --2

https:www.geeksforgeeks.org/number-substrings-string/

Find total number of `non-empty` substrings of a string with `N` characters.

- Input : str = “abc”, Output : 6
  Every substring of the given string : “a”, “b”, “c”, “ab”, “bc”, “abc”

- Input : str = “abcd”, Output : 10
  Every substring of the given string : “a”, “b”, “c”, “d”, “ab”, “bc”, “cd”, “abc”, “bcd” and “abcd”

**Intuition:**

- Count of non-empty substrings is `n*(n+1)/2`
- If we include empty string also as substring, the count becomes `n*(n+1)/2 + 1`

**How does above formula work?**

- Number of substrings of length one is n (We can choose any of the n characters)
- Number of substrings of length two is n-1 (We can choose any of the n-1 pairs formed by adjacent)
- Number of substrings of length three is n-2
  (We can choose any of the n-2 triplets formed by adjacent)
  In general, number of substrings of length k is `n-k+1` where `1 <= k <= n`

```javascript
function countNonEmptySubstr(str) {
  let n = str.length;
  return (n * (n + 1)) / 2;
}

countNonEmptySubstr("abcd"); // 10

//generate all substrings of a string
function generateAllSubstrings(str) {
  let substrings = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.substring(i, j));
    }
  }
  return substrings;
}
console.log(generateAllSubstrings("abc")); // ["a", "ab", "abc", "b", "bc", "c"]
```

---

# 1781. Sum of Beauty of All Substrings --3

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

# LC 5. Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.

Example 1: Input: s = "babad", Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2: Input: s = "cbbd", Output: "bb"

Constraints: 1 <= s.length <= 1000,s consist of only digits and English letters.

```javascript
//1. Brute Force Approach
/**
 * Finds the longest palindromic substring using brute force
 * @param {string} s - Input string
 * @return {string} - Longest palindromic substring
 */
function longestPalindromeBruteForce(s) {
  if (s.length < 2) return s;

  let longest = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const substring = s.slice(i, j);
      if (isPalindrome(substring) && substring.length > longest.length) {
        longest = substring;
      }
    }
  }

  return longest;
}

/**
 * Helper function to check if a string is a palindrome
 * @param {string} str - String to check
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}
```

---
