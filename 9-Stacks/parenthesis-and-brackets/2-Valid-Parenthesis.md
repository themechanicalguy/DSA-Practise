# LC 20. Valid Parentheses

### Problem Understanding

The problem requires us to determine if a given string of brackets is valid. The string is valid if:

1. Every opening bracket has a corresponding closing bracket of the same type.
2. The brackets are closed in the correct order (i.e., the most recently opened bracket must be closed first).

### Intuition

To solve this problem, we can use a stack data structure. The stack helps us keep track of the most recent opening bracket that hasn't been closed yet. When we encounter a closing bracket, we check if it matches the most recent opening bracket (which would be at the top of the stack). If it matches, we pop the opening bracket from the stack. If it doesn't match, the string is invalid. At the end, if the stack is empty, all brackets were properly closed, and the string is valid.

### Approaches

1. **Using a Stack**: This is the most efficient and straightforward approach.
   - Initialize an empty stack.
   - Iterate through each character in the string.
   - If the character is an opening bracket, push it onto the stack.
   - If the character is a closing bracket, check if it matches the top of the stack. If it does, pop the stack; otherwise, return false.
   - After processing all characters, if the stack is empty, return true; otherwise, return false.

### Solution Code

```javascript
/**
 * Determines if the input string has valid parentheses.
 * @param {string} s - The input string containing only brackets.
 * @return {boolean} - True if the string is valid, false otherwise.
 */
function isValid(s) {
  const stack = [];
  const bracketPairs = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (let char of s) {
    if (bracketPairs[char]) {
      // If the character is an opening bracket, push its corresponding closing bracket onto the stack
      stack.push(bracketPairs[char]);
    } else {
      // If the character is a closing bracket, check if it matches the top of the stack
      if (stack.pop() !== char) {
        return false;
      }
    }
  }

  // If the stack is empty, all brackets were properly closed
  return stack.length === 0;
}
```

### Explanation

- **Initialization**: We start by initializing an empty stack and a dictionary (`bracketPairs`) that maps each opening bracket to its corresponding closing bracket.
- **Iteration**: For each character in the string:
  - If the character is an opening bracket (i.e., a key in `bracketPairs`), we push its corresponding closing bracket onto the stack.
  - If the character is a closing bracket, we check if it matches the top of the stack. If it doesn't, the string is invalid, and we return false immediately.
- **Final Check**: After processing all characters, if the stack is empty, all opening brackets had matching closing brackets in the correct order, so we return true. Otherwise, we return false.

### Time and Space Complexity

- **Time Complexity**: O(n), where n is the length of the string. We process each character exactly once.
- **Space Complexity**: O(n) in the worst case (when all characters are opening brackets, and the stack grows to size n).

### Dry Run with Examples

**Example 1: s = "()"**

- Initialize stack = [].
- Process '(': push ')' onto stack → stack = [')'].
- Process ')': pop from stack → stack = [], popped value is ')', which matches current character. Continue.
- Stack is empty → return true.

**Example 2: s = "()[]{}"**

- Initialize stack = [].
- Process '(': push ')' → stack = [')'].
- Process ')': pop → stack = [], popped value matches. Continue.
- Process '[': push ']' → stack = [']'].
- Process ']': pop → stack = [], popped value matches. Continue.
- Process '{': push '}' → stack = ['}'].
- Process '}': pop → stack = [], popped value matches. Continue.
- Stack is empty → return true.

**Example 3: s = "(]"**

- Initialize stack = [].
- Process '(': push ')' → stack = [')'].
- Process ']': pop → stack = [], popped value is ')', which does not match ']'. Return false immediately.

**Example 4: s = "([])"**

- Initialize stack = [].
- Process '(': push ')' → stack = [')'].
- Process '[': push ']' → stack = [')', ']'].
- Process ']': pop → stack = [')'], popped value matches. Continue.
- Process ')': pop → stack = [], popped value matches. Continue.
- Stack is empty → return true.

### Edge Cases

1. **Empty String**: Should return true (no brackets to validate).
   - s = "" → stack remains empty → return true.
2. **Single Bracket**: Should return false.
   - s = "[" → stack = [']'] → stack not empty at end → return false.
3. **Nested Brackets**: Should handle correctly.
   - s = "{[]}" → stack = ['}', ']'] → process ']' → stack = ['}'] → process '}' → stack = [] → return true.
4. **Unmatched Brackets**: Should return false.
   - s = "([)]" → stack = [')', ']'] → process ')' → popped value is ']', which does not match ')' → return false.

### Alternative Approaches

While the stack approach is optimal, other approaches like using recursion or counting brackets are either less efficient or incorrect for this problem due to the order requirement. The stack method is the most suitable for this problem.
