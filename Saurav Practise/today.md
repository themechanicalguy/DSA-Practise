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

# 12th Aug 2025

# 13th Aug 2025

# 14th Aug 2025

# 15th Aug 2025

```

```

```

```
