# LC -

Code

Testcase
Test Result
Test Result 2095. Delete the Middle Node of a Linked List

## Intuition and Approach

The problem requires us to delete the middle node of a linked list. The middle node is defined as the node at position ⌊n/2⌋ in a 0-based index, where n is the length of the list.

### Key Observations:

1. We need to find the middle node to delete it.
2. To delete a node in a linked list, we need access to the node before it so we can adjust its `next` pointer.
3. The challenge is efficiently finding the middle node, especially in a single pass.

### Approaches:

1. **Two-Pass Approach**:

   - First pass: Count the number of nodes (n).
   - Second pass: Traverse to the (⌊n/2⌋ - 1)th node to delete the next node.
   - Time Complexity: O(n) + O(n) = O(n)
   - Space Complexity: O(1)

2. **Slow-Fast Pointer (One-Pass Approach)**:
   - Use two pointers: slow and fast.
   - Fast pointer moves two steps at a time, slow moves one step.
   - When fast reaches the end, slow will be at the middle.
   - Maintain a previous pointer to the node before slow.
   - Time Complexity: O(n)
   - Space Complexity: O(1)

The two-pointer approach is more efficient as it finds the middle in a single pass.

### Pattern Identification:

This is a classic linked list problem that uses the "slow and fast pointer" technique, commonly used for:

- Finding the middle of a linked list
- Detecting cycles in a linked list
- Finding the kth node from the end

The pattern involves two pointers moving at different speeds to efficiently find a specific position in the list.

## JavaScript Solutions

### 1. Two-Pass Approach

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
 * @return {ListNode}
 */
function deleteMiddleTwoPass(head) {
  if (!head || !head.next) return null; // If list is empty or has only one node

  let length = 0;
  let current = head;

  // First pass: calculate the length of the list
  while (current) {
    length++;
    current = current.next;
  }

  const middleIndex = Math.floor(length / 2) - 1; // Position before the middle
  current = head;

  // Second pass: reach the node before the middle
  for (let i = 0; i < middleIndex; i++) {
    current = current.next;
  }

  // Delete the middle node
  current.next = current.next.next;

  return head;
}
```

### 2. Slow-Fast Pointer Approach (Optimal)

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

### Example 1:

Input: [1,3,4,7,1,2,6]

1. Two-Pass:

   - Length = 7
   - Middle index = ⌊7/2⌋ = 3 (0-based)
   - Node before middle is at index 2 (value 4)
   - Delete node after 4 (value 7)
   - Output: [1,3,4,1,2,6]

2. Slow-Fast Pointer:
   - Initial: slow=1, fast=1
   - Step 1: slow=3, fast=4
   - Step 2: slow=4, fast=1
   - Step 3: slow=7, fast=6 (fast.next is null, stop)
   - prev=4, slow=7
   - Delete 7: 4.next = 7.next (which is 1)
   - Output: [1,3,4,1,2,6]

### Example 2:

Input: [1,2,3,4]

1. Two-Pass:

   - Length = 4
   - Middle index = ⌊4/2⌋ = 2 (value 3)
   - Node before middle is at index 1 (value 2)
   - Delete node after 2 (value 3)
   - Output: [1,2,4]

2. Slow-Fast Pointer:
   - Initial: slow=1, fast=1
   - Step 1: slow=2, fast=3
   - Step 2: slow=3, fast=null (fast is null, stop)
   - prev=2, slow=3
   - Delete 3: 2.next = 3.next (which is 4)
   - Output: [1,2,4]

### Example 3:

Input: [2,1]

1. Two-Pass:

   - Length = 2
   - Middle index = ⌊2/2⌋ = 1 (value 1)
   - Node before middle is at index 0 (value 2)
   - Delete node after 2 (value 1)
   - Output: [2]

2. Slow-Fast Pointer:
   - Initial: slow=2, fast=2
   - Step 1: slow=1, fast=null (fast.next is null, stop)
   - prev=2, slow=1
   - Delete 1: 2.next = 1.next (which is null)
   - Output: [2]

The slow-fast pointer approach is more efficient as it finds the middle in a single pass through the list.
