# Doubly Linked List

A doubly linked list is a linear data structure where each element (node) contains:

- A value
- A pointer to the next node
- A pointer to the previous node

This allows traversal in both directions (forward and backward), unlike a singly linked list which only allows forward traversal.

## Implementation in JavaScript

```javascript
class Node {
  constructor(val) {
    this.val = val; // Value stored in the node
    this.next = null; // Pointer to the next node
    this.prev = null; // Pointer to the previous node
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // First node in the list
    this.tail = null; // Last node in the list
    this.length = 0; // Number of nodes in the list
  }

  /**
   * Adds a new node with the given value to the end of the list
   * @param {*} val - The value to add
   * @returns {DoublyLinkedList} The modified list
   */
  push(val) {
    // Create a new node with the given value
    const newNode = new Node(val);

    // If list is empty, set both head and tail to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add the new node after the current tail
      this.tail.next = newNode; // Current tail points to new node
      newNode.prev = this.tail; // New node points back to current tail
      this.tail = newNode; // Update tail to be the new node
    }

    // Increment length and return the list
    this.length++;
    return this;
  }

  /**
   * Removes and returns the last node from the list
   * @returns {Node|undefined} The removed node or undefined if list is empty
   */
  pop() {
    // If list is empty, return undefined
    if (!this.head) return undefined;

    // Store the current tail node to return later
    const poppedNode = this.tail;

    // If there's only one node, reset the list
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Update tail to be the previous node
      this.tail = poppedNode.prev;
      // Remove the forward link from the new tail
      this.tail.next = null;
      // Remove the backward link from the popped node
      poppedNode.prev = null;
    }

    // Decrement length and return the removed node
    this.length--;
    return poppedNode;
  }

  /**
   * Removes and returns the first node from the list
   * @returns {Node|undefined} The removed node or undefined if list is empty
   */
  shift() {
    // If list is empty, return undefined
    if (!this.head) return undefined;

    // Store the current head node to return later
    const oldHead = this.head;

    // If there's only one node, reset the list
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Update head to be the next node
      this.head = oldHead.next;
      // Remove the backward link from the new head
      this.head.prev = null;
      // Remove the forward link from the old head
      oldHead.next = null;
    }

    // Decrement length and return the removed node
    this.length--;
    return oldHead;
  }

  /**
   * Adds a new node with the given value to the beginning of the list
   * @param {*} val - The value to add
   * @returns {DoublyLinkedList} The modified list
   */
  unshift(val) {
    // Create a new node with the given value
    const newNode = new Node(val);

    // If list is empty, set both head and tail to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Set the new node's next to current head
      newNode.next = this.head;
      // Set current head's prev to new node
      this.head.prev = newNode;
      // Update head to be the new node
      this.head = newNode;
    }

    // Increment length and return the list
    this.length++;
    return this;
  }

  /**
   * Retrieves the node at the specified index
   * @param {number} index - The index of the node to retrieve
   * @returns {Node|null} The node at the index or null if index is invalid
   */
  get(index) {
    // If index is out of bounds, return null
    if (index < 0 || index >= this.length) return null;

    let current;

    // Optimize by deciding which end to start from
    if (index <= this.length / 2) {
      // Start from head if index is in first half
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // Start from tail if index is in second half
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }

    return current;
  }

  /**
   * Updates the value of the node at the specified index
   * @param {number} index - The index of the node to update
   * @param {*} val - The new value
   * @returns {boolean} True if update was successful, false otherwise
   */
  set(index, val) {
    // Get the node at the specified index
    const node = this.get(index);

    // If node doesn't exist, return false
    if (!node) return false;

    // Update the node's value and return true
    node.val = val;
    return true;
  }

  /**
   * Inserts a new node with the given value at the specified index
   * @param {number} index - The position to insert at
   * @param {*} val - The value to insert
   * @returns {boolean} True if insertion was successful, false otherwise
   */
  insert(index, val) {
    // If index is out of bounds, return false
    if (index < 0 || index > this.length) return false;

    // If inserting at beginning, use unshift
    if (index === 0) return !!this.unshift(val);

    // If inserting at end, use push
    if (index === this.length) return !!this.push(val);

    // Create new node
    const newNode = new Node(val);

    // Get the node before the insertion point
    const beforeNode = this.get(index - 1);
    // Get the node after the insertion point
    const afterNode = beforeNode.next;

    // Update links to insert new node
    beforeNode.next = newNode; // Node before points to new node
    newNode.prev = beforeNode; // New node points back to before node
    newNode.next = afterNode; // New node points to after node
    afterNode.prev = newNode; // After node points back to new node

    // Increment length and return true
    this.length++;
    return true;
  }

  /**
   * Removes and returns the node at the specified index
   * @param {number} index - The position to remove from
   * @returns {Node|undefined} The removed node or undefined if index is invalid
   */
  remove(index) {
    // If index is out of bounds, return undefined
    if (index < 0 || index >= this.length) return undefined;

    // If removing first node, use shift
    if (index === 0) return this.shift();

    // If removing last node, use pop
    if (index === this.length - 1) return this.pop();

    // Get the node to remove
    const removedNode = this.get(index);
    // Get the node before the removed node
    const beforeNode = removedNode.prev;
    // Get the node after the removed node
    const afterNode = removedNode.next;

    // Update links to skip the removed node
    beforeNode.next = afterNode; // Before node points to after node
    afterNode.prev = beforeNode; // After node points back to before node

    // Clean up the removed node's links
    removedNode.next = null;
    removedNode.prev = null;

    // Decrement length and return the removed node
    this.length--;
    return removedNode;
  }

  /**
   * Reverses the list in place
   * @returns {DoublyLinkedList} The reversed list
   */
  reverse() {
    // Swap head and tail
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let prev = null;
    let next;

    // Traverse through the list
    while (current) {
      // Store next node before changing links
      next = current.next;

      // Reverse the links
      current.next = prev; // Reverse next pointer
      current.prev = next; // Reverse prev pointer

      // Move to next node
      prev = current;
      current = next;
    }

    return this;
  }
}
```

