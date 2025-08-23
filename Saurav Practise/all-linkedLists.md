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

---

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

2. **Example 3: Delete second last node**

   - Input: [1,2,3,4], delete node with value 3
   - Steps:
     - Copy next node's value (4) to current node: [1,2,4,4]
     - Skip the next node: [1,2,4]
   - Output: [1,2,4]

---

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

---

# 11th Aug 2025

# 876. Middle of the Linked List --1

Given the head of a singly linked list, return the middle node of the linked list.
If there are two middle nodes, return the second middle node.

Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.

Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

### Solution

FAILED IN EVEN LENGTH LL CASE

```javascript
/**
 * Find the middle node of a linked list
 * Approach: Fast pointer moves 2 steps, slow moves 1 step
 * When fast reaches end, slow is at middle
 */
// Definition for singly-linked list node
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Finds the middle node of a linked list using two pointers
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Middle node
 */
function middleNode(head) {
  // Edge case: if list is empty or has one node
  if (!head || !head.next) return head;

  // Initialize slow and fast pointers
  let slow = head;
  let fast = head;

  // Move slow by 1 and fast by 2 until fast reaches end
  while (fast && fast.next) {
    // FAILED== INTERCHANGES FAST AND SLOW INCREMENT POSITION AND CONDITION
    slow = slow.next; // Move slow one step
    fast = fast.next.next; // Move fast two steps
  }

  // Slow is now at the middle node
  return slow;
}

// Example usage:
const list = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
console.log(middleNode(list).val); // Output: 3
```

---

# 206. Reverse Linked List (Recurssive & Iterative) --2

ITERATIVE

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

## Time and Space Complexity Analysis

- **Time Complexity**: O(n) - We traverse the entire list once, where n is the number of nodes in the list.
- **Space Complexity**: O(1) - We use a constant amount of extra space regardless of the input size (just a few pointers).

