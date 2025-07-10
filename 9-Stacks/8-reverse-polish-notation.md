# LC 150. Evaluate Reverse Polish Notation

### Understanding Reverse Polish Notation (RPN)

Reverse Polish Notation (RPN), also known as postfix notation, is a mathematical notation in which every operator follows all of its operands. This eliminates the need for parentheses that are required in infix notation. For example, the infix expression `(3 + 4) * 5` is written as `3 4 + 5 *` in RPN.

### Intuition for Evaluating RPN

To evaluate an RPN expression, we can use a stack data structure. The stack helps keep track of the operands until we encounter an operator. When we encounter an operator, we pop the top two operands from the stack, apply the operator, and push the result back onto the stack. This process continues until all tokens are processed, and the final result is the only element left in the stack.

### Approaches to Solve the Problem

1. **Stack-Based Approach**:
   - Initialize an empty stack.
   - Iterate through each token in the input array.
   - If the token is a number, push it onto the stack.
   - If the token is an operator, pop the top two elements from the stack, apply the operator (the second popped element is the left operand, and the first is the right operand), and push the result back onto the stack.
   - After processing all tokens, the stack will contain exactly one element, which is the result of the RPN expression.

### Solution Code in JavaScript

```javascript
/**
 * Evaluates the given array of tokens representing a Reverse Polish Notation expression.
 * @param {string[]} tokens - Array of tokens (numbers and operators).
 * @return {number} - Result of the evaluated expression.
 */
function evalRPN(tokens) {
  let stack = [];
  for (let token of tokens) {
    if (!isNaN(token)) {
      // If the token is a number, push it to the stack
      stack.push(parseInt(token, 10));
    } else {
      // Token is an operator, pop the top two elements
      let rightOperand = stack.pop();
      let leftOperand = stack.pop();
      let result;
      switch (token) {
        case "+":
          result = leftOperand + rightOperand;
          break;
        case "-":
          result = leftOperand - rightOperand;
          break;
        case "*":
          result = leftOperand * rightOperand;
          break;
        case "/":
          // Division truncates toward zero
          result = Math.trunc(leftOperand / rightOperand);
          break;
        default:
          throw new Error("Invalid operator");
      }
      stack.push(result);
    }
  }
  return stack.pop();
}

// Example Usage
console.log(evalRPN(["2", "1", "+", "3", "*"])); // Output: 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); // Output: 6
console.log(
  evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
); // Output: 22
```

### Explanation

1. **Stack Initialization**: We start with an empty stack to keep track of operands.
2. **Token Processing**:
   - **Numbers**: When encountering a numeric token, we convert it to an integer and push it onto the stack.
   - **Operators**: When encountering an operator, we pop the top two values from the stack. The first popped value is the right operand, and the second is the left operand. We perform the operation and push the result back onto the stack.
3. **Division Handling**: The division operation truncates toward zero, which is handled using `Math.trunc`.
4. **Final Result**: After processing all tokens, the stack contains a single element, which is the result of the RPN expression.

### Time and Space Complexity Analysis

- **Time Complexity**: O(n), where n is the number of tokens. Each token is processed exactly once.
- **Space Complexity**: O(n), in the worst case, the stack can grow up to the number of operands, which is proportional to the number of tokens (for expressions with many consecutive numbers before operators).

### Dry Run with Examples

**Example 1: ["2","1","+","3","*"]**

1. Push 2, stack: [2]
2. Push 1, stack: [2, 1]
3. Encounter '+': pop 1 and 2, 2 + 1 = 3, push 3, stack: [3]
4. Push 3, stack: [3, 3]
5. Encounter '_': pop 3 and 3, 3 _ 3 = 9, push 9, stack: [9]
6. Result: 9

**Example 2: ["4","13","5","/","+"]**

1. Push 4, stack: [4]
2. Push 13, stack: [4, 13]
3. Push 5, stack: [4, 13, 5]
4. Encounter '/': pop 5 and 13, 13 / 5 = 2 (truncated), push 2, stack: [4, 2]
5. Encounter '+': pop 2 and 4, 4 + 2 = 6, push 6, stack: [6]
6. Result: 6

**Example 3: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]**

1. Push 10, stack: [10]
2. Push 6, stack: [10, 6]
3. Push 9, stack: [10, 6, 9]
4. Push 3, stack: [10, 6, 9, 3]
5. Encounter '+': pop 3 and 9, 9 + 3 = 12, push 12, stack: [10, 6, 12]
6. Push -11, stack: [10, 6, 12, -11]
7. Encounter '_': pop -11 and 12, 12 _ -11 = -132, push -132, stack: [10, 6, -132]
8. Encounter '/': pop -132 and 6, 6 / -132 = 0 (truncated), push 0, stack: [10, 0]
9. Encounter '_': pop 0 and 10, 10 _ 0 = 0, push 0, stack: [0]
10. Push 17, stack: [0, 17]
11. Encounter '+': pop 17 and 0, 0 + 17 = 17, push 17, stack: [17]
12. Push 5, stack: [17, 5]
13. Encounter '+': pop 5 and 17, 17 + 5 = 22, push 22, stack: [22]
14. Result: 22

This approach efficiently handles all operations and edge cases, ensuring correct evaluation of RPN expressions.
