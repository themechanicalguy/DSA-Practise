# LC-131 Palindrome Partitioning

## Problem Understanding

Given a string s, partition it such that every substring in the partition is a palindrome. Return all possible palindrome partitionings of s. A palindrome is a string that reads the same forward and backward.
Example 1:
Input: s = "aab"

Output: [["a","a","b"],["aa","b"]]

## Intuition

**Problem Nature:** This is a combinatorial problem where we need to find all possible ways to split the string into substrings, each of which must be a palindrome.

**Backtracking:** For each position in the string, we can try different substrings starting from that position, check if they are palindromes, and recursively partition the remaining string. This naturally fits a backtracking approach.

**Palindrome Check:** A substring is a palindrome if it reads the same forward and backward. We can check this by comparing characters from both ends.

**Constraints:**

- The string s can be of any length (including empty, though typically non-empty in practice).
- Each substring in a partition must be a palindrome.
- The output should contain all possible partitionings, with no duplicates.

**Base Case:** When we’ve processed the entire string (reached the end), the current partition is complete and added to the result.

**Edge Cases:**

- Empty string: Returns [[]] (an empty partition).
- Single character: Returns [[s]] (a single palindrome).

## Approaches

**Palindrome Check Function:** Create a helper function to check if a substring is a palindrome.

**Backtracking:**

- Track the current position in the string and the current partition being built.
- For each position, try all possible substrings starting from that position.
- If a substring is a palindrome, include it in the partition and recurse on the remaining string.
- When the entire string is processed, add the partition to the result.

**Handle Edge Cases:** Return [[]] for an empty string.

We’ll explore three approaches in JavaScript:

- **Backtracking (Immutability):** Create new arrays for each recursive call, avoiding pop.
- **Backtracking (Mutable):** Use push and pop for efficiency.
- **Backtracking with Memoized Palindrome Check:** Optimize palindrome checks using memoization to avoid redundant computations.

### Approach 1: Backtracking (Immutability, No pop)

```javascript
/**
 * Returns all possible palindrome partitionings of a string.
 * @param {string} s - Input string
 * @return {string[][]} - Array of all possible palindrome partitions
 */
function partition(s) {
  // Handle empty string
  if (!s) return [[]];

  // Store all valid partitions
  const result = [];

  /**
   * Checks if a substring from start to end is a palindrome
   * @param {string} str - Input string
   * @param {number} start - Start index
   * @param {number} end - End index
   * @return {boolean} - True if substring is a palindrome
   */
  function isPalindrome(str, start, end) {
    while (start < end) {
      if (str[start] !== str[end]) return false;
      start++;
      end--;
    }
    return true;
  }

  /**
   * Recursive helper function using backtracking
   * @param {number} start - Starting index in string
   * @param {string[]} currentPartition - Current partition
   */
  function backtrack(start, currentPartition) {
    // Base case: if start reaches end of string, add partition to result
    if (start >= s.length) {
      result.push([...currentPartition]);
      return;
    }

    // Try all possible substrings starting from 'start'
    for (let end = start; end < s.length; end++) {
      // Check if substring s[start...end] is a palindrome
      if (isPalindrome(s, start, end)) {
        // Include palindrome substring in partition
        const palindrome = s.slice(start, end + 1);
        // Recurse with next index and updated partition
        backtrack(end + 1, [...currentPartition, palindrome]);
      }
    }
  }

  // Start backtracking from index 0
  backtrack(0, []);
  return result;
}
```

### Approach 2: Backtracking (Mutable, Using pop)

```javascript
/**
 * Returns all possible palindrome partitionings of a string.
 * @param {string} s - Input string
 * @return {string[][]} - Array of all possible palindrome partitions
 */
function partition(s) {
  // Handle empty string
  if (!s) return [[]];

  // Store all valid partitions
  const result = [];

  /**
   * Checks if a substring from start to end is a palindrome
   * @param {string} str - Input string
   * @param {number} start - Start index
   * @param {number} end - End index
   * @return {boolean} - True if substring is a palindrome
   */
  function isPalindrome(str, start, end) {
    while (start < end) {
      if (str[start] !== str[end]) return false;
      start++;
      end--;
    }
    return true;
  }

  /**
   * Recursive helper function using backtracking with mutation
   * @param {number} start - Starting index in string
   * @param {string[]} currentPartition - Current partition
   */
  function backtrack(start, currentPartition) {
    // Base case: if start reaches end of string, add partition to result
    if (start >= s.length) {
      result.push([...currentPartition]);
      return;
    }

    // Try all possible substrings starting from 'start'
    for (let end = start; end < s.length; end++) {
      // Check if substring s[start...end] is a palindrome
      if (isPalindrome(s, start, end)) {
        // Include palindrome substring
        currentPartition.push(s.slice(start, end + 1));
        // Recurse with next index
        backtrack(end + 1, currentPartition);
        // Backtrack by removing substring
        currentPartition.pop();
      }
    }
  }

  // Start backtracking from index 0
  backtrack(0, []);
  return result;
}
```