An optimized recursive approach that uses tail recursion (though JavaScript engines generally don't optimize tail calls).

```javascript
/**
 * Tail recursive approach
 * Time Complexity: O(n)
 * Space Complexity: O(n) (not optimized in JS)
 */
function reverseLinkedListTailRecursive(head, previousNode = null) {
  if (head === null) {
    return previousNode;
  }

  const nextNode = head.next;
  head.next = previousNode;

  return reverseLinkedListTailRecursive(nextNode, head);
}
```

---

# 141. Linked List Cycle --3

```javascript
/**
 * Detect cycle in a linked list
 * Approach: If fast and slow meet, there's a cycle
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

---

# 142. Linked List Cycle II --4

Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.

Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.

Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.

To detect the start of a cycle in a linked list, we can use Floyd's Tortoise and Hare algorithm, which involves two pointers moving at different speeds. Here's the intuition behind it:

1. **Detecting a Cycle**:

   - Use a slow pointer (moves one step at a time) and a fast pointer (moves two steps at a time).
   - If there's a cycle, the fast pointer will eventually meet the slow pointer inside the cycle. If they don't meet, there's no cycle.

2. **Finding the Start of the Cycle**:
   - Once a cycle is detected, reset one pointer to the head of the list and keep the other at the meeting point.
   - Move both pointers one step at a time. The point where they meet again is the start of the cycle.

### Why This Works

- When the slow pointer enters the cycle, the fast pointer is already inside the cycle.
- The fast pointer catches up to the slow pointer at some point because it moves faster.
- The distance from the head to the cycle start is equal to the distance from the meeting point to the cycle start when moving around the cycle.

### JavaScript Code

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  // If list is empty or has only one node, no cycle possible
  if (!head || !head.next) return null;

  // Initialize slow and fast pointers
  let slowPointer = head;
  let fastPointer = head;

  // Phase 1: Detect if a cycle exists
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next; // Move one step
    fastPointer = fastPointer.next.next; // Move two steps
    // If pointers meet, a cycle exists
    if (slowPointer === fastPointer) break;
  }

  // If fastPointer reached the end, no cycle
  if (!fastPointer || !fastPointer.next) return null;

  // Phase 2: Find the cycle's start
  slowPointer = head; // Reset slow pointer to head
  while (slowPointer !== fastPointer) {
    slowPointer = slowPointer.next; // Move one step
    fastPointer = fastPointer.next; // Move one step
  }

  // The meeting point is the cycle's start
  return slowPointer;
};
```

---

# Length of Loop in LL --5

We need to determine if a linked list has a loop (cycle) and if so, calculate how many nodes are in that loop. A loop occurs when a node's next pointer points to a previous node in the list, creating a cycle.

## Intuition

The classic approach to detect a loop is Floyd's Tortoise and Hare algorithm (slow and fast pointers). The idea is:

- If there's a loop, the fast pointer will eventually catch up to the slow pointer inside the loop
- Once detected, we can count the nodes in the loop by keeping one pointer fixed and moving another until it comes back to the starting point

### 1. Floyd's Cycle-Finding Algorithm (Optimal)

- Use slow (moves 1 step) and fast (moves 2 steps) pointers
- If they meet, there's a cycle
- To find loop length, keep one pointer fixed and move another until it returns

## Solution Code

```javascript
/**
 * Definition for singly-linked list node
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Floyd's Cycle-Finding Algorithm (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function detectLoopAndCountFloyd(head) {
  if (!head || !head.next) return 0;

  let slow = head;
  let fast = head;

  // Detect loop
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Loop detected, now count nodes
      let count = 1;
      slow = slow.next;
      while (slow !== fast) {
        count++;
        slow = slow.next;
      }
      return count;
    }
  }

  return 0; // No loop found
}
```

---

# 234. Palindrome Linked List --6

## Reverse Second Half Approach (Optimal)

```javascript
function isPalindrome(head) {
  if (head === null || head.next === null) {
    return true;
  }

  // Step 1: Find the middle of the list
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half
  let prev = null;
  let current = slow;
  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  // Step 3: Compare first half and reversed second half
  let firstHalf = head;
  let secondHalf = prev;
  while (secondHalf !== null) {
    if (firstHalf.val !== secondHalf.val) {
      return false;
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  return true;
}
```

### 3. Recursive Approach

```javascript
function isPalindromeRecursive(head) {
  let frontPointer = head;

  function recursivelyCheck(currentNode) {
    if (currentNode !== null) {
      if (!recursivelyCheck(currentNode.next)) {
        return false;
      }
      if (currentNode.val !== frontPointer.val) {
        return false;
      }
      frontPointer = frontPointer.next;
    }
    return true;
  }

  return recursivelyCheck(head);
}
```

## Dry Runs

### Example 1: [1,2,2,1]

1. Array approach:

   - Array: [1,2,2,1]
   - Compare 1==1, 2==2 → true

2. Reverse second half:

   - Middle at second 2
   - Reverse second half: 1→2→null
   - Compare 1-1, 2-2 → true

3. Recursive:
   - Compare outermost 1-1, then inner 2-2 → true

### Example 2: [1,2]

1. Array approach:

   - Array: [1,2]
   - Compare 1≠2 → false

2. Reverse second half:

   - Middle at 2
   - Reverse second half: 2→null
   - Compare 1≠2 → false

3. Recursive:
   - Compare 1≠2 → false

### Example 3: [1,0,1]

1. Array approach:

   - Array: [1,0,1]
   - Compare 1==1, 0==0 → true

2. Reverse second half:

   - Middle at 0
   - Reverse second half: 1→0→null
   - Compare 1-1, 0-0 → true

3. Recursive:
   - Compare 1-1, then 0-0 → true

# 12th Aug 2025

# 328. Odd Even Linked List --1

Given the head of a singly linked list, group all nodes at odd positions (1st, 3rd, 5th, etc.) followed by nodes at even positions (2nd, 4th, 6th, etc.), while maintaining their relative order within each group.

The solution should have `O(1)` space complexity (in-place) and `O(n)` time complexity.

## Problem Understanding

- **Input**: Head of a singly linked list (e.g., `1 -> 2 -> 3 -> 4 -> 5`).
- **Task**: Reorder the list such that all nodes at odd indices (1-based indexing: 1st, 3rd, 5th, etc.) come first, followed by nodes at even indices (2nd, 4th, 6th, etc.). The first node is odd, the second is even, and so on.
- **Constraints**:
  - Maintain the `relative order` within odd and even groups.
  - Use `O(1)` extra space (excluding recursive call stack if applicable).
  - Achieve `O(n)` time complexity, where `n` is the number of nodes.
- **Examples**:
  - [1,2,3,4,5] → [1,3,5,2,4]
  - [2,1,3,5,6,4,7] → [2,3,6,7,1,5,4]

## Intuition:

The goal is to split the list into two groups (odd-indexed nodes and even-indexed nodes) while preserving their relative order and reconnecting them. Since we need `O(1)` extra space, we must manipulate the list in-place by adjusting the `next` pointers of the nodes.

**Key Insight:**

- The list can be thought of as interleaved odd and even nodes: `odd1 -> even1 -> odd2 -> even2 -> ....`
- We can separate the odd and even nodes into two sublists by adjusting pointers:
  - Odd nodes: `odd1 -> odd2 -> odd3 -> ...`
  - Even nodes: `even1 -> even2 -> even3 -> ...`
- Finally, connect the last odd node to the head of the even sublist.
- To achieve `O(1)` space, we avoid using additional data structures like arrays or temporary lists.
- To achieve `O(n)` time, we traverse the list once to rewire the pointers.

**Challenges:**

- Handle edge cases: empty list, single node, or two nodes.
- Ensure the relative order is preserved within each group.
- Manage pointer updates carefully to avoid breaking the list.

## Approach 1: Optimal In-Place Pointer Manipulation

**Intuition:**

- Use two pointers: one for the odd nodes and one for the even nodes.
- Traverse the list, rewiring the `next` pointers to separate odd and even nodes into two sublists.
- Keep track of the head of the even sublist to connect it to the end of the odd sublist.
- Adjust pointers in-place to achieve O(1) space complexity.

**Steps:**

- If the list is empty or has one node, return as is (no changes needed).
- Initialize `odd` pointer to the head (first odd node) and `even` pointer to the second node (first even node).
- Store the head of the even sublist (evenHead) for later connection.
- While there are nodes to process:
  - Set `odd.next` to the next odd node (skip the even node).
  - Set `even.next` to the next even node (skip the odd node).
  - Move `odd` and `even` pointers forward.
- Connect the last odd node to the head of the even sublist.
- Return the head of the reordered list.

```javascript
// Definition for singly-linked list node
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Reorders the linked list to group odd-indexed nodes followed by even-indexed nodes.
 * @param {ListNode} head - Head of the singly linked list
 * @return {ListNode} - Head of the reordered list
 */
function oddEvenList(head) {
  // Handle empty list or single node
  if (!head || !head.next) return head;

  // Initialize pointers
  let odd = head; // Points to current odd node
  let even = head.next; // Points to current even node
  let evenHead = head.next; // Store head of even sublist for final connection

  // Traverse and rewire pointers
  while (even && even.next) {
    // Connect odd node to next odd node (skip even)
    odd.next = even.next;
    odd = odd.next;

    // Connect even node to next even node (skip odd)
    even.next = odd.next;
    even = even.next;
  }

  // Connect last odd node to head of even sublist
  odd.next = evenHead;

  return head;
}
```

#### **Dry Run for Example 1:**

**Input:** `[1,2,3,4,5]`

1. Initial state:

   - `head = 1`,
   - `odd = 1, even = 2, evenHead = 2`

2. First iteration:

   - `odd.next = even.next → 1.next = 3`
   - `odd = odd.next → odd = 3`
   - `even.next = odd.next → 2.next = 4`
   - `even = even.next → even = 4`
   - `List: 1 -> 3, 2 -> 4 -> 5`

3. Second iteration:

   - `odd.next = even.next → 3.next = 5`
   - `odd = odd.next → odd = 5`
   - `even.next = odd.next → 4.next = null`
   - `even = even.next → even = null`
   - `List: 1 -> 3 -> 5, 2 -> 4`

4. Final Connection: `odd.next = evenHead → 5.next = 2`
5. Final list: `1 -> 3 -> 5 -> 2 -> 4`

**Output:** `[1,3,5,2,4]`

---

# 19. Remove Nth Node From End of List --2

We need to remove the `nth` node from the end of a singly-linked list and return the modified list's head.

### Key Observations:

1. In a singly-linked list, we can only traverse forward from any node.
2. We don't know the list's length beforehand (unless we count it, which would require a full traversal).
3. The challenge is to find the nth node from the end efficiently.

### Pattern Identification

This is a classic "two-pointer" technique problem in linked lists. The pattern involves:

- Maintaining a fixed distance between two pointers
- Moving them in sync until one reaches the end
- This allows us to find the nth-from-end node without knowing the total length first

1. **Two-pass approach**: First find the length, then remove (L-n+1)th node from start
2. **One-pass two-pointer approach**: Use fast and slow pointers with n nodes apart
3. **Stack-based approach**: Push all nodes to stack, then pop n times to find the node

### Approach 1: Two-pass (Calculate Length First)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function removeNthFromEnd(head, n) {
  // Calculate the length of the linked list
  let length = 0;
  let current = head;
  while (current !== null) {
    length++;
    current = current.next;
  }

  // Handle case where we need to remove the head
  if (n === length) {
    return head.next;
  }

  // Find the node before the one to remove
  let positionBeforeTarget = length - n - 1;
  current = head;
  for (let i = 0; i < positionBeforeTarget; i++) {
    current = current.next;
  }

  // Remove the target node
  current.next = current.next.next;

  return head;
}
```

### Approach 2: One-pass Two-pointer Technique

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  //var: fast, slow
  let fast = head,
    slow = head;
  // for loop to setup fast to maintain n steps ahead
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  // since fast is out of bounds head should be removed
  if (fast === null) {
    return head.next;
  }

  while (fast?.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return head;
};
```

