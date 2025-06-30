# Word Break Problem Solution

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.
Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

## Intuition

The problem is about checking if a string can be broken down into valid words from a dictionary. This is a classic problem that can be approached by breaking the string into smaller substrings and checking if each substring is a valid dictionary word. The key is to ensure that the entire string can be constructed by concatenating these dictionary words.

Here’s the intuition behind the approaches:

- **Recursive Approach (Brute Force):**

  - Try every possible prefix of the string that matches a dictionary word.
  - If a prefix matches, recursively check the remaining suffix.
  - This approach checks all possible segmentations but can be inefficient due to overlapping subproblems.

- **Memoization (Top-Down Dynamic Programming):**

  - To optimize the recursive approach, store results of subproblems to avoid redundant computations.
  - Use a memoization cache to store whether a substring starting at a given index can be segmented.

- **Dynamic Programming (Bottom-Up):**

  - Build a solution iteratively by checking if each substring from the start can be segmented.
  - Use a boolean array dp where dp[i] indicates whether the substring s[0:i] can be segmented.
  - This avoids recursion and is typically more space-efficient.

- **Trie-Based Approach:**
  - Construct a trie from the dictionary words for efficient prefix matching.
  - Use dynamic programming or recursion to traverse the string and check for valid words using the trie.
  - This is useful when dictionary lookups need to be optimized, especially for large dictionaries.

The dynamic programming approach (bottom-up) is generally the most efficient for this problem, as it avoids the overhead of recursion and has straightforward iteration. However, I’ll implement all approaches to provide a comprehensive understanding.

### 1. Recursive Approach (Brute Force)

**Intuition**: Try every possible prefix of the string. If the prefix is in the dictionary, recursively check if the remaining suffix can be segmented.

**Problem**: This leads to exponential time complexity due to repeated computations of the same subproblems.

```javascript
function wordBreakRecursive(s, wordDict) {
  const wordSet = new Set(wordDict);

  function canSegment(start) {
    if (start === s.length) return true;

    for (let end = start + 1; end <= s.length; end++) {
      const prefix = s.substring(start, end);
      if (wordSet.has(prefix) && canSegment(end)) {
        return true;
      }
    }
    return false;
  }

  return canSegment(0);
}

// Time Complexity: O(2^n) - Worst case where all combinations are checked
// Space Complexity: O(n) - Recursion stack depth
```

### 2. Memoization (Top-Down DP)

**Intuition**: Store results of subproblems to avoid recomputation.
We use a memo table to remember whether a substring starting at a certain index can be segmented.

```javascript
/**
 * Checks if string s can be segmented into words from wordDict using memoization.
 * @param {string} s - The input string.
 * @param {string[]} wordDict - Array of dictionary words.
 * @returns {boolean} - True if s can be segmented, false otherwise.
 */
function wordBreakMemo(s, wordDict) {
  const wordSet = new Set(wordDict);
  // Memoization cache to store results for each starting index
  const memo = new Map();

  /**
   * Helper function to check if string starting at index can be segmented.
   * @param {number} start - Starting index of the substring.
   * @returns {boolean} - True if substring can be segmented.
   */
  function canSegment(start) {
    if (start === s.length) return true;
    // Check memoized result
    if (memo.has(start)) return memo.get(start);

    // Try all possible prefixes
    for (let end = start + 1; end <= s.length; end++) {
      const prefix = s.slice(start, end);
      if (wordSet.has(prefix) && canSegment(end)) {
        memo.set(start, true);
        return true;
      }
    }
    memo.set(start, false);
    return false;
  }

  return canSegment(0);
}

// Time Complexity: O(n^2) - For each index, we check all possible ends
// Space Complexity: O(n) - For memo array and recursion stack
```

### 3. Dynamic Programming (Bottom-Up)

**Intuition**: Build a DP array where dp[i] represents whether the substring s[0..i-1] can be segmented. For each position, check all possible word endings at that position.

```javascript
function wordBreakDP(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // Empty string can be segmented

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      const currentWord = s.substring(start, end);
      if (dp[start] && wordSet.has(currentWord)) {
        dp[end] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

// Time Complexity: O(n^2) - Nested loops
// Space Complexity: O(n) - For DP array
```

### 4. BFS Approach

**Intuition**: Treat the problem as traversing through the string, where each node represents a position, and edges represent valid words from the dictionary.

```javascript
function wordBreakBFS(s, wordDict) {
  const wordSet = new Set(wordDict);
  const visited = new Set();
  const queue = [0];

  while (queue.length > 0) {
    const start = queue.shift();
    if (visited.has(start)) continue;
    visited.add(start);

    for (let end = start + 1; end <= s.length; end++) {
      const currentWord = s.substring(start, end);
      if (wordSet.has(currentWord)) {
        if (end === s.length) return true;
        queue.push(end);
      }
    }
  }

  return false;
}

// Time Complexity: O(n^2) - Similar to DP
// Space Complexity: O(n) - For queue and visited set
```

## Optimal Approach: Dynamic Programming (Bottom-Up)

The DP approach is generally the most straightforward and efficient for this problem.

### Dry Run with Examples

**Example 1: s = "leetcode", wordDict = ["leet","code"]**

- dp = [T, F, F, F, F, F, F, F, F]
- End=1: No valid words starting at 0
- End=2: ...
- End=4: "leet" found (dp[0] is T), set dp[4]=T
- End=5-7: No matches
- End=8: "code" found (dp[4] is T), set dp[8]=T
- Return dp[8] = true

**Example 2: s = "applepenapple", wordDict = ["apple","pen"]**

- dp[0] = T
- At end=5: "apple" found, dp[5]=T
- At end=8: "pen" found (dp[5]=T), dp[8]=T
- At end=13: "apple" found (dp[8]=T), dp[13]=T
- Return true

**Example 3: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]**

- dp[0] = T
- At end=3: "cat" found, dp[3]=T
- At end=4: "cats" found, dp[4]=T
- At end=6: "sand" found (dp[4]=T), dp[7]=T
- At end=7: "and" found (dp[4]=T), dp[7]=T
- No word matches the remaining "og"
- dp[9] remains false
- Return false

**Edge Case: Empty string**

- s = "", wordDict = ["a"]
- dp[0] = true (empty string can always be segmented)
- Return true

**Edge Case: No possible segmentation**

- s = "abcd", wordDict = ["a", "b"]
- dp remains [T, F, F, F, F]
- Return false

The DP approach efficiently solves the problem by building up solutions to subproblems and has a clear O(n^2) time complexity with O(n) space complexity, making it suitable for most practical cases.

```

```
