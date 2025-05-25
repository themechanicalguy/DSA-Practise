# LC 17- Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent based on the telephone keypad mapping. The answer can be returned in any order.

## Problem Understanding

Telephone Keypad Mapping:
2: abc

3: def

4: ghi

5: jkl

6: mno

7: pqrs

8: tuv

9: wxyz

Note: The digit 1 does not map to any letters.
Example 1:
Input: digits = "23"

Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

## **Intuition**

**Problem Nature:** This is a combinatorial problem where each digit maps to a set of letters, and we need to generate all possible combinations of letters by picking one letter per digit.

**Backtracking:** For each digit, we can choose any of its corresponding letters and recursively build combinations by moving to the next digit. This naturally fits a backtracking approach.

**Constraints:**

- Input digits are from 2-9.
- Each digit maps to 3 or 4 letters (e.g., 7 and 9 map to 4 letters, others to 3).
- The order of combinations doesn’t matter, and duplicates are not possible since we process each digit exactly once.

**Base Cases:** - When we’ve processed all digits, the current combination is complete and added to the result.

**Edge Cases:**

- Empty input string returns an empty array.
- Single-digit input returns the list of letters for that digit.

## **Approach**

- **Mapping:** Create a dictionary mapping each digit (2-9) to its corresponding letters.

  **Backtracking:**

- Track the current position in the input string and the current combination being built.
- For each digit, iterate through its possible letters, include one, and recurse to the next digit.
- When the combination length equals the input length, add it to the result.

**Handle Edge Cases:** Return an empty array for an empty input.

We’ll explore three approaches in JavaScript:

- **Backtracking (Immutability):** Build combinations without modifying arrays, creating new strings/arrays at each step.
- **Backtracking (Mutable):** Use a mutable array with push and pop for efficiency.
- **Iterative Approach:** Build combinations iteratively using a queue-like structure.

### Approach 1: Include-Exclude Backtracking (Immutability, No pop)

```javascript
/**
 * Returns all possible letter combinations for a given digit string.
 * @param {string} digits - String of digits from 2-9
 * @return {string[]} - Array of all possible letter combinations
 */
function letterCombinations(digits) {
  // Handle empty input
  if (!digits) return [];

  // Mapping of digits to letters
  const digitToLetters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  // Store all valid combinations
  const result = [];

  /**
   * Recursive helper function using backtracking
   * @param {number} index - Current position in digits
   * @param {string} currentCombo - Current combination of letters
   */
  function backtrack(index, currentCombo) {
    // Base case: if combination length equals digits length, add to result
    if (index === digits.length) {
      result.push(currentCombo);
      return;
    }

    // Get letters for current digit
    const letters = digitToLetters[digits[index]];

    // Try each letter for the current digit
    for (const letter of letters) {
      // Include letter and recurse
      backtrack(index + 1, currentCombo + letter);
    }
  }

  // Start backtracking from index 0
  backtrack(0, "");
  return result;
}
```

### Approach 2:Backtracking (Mutable, Using pop)

```javascript
/**
 * Returns all possible letter combinations for a given digit string.
 * @param {string} digits - String of digits from 2-9
 * @return {string[]} - Array of all possible letter combinations
 */
function letterCombinations(digits) {
  // Handle empty input
  if (!digits) return [];

  // Mapping of digits to letters
  const digitToLetters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  // Store all valid combinations
  const result = [];

  /**
   * Recursive helper function using backtracking with mutation
   * @param {number} index - Current position in digits
   * @param {string[]} currentCombo - Current combination as array of letters
   */
  function backtrack(index, currentCombo) {
    // Base case: if combination length equals digits length, add to result
    if (index === digits.length) {
      result.push(currentCombo.join(""));
      return;
    }

    // Get letters for current digit
    const letters = digitToLetters[digits[index]];

    // Try each letter for the current digit
    for (const letter of letters) {
      // Include letter
      currentCombo.push(letter);
      // Recurse
      backtrack(index + 1, currentCombo);
      // Backtrack by removing letter
      currentCombo.pop();
    }
  }

  // Start backtracking from index 0
  backtrack(0, []);
  return result;
}
```

# Solution 3: Iterative Approach

```javascript
/**
 * Returns all possible letter combinations for a given digit string iteratively.
 * @param {string} digits - String of digits from 2-9
 * @return {string[]} - Array of all possible letter combinations
 */
function letterCombinations(digits) {
  // Handle empty input
  if (!digits) return [];

  // Mapping of digits to letters
  const digitToLetters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  // Initialize result with empty string
  let result = [""];

  // Process each digit
  for (const digit of digits) {
    const newResult = [];
    const letters = digitToLetters[digit];

    // For each existing combination, append each possible letter
    for (const combo of result) {
      for (const letter of letters) {
        newResult.push(combo + letter);
      }
    }

    // Update result for next digit
    result = newResult;
  }

  return result;
}
```
