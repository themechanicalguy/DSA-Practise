# Linked List Problem Patterns in JavaScript

Linked list problems often follow certain patterns that can help you identify and solve them efficiently. Here are the most common patterns with examples and solutions in JavaScript:

## 1. Two Pointers Technique

- Uses two pointers moving at different speeds (e.g., one moves one step, the other two steps) to detect properties like cycles, midpoints, or specific nodes.

# Approach:

- Use two pointers: slow (moves one step) and fast (moves two steps).
- When fast reaches the end, slow will be at the middle.
- Handle edge cases (empty list or single node).

### a. Fast and Slow Pointers (Hare & Tortoise)

**Use cases**: Finding middle, detecting cycles, palindrome checking

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

/**
 * Detect cycle in a linked list
 * Approach: If fast and slow meet, there's a cycle
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

### b. Separated Pointers

**Use cases**: Finding nth node from end, intersection of two lists

```javascript
/**
 * Find the nth node from the end
 * Approach: Move fast n steps ahead, then move both until fast reaches end
 */
function findNthFromEnd(head, n) {
  let fast = head;
  let slow = head;

  // Move fast n nodes ahead
  for (let i = 0; i < n; i++) {
    if (fast === null) return null; // List shorter than n
    fast = fast.next;
  }

  // Move both until fast reaches end
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}
```

## 2. Reversal Techniques

### a. Full Reversal

**Use cases**: Reversing entire list, palindrome checking

```javascript
/**
 * Reverse a linked list
 * Approach: Iterative with prev, current, and next pointers
 */
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next; // Temporarily store next node
    current.next = prev; // Reverse current node's pointer
    prev = current; // Move prev to current
    current = next; // Move to next node
  }

  return prev; // New head
}
```

### b. Partial Reversal

**Use cases**: Reversing sublists, reversing in groups

```javascript
/**
 * Reverse a sublist between positions m and n
 * Approach: Find start of sublist, reverse it, then reconnect
 */
function reverseBetween(head, m, n) {
  if (!head || m === n) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  // Move prev to node before sublist
  for (let i = 0; i < m - 1; i++) {
    prev = prev.next;
  }

  let start = prev.next;
  let then = start.next;

  // Reverse the sublist
  for (let i = 0; i < n - m; i++) {
    start.next = then.next;
    then.next = prev.next;
    prev.next = then;
    then = start.next;
  }

  return dummy.next;
}
```

## 3. Dummy Node Technique

- Uses a dummy node to simplify operations like modifying the head, merging lists, or handling edge cases.

# Approach:

- Create a dummy node pointing to the head to handle cases where the head needs to be removed.

- Traverse the list, updating pointers to skip nodes with the target value.

- Return the new head (dummy.next).

**Use cases**: Merging lists, removing nodes, when new head might change

```javascript
/**
 * Merges two sorted linked lists into one sorted list
 * @param {ListNode} l1 - Head of first list
 * @param {ListNode} l2 - Head of second list
 * @return {ListNode} - Head of merged list
 */
function mergeTwoLists(l1, l2) {
  // Create dummy node for result
  let dummy = new ListNode(0);
  let current = dummy;

  // Compare and merge nodes
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // Append remaining nodes
  current.next = l1 ? l1 : l2;

  // Return merged list
  return dummy.next;
}

// Example usage:
const l1 = new ListNode(1, new ListNode(3));
const l2 = new ListNode(2, new ListNode(4));
console.log(mergeTwoLists(l1, l2)); // Output: 1 -> 2 -> 3 -> 4

/**
 * Remove all nodes with given value
 * Approach: Dummy node handles case where head needs removal
 */
/**
 * Removes all nodes with a given value from a linked list
 * @param {ListNode} head - Head of the linked list
 * @param {number} val - Value to remove
 * @return {ListNode} - Head of modified list
 */
function removeElements(head, val) {
  // Create a dummy node to handle head removal
  let dummy = new ListNode(0);
  dummy.next = head;

  // Initialize current pointer to dummy
  let current = dummy;

  // Traverse the list
  while (current.next) {
    // If next node's value matches val, skip it
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      // Move to next node
      current = current.next;
    }
  }

  // Return head of modified list
  return dummy.next;
}

// Example usage:
const list = new ListNode(
  1,
  new ListNode(2, new ListNode(6, new ListNode(3, new ListNode(6))))
);
console.log(removeElements(list, 6)); // Output: 1 -> 2 -> 3
```

## 4. Length and Count Based

**Use cases**: Intersection point, rotation, splitting lists

```javascript
/**
 * Find intersection node of two linked lists
 * Approach: Align start points by equalizing lengths
 */
function getIntersectionNode(headA, headB) {
  let lenA = getLength(headA);
  let lenB = getLength(headB);

  // Move longer list's head forward to align
  while (lenA > lenB) {
    headA = headA.next;
    lenA--;
  }

  while (lenB > lenA) {
    headB = headB.next;
    lenB--;
  }

  // Now move both until they meet
  while (headA !== headB) {
    headA = headA.next;
    headB = headB.next;
  }

  return headA;
}

