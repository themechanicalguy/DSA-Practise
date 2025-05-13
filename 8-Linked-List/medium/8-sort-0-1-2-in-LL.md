### Problem Understanding

https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1
We need to rearrange a linked list such that all nodes with value `0` come first, followed by nodes with value `1`, and then nodes with value `2`. This is similar to the "Dutch National Flag" problem but applied to a linked list.

### Intuition and Approach

1. **Counting Approach**:
   - Traverse the linked list and count the number of `0`s, `1`s, and `2`s.
   - Then, reconstruct the linked list by first adding all `0`s, then `1`s, and finally `2`s.
2. **Pointer Manipulation (Dutch National Flag for Linked List)**:
   - Maintain three separate dummy nodes for `0`, `1`, and `2`.
   - Traverse the original list and append each node to the corresponding dummy list.
   - Finally, merge the three lists in order.

### Identifying the Pattern

This problem is a variation of the "Dutch National Flag" problem, which is typically solved using counting or pointer manipulation. The key is to segregate the nodes based on their values without disturbing their relative order (if stability is required). However, the problem does not specify stability, so we can rearrange freely.

### Solution Code in JavaScript

#### Approach 1: Counting Values

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function segregate012Counting(head) {
  let count0 = 0,
    count1 = 0,
    count2 = 0;
  let current = head;

  // Count the number of 0s, 1s, and 2s
  while (current !== null) {
    if (current.val === 0) {
      count0++;
    } else if (current.val === 1) {
      count1++;
    } else if (current.val === 2) {
      count2++;
    }
    current = current.next;
  }

  current = head;

  // Overwrite the list with 0s, 1s, and 2s in order
  while (current !== null) {
    if (count0 > 0) {
      current.val = 0;
      count0--;
    } else if (count1 > 0) {
      current.val = 1;
      count1--;
    } else if (count2 > 0) {
      current.val = 2;
      count2--;
    }
    current = current.next;
  }

  return head;
}
```

#### Approach 2: Pointer Manipulation (Dutch National Flag)

```javascript
function segregate012Pointers(head) {
  let zeros = new Node(0);
  let ones = new Node(0);
  let twos = new Node(0);
  let zero = zeros;
  let one = ones;
  let two = twos;

  let current = head;

  // Segregate nodes into three lists
  while (current) {
    // Store next node before updating current
    let next = current.next;
    if (current.data === 0) {
      zero.next = current;
      zero = zero.next;
    } else if (current.data === 1) {
      one.next = current;
      one = one.next;
    } else {
      two.next = current;
      two = two.next;
    }
    // Move to next node
    current = next;
  }

  // Set next of last node of each list to null
  one.next = twos.next;
  two.next = null;

  // Connect zeros, ones and twos lists
  if (ones.next) {
    zero.next = ones.next;
  } else {
    zero.next = twos.next;
  }

  // Update head
  return (head = zeros.next);
}
```

### Dry Run Examples

#### Example 1:

**Input**: 1 → 2 → 2 → 1 → 2 → 0 → 2 → 2  
**Counting Approach**:

- Counts: 0s=1, 1s=2, 2s=5
- Reconstruct: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2  
  **Pointer Manipulation**:
- Dummy0: 0
- Dummy1: 1 → 1
- Dummy2: 2 → 2 → 2 → 2 → 2
- Merged: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2  
  **Output**: 0 → 1 → 1 → 2 → 2 → 2 → 2 → 2

#### Example 2:

**Input**: 2 → 1 → 0  
**Counting Approach**:

- Counts: 0s=1, 1s=1, 2s=1
- Reconstruct: 0 → 1 → 2  
  **Pointer Manipulation**:
- Dummy0: 0
- Dummy1: 1
- Dummy2: 2
- Merged: 0 → 1 → 2  
  **Output**: 0 → 1 → 2

#### Example 3:

**Input**: 0 → 0 → 1 → 1 → 2  
**Counting Approach**:

- Counts: 0s=2, 1s=2, 2s=1
- Reconstruct: 0 → 0 → 1 → 1 → 2  
  **Pointer Manipulation**:
- Dummy0: 0 → 0
- Dummy1: 1 → 1
- Dummy2: 2
- Merged: 0 → 0 → 1 → 1 → 2  
  **Output**: 0 → 0 → 1 → 1 → 2

### Explanation

- **Counting Approach**: This method is straightforward but modifies the node values, which may not be acceptable if the nodes contain additional data that should not be changed.
- **Pointer Manipulation**: This method is more efficient as it rearranges the nodes without modifying their values, preserving any additional data. It uses three separate lists to collect nodes of each value and then merges them.

### Time Complexity (TC) Analysis of Both Approaches

### **Comparison of Both Approaches**

| **Approach**             | **Time Complexity** | **Space Complexity** | **Modifies Node Values?** | **Stable?** |
| ------------------------ | ------------------- | -------------------- | ------------------------- | ----------- |
| **Counting**             | O(n)                | O(1)                 | Yes                       | No          |
| **Pointer Manipulation** | O(n)                | O(1)                 | No                        | Yes         |

### **Key Takeaways**

- Both approaches have **linear time complexity (O(n))** and **constant space complexity (O(1))**.
- **Counting Approach** modifies node values, which may not be desirable if nodes contain additional data.
- **Pointer Manipulation Approach** is **stable** (preserves relative order of nodes with the same value) and does not modify node values.
- **Pointer Manipulation** is generally preferred due to its stability and non-destructive nature.
