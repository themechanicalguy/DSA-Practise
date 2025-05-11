# LC- 19. Remove Nth Node From End of List

## Problem Understanding

We need to remove the nth node from the end of a singly-linked list and return the modified list's head.

### Key Observations:

1. In a singly-linked list, we can only traverse forward from any node.
2. We don't know the list's length beforehand (unless we count it, which would require a full traversal).
3. The challenge is to find the nth node from the end efficiently.

## Intuition and Approaches

### Pattern Identification

This is a classic "two-pointer" technique problem in linked lists. The pattern involves:

- Maintaining a fixed distance between two pointers
- Moving them in sync until one reaches the end
- This allows us to find the nth-from-end node without knowing the total length first

### Possible Approaches:

1. **Two-pass approach**: First find the length, then remove (L-n+1)th node from start
2. **One-pass two-pointer approach**: Use fast and slow pointers with n nodes apart
3. **Stack-based approach**: Push all nodes to stack, then pop n times to find the node

## Solution Code

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
function removeNthFromEnd(head, n) {
  // Create a dummy node to handle edge cases (like removing head)
  const dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // Move fast pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both pointers until fast reaches end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Now slow is at the node before the target
  slow.next = slow.next.next;

  return dummy.next;
}
```

### Approach 3: Stack-based Approach

```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  const stack = [];
  let current = dummy;

  // Push all nodes onto the stack
  while (current !== null) {
    stack.push(current);
    current = current.next;
  }

  // Pop n nodes to find the one before the target
  for (let i = 0; i < n; i++) {
    stack.pop();
  }

  // The top of stack is now the node before the target
  const nodeBeforeTarget = stack[stack.length - 1];
  nodeBeforeTarget.next = nodeBeforeTarget.next.next;

  return dummy.next;
}
```

## Dry Runs

### Example 1: [1,2,3,4,5], n=2

Initial list: 1 -> 2 -> 3 -> 4 -> 5

**Approach 1:**

1. Calculate length = 5
2. Position to remove = 5-2 = 3 (value 4)
3. Node before is at position 2 (value 3)
4. Set 3.next = 5
   Result: 1 -> 2 -> 3 -> 5

**Approach 2:**

1. Dummy -> 1 -> 2 -> 3 -> 4 -> 5
2. Fast moves to 3 (n+1=3 steps)
3. Both move until fast is null:
   - Fast: 3,4,5,null
   - Slow: dummy,1,2,3
4. Remove 3.next (which is 4)
   Result: 1 -> 2 -> 3 -> 5

### Example 2: [1], n=1

Initial list: 1

**Approach 1:**

1. Length = 1
2. n = length, so remove head
   Result: []

**Approach 2:**

1. Dummy -> 1
2. Fast moves n+1=2 steps (to null)
3. Slow is still at dummy
4. Remove dummy.next (head)
   Result: []

### Example 3: [1,2], n=1

Initial list: 1 -> 2

**Approach 1:**

1. Length = 2
2. Position to remove = 2-1 = 1 (value 2)
3. Node before is at position 0 (value 1)
4. Set 1.next = null
   Result: 1

**Approach 2:**

1. Dummy -> 1 -> 2
2. Fast moves to 2 (n+1=2 steps)
3. Both move until fast is null:
   - Fast: 2, null
   - Slow: dummy, 1
4. Remove 1.next (which is 2)
   Result: 1

## Time and Space Complexity

**Approach 1 (Two-pass):**

- Time: O(L) where L is list length (we traverse twice)
- Space: O(1)

**Approach 2 (Two-pointer):**

- Time: O(L) (single traversal)
- Space: O(1)

**Approach 3 (Stack):**

- Time: O(L) (single traversal for push, then pop)
- Space: O(L) (to store all nodes in stack)

The two-pointer approach is generally the most efficient as it solves the problem in one pass with constant space.
