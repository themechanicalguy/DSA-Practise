// LC 1614. Maximum Nesting Depth of the Parentheses
// Given a valid parentheses string s, return the maximum nesting depth of s.
// A valid parentheses string is either empty (""), "(" + valid parentheses string + ")", or valid parentheses string + ")".
// Example 1:
// Input: s = "(1+(2*3)+((8)/4))+1"
// Output: 3
// Explanation: The nesting depth corresponds to the number of open parentheses at the deepest level.

//Approach 1: Using a Counter (Most Efficient)
/**
 * Calculates the maximum nesting depth of parentheses in a string.
 * @param {string} str - The input string containing parentheses
 * @return {number} The maximum nesting depth
 */
function maxParenthesesDepth(str) {
  let currentDepth = 0;
  let maxDepth = 0;

  for (const char of str) {
    if (char === "(") {
      currentDepth++;
    } else if (char === ")") {
      currentDepth--;
    }
    // Update max depth if current depth exceeds it
    maxDepth = Math.max(maxDepth, currentDepth);
  }

  return maxDepth;
}

const inputStr = "(1+(2*3)+((8)/4))+1";
console.log(maxParenthesesDepth(inputStr)); // Output: 3

//Approach 2: Using Stack
/**
 * Calculates maximum nesting depth using stack approach.
 * @param {string} str - The input string
 * @return {number} The maximum nesting depth
 */
function maxParenthesesDepthWithStack(str) {
  const stack = [];
  let maxDepth = 0;

  for (const char of str) {
    if (char === "(") {
      stack.push(char);
      // Stack size represents current depth
      if (stack.length > maxDepth) {
        maxDepth = stack.length;
      }
    } else if (char === ")") {
      stack.pop();
    }
  }

  return maxDepth;
}

console.log(maxParenthesesDepthWithStack(inputStr)); // Output: 3
