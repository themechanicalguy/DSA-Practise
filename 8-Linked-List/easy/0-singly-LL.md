# Singly Linked List Implementation in JavaScript

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add a node at the end of the list
  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      // If list is empty, set both head and tail to new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add to end and update tail
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  // Remove and return the last node
  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    // Traverse until we reach the tail
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    // If list becomes empty, reset head and tail
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  // Remove and return the first node
  shift() {
    if (!this.head) return undefined;

    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    // If list becomes empty, reset tail
    if (this.length === 0) {
      this.tail = null;
    }

    return currentHead;
  }

  // Add a node at the beginning of the list
  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      // If list is empty, set both head and tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add to beginning
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  // Get node at specific index (0-based)
  get(index) {
    if (index < 0 || index >= this.length) return null;

    let counter = 0;
    let current = this.head;

    while (counter !== index) {
      current = current.next;
      counter++;
    }

    return current;
  }

  // Update value of node at specific index
  set(index, value) {
    const foundNode = this.get(index);

    if (foundNode) {
      foundNode.value = value;
      return true;
    }

    return false;
  }

  // Insert a node at specific index
  insertAt(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new Node(value);
    const prevNode = this.get(index - 1);

    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length++;
    return true;
  }

  // Remove node at specific position
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);
    const removedNode = prevNode.next;

    prevNode.next = removedNode.next;
    this.length--;

    return removedNode;
  }

  // Helper method to print the list as an array
  print() {
    const arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    console.log(arr);
  }
}
```

## Dry Run Examples for Each Method

### 1. push(value) - Add to end

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(10);
list.push(20);
list.print(); // [10, 20]
```

- Start: Empty list
- push(10): head = 10, tail = 10, length = 1
- push(20): head = 10, tail = 20, length = 2

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.push("a");
list.push("b");
list.push("c");
list.print(); // ['a', 'b', 'c']
```

- Start: Empty list
- push('a'): head = 'a', tail = 'a', length = 1
- push('b'): head = 'a', tail = 'b', length = 2
- push('c'): head = 'a', tail = 'c', length = 3

### 2. pop() - Remove from end

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.pop();
list.print(); // [1, 2]
```

- Initial: [1, 2, 3]
- pop():
  - current moves from 1 → 2 → 3
  - newTail becomes 2
  - tail = 2, next = null
  - length = 2

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.push("x");
list.pop();
list.print(); // []
```

- Initial: ['x']
- pop():
  - current = 'x'
  - head and tail set to null
  - length = 0

### 3. shift() - Remove from beginning

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(10);
list.push(20);
list.shift();
list.print(); // [20]
```

- Initial: [10, 20]
- shift():
  - currentHead = 10
  - head = 20
  - length = 1

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.push("a");
list.shift();
list.print(); // []
```

- Initial: ['a']
- shift():
  - currentHead = 'a'
  - head = null, tail = null
  - length = 0

### 4. unshift(value) - Add to beginning

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(2);
list.unshift(1);
list.print(); // [1, 2]
```

- Initial: [2]
- unshift(1):
  - newNode = 1
  - newNode.next = 2
  - head = 1
  - length = 2

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.unshift("first");
list.print(); // ['first']
```

- Initial: []
- unshift('first'):
  - newNode = 'first'
  - head = 'first', tail = 'first'
  - length = 1

### 5. get(index) - Get node at index

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(10);
list.push(20);
list.push(30);
console.log(list.get(1).value); // 20
```

- Initial: [10, 20, 30]
- get(1):
  - counter = 0, current = 10
  - counter = 1, current = 20
  - returns node with value 20

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.push("a");
console.log(list.get(0).value); // 'a'
console.log(list.get(1)); // null
```

- Initial: ['a']
- get(0): returns 'a'
- get(1): returns null (out of bounds)

### 6. set(index, value) - Update node value

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.set(0, 100);
list.print(); // [100, 2]
```

- Initial: [1, 2]
- set(0, 100):
  - gets node at index 0 (value = 1)
  - updates value to 100

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.push("x");
list.push("y");
list.set(1, "z");
list.print(); // ['x', 'z']
```

- Initial: ['x', 'y']
- set(1, 'z'):
  - gets node at index 1 (value = 'y')
  - updates value to 'z'

### 7. insertAt(index, value) - Insert at position

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push("a");
list.push("c");
list.insertAt(1, "b");
list.print(); // ['a', 'b', 'c']
```

- Initial: ['a', 'c']
- insertAt(1, 'b'):
  - gets node at index 0 ('a')
  - creates new node 'b' with next = 'c'
  - sets 'a'.next = 'b'
  - length = 3

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.insertAt(0, "first");
list.print(); // ['first']
```

- Initial: []
- insertAt(0, 'first'):
  - uses unshift (since index = 0)
  - creates new list with 'first'

### 8. remove(index) - Remove at position

**Example 1:**

```javascript
const list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.remove(1);
list.print(); // [1, 3]
```

- Initial: [1, 2, 3]
- remove(1):
  - gets node at index 0 (1)
  - sets 1.next to 3 (skipping 2)
  - length = 2

**Example 2:**

```javascript
const list = new SinglyLinkedList();
list.push("x");
list.push("y");
list.push("z");
list.remove(0);
list.print(); // ['y', 'z']
```

- Initial: ['x', 'y', 'z']
- remove(0):
  - uses shift()
  - head becomes 'y'
  - length = 2

# Singly Linked List Implementation without Tail

```javascript
class Node {
  constructor(value) {
    this.value = value; // Store the value of the node
    this.next = null; // Pointer to the next node (initially null)
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null; // Head pointer (initially null for empty list)
    this.length = 0; // Track length for O(1) access
  }