---

# 2095. Delete the Middle Node of a Linked List --3

The problem requires us to delete the middle node of a linked list. The middle node is defined as the node at position ⌊n/2⌋ in a 0-based index, where n is the length of the list.

### Key Observations:

1. We need to find the middle node to delete it.
2. To delete a node in a linked list, we need access to the node before it so we can adjust its `next` pointer.
3. The challenge is efficiently finding the middle node, especially in a single pass.

### Pattern Identification:

This is a classic linked list problem that uses the "slow and fast pointer" technique, commonly used for:

- Finding the middle of a linked list
- Detecting cycles in a linked list
- Finding the kth node from the end

The pattern involves two pointers moving at different speeds to efficiently find a specific position in the list.

## Slow-Fast Pointer Approach (Optimal)

- Use two pointers: slow and fast.
- Fast pointer moves two steps at a time, slow moves one step.
- When fast reaches the end, slow will be at the middle.
- Maintain a previous pointer to the node before slow.
- Time Complexity: O(n)
- Space Complexity: O(1)

```javascript
function deleteMiddle(head) {
  if (!head || !head.next) return null; // If list is empty or has only one node

  let slow = head;
  let fast = head;
  let prev = null; // To keep track of the node before slow

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  // Now slow is at the middle node, prev is before it
  prev.next = slow.next;

  return head;
}
```

