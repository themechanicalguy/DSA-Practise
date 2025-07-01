# Min Stack Design

## What is the Min Stack Pattern?

- The Min Stack pattern is a design pattern used to implement a stack data structure that supports standard stack operations (`push, pop, top`) and an additional operation (`getMin`) to retrieve the minimum element in the stack, all in `O(1)` time complexity.
- The challenge is to maintain the minimum element efficiently without scanning the stack each time `getMin` is called, as that would result in O(n) time complexity.

The pattern typically involves using `auxiliary storage` to track the minimum element at each stack level, ensuring that all operations remain constant time.
The most common approach uses two stacks: one for the actual elements and another to track the minimum value at each state of the stack.

## Intuition and Approach

To achieve O(1) time complexity for all operations, we need a way to store the minimum element at each point in the stack’s history without iterating through the elements. Here’s the intuition:

**Problem Challenge:** A regular stack allows O(1) for `push`, `pop`, and `top`, but finding the minimum element typically requires `O(n)` time, as you’d need to scan all elements. We need a mechanism to track the minimum instantly.
**Key Insight:** When we push an element, we can also store the current minimum. When we pop an element, we need to restore the minimum from before that element was pushed. This suggests maintaining a history of minimums synchronized with the stack operations.

Here's the approach:

1. **Main Stack**: Stores all elements as usual.
2. **Min Stack**: Stores the minimum value at each state of the main stack. When we push an element, we compare it with the current minimum (top of the min stack) and push the smaller value onto the min stack. When we pop, we remove the top element from both stacks, so the min stack always reflects the minimum of the remaining elements.

### Solution Approaches:

1. **Two Stacks Approach**:

   - Maintain two stacks: one for all elements and another just for minimums.
   - When pushing, if the new value ≤ current min, push it to min stack.
   - When popping, if the popped value equals current min, pop from min stack.

2. **Node-based Approach**:
   - Each stack node stores the value and the current min up to that point.
   - More memory efficient for some cases as it doesn't need a separate stack.

I'll implement the **Two Stacks Approach** as it's straightforward and efficient.

## Solution Code

```javascript
var MinStack = function () {
  this.mainStack = []; // Main stack to hold all elements
  this.minStack = []; // Auxiliary stack to hold minimums
};

/**
 * Pushes an element onto the stack.
 * @param {number} val The value to push
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.mainStack.push(val);
  //if minStack is empty or new value is <= current min, push to minStack
  if (
    this.minStack.length === 0 ||
    val <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const poppedValue = this.mainStack.pop();
  //If the popped value is the current min, remove from minStack
  if (poppedValue === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.mainStack[this.mainStack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

## Time and Space Complexity Analysis

- **Time Complexity**:

  - `push()`: O(1) - Single operation for main stack, potential single operation for min stack
  - `pop()`: O(1) - Single operation for main stack, potential single operation for min stack
  - `top()`: O(1) - Direct access to last element
  - `getMin()`: O(1) - Direct access to last element of min stack

- **Space Complexity**: O(n) in worst case (when elements are pushed in decreasing order, min stack grows same as main stack)

## Dry Run Examples

### Example 1: Normal Case

```
Operations:
1. MinStack()
   - mainStack: [], minStack: []
2. push(-2)
   - mainStack: [-2], minStack: [-2] (-2 is new min)
3. push(0)
   - mainStack: [-2, 0], minStack: [-2] (0 > -2, no change)
4. push(-3)
   - mainStack: [-2, 0, -3], minStack: [-2, -3] (-3 is new min)
5. getMin()
   - Returns -3 (top of minStack)
6. pop()
   - mainStack: [-2, 0], minStack: [-2] (-3 was min, so pop from minStack)
7. top()
   - Returns 0 (top of mainStack)
8. getMin()
   - Returns -2 (top of minStack)
```

### Example 2: Repeated Minimums

```
Operations:
1. MinStack()
2. push(5)
   - main: [5], min: [5]
3. push(3)
   - main: [5, 3], min: [5, 3]
4. push(3)
   - main: [5, 3, 3], min: [5, 3, 3] (duplicate min pushed)
5. getMin()
   - Returns 3
6. pop()
   - main: [5, 3], min: [5, 3] (popped 3 was min, but same min remains)
7. getMin()
   - Still returns 3
```

### Example 3: Edge Case - Empty Stack

```
Operations:
1. MinStack()
2. pop()
   - No effect (stack empty)
3. top()
   - Returns undefined
4. getMin()
   - Returns undefined
5. push(1)
   - main: [1], min: [1]
6. pop()
   - main: [], min: []
7. getMin()
   - Returns undefined again
```
