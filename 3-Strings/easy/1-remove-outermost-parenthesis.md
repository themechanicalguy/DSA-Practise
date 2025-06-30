# LC - 1021. Remove Outermost Parentheses

## Problem Understanding

We need to decompose a valid parentheses string into its primitive components, remove the outermost parentheses from each primitive, and then concatenate the results. A primitive valid parentheses string is one that cannot be split into two non-empty valid parentheses strings.

## Intuition

The goal is to take a valid parentheses string `s` and decompose it into its primitive valid parentheses strings (strings that cannot be split further into two non-empty valid parentheses strings). For each primitive string, we remove the outermost parentheses and concatenate the results.

1. **Primitive Decomposition**: A valid parentheses string can be split into primitives where each primitive is balanced and cannot be split further. For example, `(()())(())` decomposes into `(()())` and `(())`.
2. **Removing Outermost Parentheses**: `For each primitive`, the outermost parentheses are the first and last characters. Removing them gives us the inner content. For example, "(()())" becomes "()()".

### Key Observations:

- A valid parentheses string is balanced, so the count of `(` equals the count of `)`.
- Primitive strings are the smallest units that are themselves valid and cannot be split further.
- To identify primitive strings, we can track the balance of parentheses (e.g., `(` increases balance by 1, `)` decreases by 1). A primitive string ends when the balance returns to 0.
- For each primitive string, we exclude the first `(` and the last `)` and keep the inner content.

### Intuition for Solution:

- Parse the string character by character.
- Track the balance of parentheses to identify boundaries of primitive strings.
- When a primitive string is found (balance returns to 0), exclude its outermost parentheses and include the inner part in the result.
- Handle edge cases like empty strings or single primitive strings like `()`.

### Approaches

1. **Using Balance Counter**:
   - Iterate through the string while keeping track of the balance (number of open parentheses).
   - When the balance returns to zero, we've found a primitive.
   - Extract the primitive, remove its outermost parentheses, and add the result to the output.

### Solution Code

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  let result = [];
  let balance = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      balance++;
    } else {
      balance--;
    }

    // When balance reaches zero, we've found a primitive
    if (balance === 0) {
      // Extract the primitive excluding the first and last characters
      const primitive = s.slice(start + 1, i);
      result.push(primitive);
      start = i + 1; // Move start to the next character
    }
  }

  return result.join("");
};
```

### Explanation

1. **Initialization**: We start with an empty `result` array to collect the processed primitives, a `balance` counter to track parentheses balance, and a `start` pointer to mark the beginning of the current primitive.
2. **Iteration**: For each character in the string:
   - Increment `balance` on encountering '(', decrement on ')'.
   - When `balance` returns to zero, it means we've completed a primitive. The primitive starts at `start` and ends at `i`.
3. **Processing Primitive**: The primitive's content (excluding the first and last characters) is sliced and added to `result`.
4. **Update Start**: The `start` pointer is moved to `i + 1` to begin the next primitive.
5. **Result Construction**: The processed primitives are joined into a single string and returned.

### Time and Space Complexity

- **Time Complexity**: O(n), where n is the length of the string. We traverse the string once.
- **Space Complexity**: O(n), for storing the result. In the worst case, the result could be as long as the input string.

### Dry Run with Examples

**Example 1: s = "(()())(())"**

- Initial: balance = 0, start = 0, result = []
- i=0: '(', balance=1
- i=1: '(', balance=2
- i=2: ')', balance=1
- i=3: '(', balance=2
- i=4: ')', balance=1
- i=5: ')', balance=0 → primitive="()()" (slices 1-4), result=["()()"], start=6
- i=6: '(', balance=1
- i=7: '(', balance=2
- i=8: ')', balance=1
- i=9: ')', balance=0 → primitive="()" (slices 7-8), result=["()()", "()"], start=10
- Result: "()()" + "()" = "()()()"

**Example 2: s = "(()())(())(()(()))"**

- Similar decomposition into "(()())", "(())", "(()(()))" → "()()", "()", "()(())" → "()()()()(())"

**Example 3: s = "()()"**

- Decomposes into "()", "()" → "", "" → "" (each primitive is "()", removing outer leaves nothing)

### Alternative Approaches

1. **Using Stack**:

   - Similar to balance counter but uses a stack to track indices. When stack becomes empty, a primitive is found.

   ```javascript
   var removeOuterParentheses = function (s) {
     let result = [];
     let stack = [];
     let start = 0;

     for (let i = 0; i < s.length; i++) {
       if (s[i] === "(") {
         stack.push(i);
       } else {
         stack.pop();
       }

       if (stack.length === 0) {
         result.push(s.slice(start + 1, i));
         start = i + 1;
       }
     }

     return result.join("");
   };
   ```

   - **Complexity**: Same as balance counter approach.

2. **String Manipulation**:
   - Iterate and collect primitives by tracking indices, then process each.
   - More manual but similar in logic.

### Conclusion

The balance counter approach is efficient and straightforward, leveraging the properties of valid parentheses strings to decompose and process them in linear time. Other methods like stack-based tracking offer similar performance but with slightly different implementation details. The key insight is recognizing primitives by their balanced nature and processing them accordingly.
