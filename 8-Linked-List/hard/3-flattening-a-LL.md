# Flattening a Sorted Linked List with Sub-Linked Lists

<!-- https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1 -->

Given a linked list containing n head nodes where every node in the linked list contains two pointers:
(i) next points to the next node in the list.
(ii) bottom pointer to a sub-linked list where the current node is the head.
Each of the sub-linked lists nodes and the head nodes are sorted in ascending order based on their data.
Your task is to flatten the linked list such that all the nodes appear in a single level while maintaining the sorted order.

Note:

1. ↓ represents the bottom pointer and -> represents the next pointer.
2. The flattened list will be printed using the bottom pointer instead of the next pointer.

## Problem Understanding

We have a linked list where each node has:

- `next` pointer to the next main list node
- `bottom` pointer to a sub-linked list where the current node is the head

All lists (main and sub-lists) are already sorted in ascending order. We need to flatten this structure into a single sorted linked list.

## Intuition

This problem is similar to merging multiple sorted lists. The main approaches are:

1. **Recursive Merge**: Treat each node's sub-list as a separate list and recursively merge them.
2. **Iterative Merge**: Iterate through the main list and merge each sub-list one by one.
3. **Priority Queue/Min-Heap**: Use a heap to efficiently get the next smallest node from all lists.

The most efficient approach for this specific problem is the iterative merge since it has O(1) space complexity (if done in-place) and reasonable time complexity.

## Approach 1: Recursive Merge (Top-Down)

```javascript
/**
 * Node class for the linked list
 */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Points to next node in main list
    this.bottom = null; // Points to sub-linked list
  }
}

/**
 * Recursively merges two sorted linked lists
 */
function mergeSortedLists(a, b) {
  if (!a) return b;
  if (!b) return a;

  let result;

  if (a.data < b.data) {
    result = a;
    result.bottom = mergeSortedLists(a.bottom, b);
  } else {
    result = b;
    result.bottom = mergeSortedLists(a, b.bottom);
  }

  result.next = null; // Important as we're working with bottom pointers
  return result;
}

/**
 * Recursive approach to flatten the list
 */
function flattenRecursive(head) {
  // Base cases
  if (!head || !head.next) {
    return head;
  }

  // Recur for the next node in main list
  head.next = flattenRecursive(head.next);

  // Now merge current node's sublist with the already flattened next
  head = mergeSortedLists(head, head.next);

  return head;
}
```

**Time Complexity**: O(n\*m) where n is number of main nodes and m is average length of sublists. This is because we're merging lists one by one.

**Space Complexity**: O(n) for recursion stack in worst case (when main list is not flattened).

## Approach 2: Iterative Merge (Bottom-Up)

```javascript
/**
 * FLATTEN A MULTI-LEVEL SORTED LINKED LIST (ITERATIVE BOTTOM-UP APPROACH)
 *
 * This approach flattens a linked list where each node may contain a sublist,
 * with all lists being pre-sorted in ascending order. The solution merges lists
 * iteratively from the bottom up, resulting in O(1) space complexity.
 *
 * Key Characteristics:
 * - In-place merging (no extra space for new nodes)
 * - Processes one sublist at a time
 * - Maintains sorted order during merging
 * - Handles edge cases (empty list, no sublists)
 *
 * Intuition:
 * 1. Treat each main node as the head of a sorted sublist
 * 2. Iteratively merge adjacent sublists
 * 3. Use a bottom-up merge strategy to minimize pointer manipulation
 *
 * Visual Representation:
 *
 * Before:
 * 5 -> 10 -> 19 -> 28
 * |    |     |     |
 * 7    20    22    35
 * |          |     |
 * 8          50    40
 * |                |
 * 30               45
 *
 * After:
 * 5 -> 7 -> 8 -> 10 -> 19 -> 20 -> 22 -> 28 -> 30 -> 35 -> 40 -> 45 -> 50
 *
 * Complexity Analysis:
 * - Time: O(n*m) where n = main nodes, m = average sublist length
 *   (Each node is processed exactly once during merging)
 * - Space: O(1) (in-place pointer manipulation)
 */

/**
 * Merges two sorted linked lists using bottom pointers
 * @param {Node} a - Head of first sorted list
 * @param {Node} b - Head of second sorted list
 * @returns {Node} - Head of merged list
 *
 * Process:
 * 1. Create dummy node to simplify edge cases
 * 2. Compare nodes from both lists
 * 3. Attach smaller node to merged list
 * 4. Continue until one list is exhausted
 * 5. Attach remaining nodes
 */
function mergeSortedListsIterative(a, b) {
  const dummy = new Node(0); // Temporary starting point
  let tail = dummy; // Pointer to build merged list

  while (a && b) {
    // Attach smaller node to merged list
    if (a.data < b.data) {
      tail.bottom = a;
      a = a.bottom;
    } else {
      tail.bottom = b;
      b = b.bottom;
    }
    tail = tail.bottom; // Move tail forward
  }

  // Attach remaining elements
  tail.bottom = a || b;
  return dummy.bottom; // Return head of merged list
}

/**
 * Flattens multi-level sorted linked list iteratively
 * @param {Node} head - Head of the main linked list
 * @returns {Node} - Head of flattened list
 *
 * Algorithm Steps:
 * 1. Initialize current pointer at head
 * 2. While current exists:
 *    a. If current has a sublist:
 *       - Merge sublist with next main node's list
 *    b. Else:
 *       - Connect directly to next node
 *    c. Move current forward
 * 3. Return modified head
 *
 * Note:
 * - We destroy the next pointers during flattening
 * - All connections are made via bottom pointers
 */
function flattenIterative(head) {
  if (!head) return null; // Edge case: empty list

  let current = head;

  while (current) {
    if (current.bottom) {
      // Merge current's sublist with the next main list
      current.bottom = mergeSortedListsIterative(
        current.bottom, // Sublist
        current.next // Next main node (which may have its own sublist)
      );
    } else {
      // If no sublist, just connect to next node
      current.bottom = current.next;
    }

    // Important: Break the next pointer to prevent cycles
    current.next = null;

    // Move to next node in the merged list
    current = current.bottom;
  }

  return head; // Head remains the same, but structure is flattened
}

// Utility function to print flattened list (for verification)
function printFlattenedList(head) {
  let current = head;
  const values = [];
  while (current) {
    values.push(current.data);
    current = current.bottom;
  }
  console.log(values.join(" -> "));
}
```

