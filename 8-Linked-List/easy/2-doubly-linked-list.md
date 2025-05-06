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
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add a node to the end
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // Remove a node from the end
  pop() {
    if (!this.head) return undefined;
    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  // Remove a node from the beginning
  shift() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  // Add a node to the beginning
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // Get a node at a specific index
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current, count;
    if (index <= this.length / 2) {
      // Start from head
      count = 0;
      current = this.head;
      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      // Start from tail
      count = this.length - 1;
      current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }

  // Set the value of a node at a specific index
  set(index, val) {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  // Insert a node at a specific position
  insertAt(pos, val) {
    if (pos < 0 || pos > this.length) return false;
    if (pos === 0) return !!this.unshift(val);
    if (pos === this.length) return !!this.push(val);

    const newNode = new Node(val);
    const beforeNode = this.get(pos - 1);
    const afterNode = beforeNode.next;

    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;

    this.length++;
    return true;
  }

  // Remove a node at a specific position
  removeAt(pos) {
    if (pos < 0 || pos >= this.length) return undefined;
    if (pos === 0) return this.shift();
    if (pos === this.length - 1) return this.pop();

    const removedNode = this.get(pos);
    const beforeNode = removedNode.prev;
    const afterNode = removedNode.next;

    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    removedNode.next = null;
    removedNode.prev = null;

    this.length--;
    return removedNode;
  }

  // Remove a node with specific value
  remove(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) {
        if (current === this.head) return this.shift();
        if (current === this.tail) return this.pop();

        const beforeNode = current.prev;
        const afterNode = current.next;

        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;
        current.next = null;
        current.prev = null;

        this.length--;
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  // Reverse the list
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let next = null;
    let prev = null;

    while (current) {
      next = current.next;
      current.next = prev;
      current.prev = next;
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

Dry run:

- Initial: head=null, tail=null, length=0
- push(10): head=10, tail=10, length=1
- push(20): head=10, tail=20, 10.next=20, 20.prev=10, length=2
- push(30): head=10, tail=30, 20.next=30, 30.prev=20, length=3

### 2. pop()

```javascript
list.pop(); // returns node with 30
```

Dry run:

- Before: head=10, tail=30, length=3
- After: tail=20, 20.next=null, length=2
- Returned node: 30 (with prev=20, next=null)

### 3. shift()

```javascript
list.shift(); // returns node with 10
```

Dry run:

- Before: head=10, tail=20, length=2
- After: head=20, 20.prev=null, length=1
- Returned node: 10 (with next=20, prev=null)

### 4. unshift(val)

```javascript
list.unshift(5); // list becomes 5->20
```

Dry run:

- Before: head=20, tail=20, length=1
- After: head=5, tail=20, 5.next=20, 20.prev=5, length=2

### 5. get(index)

```javascript
list.get(1); // returns node with 20
```

Dry run:

- List: 5->20
- Since index=1 > length/2 (1 > 1), start from tail
- Start at tail (20), index=1, return 20

### 6. set(index, val)

```javascript
list.set(1, 25); // changes 20 to 25, returns true
```

Dry run:

- Uses get(1) to find node (20)
- Changes node.val to 25
- Returns true

### 7. insertAt(pos, val)

```javascript
list.insertAt(1, 15); // list becomes 5->15->25
```

Dry run:

- Before: 5->25, length=2
- Get node before position (5)
- Create new node (15)
- Set 5.next=15, 15.prev=5, 15.next=25, 25.prev=15
- length=3

### 8. removeAt(pos)

```javascript
list.removeAt(1); // removes 15, returns node with 15
```

Dry run:

- Before: 5->15->25, length=3
- Get node at position 1 (15)
- Set 5.next=25, 25.prev=5
- Remove 15's next and prev pointers
- length=2
- Return node with 15

### 9. remove(val)

```javascript
list.remove(25); // removes 25, returns node with 25
```

Dry run:

- Before: 5->25, length=2
- Find node with val=25 (tail)
- Call pop() internally
- Set tail=5, 5.next=null
- length=1
- Return node with 25

### 10. reverse()

```javascript
list.push(10).push(20).reverse(); // list becomes 20->10->5
```

Dry run:

- Start with list: 5->10->20
- Swap head (5) and tail (20)
- For each node:
  - 5: next=null (was 10), prev=10 (was null)
  - 10: next=5 (was 20), prev=20 (was 5)
  - 20: next=10 (was null), prev=null (was 10)
- Final order: 20->10->5

This implementation provides all the basic operations for a doubly linked list with O(1) operations for head/tail insertions/deletions and O(n) for other operations.
