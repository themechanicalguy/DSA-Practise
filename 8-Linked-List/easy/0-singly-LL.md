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

  // Add to end of list - O(n) time
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
    let prev = current;

    // Traverse until current is last node
    while (current.next) {
      prev = current;
      current = current.next;
    }

    this.length--;
    if (this.length === 0) {
      this.head = null; // List is now empty
    } else {
      prev.next = null; // Remove reference to popped node
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
    let previousNode = null;
    let currentNode = this.head;
    let nextNode = null;

    while (currentNode !== null) {
      // Store the next node before we overwrite currentNode.next
      nextNode = currentNode.next;

      // Reverse the link
      currentNode.next = previousNode;

      // Move pointers one position ahead
      previousNode = currentNode;
      currentNode = nextNode;
    }

    // At the end, previousNode will be the new head
    return previousNode;
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