### Approach 3: Backtracking with Memoized Palindrome Check

```javascript
/**
 * Returns all possible palindrome partitionings of a string with memoized palindrome check.
 * @param {string} s - Input string
 * @return {string[][]} - Array of all possible palindrome partitions
 */
function partition(s) {
  // Handle empty string
  if (!s) return [[]];

  // Store all valid partitions
  const result = [];
  // Memoization cache for palindrome checks
  const memo = new Array(s.length).fill().map(() => new Array(s.length));

  /**
   * Checks if a substring from start to end is a palindrome with memoization
   * @param {string} str - Input string
   * @param {number} start - Start index
   * @param {number} end - End index
   * @return {boolean} - True if substring is a palindrome
   */
  function isPalindrome(str, start, end) {
    if (memo[start][end] !== undefined) return memo[start][end];
    while (start < end) {
      if (str[start] !== str[end]) {
        memo[start][end] = false;
        return false;
      }
      start++;
      end--;
    }
    memo[start][end] = true;
    return true;
  }

  /**
   * Recursive helper function using backtracking
   * @param {number} start - Starting index in string
   * @param {string[]} currentPartition - Current partition
   */
  function backtrack(start, currentPartition) {
    // Base case: if start reaches end of string, add partition to result
    if (start >= s.length) {
      result.push([...currentPartition]);
      return;
    }

    // Try all possible substrings starting from 'start'
    for (let end = start; end < s.length; end++) {
      // Check if substring s[start...end] is a palindrome
      if (isPalindrome(s, start, end)) {
        // Include palindrome substring
        const palindrome = s.slice(start, end + 1);
        // Recurse with next index
        backtrack(end + 1, [...currentPartition, palindrome]);
      }
    }
  }

  // Start backtracking from index 0
  backtrack(0, []);
  return result;
}
```

## Complexity Analysis

### Approach 1: Basic Backtracking

- Time Complexity: O(n \* 2^n) - In the worst case, there could be 2^n possible partitions (each character can be a split point or not), and for each partition, we check if it's a palindrome in O(n) time.
- Space Complexity: O(n) - For the recursion stack (depth of recursion tree).

### Approach 2: Backtracking with Memoization

- Time Complexity: O(n \* 2^n) - Same as approach 1, but with some optimizations from memoization.
- Space Complexity: O(n^2) - Additional space for memoization cache.

### Approach 3: DP Table + Backtracking

- Time Complexity: O(n \* 2^n) - The DP table takes O(n^2) to build, but the main complexity comes from the backtracking.
- Space Complexity: O(n^2) - For storing the DP table.

## Dry Run with Examples

### Example 1: "aab"

1. Start with empty partition
2. First level:
   - "a" is palindrome → recurse with "ab"
     - "a" is palindrome → recurse with "b"
       - "b" is palindrome → add ["a","a","b"] to result
     - "ab" not palindrome → skip
   - "aa" is palindrome → recurse with "b"
     - "b" is palindrome → add ["aa","b"] to result
   - "aab" not palindrome → skip
     Final result: [["a","a","b"], ["aa","b"]]

### Example 2: "a"

1. Only one character:
   - "a" is palindrome → add ["a"] to result
     Final result: [["a"]]

### Example 3: "abc" (no palindromes except single letters)

1. Only possible partition is ["a","b","c"]
   Final result: [["a","b","c"]]

### Edge Case: Empty string

Input: ""
Output: [[]] (one partition with empty list)

The DP approach is generally the most efficient for larger strings since it optimizes palindrome checking, though all approaches have the same worst-case time complexity due to the nature of the problem (exponential number of possible partitions).