## Dry Run Examples

Input: [1,3,4,7,1,2,6]

**Slow-Fast Pointer:**

- Initial: slow=1, fast=1
- Step 1: slow=3, fast=4
- Step 2: slow=4, fast=1
- Step 3: slow=7, fast=6 (fast.next is null, stop)
- prev=4, slow=7
- Delete 7: 4.next = 7.next (which is 1)
- Output: [1,3,4,1,2,6]

# 13th Aug

# 148. Sort List

Given the head of a linked list, return the list after sorting it in ascending order.

Input: head = [4,2,1,3] Output: [1,2,3,4]
Input: head = [-1,5,3,4,0] Output: [-1,0,3,4,5]
Input: head = [] Output: []

## Problem Understanding

We need to sort a singly linked list in ascending order. The challenge is that linked lists don't allow random access like arrays, so we can't use standard sorting algorithms directly.

## Approaches

There are several approaches to sort a linked list:

1. **Convert to Array, Sort, and Rebuild**:
2. **Insertion Sort**:

   - Build the sorted list one node at a time
   - For each node, find its correct position in the sorted part

3. **Merge Sort (Top-Down)**:

   - Split the list into two halves recursively
   - Merge the sorted halves back together

4. **Merge Sort (Bottom-Up)**:
   - Start by sorting sublists of size 1
   - Repeatedly merge sorted sublists, doubling the size each time

The most efficient approach for linked lists is Merge Sort (O(n log n) time complexity with O(1) space for bottom-up or O(log n) space for recursive).

## Pattern Identification

This is a classic "divide and conquer" problem where:

- We split the list into smaller sublists
- Sort those sublists
- Merge them back together

The linked list structure makes merge sort particularly suitable because:

1. We can split lists in O(1) time
2. Merging doesn't require extra space like with arrays

### Approach 3: Merge Sort (Top-Down Recursive)

```javascript
function sortList(head) {
  if (!head || !head.next) return head;

  // Split the list into two halves
  const [left, right] = splitList(head);

  // Recursively sort each half
  const sortedLeft = sortList(left);
  const sortedRight = sortList(right);

  // Merge the sorted halves
  return mergeLists(sortedLeft, sortedRight);
}

function splitList(head) {
  let slow = head;
  let fast = head.next;

  // Fast moves two steps, slow moves one step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  const right = slow.next;
  slow.next = null; // Break the link

  return [head, right];
}

function mergeLists(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  // Attach remaining elements
  tail.next = l1 || l2;

  return dummy.next;
}
```

# 160. Intersection of Two Linked Lists

Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

refer to leetcode for better understanding

## Problem Understanding

We need to find the node where two singly-linked lists intersect. The intersection is defined by reference (memory address), not just value. If there's no intersection, we return null.

## Intuition

The key observation is that after the intersection point, both lists share the same nodes. The challenge is that the lists may have different lengths before the intersection.

## Brute Force (Nested Loops)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

