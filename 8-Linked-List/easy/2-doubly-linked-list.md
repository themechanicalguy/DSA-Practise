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

# Doubly Linked List Implementation Without Tail Property

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
    this.length = 0; // Number of nodes in the list
  }

  // Add a node to the end of the list - O(n) time, O(1) space
  push(val) {
    const newNode = new Node(val); // Create new node

    if (this.length === 0) {
      // If list is empty
      this.head = newNode; // Set new node as head
    } else {
      let current = this.head;
      while (current.next) {
        // Traverse to last node
        current = current.next;
      }
      current.next = newNode; // Set new node as next of last node
      newNode.prev = current; // Set last node as prev of new node
    }
    this.length++; // Increment length
    return this; // Return the list
  }

  // Remove and return the last node - O(n) time, O(1) space
  pop() {
    if (this.length === 0) return undefined; // Empty list case

    let current = this.head;
    while (current.next) {
      // Traverse to last node
      current = current.next;
    }

    if (this.length === 1) {
      // Only one node case
      this.head = null;
    } else {
      current.prev.next = null; // Remove reference to last node
    }

    this.length--; // Decrement length
    return current; // Return removed node
  }

  // Remove and return the first node - O(1) time, O(1) space
  shift() {
    if (this.length === 0) return undefined; // Empty list case

    const oldHead = this.head; // Store current head
    this.head = oldHead.next; // Move head to next node

    if (this.head) {
      // If new head exists
      this.head.prev = null; // Remove its prev reference
    }

    this.length--; // Decrement length
    return oldHead; // Return removed node
  }

  // Add a node to the beginning - O(1) time, O(1) space
  unshift(val) {
    const newNode = new Node(val); // Create new node

    if (this.length === 0) {
      // Empty list case
      this.head = newNode;
    } else {
      newNode.next = this.head; // Point new node to current head
      this.head.prev = newNode; // Point current head back to new node
      this.head = newNode; // Update head to new node
    }

    this.length++; // Increment length
    return this; // Return the list
  }

  // Get node at specific index - O(n) time, O(1) space
  get(index) {
    if (index < 0 || index >= this.length) return null; // Invalid index

    let current = this.head;
    for (let i = 0; i < index; i++) {
      // Traverse to index
      current = current.next;
    }

    return current; // Return node at index
  }

  // Set value of node at specific index - O(n) time, O(1) space
  set(index, val) {
    const node = this.get(index); // Get node at index
    if (!node) return false; // If node doesn't exist

    node.val = val; // Update node's value
    return true; // Return success
  }

  // Insert node at specific index - O(n) time, O(1) space
  insertAt(index, val) {
    if (index < 0 || index > this.length) return false; // Invalid index
    if (index === 0) return !!this.unshift(val); // Insert at start
    if (index === this.length) return !!this.push(val); // Insert at end

    const newNode = new Node(val); // Create new node
    const beforeNode = this.get(index - 1); // Get node before insertion point
    const afterNode = beforeNode.next; // Get node after insertion point

    // Update links for new node
    newNode.prev = beforeNode;
    newNode.next = afterNode;

    // Update links of surrounding nodes
    beforeNode.next = newNode;
    afterNode.prev = newNode;

    this.length++; // Increment length
    return true; // Return success
  }

  // Remove node at specific index - O(n) time, O(1) space
  remove(index) {
    if (index < 0 || index >= this.length) return undefined; // Invalid index
    if (index === 0) return this.shift(); // Remove from start
    if (index === this.length - 1) return this.pop(); // Remove from end

    const removedNode = this.get(index); // Get node to remove

    // Update links of surrounding nodes to bypass removed node
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;

    this.length--; // Decrement length
    return removedNode; // Return removed node
  }

  // Print the list values - O(n) time, O(1) space
  print() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.val);
      current = current.next;
    }
    console.log(values.join(" <-> "));
  }

  // Reverse the list - O(n) time, O(1) space
  reverse() {
    let current = this.head;
    let temp = null;

    while (current) {
      // Swap next and prev pointers
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;

      // Move to next node (which is now prev due to swap)
      current = current.prev;
    }

    // Update head to point to new first node
    if (temp) {
      this.head = temp.prev;
    }

    return this;
  }
}
```

## Time and Space Complexity Analysis

1. **push(val)**: O(n) time (must traverse entire list), O(1) space
2. **pop()**: O(n) time (must traverse entire list), O(1) space
3. **shift()**: O(1) time, O(1) space
4. **unshift(val)**: O(1) time, O(1) space
5. **get(index)**: O(n) time (worst case), O(1) space
6. **set(index, val)**: O(n) time (due to get), O(1) space
7. **insertAt(index, val)**: O(n) time (worst case), O(1) space
8. **remove(index)**: O(n) time (worst case), O(1) space
9. **print()**: O(n) time, O(n) space (for storing values)
10. **reverse()**: O(n) time, O(1) space

## Dry Run Examples

### Example 1: Basic Operations

```javascript
const dll = new DoublyLinkedList();
dll.push(10); // List: 10
dll.push(20); // List: 10 <-> 20
dll.push(30); // List: 10 <-> 20 <-> 30
dll.unshift(5); // List: 5 <-> 10 <-> 20 <-> 30
dll.pop(); // Removes 30, List: 5 <-> 10 <-> 20
dll.shift(); // Removes 5, List: 10 <-> 20
dll.print(); // Output: 10 <-> 20
```

### Example 2: Edge Cases

```javascript
const dll = new DoublyLinkedList();
dll.pop(); // Returns undefined (empty list)
dll.push(100); // List: 100
dll.pop(); // Removes 100, List is empty
dll.push(200); // List: 200
dll.shift(); // Removes 200, List is empty
dll.insertAt(0, 50); // List: 50
dll.remove(0); // Removes 50, List is empty
dll.print(); // Output: (empty)
```

### Example 3: Complex Operations

```javascript
const dll = new DoublyLinkedList();
dll.push(1).push(2).push(3); // List: 1 <-> 2 <-> 3
dll.insertAt(1, 1.5); // List: 1 <-> 1.5 <-> 2 <-> 3
dll.set(2, 99); // List: 1 <-> 1.5 <-> 99 <-> 3
dll.remove(1); // Removes 1.5, List: 1 <-> 99 <-> 3
dll.reverse(); // List: 3 <-> 99 <-> 1
dll.get(1).val; // Returns 99
dll.print(); // Output: 3 <-> 99 <-> 1
```

This implementation maintains all the functionality of a doubly linked list without using a tail property, though some operations (like push and pop) become O(n) instead of O(1) since we need to traverse the entire list to reach the end.
