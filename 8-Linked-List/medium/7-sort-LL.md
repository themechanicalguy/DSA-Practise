# LC-148 Sorting a Linked List in Ascending Order

## Problem Understanding

We need to sort a singly linked list in ascending order. The challenge is that linked lists don't allow random access like arrays, so we can't use standard sorting algorithms directly.

## Intuition and Approaches

There are several approaches to sort a linked list:

1. **Convert to Array, Sort, and Rebuild**:

   - Convert the linked list to an array
   - Sort the array
   - Rebuild the linked list from the sorted array

2. **Insertion Sort**:

   - Build the sorted list one node at a time
   - For each node, find its correct position in the sorted part

3. **Merge Sort (Top-Down)**:

   - Split the list into two halves recursively
   - Merge the sorted halves back together

4. **Merge Sort (Bottom-Up)**:
   - Start by sorting sublists of size 1
   - Repeatedly merge sorted sublists, doubling the size each time

The most efficient approach for linked lists is Merge Sort (O(n log n) time complexity with O(1) space for bottom-up or O(log n) space for recursive).

## Pattern Identification

This is a classic "divide and conquer" problem where:

- We split the list into smaller sublists
- Sort those sublists
- Merge them back together

The linked list structure makes merge sort particularly suitable because:

1. We can split lists in O(1) time
2. Merging doesn't require extra space like with arrays

## Solution Code

### Approach 1: Convert to Array, Sort, and Rebuild

```javascript
function sortList(head) {
  if (!head || !head.next) return head;

  // Convert linked list to array
  let arr = [];
  let current = head;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }

  // Sort the array
  arr.sort((a, b) => a - b);

  // Rebuild the linked list
  current = head;
  for (let num of arr) {
    current.val = num;
    current = current.next;
  }

  return head;
}
```

### Approach 2: Insertion Sort

```javascript
function sortList(head) {
  if (!head || !head.next) return head;

  const dummy = new ListNode(0); // Dummy node to serve as pre-head
  dummy.next = head;
  let lastSorted = head; // Last node of the sorted part
  let current = head.next; // Current node to be inserted

  while (current) {
    if (lastSorted.val <= current.val) {
      // Already in correct position
      lastSorted = lastSorted.next;
    } else {
      // Need to find insertion point
      let prev = dummy;
      while (prev.next.val <= current.val) {
        prev = prev.next;
      }
      // Insert current between prev and prev.next
      lastSorted.next = current.next;
      current.next = prev.next;
      prev.next = current;
    }
    current = lastSorted.next;
  }

  return dummy.next;
}
```

### Approach 3: Merge Sort (Top-Down Recursive)

```javascript
function sortList(head) {
  if (!head || !head.next) return head;

  // Split the list into two halves
  const [left, right] = splitList(head);

  // Recursively sort each half
  const sortedLeft = sortList(left);
  const sortedRight = sortList(right);

  // Merge the sorted halves
  return mergeLists(sortedLeft, sortedRight);
}

function splitList(head) {
  let slow = head;
  let fast = head.next;

  // Fast moves two steps, slow moves one step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  const right = slow.next;
  slow.next = null; // Break the link

  return [head, right];
}

function mergeLists(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  // Attach remaining elements
  tail.next = l1 || l2;

  return dummy.next;
}
```

### Approach 4: Merge Sort (Bottom-Up Iterative)

```javascript
function sortList(head) {
  if (!head || !head.next) return head;

  // Get length of the list
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  const dummy = new ListNode(0);
  dummy.next = head;

  for (let size = 1; size < length; size *= 2) {
    let prev = dummy;
    let current = dummy.next;

    while (current) {
      const left = current;
      const right = splitListAt(left, size);
      current = splitListAt(right, size);
      prev = mergeLists(left, right, prev);
    }
  }

  return dummy.next;
}

function splitListAt(head, size) {
  if (!head) return null;

  for (let i = 1; head.next && i < size; i++) {
    head = head.next;
  }

  const right = head.next;
  head.next = null;
  return right;
}

function mergeLists(l1, l2, head) {
  let current = head;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;

  // Move to the end of merged list
  while (current.next) {
    current = current.next;
  }

  return current;
}
```

## Dry Runs

### Example 1: [4,2,1,3]

**Merge Sort Approach:**

1. Split into [4,2] and [1,3]
2. Split [4,2] into [4] and [2] → merge to [2,4]
3. Split [1,3] into [1] and [3] → merge to [1,3]
4. Merge [2,4] and [1,3] → compare 2 and 1 → 1
   → compare 2 and 3 → 2
   → compare 4 and 3 → 3
   → 4
   → Result: [1,2,3,4]

### Example 2: [-1,5,3,4,0]

**Merge Sort Approach:**

1. Split into [-1,5] and [3,4,0]
2. Split [-1,5] into [-1] and [5] → merge to [-1,5]
3. Split [3,4,0] into [3] and [4,0]
   - Split [4,0] into [4] and [0] → merge to [0,4]
4. Merge [3] and [0,4] → compare 3 and 0 → 0
   → compare 3 and 4 → 3
   → 4
   → Result: [0,3,4]
5. Merge [-1,5] and [0,3,4] → compare -1 and 0 → -1
   → compare 5 and 0 → 0
   → compare 5 and 3 → 3
   → compare 5 and 4 → 4
   → 5
   → Result: [-1,0,3,4,5]

### Example 3: [1,1,2,1]

**Insertion Sort Approach:**
Initial: [1,1,2,1]

1. First 1 is already sorted
2. Second 1: compare with first 1 → stays after first 1 → [1,1,2,1]
3. 2: compare with last sorted (1) → greater → stays → [1,1,2,1]
4. Last 1: compare with 2 → needs to move
   - Compare with first 1 → equal → insert after first 1 → [1,1,1,2]

The merge sort approaches are generally more efficient (O(n log n)) compared to insertion sort (O(n^2)), especially for larger lists. The array conversion approach is simple but uses O(n) extra space.