function getLength(head) {
  let length = 0;
  while (head !== null) {
    length++;
    head = head.next;
  }
  return length;
}
```

## 5. Multiple List Traversal

**Use cases**: Adding two numbers represented as lists, merging k lists

```javascript
/**
 * Add two numbers represented as linked lists (digits in reverse order)
 * Approach: Simulate addition digit by digit with carry
 */
function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const val1 = l1 !== null ? l1.val : 0;
    const val2 = l2 !== null ? l2.val : 0;

    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  return dummy.next;
}
```

## 6. Node Manipulation

**Use cases**: Swapping nodes, reordering lists, odd-even lists

```javascript
/**
 * Swap nodes in pairs
 * Approach: Swap adjacent nodes by manipulating pointers
 */
function swapPairs(head) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;

  while (current.next !== null && current.next.next !== null) {
    let first = current.next;
    let second = current.next.next;

    // Swap nodes
    first.next = second.next;
    second.next = first;
    current.next = second;

    // Move to next pair
    current = current.next.next;
  }

  return dummy.next;
}

/**
 * Reorder list in L0→Ln→L1→Ln-1→L2→Ln-2→… order
 * Approach: Find middle, reverse second half, then merge
 */
function reorderList(head) {
  if (!head || !head.next) return;

  // Find middle
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let prev = null;
  let curr = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Merge two halves
  let first = head;
  let second = prev;
  while (second.next) {
    const temp1 = first.next;
    const temp2 = second.next;

    first.next = second;
    second.next = temp1;

    first = temp1;
    second = temp2;
  }
}
```

## 7. Cycle Detection and Handling

**Use cases**: Finding cycle start node, cycle length

```javascript
/**
 * Detect cycle and return node where cycle begins
 * Approach: After fast and slow meet, reset slow to head and move both at same speed
 */
function detectCycle(head) {
  let slow = head;
  let fast = head;

  // Find meeting point
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Cycle detected, find start
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }

  return null; // No cycle
}
```

## 8. Partitioning

- Rearranges nodes around a pivot or value, often splitting the list into two parts.

# Approach:

- Use two dummy nodes to create two lists: one for nodes < x, one for nodes >= x.
- Merge the two lists at the end.

```javascript
/**
 * Partitions a linked list around a value x
 * @param {ListNode} head - Head of the linked list
 * @param {number} x - Partition value
 * @return {ListNode} - Head of partitioned list
 */
function partition(head, x) {
  // Create two dummy nodes for smaller and larger lists
  let smallDummy = new ListNode(0);
  let largeDummy = new ListNode(0);

  // Pointers for building the two lists
  let small = smallDummy;
  let large = largeDummy;

  // Traverse the list
  let current = head;
  while (current) {
    if (current.val < x) {
      small.next = current;
      small = small.next;
    } else {
      large.next = current;
      large = large.next;
    }
    current = current.next;
  }

  // Connect the two lists
  large.next = null; // End the larger list
  small.next = largeDummy.next; // Connect smaller to larger

  // Return head of partitioned list
  return smallDummy.next;
}

// Example usage:
const list = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2))));
console.log(partition(list, 3)); // Output: 1 -> 2 -> 4 -> 3
```

## 9. Sliding Window (for k-sized operations)

- Processes nodes in groups of size k, often used for reversing or rearranging segments.

# Approach:

- Check if there are at least k nodes remaining.

- Reverse the next k nodes and recursively process the rest.

- Use a helper function to reverse a segment.

```javascript
/**
 * Reverses every k nodes in a linked list
 * @param {ListNode} head - Head of the linked list
 * @param {number} k - Group size
 * @return {ListNode} - Head of modified list
 */
function reverseKGroup(head, k) {
  // Helper function to reverse a segment of k nodes
  function reverseSegment(start, end) {
    let prev = null;
    let current = start;
    while (current !== end) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return prev;
  }

  // Edge case: empty or single node
  if (!head || k === 1) return head;

  // Count k nodes
  let current = head;
  let count = 0;
  while (current && count < k) {
    current = current.next;
    count++;
  }

  // If k nodes exist, reverse them
  if (count === k) {
    // Recursively reverse the rest of the list
    let reversedNext = reverseKGroup(current, k);
    // Reverse current k nodes
    let newHead = reverseSegment(head, current);
    // Connect to the next segment
    head.next = reversedNext;
    return newHead;
  }

  // Return unchanged if fewer than k nodes
  return head;
}

// Example usage:
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(reverseKGroup(list, 2)); // Output: 2 -> 1 -> 4 -> 3
```

## 10. Recursive Traversal

- Uses recursion to traverse or modify the list, often for problems requiring backtracking or restructuring.

# Approach:

- Recursively swap the next pair of nodes.
- Adjust the current node’s next pointer to point to the swapped pair.
- Handle base cases (empty or single node).

```javascript
/**
 * Swaps every two adjacent nodes in a linked list
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - Head of modified list
 */
function swapPairs(head) {
  // Base case: empty or single node
  if (!head || !head.next) return head;

  // Store pointer to next node
  let nextNode = head.next;

  // Recursively swap the rest of the list
  let swapped = swapPairs(nextNode.next);

  // Connect current node to swapped list
  head.next = swapped;

  // Return new head after swap
  return nextNode;
}

