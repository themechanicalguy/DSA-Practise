# Stack Problem Patterns in JavaScript

Stacks are a fundamental data structure with LIFO (Last-In-First-Out) behavior. Here are common patterns for identifying and solving stack problems, with JavaScript examples:

## 1. Parentheses/Expression Validation

**Pattern**: Checking for balanced parentheses, brackets, or tags in expressions.

**Example Problem**: Valid Parentheses (LeetCode 20)

```javascript
/**
 * Validates if the input string has balanced parentheses, brackets, and braces.
 * Approach: Use a stack to track opening symbols and pop when matching closing symbol is found.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function isValid(s) {
  const stack = [];
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (let char of s) {
    if (char in map) {
      stack.push(char); // Push opening brackets
    } else {
      const last = stack.pop();
      if (map[last] !== char) {
        return false; // Mismatch found
      }
    }
  }

  return stack.length === 0; // Stack should be empty if all matched
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
```

## 2. Next Greater Element

**Pattern**: Finding the next greater element for each element in an array.

**Example Problem**: Next Greater Element I (LeetCode 496)

```javascript
/**
 * Finds the next greater element for each element in nums1 based on nums2.
 * Approach: Use a stack to keep track of elements and find next greater in O(n) time.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function nextGreaterElement(nums1, nums2) {
  const map = {};
  const stack = [];
  const result = [];

  // Build mapping of each element to its next greater element
  for (let num of nums2) {
    while (stack.length && stack[stack.length - 1] < num) {
      map[stack.pop()] = num;
    }
    stack.push(num);
  }

  // Remaining elements in stack have no next greater
  while (stack.length) {
    map[stack.pop()] = -1;
  }

  // Build result based on nums1
  for (let num of nums1) {
    result.push(map[num]);
  }

  return result;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1,3,-1]
```

## 3. Stock Span Problem

**Pattern**: Calculating span of stock prices where span is the number of consecutive days before current day where price was less than or equal to current price.

**Example Problem**: Stock Span (GeeksforGeeks)

```javascript
/**
 * Calculates the stock span for each day.
 * Approach: Use stack to keep track of previous greater elements' indices.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function calculateSpan(prices) {
  const stack = [];
  const span = new Array(prices.length).fill(1);

  // The first element always has span 1
  stack.push(0);

  for (let i = 1; i < prices.length; i++) {
    // Pop elements from stack while they are smaller than current price
    while (stack.length && prices[stack[stack.length - 1]] <= prices[i]) {
      stack.pop();
    }

    // If stack becomes empty, then price[i] is greater than all previous
    // Else it's greater than elements after stack top
    span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];

    stack.push(i);
  }

  return span;
}

console.log(calculateSpan([100, 80, 60, 70, 60, 75, 85])); // [1,1,1,2,1,4,6]
```

## 4. Minimum Stack

**Pattern**: Implementing a stack that can retrieve the minimum element in constant time.

**Example Problem**: Min Stack (LeetCode 155)

```javascript
/**
 * MinStack that supports push, pop, top, and getMin in O(1) time.
 * Approach: Use two stacks - one for main elements, one for tracking minimums.
 */
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // Tracks minimums at each stack level
  }

  push(val) {
    this.stack.push(val);
    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    return val;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top()); // 0
console.log(minStack.getMin()); // -2
```

## 5. Reverse Polish Notation (Postfix Evaluation)

**Pattern**: Evaluating postfix expressions using stack.

**Example Problem**: Evaluate Reverse Polish Notation (LeetCode 150)

```javascript
/**
 * Evaluates a postfix (Reverse Polish Notation) expression.
 * Approach: Use stack to store operands and apply operators when encountered.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function evalRPN(tokens) {
  const stack = [];
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };

  for (let token of tokens) {
    if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack.pop();
}

console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9 ( (2 + 1) * 3 )
console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6 (4 + (13 / 5))
```

## 6. Asteroid Collision

**Pattern**: Simulating collisions where elements moving in opposite directions cancel each other out.

**Example Problem**: Asteroid Collision (LeetCode 735)

```javascript
/**
 * Simulates asteroid collisions where positive moves right, negative moves left.
 * Approach: Use stack to simulate collisions and handle destruction.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function asteroidCollision(asteroids) {
  const stack = [];

  for (let asteroid of asteroids) {
    let addToStack = true;

    while (stack.length && asteroid < 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];

      if (top > -asteroid) {
        addToStack = false;
        break;
      } else if (top === -asteroid) {
        stack.pop();
        addToStack = false;
        break;
      } else {
        stack.pop();
      }
    }

    if (addToStack) {
      stack.push(asteroid);
    }
  }

  return stack;
}

console.log(asteroidCollision([5, 10, -5])); // [5,10]
console.log(asteroidCollision([8, -8])); // []
```

## 7. Removing Adjacent Duplicates

**Pattern**: Removing adjacent duplicates from a string or array.

**Example Problem**: Remove All Adjacent Duplicates In String (LeetCode 1047)

```javascript
/**
 * Removes adjacent duplicates from a string.
 * Approach: Use stack to build result while removing adjacent duplicates.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function removeDuplicates(s) {
  const stack = [];

  for (let char of s) {
    if (stack.length && stack[stack.length - 1] === char) {
      stack.pop(); // Remove adjacent duplicate
    } else {
      stack.push(char);
    }
  }

  return stack.join("");
}

console.log(removeDuplicates("abbaca")); // "ca"
console.log(removeDuplicates("azxxzy")); // "ay"
```

## 8. Largest Rectangle in Histogram

**Pattern**: Finding the largest rectangle that can be formed under a histogram.

**Example Problem**: Largest Rectangle in Histogram (LeetCode 84)

```javascript
/**
 * Finds the largest rectangular area in a histogram.
 * Approach: Use stack to track indices of increasing heights.
 * Time Complexity: O(n), Space Complexity: O(n)
 */
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  let i = 0;

  while (i < heights.length) {
    if (!stack.length || heights[i] >= heights[stack[stack.length - 1]]) {
      stack.push(i++);
    } else {
      const top = stack.pop();
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, heights[top] * width);
    }
  }

  while (stack.length) {
    const top = stack.pop();
    const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
    maxArea = Math.max(maxArea, heights[top] * width);
  }

  return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
```

## Identifying Stack Problems

Look for these characteristics to identify stack problems:

- Problems involving nested structures (parentheses, HTML tags)
- Problems requiring tracking of previous elements (next greater element)
- Problems where you need to process elements in LIFO order
- Problems involving recursive structures that can be converted to iterative using stack
- Problems where you need to maintain some state about previous elements

Stack problems often have O(n) time complexity solutions with O(n) space complexity due to the stack storage.
