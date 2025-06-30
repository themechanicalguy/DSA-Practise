## LC 328. Odd Even Linked List

### **Problem Understanding and Intuition**

**Problem Statement:**  
Given the head of a singly linked list, group all nodes at odd positions (1st, 3rd, 5th, etc.) followed by nodes at even positions (2nd, 4th, 6th, etc.), while maintaining their relative order within each group. The solution should have O(1) space complexity (in-place) and O(n) time complexity.

**Key Observations:**

1. **Odd and Even Indices:** The first node is odd, the second is even, and so on.
2. **Relative Order:** The order of odd nodes and even nodes among themselves should not change.
3. **In-Place Requirement:** We cannot use extra space proportional to the input (like an array), but we can use a few pointers.

**Intuition:**  
We can separate the original linked list into two sublists: one for odd-positioned nodes and another for even-positioned nodes. Then, we can link the end of the odd sublist to the head of the even sublist.

### **Approach**

1. **Initial Checks:** If the list is empty or has only one node, return it as-is.
2. **Separate Odd and Even Lists:**
   - Use two pointers, `oddHead` and `evenHead`, to keep track of the heads of the odd and even sublists.
   - Use `oddCurrent` and `evenCurrent` to traverse and build the sublists.
   - The original `head` will be the `oddHead`, and `head.next` will be the `evenHead`.
3. **Traverse and Reorganize:**
   - For each node, update the `next` pointers of the odd and even lists.
   - The odd nodes will point to the next odd node (current odd node's next is even node's next).
   - Similarly, even nodes will point to the next even node.
4. **Merge the Two Lists:**
   - After traversal, link the last node of the odd sublist to the head of the even sublist.
5. **Return the Result:** The `oddHead` will now be the head of the reordered list.

### **Solution Code in JavaScript**

#### **Approach 1: In-Place Separation and Merging**

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
const oddEvenList = function (head) {
  if (!head || !head.next) {
    return head; // No rearrangement needed for empty or single-node list
  }

  let oddHead = head; // The first node is odd
  let evenHead = head.next; // The second node is even
  let oddCurrent = oddHead;
  let evenCurrent = evenHead;

  while (evenCurrent && evenCurrent.next) {
    // Link odd node to the next odd node (evenCurrent.next)
    oddCurrent.next = evenCurrent.next;
    oddCurrent = oddCurrent.next;

    // Link even node to the next even node (oddCurrent.next)
    evenCurrent.next = oddCurrent.next;
    evenCurrent = evenCurrent.next;
  }

  // Merge the two lists
  oddCurrent.next = evenHead;

  return oddHead;
};
```

#### **Dry Run for Example 1:**

**Input:** `[1,2,3,4,5]`

1. Initial state:
   - `oddHead = 1`, `evenHead = 2`
   - `oddCurrent = 1`, `evenCurrent = 2`
2. First iteration:
   - `oddCurrent.next = 3` (since `evenCurrent.next` is 3)
   - `oddCurrent` moves to 3
   - `evenCurrent.next = 4` (since `oddCurrent.next` is 4)
   - `evenCurrent` moves to 4
3. Second iteration:
   - `oddCurrent.next = 5` (since `evenCurrent.next` is 5)
   - `oddCurrent` moves to 5
   - `evenCurrent.next = null` (since `oddCurrent.next` is null)
   - `evenCurrent` moves to null (loop ends)
4. Merge: `oddCurrent.next = evenHead` (5's next is 2)
5. Final list: `1 -> 3 -> 5 -> 2 -> 4`

**Output:** `[1,3,5,2,4]`

#### **Dry Run for Example 2:**

**Input:** `[2,1,3,5,6,4,7]`

1. Initial state:
   - `oddHead = 2`, `evenHead = 1`
   - `oddCurrent = 2`, `evenCurrent = 1`
2. First iteration:
   - `oddCurrent.next = 3` (since `evenCurrent.next` is 3)
   - `oddCurrent` moves to 3
   - `evenCurrent.next = 5` (since `oddCurrent.next` is 5)
   - `evenCurrent` moves to 5
3. Second iteration:
   - `oddCurrent.next = 6` (since `evenCurrent.next` is 6)
   - `oddCurrent` moves to 6
   - `evenCurrent.next = 4` (since `oddCurrent.next` is 4)
   - `evenCurrent` moves to 4
4. Third iteration:
   - `oddCurrent.next = 7` (since `evenCurrent.next` is 7)
   - `oddCurrent` moves to 7
   - `evenCurrent.next = null` (since `oddCurrent.next` is null)
   - `evenCurrent` moves to null (loop ends)
5. Merge: `oddCurrent.next = evenHead` (7's next is 1)
6. Final list: `2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4`

**Output:** `[2,3,6,7,1,5,4]`

#### **Dry Run for Example 3:**

**Input:** `[1]`

- Only one node, so return `[1]`.

```javascript
/**
 * Helper function to create a linked list from an array of values.
 * @param {Array} values - The array of values to convert into a linked list.
 * @return {ListNode} - The head of the created linked list.
 */
function createLinkedList(values) {
  if (!values || values.length === 0) {
    return null;
  }

  let head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}
```
