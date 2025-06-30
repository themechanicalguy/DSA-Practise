# Generate all binary strings

https://www.geeksforgeeks.org/problems/generate-all-binary-strings/1

## Question-

Given an integer N , Print all binary strings of size N which do not contain consecutive 1s. A binary string is that string which contains only 0 and 1.

## Intuition

- A binary string of length N can end with either a 0 or a 1.
- If the string ends with a 0, the substring of length N-1 (before the last character) can be any valid binary string of length N-1, because appending a 0 to any valid string((`N-2`, `N-1` should not be 1)) doesn’t introduce consecutive 1s.
- If the string ends with a 1, the second-to-last character must be a 0 (to avoid consecutive 1s). Thus, the substring of length N-2 (before the last two characters "01") must be a valid binary string of length N-2.
- This naturally suggests a recursive approach where we build strings by making decisions at each position while ensuring the no-consecutive-1s constraint.

## Approach

To generate all binary strings of length `N` that do not contain consecutive `1`s, we can use a **recursive approach**.
The key idea is to build the string character by character, ensuring that we never place two `1`s consecutively.

1. **Base Case**: If the current string's length reaches `N`, we add it to the result list.
2. **Recursive Case**:
   - We can always add a `0` to the current string, as it doesn't affect the consecutive `1`s condition.
   - We can only add a `1` if the last character of the current string is not `1`. If the last character is `1`, adding another `1` would violate the condition.

This approach ensures that we explore all possible valid strings without consecutive `1`s.

### Solution Code (JavaScript)

```javascript
/**
 * Generates all binary strings of length N without consecutive 1s.
 * @param {number} N - The length of the binary strings.
 * @return {string[]} - An array of valid binary strings.
 */
function generateBinaryStrings(N) {
  const result = [];

  /**
   * Helper function to build the binary string recursively.
   * @param {string} currentString - The current binary string being built.
   * @param {number} length - The current length of the string.
   */
  function backtrack(currentString, length) {
    // Base case: if the string reaches the desired length, add to result
    if (length === N) {
      result.push(currentString);
      return;
    }

    // Always add '0' to the current string
    backtrack(currentString + "0", length + 1);

    // Add '1' only if the last character is not '1'
    if (
      currentString.length === 0 ||
      currentString[currentString.length - 1] !== "1"
    ) {
      backtrack(currentString + "1", length + 1);
    }
  }

  backtrack("", 0);
  return result;
}

// Example usage:
const N = 3;
console.log(generateBinaryStrings(N)); // Output: ["000", "001", "010", "100", "101"]
```

### Explanation

1. **Initialization**: The `generateBinaryStrings` function initializes an empty array `result` to store valid binary strings.
2. **Backtracking Function**: The nested `backtrack` function builds the binary string recursively:
   - **Base Case**: When the current string's length equals `N`, it is added to `result`.
   - **Recursive Case**:
     - **Adding '0'**: We can always append `0` to the current string, so this branch is always explored.
     - **Adding '1'**: We only append `1` if the last character is not `1` (or if the string is empty), ensuring no two `1`s are consecutive.
3. **Starting the Recursion**: The `backtrack` function is initially called with an empty string and length `0`.

### Time and Space Complexity Analysis

- **Time Complexity**: Each recursive call branches into at most two paths (adding `0` or `1`), leading to a binary tree of depth `N`. However, due to the constraint on consecutive `1`s, the number of valid strings is reduced. The exact number of valid strings is given by the Fibonacci sequence (specifically, `Fib(N+2)`), but the time complexity is `O(2^N)` in the worst case, as each level doubles the number of calls (though many are pruned).
- **Space Complexity**: The space complexity is `O(N)` for the recursion stack (depth of recursion tree). The output storage is `O(N * 2^N)` in the worst case, but this is auxiliary space for the result.

### Dry Run with N = 3

Let's trace the recursive calls:

1. **Initial Call**: `backtrack('', 0)`
   - Adds '0': `backtrack('0', 1)`
     - Adds '0': `backtrack('00', 2)`
       - Adds '0': `backtrack('000', 3)` → adds "000" to result.
       - Adds '1': `backtrack('001', 3)` → adds "001" to result.
     - Adds '1': `backtrack('01', 2)`
       - Adds '0': `backtrack('010', 3)` → adds "010" to result.
       - Cannot add '1' (last char is '1').
   - Adds '1': `backtrack('1', 1)`
     - Adds '0': `backtrack('10', 2)`
       - Adds '0': `backtrack('100', 3)` → adds "100" to result.
       - Adds '1': `backtrack('101', 3)` → adds "101" to result.
     - Cannot add '1' (last char is '1').

**Final Result**: ["000", "001", "010", "100", "101"]

### Edge Cases

1. **N = 0**:
   - Output: `[""]` (only the empty string).
2. **N = 1**:
   - Output: `["0", "1"]` (all single-character binary strings are valid).
3. **N = 2**:
   - Output: `["00", "01", "10"]` ("11" is invalid due to consecutive `1`s).