  // Add to end of list - O(1) time
  push(value) {
    const newNode = new Node(value); // Create new node

    if (!this.head) {
      // If list is empty, set new node as head
      this.head = newNode;
    } else {
      // Otherwise traverse to end and add new node
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.length++; // Increment length
    return this; // Return list for chaining
  }

  // Remove from end of list - O(n) time
  pop() {
    if (!this.head) return undefined; // Empty list case

    let current = this.head;
    let newTail = current;

    // Traverse until current is last node
    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.length--;
    if (this.length === 0) {
      this.head = null; // List is now empty
    } else {
      newTail.next = null; // Remove reference to popped node
    }

    return current.value; // Return removed value
  }

  // Remove from beginning - O(1) time
  shift() {
    if (!this.head) return undefined; // Empty list case

    const currentHead = this.head;
    this.head = currentHead.next; // Move head to next node
    this.length--;

    if (this.length === 0) {
      this.head = null; // Clean up if list is now empty
    }

    return currentHead.value; // Return removed value
  }

  // Add to beginning - O(1) time
  unshift(value) {
    const newNode = new Node(value); // Create new node

    if (!this.head) {
      this.head = newNode; // If empty, set as head
    } else {
      newNode.next = this.head; // New node points to current head
      this.head = newNode; // Update head to new node
    }

    this.length++;
    return this; // Return list for chaining
  }

  // Get node at index - O(n) time
  get(index) {
    if (index < 0 || index >= this.length) return null; // Invalid index

    let counter = 0;
    let current = this.head;

    // Traverse until reaching the index
    while (counter !== index) {
      current = current.next;
      counter++;
    }

    return current; // Return node at index
  }

  // Set value at index - O(n) time
  set(index, value) {
    const foundNode = this.get(index); // Reuse get method

    if (foundNode) {
      foundNode.value = value; // Update value if node exists
      return true;
    }

    return false; // Return false if index invalid
  }

  // Insert at index - O(n) time
  insertAt(index, value) {
    if (index < 0 || index > this.length) return false; // Invalid index
    if (index === 0) return !!this.unshift(value); // Insert at head
    if (index === this.length) return !!this.push(value); // Insert at tail

    const newNode = new Node(value); // Create new node
    const prevNode = this.get(index - 1); // Get previous node

    // Insert new node between prev and prev.next
    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length++;
    return true;
  }

  // Remove at index - O(n) time
  remove(index) {
    if (index < 0 || index >= this.length) return undefined; // Invalid index
    if (index === 0) return this.shift(); // Remove from head
    if (index === this.length - 1) return this.pop(); // Remove from tail

    const prevNode = this.get(index - 1); // Get previous node
    const removedNode = prevNode.next; // Node to be removed

    // Bypass the removed node
    prevNode.next = removedNode.next;
    this.length--;

    return removedNode.value; // Return removed value
  }

  // Reverse the list - O(n) time
  reverse() {
    let node = this.head;
    this.head = null; // Temporarily set head to null

    while (node) {
      // Save next node before we overwrite node.next
      const nextNode = node.next;

      // Move node to the new head position
      node.next = this.head;
      this.head = node;

      // Move to next node in original list
      node = nextNode;
    }

    return this; // Return reversed list
  }

  // Print list values - O(n) time
  print() {
    const values = [];
    let current = this.head;

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join(" -> "));
    return this; // Return list for chaining
  }
}
```

## Time and Space Complexity Analysis

1. **Push**: O(n) time (must traverse to end), O(1) space
2. **Pop**: O(n) time (must traverse to end), O(1) space
3. **Shift**: O(1) time, O(1) space
4. **Unshift**: O(1) time, O(1) space
5. **Get**: O(n) time (worst case), O(1) space
6. **Set**: O(n) time (due to get), O(1) space
7. **InsertAt**: O(n) time (worst case), O(1) space
8. **Remove**: O(n) time (worst case), O(1) space
9. **Reverse**: O(n) time, O(1) space
10. **Print**: O(n) time, O(n) space (for storing values)

## Dry Run Examples

### Example 1: Basic Operations

```javascript
const list = new SinglyLinkedList();
list.push(10); // List: 10
list.push(20); // List: 10 -> 20
list.unshift(5); // List: 5 -> 10 -> 20
list.insertAt(2, 15); // List: 5 -> 10 -> 15 -> 20
list.print(); // Output: 5 -> 10 -> 15 -> 20
list.pop(); // Returns 20, List: 5 -> 10 -> 15
list.shift(); // Returns 5, List: 10 -> 15
list.print(); // Output: 10 -> 15
```

### Example 2: Edge Cases

```javascript
const list = new SinglyLinkedList();
list.pop(); // Returns undefined (empty list)
list.shift(); // Returns undefined (empty list)
list.push(100); // List: 100
list.pop(); // Returns 100, List is now empty
list.unshift(200); // List: 200
list.insertAt(1, 300); // List: 200 -> 300
list.remove(0); // Returns 200, List: 300
list.print(); // Output: 300
```

### Example 3: Reverse Operation

```javascript
const list = new SinglyLinkedList();
list.push(1).push(2).push(3); // List: 1 -> 2 -> 3
list.reverse(); // List: 3 -> 2 -> 1
list.print(); // Output: 3 -> 2 -> 1
list.get(1); // Returns node with value 2
list.set(1, 5); // List: 3 -> 5 -> 1
list.print(); // Output: 3 -> 5 -> 1
```

## Alternative Approaches

1. **Tail Pointer Optimization**: We could add a `tail` property to make push operations O(1):

```javascript
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  // ... other methods would need to maintain tail pointer
}
```

Trade-off: Slightly more complex code to maintain tail pointer, but O(1) push.

2. **Recursive Methods**: Some methods could be implemented recursively (like reverse), but this would typically use O(n) space for the call stack.