// Example usage:
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(swapPairs(list)); // Output: 2 -> 1 -> 4 -> 3
```

# How to Identify Patterns in Linked List Problems

Recognizing patterns in linked list problems is a skill that improves with practice. Here's a systematic approach to identify which pattern applies to a given problem:

## 1. Analyze the Problem Requirements

First, carefully read the problem statement and identify what it's asking you to do with the linked list:

- **Traversal**: Do you need to simply traverse the list?
- **Searching**: Are you looking for specific nodes or values?
- **Modification**: Does the list need to be modified (reversed, reordered, etc.)?
- **Multiple Lists**: Does the problem involve more than one linked list?
- **Cycle Detection**: Is there any mention of cycles or circular references?

## 2. Look for Keywords and Clues

Certain keywords often hint at specific patterns:

| Keyword/Clue                  | Possible Pattern                    |
| ----------------------------- | ----------------------------------- |
| "Middle of the list"          | Fast & slow pointers                |
| "Cycle", "Loop"               | Cycle detection (Floyd's algorithm) |
| "Reverse"                     | Reversal techniques                 |
| "Nth node from end"           | Two pointers with offset            |
| "Merge", "Combine"            | Dummy node technique                |
| "Intersection", "Common node" | Length comparison or hashing        |
| "Palindrome"                  | Reversal of second half             |
| "Swap nodes"                  | Pointer manipulation                |
| "Odd/even positions"          | Node separation and merging         |

## 3. Consider the Constraints

- **Time complexity requirements**: O(1) space often requires pointer manipulation
- **Space complexity requirements**: O(n) space might allow hashing solutions
- **Modification allowed**: Some problems forbid modifying the original list

## 4. Problem Classification Framework

Use this decision tree to identify patterns:

1. **Does it involve finding a specific position/node?**

   - From start: Simple traversal
   - From end: Two pointers with offset
   - Middle: Fast & slow pointers

2. **Does it require list modification?**

   - Full reversal: Iterative/recursive reversal
   - Partial reversal: Identify sublist first
   - Node removal: Dummy node often helpful
   - Node swapping: Temporary pointer storage

3. **Does it involve multiple lists?**

   - Merging: Dummy node technique
   - Intersection: Length comparison or hashing
   - Addition: Digit-by-digit simulation

4. **Is there any mention of cycles?**

   - Detection: Fast & slow pointers
   - Start node: Floyd's algorithm
   - Length: Count nodes between meetings

5. **Does it require reordering or rearrangement?**
   - Odd-even: Separate and merge
   - Zig-zag: Multiple pointer manipulation
   - Group reversal: Combine reversal with counting

## 5. Examples of Pattern Identification

### Example 1: "Find the middle node of a linked list"

- Keywords: "middle"
- Pattern: Fast & slow pointers
- Why: Fast pointer reaches end when slow is at middle

### Example 2: "Determine if a linked list has a cycle"

- Keywords: "cycle"
- Pattern: Floyd's cycle detection (fast & slow pointers)
- Why: Only way to detect cycle in O(1) space

### Example 3: "Reverse nodes in groups of k"

- Keywords: "reverse", "groups of k"
- Pattern: Partial reversal with counting
- Why: Need to reverse sublists of specific length

### Example 4: "Merge two sorted linked lists"

- Keywords: "merge", "sorted"
- Pattern: Dummy node technique
- Why: Need to build new list without losing references

## 6. Practice Recognition Techniques

1. **Pattern Matching**: After solving a problem, categorize it by pattern
2. **Variation Analysis**: Notice how small changes affect pattern choice
3. **Multiple Approaches**: Consider solving with different patterns to compare
4. **Common Combinations**: Some problems combine patterns (e.g., find middle then reverse)

## 7. Decision Checklist

When facing a new problem, ask:

1. Does it involve position finding? → Two pointers
2. Does it require reversal? → Reversal techniques
3. Does it involve multiple lists? → Dummy nodes
4. Is there a cycle? → Floyd's algorithm
5. Does it need node rearrangement? → Pointer manipulation
6. Is there a length requirement? → Count nodes first

## 8. JavaScript Example with Pattern Identification

**Problem**: "Given a linked list, swap every two adjacent nodes and return its head."

**Pattern Identification**:

1. Keyword: "swap every two adjacent nodes" → Node manipulation
2. Need to modify links between nodes → Pointer manipulation
3. Edge case: Head might change → Dummy node helpful

**Solution**:

```javascript
function swapPairs(head) {
  // Dummy node handles edge case of changing head
  const dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;

  while (current.next && current.next.next) {
    // Nodes to be swapped
    const first = current.next;
    const second = current.next.next;

    // Swapping
    first.next = second.next;
    second.next = first;
    current.next = second;

    // Move to next pair
    current = current.next.next;
  }

  return dummy.next;
}
```

**Patterns Used**:

1. Dummy node technique (for edge cases)
2. Pointer manipulation (node swapping)

By systematically analyzing problems using this approach, you'll become faster at recognizing which pattern to apply to solve linked list problems efficiently.
