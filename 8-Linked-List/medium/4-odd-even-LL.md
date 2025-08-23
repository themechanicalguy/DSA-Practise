# LC 328. Odd Even Linked List

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
