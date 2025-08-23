# Delete all occurrences of a given key in a doubly linked list

https://www.geeksforgeeks.org/problems/delete-all-occurrences-of-a-given-key-in-a-doubly-linked-list/1

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

### Approach 2: Recursive Deletion

A recursive approach where we process the current node and then recurse for the rest.

**Intuition**:

- Base case: empty list
- Process current head, then recursively process the rest
- Need to handle head updates carefully

```javascript
// Approach 2: Recursive Deletion
function deleteAllOccurrencesRecursive(head, key) {
  // Base case: empty list
  if (head === null) {
    return null;
  }

  // Process the rest of the list first
  const newNext = deleteAllOccurrencesRecursive(head.next, key);

  // If current node needs to be deleted
  if (head.data === key) {
    // Link the newNext's prev to our prev if exists
    if (newNext !== null) {
      newNext.prev = head.prev;
    }
    // Return the processed list (skip current node)
    return newNext;
  }

  // Current node stays - update its next
  head.next = newNext;
  if (newNext !== null) {
    newNext.prev = head;
  }
  return head;
}
```

**Time Complexity**: O(n)
**Space Complexity**: O(n) due to recursion stack

### Approach 3: Using Dummy Node

This approach uses a dummy node to simplify edge cases where the head needs to be deleted.

**Intuition**:

- Add a dummy node before the real head
- Process the list normally
- At the end, return dummy.next as the new head

```javascript
// Approach 3: Using Dummy Node
function deleteAllOccurrencesDummy(head, key) {
  // Create a dummy node before the head
  const dummy = new Node(0);
  dummy.next = head;
  if (head !== null) {
    head.prev = dummy;
  }

  let current = dummy.next;
  while (current !== null) {
    if (current.data === key) {
      // Bypass the current node
      current.prev.next = current.next;
      if (current.next !== null) {
        current.next.prev = current.prev;
      }
      // No need to update current.prev since we're moving forward
    }
    current = current.next;
  }

  // The new head is dummy.next (might be null)
  const newHead = dummy.next;
  if (newHead !== null) {
    newHead.prev = null; // Remove dummy's reference
  }
  return newHead;
}

// Utility function to print DLL
function printDLL(head) {
  let current = head;
  const result = [];
  while (current !== null) {
    result.push(current.data);
    current = current.next;
  }
  console.log(result.join("<->"));
}

// Utility function to create DLL from array
function createDLL(arr) {
  if (arr.length === 0) return null;
  const head = new Node(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    const newNode = new Node(arr[i]);
    current.next = newNode;
    newNode.prev = current;
    current = newNode;
  }
  return head;
}

// Testing the functions
const arr = [2, 2, 10, 8, 4, 2, 5, 2];
const key = 2;

console.log("Original DLL:");
let head = createDLL(arr);
printDLL(head);

console.log("\nAfter iterative deletion:");
head = createDLL(arr);
let newHead = deleteAllOccurrencesIterative(head, key);
printDLL(newHead);

console.log("\nAfter recursive deletion:");
head = createDLL(arr);
newHead = deleteAllOccurrencesRecursive(head, key);
printDLL(newHead);

console.log("\nAfter dummy node deletion:");
head = createDLL(arr);
newHead = deleteAllOccurrencesDummy(head, key);
printDLL(newHead);
```

**Time Complexity**: O(n)
**Space Complexity**: O(1)

## Solution Code (All Approaches)

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

**Example 3**: No nodes match key
Input: 1<->3<->5, Key = 2

1. 1 - keep
2. 3 - keep
3. 5 - keep
   Result: 1<->3<->5 (unchanged)

**Example 4**: Key at head and tail only
Input: 2<->1<->3<->2, Key = 2

1. First 2 is head - delete, newHead becomes 1
2. 1 - keep
3. 3 - keep
4. Last 2 - delete (3.next becomes null)
   Result: 1<->3

The iterative approach efficiently handles all cases with O(n) time and O(1) space, making it the optimal solution.