**Time Complexity**: O(n\*m) same as recursive but with better constant factors.
**Space Complexity**: O(1) as we're doing it in-place without recursion.

## Approach 3: Using Priority Queue (Min-Heap)

```javascript
/**
 * Priority Queue implementation for Nodes
 */
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].data <= this.heap[index].data) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      const leftChildIdx = 2 * index + 1;
      const rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.data < element.data) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.data < element.data) ||
          (swap !== null && rightChild.data < leftChild.data)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

/**
 * Flatten using priority queue
 */
function flattenWithPriorityQueue(head) {
  if (!head) return null;

  const pq = new PriorityQueue();
  let current = head;

  // Add all nodes (main and sublists) to the priority queue
  while (current) {
    pq.enqueue(current);
    let subCurrent = current.bottom;
    while (subCurrent) {
      pq.enqueue(subCurrent);
      subCurrent = subCurrent.bottom;
    }
    current = current.next;
  }

  // Build the flattened list
  const dummy = new Node(0);
  let tail = dummy;

  while (!pq.isEmpty()) {
    const node = pq.dequeue();
    tail.bottom = node;
    tail = tail.bottom;
    tail.next = null; // Important to break any existing next pointers
  }

  return dummy.bottom;
}
```

**Time Complexity**: O(N log N) where N is total number of nodes (from all lists). Each insertion and extraction from heap takes O(log N).
**Space Complexity**: O(N) for storing all nodes in the heap.

## Optimal Approach Analysis

The iterative merge approach (Approach 2) is optimal for this problem because:

1. It works in-place without extra space (O(1) space)
2. It has reasonable time complexity (O(n\*m))
3. It's simple and easy to implement

## Dry Run Examples

### Example 1: Simple Case

```
5 -> 10 -> 19 -> 28
|    |     |     |
7    20    22    35
|          |     |
8          50    40
|                |
30               45
```

**Steps:**

1. Merge 5's sublist (5->7->8->30) with 10's main node
   - Result: 5->7->8->10->20->30
2. Merge this with 19's sublist (19->22->50)
   - Result: 5->7->8->10->19->20->22->30->50
3. Merge this with 28's sublist (28->35->40->45)
   - Final: 5->7->8->10->19->20->22->28->30->35->40->45->50

### Example 2: Empty List

```
null
```

**Result:** null

### Example 3: No Sublists

```
1 -> 2 -> 3 -> 4
```

**Result:** 1 -> 2 -> 3 -> 4 (unchanged)

## Final Implementation (Optimal Approach)

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.bottom = null;
  }
}

function mergeSortedLists(a, b) {
  const dummy = new Node(0);
  let tail = dummy;

  while (a && b) {
    if (a.data < b.data) {
      tail.bottom = a;
      a = a.bottom;
    } else {
      tail.bottom = b;
      b = b.bottom;
    }
    tail = tail.bottom;
  }

  tail.bottom = a || b;
  return dummy.bottom;
}

function flatten(head) {
  if (!head) return null;

  let current = head;

  while (current) {
    if (current.bottom) {
      // Merge current's sublist with the next main list
      current.bottom = mergeSortedLists(current.bottom, current.next);
      // The next pointer is now part of the merged list via bottom pointers
    } else {
      // If no sublist, just connect to next (which will be processed next)
      current.bottom = current.next;
    }
    current.next = null; // Important to break the next pointer
    current = current.bottom;
  }

  return head;
}

// Utility function to print the flattened list (for testing)
function printFlattenedList(head) {
  let current = head;
  const result = [];
  while (current) {
    result.push(current.data);
    current = current.bottom;
  }
  console.log(result.join(" -> "));
}

// Test case 1
const node1 = new Node(5);
node1.bottom = new Node(7);
node1.bottom.bottom = new Node(8);
node1.bottom.bottom.bottom = new Node(30);

const node2 = new Node(10);
node2.bottom = new Node(20);

const node3 = new Node(19);
node3.bottom = new Node(22);
node3.bottom.bottom = new Node(50);

const node4 = new Node(28);
node4.bottom = new Node(35);
node4.bottom.bottom = new Node(40);
node4.bottom.bottom.bottom = new Node(45);

node1.next = node2;
node2.next = node3;
node3.next = node4;

console.log("Original structure flattened:");
printFlattenedList(flatten(node1));

// Test case 2 - empty list
console.log("Empty list:");
printFlattenedList(flatten(null));

// Test case 3 - no sublists
const nodeA = new Node(1);
const nodeB = new Node(2);
const nodeC = new Node(3);
nodeA.next = nodeB;
nodeB.next = nodeC;

console.log("No sublists:");
printFlattenedList(flatten(nodeA));
```

This implementation provides an efficient in-place solution with O(1) space complexity and O(n\*m) time complexity, which is optimal for this problem.