// Approach 1: Brute Force - Nested Loops
const getIntersectionNodeBruteForce = function (headA, headB) {
  let currentA = headA;

  while (currentA !== null) {
    let currentB = headB;
    while (currentB !== null) {
      if (currentA === currentB) {
        return currentA; // Intersection found
      }
      currentB = currentB.next;
    }
    currentA = currentA.next;
  }

  return null; // No intersection
};
```

**Time Complexity:** `O(m*n)`  
**Space Complexity:** `O(1)`

## Two Pointers (Optimal)

```javascript
// Approach 3: Two Pointers (Optimal)
const getIntersectionNode = function (headA, headB) {
  // Handle edge cases: if either list is empty
  if (!headA || !headB) return null;

  // Initialize two pointers
  let pointerA = headA;
  let pointerB = headB;

  // Traverse until pointers meet or both reach null
  while (pointerA !== pointerB) {
    // Move pointerA to next node
    pointerA = pointerA ? pointerA.next : headB;
    // Move pointerB to next node
    pointerB = pointerB ? pointerB.next : headA;
  }

  // Return intersection node (or null if no intersection)
  return pointerA;
};
```

**Time Complexity:** O(m+n)  
**Space Complexity:** O(1)

## Optimal Approach Explanation (Two Pointers)

The two-pointer approach works because:

1. Both pointers traverse the same total distance (lengthA + lengthB)
2. If there's an intersection, they'll meet at the intersection point
3. If there's no intersection, they'll both become null at the same time

### Dry Run Examples

**Example 1: Given Test Case**

ListA: `4 -> 1 -> 8 -> 4 -> 5`
ListB: `5 -> 6 -> 1 -> 8 -> 4 -> 5`
Intersection at node with value `8`

- Initialize: `pointerA` = headA (4), `pointerB` = headB (5).
- Step 1: `pointerA` = 1, `pointerB` = 6 (not equal).
- Step 2: `pointerA` = 8, `pointerB` = 1 (not equal).
- Step 3: `pointerA` = 4, `pointerB` = 8 (not equal).
- Step 4: `pointerA` = 5, `pointerB` = 4 (not equal).
- Step 5: `pointerA` = null, `pointerB` = 5 (not equal).
- Step 6: `pointerA` = headB (5), `pointerB` = null (not equal).
- Step 7: `pointerA` = 6, `pointerB` = headA (4) (not equal).
- Step 8: `pointerA` = 1, `pointerB` = 1 (not equal, different nodes).
- Step 9: `pointerA` = 8, `pointerB` = 8 (equal, same node).

Return: Node with value 8.
Output: Intersected at 8.

---

# Sort 0's 1's 2's in LL

Given the head of a linked list where nodes can contain values 0s, 1s, and 2s only. Your task is to rearrange the list so that all 0s appear at the beginning, followed by all 1s, and all 2s are placed at the end.

**Input** : 1 → 2 → 2 → 1 → 2 → 0 → 2 → 2  
**Output**: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2

### Intuition and Approach

**Counting Approach**:

- Traverse the linked list and count the number of `0`s, `1`s, and `2`s.
- Then, reconstruct the linked list by first adding all `0`s, then `1`s, and finally `2`s.

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function segregate012Counting(head) {
  let count0 = 0,
    count1 = 0,
    count2 = 0;
  let current = head;

  // Count the number of 0s, 1s, and 2s
  while (current !== null) {
    if (current.val === 0) {
      count0++;
    } else if (current.val === 1) {
      count1++;
    } else if (current.val === 2) {
      count2++;
    }
    current = current.next;
  }

  current = head;

  // Overwrite the list with 0s, 1s, and 2s in order
  while (current !== null) {
    if (count0 > 0) {
      current.val = 0;
      count0--;
    } else if (count1 > 0) {
      current.val = 1;
      count1--;
    } else if (count2 > 0) {
      current.val = 2;
      count2--;
    }
    current = current.next;
  }

  return head;
}
```

## Approach 2: Pointer Manipulation (Dutch National Flag)

```javascript
function segregate012Pointers(head) {
  // Create 3 notes for 0,1,2's
  let zeroLL = new Node(0);
  let oneLL = new Node(0);
  let twoLL = new Node(0);

  //Get current values of new LL to variables
  let zero = zeroLL;
  let one = oneLL;
  let two = twoLL;

  let current = head;

  // Segregate nodes into three lists
  while (current) {
    if (current.data === 0) {
      zero.next = current;
      zero = zero.next;
    } else if (current.data === 1) {
      one.next = current;
      one = one.next;
    } else {
      two.next = current;
      two = two.next;
    }
    // Move to next node
    current = current.next;
  }

  // Set next of last node of each list to null
  one.next = twoLL.next;
  two.next = null;

  // Connect zeroLL, oneLL and twoLL lists
  if (oneLL.next) {
    zero.next = oneLL.next;
  } else {
    zero.next = twoLL.next;
  }

  // Update head
  return (head = zeroLL.next);
}
```