## Examples and Dry Runs

### 1. push(val)

```javascript
const list = new DoublyLinkedList();
list.push(10);
list.push(20);
list.push(30);
```

Dry Run:

- Initial: head=null, tail=null, length=0
- push(10): head=10, tail=10, length=1
- push(20): head=10, tail=20, 10.next=20, 20.prev=10, length=2
- push(30): head=10, tail=30, 20.next=30, 30.prev=20, length=3

### 2. pop()

```javascript
list.pop(); // Returns node with 30
```

Dry Run:

- Before: head=10, tail=30, length=3
- poppedNode = 30
- Update tail to 20 (30.prev)
- Set 20.next = null
- Set 30.prev = null
- length decreases to 2
- Returns node with 30

### 3. shift()

```javascript
list.shift(); // Returns node with 10
```

Dry Run:

- Before: head=10, tail=20, length=2
- oldHead = 10
- Update head to 20 (10.next)
- Set 20.prev = null
- Set 10.next = null
- length decreases to 1
- Returns node with 10

### 4. unshift(val)

```javascript
list.unshift(5); // List: 5 <-> 20
```

Dry Run:

- Before: head=20, tail=20, length=1
- newNode = 5
- Set 5.next = 20
- Set 20.prev = 5
- Update head to 5
- length increases to 2

### 5. get(index)

```javascript
list.get(0); // Returns node with 5
list.get(1); // Returns node with 20
```

Dry Run:

- For index 0 (<= length/2):
  - Start at head (5)
  - Return immediately
- For index 1 (> length/2):
  - Start at tail (20)
  - Return immediately

### 6. set(index, val)

```javascript
list.set(1, 25); // Changes 20 to 25
```

Dry Run:

- Get node at index 1 (20)
- Change its val to 25
- Returns true

### 7. insert(index, val)

```javascript
list.insert(1, 15); // List: 5 <-> 15 <-> 25
```

Dry Run:

- newNode = 15
- beforeNode = node at index 0 (5)
- afterNode = 5.next (25)
- Set 5.next = 15
- Set 15.prev = 5
- Set 15.next = 25
- Set 25.prev = 15
- length increases to 3

### 8. remove(index)

```javascript
list.remove(1); // Removes 15, returns its node
```

Dry Run:

- removedNode = node at index 1 (15)
- beforeNode = 15.prev (5)
- afterNode = 15.next (25)
- Set 5.next = 25
- Set 25.prev = 5
- Clean 15's links (next=null, prev=null)
- length decreases to 2
- Returns node with 15

### 9. reverse()

```javascript
list.reverse(); // List: 25 <-> 5
```

Dry Run:

- Before: head=5, tail=25
- Swap head and tail: head=25, tail=5
- Initialize: current=5 (original head)
- First iteration:
  - next = 5.next (25)
  - Reverse links: 5.next=null (prev was null), 5.prev=25
  - prev = 5, current = 25
- Second iteration:
  - next = 25.next (null)
  - Reverse links: 25.next=5, 25.prev=null
  - prev = 25, current = null
- Loop ends
- List is now reversed
