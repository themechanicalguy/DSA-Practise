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

# LC-237 Deleting a Node in a Singly-Linked List (JavaScript)

In this problem, we need to delete a given node from a singly-linked list when we don't have access to the head node. Here are all possible approaches to solve this problem in JavaScript:

## Approach 1: Copy Next Node's Value and Delete Next Node

This is the optimal approach since we can't access the previous node directly in a singly-linked list.

```javascript
/**
 * Definition for singly-linked list node
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * Delete a node (except the tail) in a singly-linked list, given only access to that node.
 * @param {ListNode} node - The node to be deleted
 * @return {void} Do not return anything, modify the linked list in-place instead.
 */
function deleteNode(node) {
  // Since we can't access the previous node, we copy the next node's value
  // to the current node and then skip the next node
  node.val = node.next.val; // Copy the value from next node
  node.next = node.next.next; // Skip the next node
}
```

### Dry Run Examples:

1. **Example 1: Delete middle node**

   - Input: [4,5,1,9], delete node with value 5
   - Steps:
     - Copy next node's value (1) to current node: node.val = 1 → [4,1,1,9]
     - Skip the next node: node.next = node.next.next → [4,1,9]
   - Output: [4,1,9]

2. **Example 2: Delete first node (when node is head)**

   - Input: [1,2,3,4], delete node with value 1
   - Steps:
     - Copy next node's value (2) to current node: [2,2,3,4]
     - Skip the next node: [2,3,4]
   - Output: [2,3,4]

3. **Example 3: Delete second last node**

   - Input: [1,2,3,4], delete node with value 3
   - Steps:
     - Copy next node's value (4) to current node: [1,2,4,4]
     - Skip the next node: [1,2,4]
   - Output: [1,2,4]

4. **Example 4: List with only two nodes**

   - Input: [1,2], delete node with value 1
   - Steps:
     - Copy next node's value (2) to current node: [2,2]
     - Skip the next node: [2]
   - Output: [2]

5. **Example 5: Long list delete**
   - Input: [1,2,3,4,5,6,7], delete node with value 4
   - Steps:
     - Copy next node's value (5) to current node: [1,2,3,5,5,6,7]
     - Skip the next node: [1,2,3,5,6,7]
   - Output: [1,2,3,5,6,7]

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

    let curr = this.head; // Store current head

    // If new head exists
    if (curr) curr.next.prev = null; // Remove its prev reference

    // Move head to next node
    this.head = curr.next;

    this.length--; // Decrement length
    return curr; // Return removed node
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

# Reversing a Singly Linked List in JavaScript

Given a singly linked list, reverse the order of its nodes. For example, if the input is 1 -> 2 -> 3 -> 4, the output should be 4 -> 3 -> 2 -> 1.

## Intuition and Approach

To reverse a singly linked list, we need to change the direction of each node’s pointer to point to its previous node instead of the next one. Since a singly linked list only has forward pointers (next), we must traverse the list and adjust pointers carefully to avoid losing track of nodes.
The optimal approach to reverse a singly linked list involves iterating through the list while reversing the links between nodes.
We maintain **three pointers**:

- `previousNode`: Tracks the node that will become the next node in the reversed list
- `currentNode`: The current node being processed
- `nextNode`: Temporarily stores the next node before we modify the current node's pointer

**Pointer Manipulation**: For each node, we:

- Save the next node (next = current.next).
- Reverse the link by pointing current.next to previous.
- Move previous and current one step forward.

**Edge Cases:**

- Empty list (head is null): Return null.
- Single node (head.next is null): Return the same node.
- Multiple nodes: Reverse as described.

This iterative approach is optimal because it uses constant extra space (just three pointers) and traverses the list once.

```javascript
/**
 * Definition for singly-linked list node
 */
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Iterative approach using three pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function reverseLinkedListIterative(head) {
  let previousNode = null;
  let currentNode = head;
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
```

**Time Complexity**: O(n) - We traverse the entire list once, where n is the number of nodes in the list.
**Space Complexity**: O(1) - We use a constant amount of extra space regardless of the input size (just a few pointers).

## Dry run

### inp

```
1 → 2 → 3 → 4 → 5 → null
```

## op

```
5 → 4 → 3 → 2 → 1 → null
```

### Initial State:

- `previousNode = null`
- `currentNode = 1` (head of the list)
- `nextNode = null`

#### **Step 1: First Iteration (currentNode = 1)**

1. **Store next node**:  
   `nextNode = currentNode.next` → `nextNode = 2`
2. **Reverse the link**:  
   `currentNode.next = previousNode` → `1.next = null`  
   Now: `1 → null`
3. **Move pointers**:
   - `previousNode = currentNode` → `previousNode = 1`
   - `currentNode = nextNode` → `currentNode = 2`

**List State**:

```
1 → null
2 → 3 → 4 → 5 → null
```

#### **Step 2: Second Iteration (currentNode = 2)**

1. **Store next node**:  
   `nextNode = currentNode.next` → `nextNode = 3`
2. **Reverse the link**:  
   `currentNode.next = previousNode` → `2.next = 1`  
   Now: `2 → 1 → null`
3. **Move pointers**:
   - `previousNode = currentNode` → `previousNode = 2`
   - `currentNode = nextNode` → `currentNode = 3`

**List State**:

```
2 → 1 → null
3 → 4 → 5 → null
```

#### **Step 3: Third Iteration (currentNode = 3)**

1. **Store next node**:  
   `nextNode = currentNode.next` → `nextNode = 4`
2. **Reverse the link**:  
   `currentNode.next = previousNode` → `3.next = 2`  
   Now: `3 → 2 → 1 → null`
3. **Move pointers**:
   - `previousNode = currentNode` → `previousNode = 3`
   - `currentNode = nextNode` → `currentNode = 4`

**List State**:

```
3 → 2 → 1 → null
4 → 5 → null
```

#### **Step 4: Fourth Iteration (currentNode = 4)**

1. **Store next node**:  
   `nextNode = currentNode.next` → `nextNode = 5`
2. **Reverse the link**:  
   `currentNode.next = previousNode` → `4.next = 3`  
   Now: `4 → 3 → 2 → 1 → null`
3. **Move pointers**:
   - `previousNode = currentNode` → `previousNode = 4`
   - `currentNode = nextNode` → `currentNode = 5`

**List State**:

```
4 → 3 → 2 → 1 → null
5 → null
```

#### **Step 5: Fifth Iteration (currentNode = 5)**

1. **Store next node**:  
   `nextNode = currentNode.next` → `nextNode = null`
2. **Reverse the link**:  
   `currentNode.next = previousNode` → `5.next = 4`  
   Now: `5 → 4 → 3 → 2 → 1 → null`
3. **Move pointers**:
   - `previousNode = currentNode` → `previousNode = 5`
   - `currentNode = nextNode` → `currentNode = null`

**List State**:

```
5 → 4 → 3 → 2 → 1 → null
```

#### **Termination (currentNode = null)**

- The loop ends because `currentNode` is now `null`.
- `previousNode` holds the new head (`5`).

```
5 → 4 → 3 → 2 → 1 → null
```

---
