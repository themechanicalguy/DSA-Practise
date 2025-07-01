# Implementing a Stack Using Arrays in JavaScript

A stack is a linear data structure that follows the `Last In, First Out (LIFO)` principle, meaning the last element added is the first to be removed.
Think of a stack of plates: you add plates to the top and remove them from the top.

**Key Operations:**

- **Push:** Add an element to the top of the stack.
- **Pop:** Remove and return the top element.
- **Peek/Top:** View the top element without removing it.
- **isEmpty:** Check if the stack is empty.
- **Size:** Return the number of elements in the stack.

**Characteristics:**

- Elements are accessed only from the top.
- Used in scenarios like function call stacks, undo mechanisms, and expression parsing.
- Operations are typically O(1) for push and pop.

## Intuition and Approach

**Intuition:**

- A stack can be visualized as a vertical container where elements are added and removed from the top.
- Arrays are a natural fit because they allow dynamic resizing (in JavaScript) and provide constant-time access to the last element.
- The array's push and pop methods align perfectly with stack operations, making implementation straightforward.

## Approach 1: Simple Array Implementation

This is the most straightforward implementation using an array and tracking the top index.

**Array-Based Implementation:**

- Use a JavaScript array to store elements.
- `push` adds elements to the end (top of the stack).
- `pop` removes elements from the end.
- Track the top element using the array's length.

```javascript
class Stack {
  constructor() {
    this.items = []; // Array to store stack elements
    this.top = -1; // Index of the top element (initially -1 for empty stack)
  }

  // Push element onto the stack
  push(element) {
    this.top++;
    this.items[this.top] = element;
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedElement = this.items[this.top];
    this.top--;
    return poppedElement;
  }

  // View the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.top];
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === -1;
  }

  // Get stack size
  size() {
    return this.top + 1;
  }

  // Print stack contents
  print() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    let result = "Stack: ";
    for (let i = 0; i <= this.top; i++) {
      result += `${this.items[i]} `;
    }
    console.log(result);
  }
}

// Time Complexities:
// - push: O(1) (amortized, since array push is O(1) in JavaScript)
// - pop: O(1)
// - peek: O(1)
// - isEmpty: O(1)
// - size: O(1)
// - print: O(n)

// Space Complexity: O(n) where n is number of elements in stack
```

## Approach 2: Using Array Methods Only || Object-Based Stack with Size Limit

This implementation leverages built-in array methods for simplicity.

**Object-Based Array Implementation:**

- Wrap the array in an object to encapsulate the stack's state and methods.
- Provide additional functionality like size limits or custom error handling.

```javascript
// Stack implementation with size limit and object encapsulation
class LimitedStack {
  constructor(maxSize = Infinity) {
    this.items = []; // Array to store stack elements
    this.maxSize = maxSize; // Maximum allowed size
  }

  // Add element to the top of the stack
  push(element) {
    if (this.size() >= this.maxSize) {
      throw new Error("Stack overflow: maximum size reached");
    }
    this.items.push(element);
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack underflow: cannot pop from empty stack");
    }
    return this.items.pop();
  }

  // View the top element without removing it
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements in the stack
  size() {
    return this.items.length;
  }
}
```

## Approach 3: Fixed Size Stack (Array with Capacity)

This implementation uses a fixed-size array to prevent dynamic resizing.

**Fixed-Size Array Implementation:**

- Use a fixed-size array for environments with memory constraints.
- Maintain a `top` index to track the stack's top element.
- Check for overflow (when pushing to a full stack) and underflow (when popping from an empty stack).

```javascript
// Stack implementation with fixed-size array
class FixedSizeStack {
  constructor(capacity) {
    this.capacity = capacity; // Maximum number of elements
    this.items = new Array(capacity); // Fixed-size array
    this.top = -1; // Index of the top element
  }

  // Add element to the top of the stack
  push(element) {
    if (this.top >= this.capacity - 1) {
      throw new Error("Stack overflow: cannot push to full stack");
    }
    this.items[++this.top] = element;
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack underflow: cannot pop from empty stack");
    }
    const element = this.items[this.top];
    this.items[this.top--] = undefined; // Clear reference
    return element;
  }

  // View the top element without removing it
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.top];
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === -1;
  }

  // Return the number of elements in the stack
  size() {
    return this.top + 1;
  }
}
```

## Optimal Approach

The second approach (using array methods) is generally the most optimal for JavaScript because:

1. It's simple and clean
2. JavaScript engines optimize array operations well
3. No need to manually track the top index
4. Dynamic resizing is handled by the JavaScript engine

## Dry Run of Optimal Approach (Approach 2)

### Example 1: Normal Operations

```javascript
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.pop()); // 30
console.log(stack.peek()); // 20
console.log(stack.size()); // 2
stack.print(); // Stack: 10 20
```

### Example 2: Edge Case - Empty Stack

```javascript
const stack = new Stack();
console.log(stack.pop()); // "Stack is empty"
console.log(stack.peek()); // "Stack is empty"
console.log(stack.isEmpty()); // true
stack.print(); // "Stack is empty"
```

### Example 3: Mixed Operations

```javascript
const stack = new Stack();
stack.push(5);
console.log(stack.peek()); // 5
stack.push(15);
stack.pop();
stack.pop();
stack.push(25);
console.log(stack.isEmpty()); // false
stack.print(); // Stack: 25
```

## Conclusion

All three approaches have similar time complexities for core operations (O(1)), but the second approach using built-in array methods is the most idiomatic for JavaScript. The fixed-size stack (Approach 3) might be useful in memory-constrained environments but is generally less flexible.

The choice between Approach 1 and 2 depends on whether you want more control (Approach 1) or cleaner code (Approach 2). In most cases, Approach 2 would be preferred for JavaScript implementations.
