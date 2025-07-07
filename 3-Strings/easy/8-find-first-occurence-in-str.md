# 28. Find the Index of the First Occurrence in a String

# Finding the First Occurrence of a Needle in a Haystack

## Problem Understanding

We need to find the starting index of the first occurrence of the `needle` string in the `haystack` string. If the `needle` is not found, we return -1.

## Intuition

The straightforward approach is to check every possible starting position in the `haystack` where the `needle` could fit, and compare the substring at that position with the `needle`.

## Approaches

### 1. Brute Force (Naive) Approach

- Check every possible starting index in `haystack`
- For each index, compare the substring of `haystack` starting at that index with `needle`
- Return the first matching index

### 2. Using String Methods (Built-in)

- JavaScript provides built-in methods like `indexOf()` that can solve this directly

### 3. Knuth-Morris-Pratt (KMP) Algorithm (Optimal for large inputs)

- Preprocess the `needle` to create a partial match table (failure function)
- Use this table to skip unnecessary comparisons in the `haystack`

## Solution Code

### Approach 1: Brute Force

```javascript
/**
 * Finds the first occurrence of needle in haystack using brute force
 * @param {string} haystack The string to search in
 * @param {string} needle The string to search for
 * @return {number} Index of first occurrence or -1 if not found
 */
function strStrBruteForce(haystack, needle) {
  const haystackLength = haystack.length;
  const needleLength = needle.length;

  // Edge case: needle is empty string
  if (needleLength === 0) return 0;

  // Only need to check up to this index in haystack
  for (let i = 0; i <= haystackLength - needleLength; i++) {
    let j;
    // Compare each character of needle with haystack starting at i
    for (j = 0; j < needleLength; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }
    }
    // If we matched all characters of needle
    if (j === needleLength) {
      return i;
    }
  }

  return -1;
}

// Time Complexity: O((n-m)*m) where n is haystack length, m is needle length
// Space Complexity: O(1)
```

### Approach 2: Using Built-in String Method

```javascript
/**
 * Finds the first occurrence of needle in haystack using built-in method
 * @param {string} haystack The string to search in
 * @param {string} needle The string to search for
 * @return {number} Index of first occurrence or -1 if not found
 */
function strStrBuiltIn(haystack, needle) {
  return haystack.indexOf(needle);
}

// Time Complexity: Browser/engine dependent, typically O(n)
// Space Complexity: O(1)
```

### Approach 3: KMP Algorithm (Optimal)

```javascript
/**
 * Finds the first occurrence of needle in haystack using KMP algorithm
 * @param {string} haystack The string to search in
 * @param {string} needle The string to search for
 * @return {number} Index of first occurrence or -1 if not found
 */
function strStrKMP(haystack, needle) {
  const haystackLength = haystack.length;
  const needleLength = needle.length;

  if (needleLength === 0) return 0;
  if (haystackLength < needleLength) return -1;

  // Preprocess the needle to create the partial match table
  const lps = computeLPSArray(needle);

  let haystackIndex = 0;
  let needleIndex = 0;

  while (haystackIndex < haystackLength) {
    if (haystack[haystackIndex] === needle[needleIndex]) {
      haystackIndex++;
      needleIndex++;

      if (needleIndex === needleLength) {
        return haystackIndex - needleIndex;
      }
    } else {
      if (needleIndex !== 0) {
        needleIndex = lps[needleIndex - 1];
      } else {
        haystackIndex++;
      }
    }
  }

  return -1;
}

/**
 * Computes the longest prefix suffix (LPS) array for the KMP algorithm
 * @param {string} pattern The needle string
 * @return {number[]} The LPS array
 */
function computeLPSArray(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
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

  return lps;
}

// Time Complexity: O(n + m) where n is haystack length, m is needle length
// Space Complexity: O(m) for the LPS table
```

## Dry Run of KMP Approach

### Example 1: Basic Case

**Input:** haystack = "sadbutsad", needle = "sad"

1. Compute LPS for "sad":
   - "s": [0]
   - "a": [0,0]
   - "d": [0,0,0]
2. Search:
   - Match at i=0, j=0 (s)
   - Match at i=1, j=1 (a)
   - Match at i=2, j=2 (d)
   - j=3 equals needle length → return 0

**Output:** 0

### Example 2: No Match

**Input:** haystack = "leetcode", needle = "leeto"

1. Compute LPS for "leeto":
   - "l": [0]
   - "e": [0,0]
   - "e": [0,0,1]
   - "t": [0,0,1,0]
   - "o": [0,0,1,0,0]
2. Search:
   - Match "l", "e", "e" (i=0,1,2)
   - Mismatch at t vs d (i=3, j=3)
   - j falls back to lps[2]=1
   - Continue comparing but no full match found

**Output:** -1

### Example 3: Edge Case (Empty Needle)

**Input:** haystack = "anything", needle = ""

1. Needle length is 0 → return 0 immediately

**Output:** 0

### Example 4: Needle Longer Than Haystack

**Input:** haystack = "short", needle = "longer"

1. Immediately return -1 since needle can't fit

**Output:** -1

## Conclusion

- For most practical purposes in JavaScript, the built-in `indexOf()` is sufficient and optimized
- The brute force approach is simple but has worst-case O(n\*m) complexity
- KMP is optimal with O(n+m) complexity but has more complex implementation
- Choice depends on use case - for coding interviews, understanding KMP is valuable, but for production, built-in methods are preferred
