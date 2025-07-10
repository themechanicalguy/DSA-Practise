# LC 2390. Removing Stars From a String

## Problem Understanding

We need to process a string containing stars ('\*') where each star removes the closest non-star character to its left and the star itself. After processing all stars, we return the modified string.

## Intuition

This problem resembles backspace operations where a star acts like a backspace key. The key observation is that we need to process the string from left to right, and when we encounter a star, we need to remove the most recently added non-star character.

## Approaches

### 1. Stack Approach (Optimal)

The most efficient way is to use a stack data structure. We iterate through the string, pushing non-star characters onto the stack. When we encounter a star, we pop the top character from the stack (if it's not empty). This approach efficiently handles the removal operations.

### 2. Two Pointers Approach

We can also solve this using two pointers where we simulate the stack behavior in-place within the string. This approach modifies the original string array as we process it.

## Solutions in JavaScript

### Solution 1: Stack Approach

```javascript
/**
 * Removes characters and stars using stack
 * @param {string} s - Input string with stars
 * @return {string} - Processed string after star removals
 */
function removeStars(s) {
  const stack = [];

  for (const char of s) {
    if (char === "*") {
      stack.pop(); // Remove the closest non-star character to the left
    } else {
      stack.push(char); // Add non-star characters to the stack
    }
  }

  return stack.join(""); // Convert stack to string
}

// Time Complexity: O(n) - We process each character exactly once
// Space Complexity: O(n) - In worst case, stack stores all characters
```

### Solution 2: Two Pointers Approach

```javascript
/**
 * Removes characters and stars using two pointers
 * @param {string} s - Input string with stars
 * @return {string} - Processed string after star removals
 */
function removeStars(s) {
  const chars = s.split("");
  let writePtr = 0;

  for (let readPtr = 0; readPtr < chars.length; readPtr++) {
    if (chars[readPtr] === "*") {
      writePtr--; // Move back to overwrite the previous character
    } else {
      chars[writePtr] = chars[readPtr];
      writePtr++;
    }
  }

  return chars.slice(0, writePtr).join("");
}

// Time Complexity: O(n) - Single pass through the string
// Space Complexity: O(n) - For the character array, but O(1) additional space
```

## Dry Run of Optimal Approach (Stack)

### Example 1: `leet**cod*e`

```
Processing 'l' -> stack: ['l']
Processing 'e' -> stack: ['l', 'e']
Processing 'e' -> stack: ['l', 'e', 'e']
Processing 't' -> stack: ['l', 'e', 'e', 't']
Processing '*' -> pop 't' -> stack: ['l', 'e', 'e']
Processing '*' -> pop 'e' -> stack: ['l', 'e']
Processing 'c' -> stack: ['l', 'e', 'c']
Processing 'o' -> stack: ['l', 'e', 'c', 'o']
Processing 'd' -> stack: ['l', 'e', 'c', 'o', 'd']
Processing '*' -> pop 'd' -> stack: ['l', 'e', 'c', 'o']
Processing 'e' -> stack: ['l', 'e', 'c', 'o', 'e']
Result: "lecoe"
```

### Example 2: `erase*****`

```
Processing 'e' -> stack: ['e']
Processing 'r' -> stack: ['e', 'r']
Processing 'a' -> stack: ['e', 'r', 'a']
Processing 's' -> stack: ['e', 'r', 'a', 's']
Processing 'e' -> stack: ['e', 'r', 'a', 's', 'e']
Processing '*' -> pop 'e' -> stack: ['e', 'r', 'a', 's']
Processing '*' -> pop 's' -> stack: ['e', 'r', 'a']
Processing '*' -> pop 'a' -> stack: ['e', 'r']
Processing '*' -> pop 'r' -> stack: ['e']
Processing '*' -> pop 'e' -> stack: []
Result: ""
```

### Example 3: `a*b*c*d*e*` (Edge case - alternating characters and stars)

```
Processing 'a' -> stack: ['a']
Processing '*' -> pop 'a' -> stack: []
Processing 'b' -> stack: ['b']
Processing '*' -> pop 'b' -> stack: []
Processing 'c' -> stack: ['c']
Processing '*' -> pop 'c' -> stack: []
Processing 'd' -> stack: ['d']
Processing '*' -> pop 'd' -> stack: []
Processing 'e' -> stack: ['e']
Processing '*' -> pop 'e' -> stack: []
Result: ""
```
