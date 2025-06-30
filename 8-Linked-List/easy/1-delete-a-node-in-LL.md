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

## Approach 2: Iterative Value Shifting (Less Optimal)

This approach shifts all values after the node to be deleted one position forward.

```javascript
function deleteNode(node) {
  // Shift all subsequent values one position forward
  let current = node;
  while (current.next !== null) {
    current.val = current.next.val;
    if (current.next.next === null) {
      current.next = null;
      break;
    }
    current = current.next;
  }
}
```

## Approach 3: Recursive Value Shifting

A recursive version of the value shifting approach.

```javascript
function deleteNode(node) {
  // Base case: if next node is the last one
  if (node.next.next === null) {
    node.val = node.next.val;
    node.next = null;
  } else {
    node.val = node.next.val;
    deleteNode(node.next);
  }
}
```

## Notes:

1. The optimal approach (Approach 1) has O(1) time complexity and O(1) space complexity.
2. The other approaches have O(n) time complexity in the worst case.
3. All approaches modify the list in-place without returning anything.
4. The problem guarantees the node to delete is not the tail, so we don't need to handle that edge case.
5. The "deletion" is actually a value replacement since we can't truly delete the node without access to the previous node.

The optimal approach is generally preferred due to its constant time complexity and simplicity.
