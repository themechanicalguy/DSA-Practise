# Linked Lists in JavaScript

A linked list is a linear data structure where elements (called nodes) are stored in a non-contiguous manner. Each node contains two parts:

1. `data` - stores the value
2. `next` - stores a reference (pointer) to the next node in the sequence

- Unlike arrays, linked lists do not store elements in contiguous memory locations, allowing for efficient insertion and deletion operations. The list is accessed starting from the head (the first node) and ends at the tail (the last node, which points to null).

The linked list itself typically maintains references to:

- `head` - Points to the first node.
- `tail` - Points to the last node. (optional, but useful for efficient operations)

## Types of Linked Lists

1. **Singly Linked List** - Each node points only to the next node
2. **Doubly Linked List** - Each node points to both next and previous nodes
3. **Circular Linked List** - The last node points back to the first node

## JavaScript Implementation

### Node Class

```javascript
class Node {
  constructor(data) {
    this.data = data; // Store the value
    this.next = null; // Pointer to next node (initially null)
  }
}
```

### Singly Linked List

**Description**

- Each node contains data and a reference to the next node. The last node’s next points to null.

**Traversal**

- Only forward traversal is possible.

**Use Case**

- Simple sequences, like a playlist of songs.

```javascript
class LinkedList {
  constructor() {
    this.head = null; // First node in the list
    this.tail = null; // Last node in the list
  }

  // Add to the end of the list
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      // If list is empty, new node is both head and tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add to end and update tail
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Add to the beginning of the list
  prepend(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  // Delete a node with given data
  delete(data) {
    if (!this.head) return;

    // If head needs to be deleted
    if (this.head.data === data) {
      this.head = this.head.next;
      // If list becomes empty, update tail
      if (!this.head) this.tail = null;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        // If we deleted the tail, update it
        if (!current.next) this.tail = current;
        return;
      }
      current = current.next;
    }
  }

  // Print all nodes
  print() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    console.log(values.join(" -> "));
  }
}
```

### Example Usage

```javascript
const list = new LinkedList();

list.append(10); // List: 10
list.append(20); // List: 10 -> 20
list.prepend(5); // List: 5 -> 10 -> 20
list.append(30); // List: 5 -> 10 -> 20 -> 30
list.delete(20); // List: 5 -> 10 -> 30

list.print(); // Output: 5 -> 10 -> 30
```

## Other Types of Linked Lists (Conceptual)

### 1. Doubly Linked List

Each node would have:

- `data`
- `next` (pointer to next node)
- `prev` (pointer to previous node)

The list would have:

- `head`
- `tail`

### 2. Circular Linked List

Similar to singly linked list but the last node's `next` points back to the `head`.

## Advantages of Linked Lists

- Dynamic size (no need to pre-allocate memory)
- Efficient insertions/deletions at both ends (O(1) with tail pointer)
- No wasted memory (only allocates what's needed)

## Disadvantages

- No random access (must traverse from head to reach a node)
- Extra memory needed for pointers
- Cache performance is worse than arrays (nodes not contiguous in memory)
