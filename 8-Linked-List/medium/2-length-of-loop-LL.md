# GFG Detecting Loop in a Linked List and Finding Loop Length

https://www.geeksforgeeks.org/problems/find-length-of-loop/1

## Problem Understanding

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

// Helper function to create linked list with loop for testing
function createLinkedListWithLoop(arr, loopPos) {
  if (!arr.length) return null;

  const head = new ListNode(arr[0]);
  let current = head;
  let loopNode = null;
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
    count++;
    if (count === loopPos) {
      loopNode = current;
    }
  }

  if (loopPos > 0) {
    current.next = loopNode;
  }

  return head;
}

// Test cases
const example1 = createLinkedListWithLoop([1, 2, 3, 4, 5], 2);
console.log(detectLoopAndCountFloyd(example1)); // Output: 4

const example2 = createLinkedListWithLoop([1, 2, 3], 0);
console.log(detectLoopAndCountFloyd(example2)); // Output: 0

const example3 = createLinkedListWithLoop([1], 1);
console.log(detectLoopAndCountFloyd(example3)); // Output: 1
```

## Dry Run Examples

### Example 1: 1 → 2 → 3 → 4 → 5, c = 2

- Loop starts at node 2, connects back from 5 to 2
- Loop nodes: 2 → 3 → 4 → 5 → 2 (4 nodes)
- Both methods will detect the loop and count 4 nodes

### Example 2: 1 → 2 → 3, c = 0

- No loop (c = 0)
- Both methods traverse the list without finding a loop
- Return 0

### Example 3: 1, c = 1

- Single node loops to itself
- Loop nodes: 1 → 1 (1 node)
- Both methods will detect the loop and count 1 node

1. **Floyd's Algorithm**:
   - Slow pointer moves 1 step, fast moves 2 steps at a time
   - If they meet, a loop exists
   - To count loop nodes, we keep one pointer fixed and move another until it returns
   - The number of moves needed is the loop length

The optimal approach is Floyd's algorithm as it uses constant space, while the hash set approach uses O(n) space but might be easier to understand initially.
