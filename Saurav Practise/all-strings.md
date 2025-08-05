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