### Dry Run Examples

#### Example 1:

**Input**: 1 → 2 → 2 → 1 → 2 → 0 → 2 → 2  
**Counting Approach**:

- Counts: 0s=1, 1s=2, 2s=5
- Reconstruct: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2  
  **Pointer Manipulation**:
- Dummy0: 0
- Dummy1: 1 → 1
- Dummy2: 2 → 2 → 2 → 2 → 2
- Merged: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2  
  **Output**: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2

#### Example 2:

**Input**: 2 → 1 → 0  
**Counting Approach**:

- Counts: 0s=1, 1s=1, 2s=1
- Reconstruct: 0 → 1 → 2  
  **Pointer Manipulation**:
- Dummy0: 0
- Dummy1: 1
- Dummy2: 2
- Merged: 0 → 1 → 2  
  **Output**: 0 → 1 → 2

---

# 14th Aug 2025

# 15th Aug 2025

# 16th aug

# Adding 1 to a Number Represented by a Linked List

## Problem Understanding

- The linked list represents a number where each node’s data is a digit, and the digits are concatenated from head to tail to form the number. For example:
  Input: 4->5->6 represents 456.

- Adding 1 gives 457, so the output linked list is 4->5->7.

**Edge cases to consider:**

- Single node: 9 + 1 (becomes 10, i.e., 1->0).

- All 9’s: 9->9->9 + 1 (becomes 1000, i.e., 1->0->0->0).

- Large numbers: 1->2->3->4 + 1(becomes 1->2->3->5).

- Leading zeros in the result (not applicable since the input is a valid number starting with a non-zero digit).

- The challenge is to handle the carry that propagates when adding 1, especially in cases where the carry affects multiple nodes or adds a new node (e.g., 9->9 becomes 1->0->0).

### Approach 1: Convert to Number, Add 1, Convert Back

1. Traverse the linked list and convert it to a number
2. Add 1 to the number
3. Convert the result back to a linked list

### Approach 2: Reverse List, Add with Carry, Reverse Back

1. Reverse the linked list
2. Add 1 to the first node, propagating any carry
3. Reverse the list back to original order

```javascript
// Approach 2: Reverse List, Add with Carry, Reverse Back
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function addOneReverse(head) {
  if (!head) return new ListNode(1);

  // Reverse the linked list
  let reversed = reverseList(head);
  let current = reversed;
  let carry = 1; // We want to add 1

  while (current) {
    const sum = current.data + carry;
    current.data = sum % 10;
    carry = Math.floor(sum / 10);

    if (!current.next && carry > 0) {
      current.next = new ListNode(carry);
      carry = 0;
    }

    current = current.next;
  }

  // Reverse back and return
  return reverseList(reversed);
}
```

# LC-2. Add Two Numbers

### Problem Pattern Identification

This problem involves adding two numbers represented as linked lists where each node contains a digit of the number in reverse order. The key pattern here is **linked list traversal with carry propagation**, similar to how you would manually add numbers digit by digit from the least significant digit (rightmost) to the most significant digit (leftmost).

### Intuition and Approach

1. **Intuition**: Since the digits are stored in reverse order, the head of the linked list represents the least significant digit. This makes it straightforward to add corresponding digits from both lists along with any carry from the previous addition, just like how you would add numbers on paper.
2. **Approach**:
   - Traverse both linked lists simultaneously.
   - Add corresponding digits along with any carry from the previous addition.
   - The sum digit is `(sum % 10)`, and the new carry is `Math.floor(sum / 10)`.
   - If one list is exhausted before the other, continue with the remaining list, adding digits with the carry.
   - After both lists are exhausted, if there's any remaining carry, add it as a new node.

### Solution Approaches in JavaScript

#### Approach 1: Iterative Approach

This is the most straightforward approach where we iterate through both lists, add the digits, handle the carry, and build the result list.

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.next = (next===undefined ? null : next);
 * }
 */

/**
 * Adds two numbers represented as linked lists (digits stored in reverse order).
 * @param {ListNode} l1 - First linked list representing a number.
 * @param {ListNode} l2 - Second linked list representing a number.
 * @return {ListNode} - Result linked list representing the sum.
 */
