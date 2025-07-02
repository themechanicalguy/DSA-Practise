# 1190. Reverse Substrings Between Each Pair of Parentheses

You are given a string s that consists of lower case English letters and brackets.
Reverse the strings in each pair of matching parentheses, starting from the innermost one.
Your result should not contain any brackets.

**Example 1:**

- Input: s = "(abcd)"
- Output: "dcba"

**Example 2:**

- Input: s = "(u(love)i)"
- Output: "iloveu"
- Explanation: The substring "love" is reversed first, then the whole string is reversed.

**Example 3:**

- Input: s = "(ed(et(oc))el)"
- Output: "leetcode"
- Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

## Problem Understanding

We need to reverse the substrings that are enclosed in parentheses, working from the innermost parentheses outward. After processing, the final string should not contain any brackets.

## Intuition

The key observation is that parentheses can be nested, so we need to handle them in a last-in-first-out (LIFO) manner. This suggests using a stack data structure to keep track of the strings at different nesting levels.

## Approach 1: Stack-Based Solution (Optimal)

1. **Stack Tracking**: Use a stack to build strings at different levels of nested parentheses.
2. **String Building**: When encountering '(', push the current string to the stack and start a new string. When encountering ')', pop the stack, reverse the current string, and combine it with the popped string.
3. **Final Result**: After processing all characters, the remaining string is the result.

```javascript
/**
 * Reverses substrings in each pair of parentheses using a stack.
 * @param {string} s - Input string with parentheses
 * @return {string} - String with reversed substrings and no parentheses
 */
function reverseParentheses(s) {
  let stack = [];
  let currentString = "";

  for (let char of s) {
    if (char === "(") {
      // Push the current string and start a new one
      stack.push(currentString);
      currentString = "";
    } else if (char === ")") {
      // Reverse the current string and combine with the last pushed string
      currentString = currentString.split("").reverse().join("");
      currentString = stack.pop() + currentString;
    } else {
      // Build the current string
      currentString += char;
    }
  }

  return currentString;
}
```

### Example 1: "(abcd)"

- Initialize: stack = [], current = ''
- '(': stack = [''], current = ''
- 'a': current = 'a'
- 'b': current = 'ab'
- 'c': current = 'abc'
- 'd': current = 'abcd'
- ')': reverse 'abcd' → 'dcba', pop '' → current = '' + 'dcba' = 'dcba'
- Result: 'dcba'

**Time Complexity**: O(n^2) - In the worst case (deeply nested parentheses), we might reverse strings multiple times.
**Space Complexity**: O(n) - Stack space can grow up to O(n) in the worst case.

## Approach 2: Recursive Solution

1. **Recursive Parsing**: Handle each level of parentheses recursively, reversing the inner content before returning.
2. **Base Case**: When no parentheses are left, return the string as-is.
3. **Recursive Case**: Find matching parentheses, process the inner content recursively, reverse it, and combine with outer content.

```javascript
/**
 * Reverses substrings in each pair of parentheses using recursion.
 * @param {string} s - Input string with parentheses
 * @return {string} - String with reversed substrings and no parentheses
 */
function reverseParenthesesRecursive(s) {
  let result = "";
  let i = 0;

  while (i < s.length) {
    if (s[i] === "(") {
      // Process the substring inside parentheses recursively
      let innerResult = reverseParenthesesRecursive(s.substring(i + 1));
      result += innerResult.reversedString.split("").reverse().join("");
      i += innerResult.consumedChars + 2; // +2 for the parentheses
    } else if (s[i] === ")") {
      // Return the result up to this point
      return { reversedString: result, consumedChars: i };
    } else {
      // Add the character to the result
      result += s[i];
      i++;
    }
  }

  return result;
}
```

**Time Complexity**: O(n^2) - Similar to stack approach due to multiple string reversals.
**Space Complexity**: O(n) - Call stack space for recursion.

## Approach 3: Two-Pointer Approach (For Single Parentheses Pair)

1. **Limited Use**: This works well when there's only one level of parentheses but becomes complex for nested cases.
2. **Find and Reverse**: Locate the indices of parentheses, reverse the substring between them, and construct the final string.

```javascript
/**
 * Reverses substrings in a single pair of parentheses using two pointers.
 * @param {string} s - Input string with one pair of parentheses
 * @return {string} - String with reversed substring and no parentheses
 */
function reverseSingleParentheses(s) {
  let openIndex = s.indexOf("(");
  let closeIndex = s.indexOf(")");

  if (openIndex === -1 || closeIndex === -1) return s;

  let before = s.substring(0, openIndex);
  let middle = s
    .substring(openIndex + 1, closeIndex)
    .split("")
    .reverse()
    .join("");
  let after = s.substring(closeIndex + 1);

  return before + middle + after;
}
```

**Time Complexity**: O(n) - For single-level parentheses.
**Space Complexity**: O(n) - For creating substrings.

## Dry Run of Optimal Approach (Stack-Based)

### Example 1: "(abcd)"

- Initialize: stack = [], current = ''
- '(': stack = [''], current = ''
- 'a': current = 'a'
- 'b': current = 'ab'
- 'c': current = 'abc'
- 'd': current = 'abcd'
- ')': reverse 'abcd' → 'dcba', pop '' → current = '' + 'dcba' = 'dcba'
- Result: 'dcba'

### Example 2: "(u(love)i)"

- Initialize: stack = [], current = ''
- '(': stack = [''], current = ''
- 'u': current = 'u'
- '(': stack = ['', 'u'], current = ''
- 'l': current = 'l'
- 'o': current = 'lo'
- 'v': current = 'lov'
- 'e': current = 'love'
- ')': reverse 'love' → 'evol', pop 'u' → current = 'u' + 'evol' = 'uevol'
- 'i': current = 'uevoli'
- ')': reverse 'uevoli' → 'iloveu', pop '' → current = '' + 'iloveu' = 'iloveu'
- Result: 'iloveu'

### Example 3: "(ed(et(oc))el)"

- Initialize: stack = [], current = ''
- '(': stack = [''], current = ''
- 'e': current = 'e'
- 'd': current = 'ed'
- '(': stack = ['', 'ed'], current = ''
- 'e': current = 'e'
- 't': current = 'et'
- '(': stack = ['', 'ed', 'et'], current = ''
- 'o': current = 'o'
- 'c': current = 'oc'
- ')': reverse 'oc' → 'co', pop 'et' → current = 'et' + 'co' = 'etco'
- ')': reverse 'etco' → 'octe', pop 'ed' → current = 'ed' + 'octe' = 'edocte'
- 'e': current = 'edoctee'
- 'l': current = 'edocteel'
- ')': reverse 'edocteel' → 'leetcode', pop '' → current = '' + 'leetcode' = 'leetcode'
- Result: 'leetcode'

## Edge Cases

1. **No Parentheses**: "abc" → "abc"
2. **Empty String**: "" → ""
3. **Nested Parentheses**: "a(bc(def)g)h" → "a(gfedcb)h" → "hbcdefga" (after outer reversal)
4. **Consecutive Parentheses**: "((abc))" → "(cba)" → "abc"

The stack-based approach efficiently handles all these cases by managing different levels of nesting.
