# LC 22. Generate Parentheses

## Problem Statement

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
Example 1:
Input: n = 3
Output: `["((()))","(()())","(())()","()(())","()()()"]`

## Intuition

1. A valid sequence must have an equal number of opening ( ( ) and closing ( ) ) parentheses, so for length ( n ), we need n/2 \） opening and \( n/2 closing parentheses.
2. At any point in constructing the sequence, the number of closing parentheses used cannot exceed the number of opening parentheses, as this would create an invalid sequence `(e.g., ( )) )` is not allowed.
3. We can build the sequences recursively by making decisions at each step: add an opening parenthesis if we have some available, or add a closing parenthesis if we have more closing parentheses available than opening ones used (to ensure balance).
4. The recursion builds a string character by character, ensuring that at every step, the partial sequence is valid (i.e., can lead to a balanced sequence).

## Approach

- To generate all combinations of balanced parentheses of length `2n` (since each pair consists of an opening and closing bracket), we can use a **recursive backtracking** approach.
- The key idea is to build the combinations step by step, ensuring at each step that the sequence remains balanced.

**Key Observations:**

1. **Balanced Condition:** At any point in the sequence, the number of opening brackets `(` should be greater than or equal to the number of closing brackets `)`.
2. **Base Case:** When the length of the current string reaches `2n`, we add it to the result if it's balanced.
3. **Recursive Choices:**
   - Add an opening bracket `(` if the count of opening brackets used so far is less than `n`.
   - Add a closing bracket `)` if the count of closing brackets used so far is less than the count of opening brackets.

This approach ensures that we only explore valid sequences, pruning invalid ones early in the recursion.

### Solution Code

```javascript
/**
 * Generates all combinations of balanced parentheses of length 2n.
 * @param {number} n - The number of pairs of parentheses.
 * @return {string[]} - An array of all balanced parentheses combinations.
 */
function generateParenthesis(n) {
  const result = [];

  /**
   * Recursive helper function to build balanced parentheses.
   * @param {string} current - The current string being built.
   * @param {number} open - The number of opening brackets used so far.
   * @param {number} close - The number of closing brackets used so far.
   */
  function backtrack(current, open, close) {
    // Base case: if the current string has length 2n, add to result
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    // If we can add an opening bracket, do so
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    // If we can add a closing bracket (i.e., more opens than closes), do so
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  // Start the recursion with an empty string and 0 opens and closes
  backtrack("", 0, 0);
  return result;
}

// Example usage:
console.log(generateParenthesis(3)); // Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

### Explanation

1. **Initialization:** The function `generateParenthesis` initializes an empty array `result` to store the valid combinations.
2. **Backtracking Function:** The nested `backtrack` function is defined to recursively build the combinations:
   - **Base Case:** If the `current` string's length reaches `2n`, it means we've formed a valid combination, so it's added to `result`.
   - **Recursive Case:**
     - **Add Opening Bracket:** If the count of opening brackets `open` is less than `n`, we add `(` and recurse with `open + 1`.
     - **Add Closing Bracket:** If the count of closing brackets `close` is less than `open`, we add `)` and recurse with `close + 1`.
3. **Start Recursion:** The `backtrack` function is initially called with an empty string, and both `open` and `close` counts set to 0.
4. **Return Result:** After all recursive calls complete, `result` contains all valid combinations, which is then returned.

### Time and Space Complexity Analysis

- **Time Complexity:** O(4^n / sqrt(n)) - This is derived from the Catalan number, which is the number of valid parentheses combinations. Each valid sequence is built in O(2n) time, leading to this overall complexity.
- **Space Complexity:** O(4^n / sqrt(n)) - This accounts for the space needed to store all combinations in `result`. The recursion stack depth is O(2n) since we build up to 2n characters.

### Dry Run Examples

**Example 1: n = 1**

- **Steps:**
  1. Start with `('`, `open=1`, `close=0`.
  2. Add `')'`, `open=1`, `close=1` → `"()"`.
- **Output:** `["()"]`

**Example 2: n = 2**

- **Steps:**
  1. `('`, `open=1`, `close=0`.
     - `('(` , `open=2`, `close=0`.
       - `('()`, `open=2`, `close=1`.
         - `('())`, `open=2`, `close=2` → `"(())"`.
     - `(')`, `open=1`, `close=1`.
       - `(')(`, `open=2`, `close=1`.
         - `('())`, `open=2`, `close=2` → `"()()"`.
- **Output:** `["(())", "()()"]`

**Example 3: n = 3**

- **Steps:**
  1. `('`, `open=1`, `close=0`.
     - `('(` , `open=2`, `close=0`.
       - `('((`, `open=3`, `close=0`.
         - `('(()`, `open=3`, `close=1`.
           - `('(())`, `open=3`, `close=2`.
             - `('(()))`, `open=3`, `close=3` → `"((()))"`.
       - `('()`, `open=2`, `close=1`.
         - `('()(`, `open=3`, `close=1`.
           - `('()()`, `open=3`, `close=2`.
             - `('()())`, `open=3`, `close=3` → `"(()())"`.
         - `('())`, `open=2`, `close=2`.
           - `('())(`, `open=3`, `close=2`.
             - `('())()`, `open=3`, `close=3` → `"(())()"`.
     - `(')`, `open=1`, `close=1`.
       - `(')(`, `open=2`, `close=1`.
         - `(')((`, `open=3`, `close=1`.
           - `(')(()`, `open=3`, `close=2`.
             - `(')(())`, `open=3`, `close=3` → `"()(())"`.
         - `(')()`, `open=2`, `close=2`.
           - `('())()`, `open=3`, `close=2`.
             - `('()()`, `open=3`, `close=3` → `"()()()"`.
- **Output:** `["((()))", "(()())", "(())()", "()(())", "()()()"]`

This approach efficiently explores all valid combinations by pruning invalid paths early, ensuring optimal performance.