function addTwoNumbers(l1, l2) {
  // Create a dummy head node to simplify the code (avoids extra checks for the first node)
  let dummyHead = new ListNode(0);
  // `current` will be used to traverse and build the result list
  let current = dummyHead;
  // `carry` stores the carry-over from each digit addition
  let carry = 0;

  // Loop until both lists are fully traversed and no carry remains
  while (l1 !== null || l2 !== null || carry !== 0) {
    // Extract the current digit from each list (0 if the list is exhausted)
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    // Compute the sum of current digits and any carry from the previous step
    const sum = val1 + val2 + carry;
    // Update carry for the next iteration (carry = sum / 10)
    carry = Math.floor(sum / 10);
    // Create a new node with the digit value (sum % 10)
    current.next = new ListNode(sum % 10);
    // Move `current` to the newly created node
    current = current.next;

    // Move to the next nodes in the input lists (if they exist)
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  // The result starts from `dummyHead.next` (since `dummyHead` was just a placeholder)
  return dummyHead.next;
}
```

### Time and Space Complexity Analysis

- **Time Complexity**: `O(max(n, m))` where `n` and `m` are the lengths of the two linked lists. We traverse each list once.
- **Space Complexity**:
  - Iterative: `O(max(n, m))` for the result linked list.
  - Recursive: `O(max(n, m))` for the recursion stack and the result linked list.

### Dry Run of Optimal (Iterative) Approach

#### Example 1: Normal Case

Input: `l1 = [2,4,3]`, `l2 = [5,6,4]`

- Initial: carry = 0, dummyHead -> 0, current -> dummyHead
- Step 1: val1=2, val2=5, sum=7, carry=0, current.next=7
- Step 2: val1=4, val2=6, sum=10, carry=1, current.next=0
- Step 3: val1=3, val2=4, sum=8 (3+4+1), carry=0, current.next=8
- Result: `[7,0,8]`

#### Example 2: Different Lengths

Input: `l1 = [9,9,9,9,9,9,9]`, `l2 = [9,9,9,9]`

- Initial: carry = 0
- Step 1-4: Add corresponding digits, carry propagates.
- Step 5-7: Continue with l1, adding digits with carry.
- Final carry=1, add new node.
- Result: `[8,9,9,9,0,0,0,1]`

#### Example 3: Edge Case (One List Empty)

Input: `l1 = [0]`, `l2 = [0]`

- Initial: carry = 0
- Step 1: val1=0, val2=0, sum=0, carry=0, current.next=0
- Result: `[0]`

### Optimal Approach

The iterative approach is optimal because:

- It avoids the overhead of recursion (stack frames).
- It handles all edge cases (different lengths, final carry) gracefully.
- It is easy to understand and implement.

# Delete all occurrences of a key in DLL

## Problem Understanding

We need to delete all nodes containing a given key from a doubly linked list (DLL). The solution should handle cases where:

- The key is at the head
- The key is at the tail
- The key is in the middle
- The key appears consecutively
- The list becomes empty after deletions

## Approaches

### Approach 1: Iterative Deletion

This is the most straightforward approach where we iterate through the list and delete nodes matching the key.

**Intuition**:

A doubly linked list allows traversal in both directions, and each node has prev and next pointers, making deletion easier than in a singly linked list. To delete a node:

- Locate the node with the given key.
- Update pointers:
  - Connect the previous node’s next to the next node.
  - Connect the next node’s prev to the previous node.
- Handle special cases:
  -If the node is the head, update the head to the next node.
  - If the node is the tail, update the previous node’s next to null.
  - If the list becomes empty, return null.

We can approach this by:

- Iterating through the list and checking each node’s value.
- Adjusting pointers when a matching node is found.
- Ensuring the head is correctly updated if the first node(s) are deleted.

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

// Approach 1: Iterative Deletion
function deleteAllOccurrencesIterative(head, key) {
  let current = head;
  let newHead = head;

  while (current !== null) {
    if (current.data === key) {
      // If node to be deleted is head
      if (current === newHead) {
        newHead = current.next;
      }

      // Change next only if node to be deleted is NOT the last node
      if (current.next !== null) {
        current.next.prev = current.prev;
      }

      // Change prev only if node to be deleted is NOT the first node
      if (current.prev !== null) {
        current.prev.next = current.next;
      }

      // Move to next node (which could be null if we deleted the last node)
      const nextNode = current.next;
      current.next = null;
      current.prev = null;
      current = nextNode;
    } else {
      current = current.next;
    }
  }

  return newHead;
}
```

**Time Complexity**: O(n) - we traverse the list once
**Space Complexity**: O(1) - we use constant extra space

## Dry Run of Optimal Approach (Iterative)

**Example 1**: Normal case
Input: 2<->2<->10<->8<->4<->2<->5<->2, Key = 2

1. Start at first 2 (head) - delete it, newHead becomes next 2
2. Current is next 2 - delete it, newHead becomes 10
3. Current is 10 - keep
4. Current is 8 - keep
5. Current is 4 - keep
6. Current is 2 - delete (4.next becomes 5, 5.prev becomes 4)
7. Current is 5 - keep
8. Current is last 2 - delete (5.next becomes null)
   Result: 10<->8<->4<->5

**Example 2**: All nodes match key
Input: 2<->2<->2, Key = 2

1. First 2 is head - delete, newHead becomes next 2
2. Next 2 is now head - delete, newHead becomes last 2
3. Last 2 is now head - delete, newHead becomes null
   Result: empty list

---

# Find pairs with given sum in DLL

## Problem Understanding

We need to find all pairs of distinct nodes in a sorted doubly linked list where the sum of their values equals a given target.

## Intuition

Since the list is sorted, we can use a two-pointer approach similar to what we'd use with a sorted array. One pointer starts at the beginning (smallest values) and another at the end (largest values), moving them inward based on whether their sum is less than or greater than the target.

## Approaches

### Approach 1: Brute Force (Nested Loops)

- For each node, iterate through all subsequent nodes to check for pairs
- Time complexity: O(n²)
- Space complexity: O(1)

### Approach 2: Hash Table

- Traverse the list once, storing seen values in a hash table
- For each node, check if (target - current value) exists in the hash table
- Time complexity: O(n)
- Space complexity: O(n)

### Approach 3: Two Pointers (Optimal for Sorted List)

- Use two pointers starting at head and tail
- Move pointers inward based on whether their sum is less than or greater than target
- Time complexity: O(n)
- Space complexity: O(1)

## Solution Code (All Approaches)

```javascript
// Approach 1: Brute Force (Nested Loops)
function findPairsBruteForce(dll, target) {
  const pairs = [];
  let current = dll.head;

  // Outer loop for first element of pair
  while (current !== null) {
    let runner = current.next;

    // Inner loop for second element of pair
    while (runner !== null) {
      if (current.data + runner.data === target) {
        pairs.push([current.data, runner.data]);
      }
      runner = runner.next;
    }
    current = current.next;
  }

  return pairs;
}

// Approach 2: Hash Table
function findPairsHashTable(head, target) {
  const pairs = [];
  const seenValues = new Set();
  let current = head;

  while (current !== null) {
    const complement = target - current.data;

    // Check if complement exists in seen values
    if (seenValues.has(complement)) {
      pairs.push([complement, current.data]);
    }

    // Add current value to seen values
    seenValues.add(current.data);
    current = current.next;
  }

  return pairs;
}
```

---

# Remove duplicates from sorted DLL

## Intuition

In a sorted doubly linked list, all duplicate nodes will be adjacent to each other. We can take advantage of this property to efficiently remove duplicates by traversing the list once and skipping over duplicate nodes.

## Approaches

### 1. Iterative Approach (Optimal)

- Traverse the list while comparing each node with its next node
- If duplicates are found, adjust pointers to skip the duplicate
- Handle edge cases like empty list or single node list

### 2. Hash Set Approach (Alternative)

- Use a hash set to track seen values
- Remove nodes whose values are already in the set
- This works for unsorted lists too but uses extra space

## Optimal Solution (Iterative Approach)

```javascript
class Node {
  constructor(data) {
    this.data = data; // Store the data
    this.prev = null; // Pointer to previous node
    this.next = null; // Pointer to next node
  }
}

function removeDuplicates(head) {
  // If list is empty or has only one node, no duplicates possible
  if (head === null || head.next === null) {
    return head;
  }

  let current = head; // Start from the head of the list

  while (current && current.next) {
    if (current.data === current.next.data) {
      // Found a duplicate
      let duplicate = current.next; // Store the duplicate node
      current.next = duplicate.next; // Skip the duplicate

      if (duplicate.next !== null) {
        duplicate.next.prev = current; // Update prev pointer of next node if it exists
      }

      // Clean up references (optional in JavaScript due to garbage collection)
      duplicate.prev = null;
      duplicate.next = null;
    } else {
      current = current.next; // Move to next node if no duplicate
    }
  }

  return head; // Return the modified list
}
```

## Time and Space Complexity Analysis

**Iterative Approach:**

- Time Complexity: O(n) - We traverse the list once
- Space Complexity: O(1) - We use constant extra space

**Hash Set Approach:**

- Time Complexity: O(n) - We traverse the list once
- Space Complexity: O(n) - In worst case we store all values in the hash set

## Dry Run Examples

### Example 1: Normal case with duplicates

Input: 1<->1<->1<->2<->3<->4

1. Start at first 1, compare with next (1) - duplicate found
   - Skip the second 1, list: 1<->1<->2<->3<->4
2. Still at first 1, compare with next (1) - duplicate found
   - Skip the next 1, list: 1<->2<->3<->4
3. Move to 2, compare with 3 - no duplicate
4. Move to 3, compare with 4 - no duplicate
   Output: 1<->2<->3<->4

---
