//LC- 1021 Remove Outer Parentheses
/*
A valid parentheses string is either empty "", "(" + A + ")", or A + B, 
where A and B are valid parentheses strings, 
and + represents string concatenation.

For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

A valid parentheses string s is primitive if it is nonempty, 
and there does not exist a way to split it into s = A + B, 
with A and B nonempty valid parentheses strings.

Given a valid parentheses string s, consider its primitive decomposition: s = P1 + P2 + ... + Pk, where Pi are primitive valid parentheses strings.
Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s.

Example 1:
Input: s = "(()())(())"
Output: "()()()"
Explanation: 
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".

*/

//Approach 1: Counting Balance with Stack-like Counter

/**
 * Removes the outermost parentheses of every primitive valid parentheses string.
 * @param {string} s - The input valid parentheses string
 * @return {string} - The string with outermost parentheses removed
 */
function removeOuterParentheses(s) {
  let result = "";
  let balance = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    // Update balance: increment for '(', decrement for ')'
    balance += s[i] === "(" ? 1 : -1;

    // When balance hits 0, we've found a primitive decomposition
    if (balance === 0) {
      // Add the substring excluding the first and last characters
      result += s.substring(start + 1, i);
      start = i + 1; // Move start to next position
    }
  }

  return result;
}
//Explanation: We track the balance of parentheses. When the balance returns to 0,
// we've found a complete primitive string.
// We then add the substring excluding the first and last characters (the outermost parentheses) to our result.

//Approach 2: Using Stack to Track Primitive Decomposition

function removeOuterParentheses(s) {
  const stack = [];
  let result = "";
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
    } else {
      stack.pop();
    }

    // When stack is empty, we've completed a primitive
    if (stack.length === 0) {
      // Add the primitive without its outer parentheses
      result += s.substring(start + 1, i);
      start = i + 1;
    }
  }

  return result;
}
// Explanation: This approach uses a stack to track the parentheses.
// When the stack becomes empty, we've found a primitive string. We then extract the substring between the outermost parentheses

//Approach 3: String Building with Balance Tracking
function removeOuterParentheses(s) {
  let result = [];
  let currentLevel = 0;

  for (const char of s) {
    if (char === "(") {
      // Only add if it's not the outermost '('
      if (currentLevel > 0) {
        result.push(char);
      }
      currentLevel++;
    } else {
      currentLevel--;
      // Only add if it's not the outermost ')'
      if (currentLevel > 0) {
        result.push(char);
      }
    }
  }

  return result.join("");
}

//Explanation: We track the nesting level (currentLevel). We only add parentheses to the result when they're not at the outermost level
// (currentLevel > 0 when encountering '(', or currentLevel > 1 when encountering ')').
