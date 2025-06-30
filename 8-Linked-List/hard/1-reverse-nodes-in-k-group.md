# LC-25. Reverse Nodes in k-Group

Given a linked list, reverse its nodes in groups of size `k`. If the remaining nodes at the end are less than `k`, leave them as they are.

**Key Points:**

1. Reverse the nodes in groups of `k`.
2. If the last group has fewer than `k` nodes, don't reverse it.
3. You can't change the node values; only the node connections (pointers) can be modified.

### Examples:

1. **Example 1:**

   - Input: `head = [1, 2, 3, 4, 5]`, `k = 2`
   - Output: `[2, 1, 4, 3, 5]`
   - Explanation:
     - Reverse the first 2 nodes: `[1, 2]` → `[2, 1]`.
     - Reverse the next 2 nodes: `[3, 4]` → `[4, 3]`.
     - The last node `[5]` is left as is (since `k=2` and only 1 node is left).

2. **Example 2:**

   - Input: `head = [1, 2, 3, 4, 5]`, `k = 3`
   - Output: `[3, 2, 1, 4, 5]`
   - Explanation:
     - Reverse the first 3 nodes: `[1, 2, 3]` → `[3, 2, 1]`.
     - The remaining nodes `[4, 5]` are left as is (since `k=3` and only 2 nodes are left).

3. **Example 3:**

   - Input: `head = [1, 2, 3, 4, 5, 6]`, `k = 2`
   - Output: `[2, 1, 4, 3, 6, 5]`
   - Explanation:
     - Reverse groups of 2:
       - `[1, 2]` → `[2, 1]`,
       - `[3, 4]` → `[4, 3]`,
       - `[5, 6]` → `[6, 5]`.

4. **Example 4:**

   - Input: `head = [1, 2, 3, 4, 5]`, `k = 1`
   - Output: `[1, 2, 3, 4, 5]`
   - Explanation:
     - Since `k=1`, no reversal happens (reversing a group of 1 doesn't change anything).

5. **Example 5:**
   - Input: `head = [1]`, `k = 1`
   - Output: `[1]`
   - Explanation: Single node remains as is.

### **Intuition and Approach**

The problem requires reversing nodes of a linked list in groups of size `k`. If the remaining nodes at the end are fewer than `k`, they should remain unchanged.

#### **Key Observations:**

1. **Group Reversal:** We need to reverse nodes in chunks of size `k`.
2. **Edge Cases:**
   - If `k = 1`, the list remains unchanged.
   - If the list is empty or has only one node, return it as is.
   - If the remaining nodes are less than `k`, skip reversal for them.

#### **Approach:**

1. **Iterative Approach (Optimal):**

   - Traverse the list and reverse each group of `k` nodes.
   - Keep track of the previous group's tail to connect it with the next reversed group.
   - If a group has fewer than `k` nodes, leave it as is.

2. **Recursive Approach:**
   - Reverse the first `k` nodes.
   - Recursively process the remaining list.
   - Link the reversed group with the result of the recursive call.

---

### **Solution Code (JavaScript)**

#### **1. Iterative Approach (Optimal)**

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Reverse nodes in groups of k (Iterative Approach)
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseKGroup(head, k) {
  if (!head || k === 1) return head;

  let dummyNode = new ListNode(0);
  dummyNode.next = head;
  let previousGroupEnd = dummyNode;
  let current = head;

  while (current) {
    let groupStart = current;
    let groupEnd = current;
    let count = 1;

    // Move groupEnd to the end of the current group
    while (groupEnd.next && count < k) {
      groupEnd = groupEnd.next;
      count++;
    }

    if (count < k) {
      // Not enough nodes to reverse, break early
      break;
    }

    // Save the next node after the group
    let nextGroupStart = groupEnd.next;

    // Reverse the current group
    let reversedGroupHead = reverseLinkedList(groupStart, k);

    // Connect the previous group's end to the reversed group's head
    previousGroupEnd.next = reversedGroupHead;

    // Connect the reversed group's tail to the next group
    groupStart.next = nextGroupStart;

    // Update pointers for next iteration
    previousGroupEnd = groupStart;
    current = nextGroupStart;
  }

  return dummyNode.next;
}

/**
 * Helper function to reverse a linked list segment of length k
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseLinkedList(head, k) {
  let prev = null;
  let current = head;
  let next = null;

  while (k > 0 && current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
    k--;
  }

  return prev;
}
```

#### **2. Recursive Approach**

```javascript
function reverseKGroupRecursive(head, k) {
  if (!head || k === 1) return head;

  let current = head;
  let count = 0;

  // Check if there are at least k nodes remaining
  while (current && count < k) {
    current = current.next;
    count++;
  }

  if (count < k) {
    // Not enough nodes to reverse, return as is
    return head;
  }

  // Reverse the first k nodes
  let reversedHead = reverseLinkedList(head, k);

  // Recursively reverse the remaining list and link it
  head.next = reverseKGroupRecursive(current, k);

  return reversedHead;
}
```

---

### **Time and Space Complexity Analysis**

#### **Iterative Approach:**

- **Time Complexity:** `O(n)`
  - Each node is visited exactly twice (once for traversal, once for reversal).
- **Space Complexity:** `O(1)`
  - Uses constant extra space (no recursion stack).

#### **Recursive Approach:**

- **Time Complexity:** `O(n)`
  - Each node is processed once.
- **Space Complexity:** `O(n/k)`
  - Recursion stack depth is proportional to the number of groups (`n/k`).

---

### **Dry Run (Optimal Approach)**

#### **Example 1: `[1, 2, 3, 4, 5]`, `k = 2`**

1. **Initial State:**

   - `dummyNode → [1 → 2 → 3 → 4 → 5]`
   - `previousGroupEnd = dummyNode`, `current = 1`

2. **First Group (`[1, 2]`):**

   - `groupStart = 1`, `groupEnd = 2` (after moving `count = 2`).
   - Reverse `[1, 2]` → `[2, 1]`.
   - `previousGroupEnd.next = 2` (connects `dummyNode → 2`).
   - `1.next = 3` (connects `2 → 1 → 3`).
   - Update `previousGroupEnd = 1`, `current = 3`.

3. **Second Group (`[3, 4]`):**

   - `groupStart = 3`, `groupEnd = 4`.
   - Reverse `[3, 4]` → `[4, 3]`.
   - `1.next = 4` (connects `1 → 4`).
   - `3.next = 5` (connects `4 → 3 → 5`).
   - Update `previousGroupEnd = 3`, `current = 5`.

4. **Third Group (`[5]`):**
   - Only 1 node (`5`), `count < k` → **break**.
   - Final list: `[2 → 1 → 4 → 3 → 5]`.

#### **Example 2: `[1, 2, 3, 4, 5]`, `k = 3`**

1. **First Group (`[1, 2, 3]`):**
   - Reverse → `[3, 2, 1]`.
   - `dummyNode → 3`, `1.next = 4`.
2. **Second Group (`[4, 5]`):**
   - `count = 2 < k` → **break**.
   - Final list: `[3 → 2 → 1 → 4 → 5]`.

#### **Example 3: `[1]`, `k = 1`**

- No reversal (`k=1`), return `[1]`.

---

### **Conclusion**

- **Optimal Approach:** Iterative method (avoids recursion stack).
- **Edge Cases Handled:** `k=1`, empty list, remaining nodes < `k`.
- **Efficiency:** `O(n)` time, `O(1)` space (iterative).
