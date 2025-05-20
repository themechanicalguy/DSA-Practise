# 61. Rotate List to the Right by k Places

## Intuition

The problem requires rotating a linked list to the right by k places. This means that the last k nodes should be moved to the front of the list while maintaining their relative order.

Key insights:

1. If k is equal to the length of the list, rotating it results in the same list.
2. If k is greater than the length, we only need to rotate by `k % length` places.
3. We need to find the new tail (at position `length - k % length - 1`) and the new head (the node after the new tail).

## Approaches

### Approach 1: Brute Force (Multiple Rotations)

- Rotate the list one place at a time, k times.
- For each rotation, find the last node, make it the new head, and adjust pointers.
- **Time Complexity**: O(k \* n) - Inefficient for large k or large lists
- **Space Complexity**: O(1)

### Approach 2: Optimal (Single Pass)

1. Find the length of the linked list.
2. Calculate effective rotation count: `k % length`.
3. If effective rotation is 0, return the list as is.
4. Find the new tail (at position `length - k - 1`).
5. Adjust pointers to make the new head (node after new tail) and connect the original tail to original head.

- **Time Complexity**: O(n) - Single pass to find length, another partial pass to find new tail
- **Space Complexity**: O(1)

### Approach 3: Circular Linked List

1. Connect the tail to head to make it circular.
2. Find the new tail (at position `length - k % length - 1`).
3. Break the circle at new tail, making the next node the new head.

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

## Solution Code (All Approaches)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Approach 1: Brute Force - Rotate one by one k times
 * Time: O(k * n), Space: O(1)
 */
function rotateRightBruteForce(head, k) {
  if (!head || !head.next || k === 0) return head;

  let current = head;
  let length = 0;
  while (current) {
    length++;
    current = current.next;
  }

  k = k % length;
  if (k === 0) return head;

  for (let i = 0; i < k; i++) {
    let prev = null;
    current = head;

    // Find the last node and the one before it
    while (current.next) {
      prev = current;
      current = current.next;
    }

    // Rotate: make last node the new head
    prev.next = null;
    current.next = head;
    head = current;
  }

  return head;
}

/**
 * Approach 2: Optimal - Find new tail in single pass after length
 * Time: O(n), Space: O(1)
 */
function rotateRightOptimal(head, k) {
  if (!head || !head.next || k === 0) return head;

  // Step 1: Find length and get the tail
  let length = 1;
  let tail = head;
  while (tail.next) {
    length++;
    tail = tail.next;
  }

  // Step 2: Calculate effective rotation
  k = k % length;
  if (k === 0) return head;

  // Step 3: Find the new tail (length - k - 1 steps from head)
  let newTail = head;
  for (let i = 0; i < length - k - 1; i++) {
    newTail = newTail.next;
  }

  // Step 4: Adjust pointers
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;

  return newHead;
}

/**
 * Approach 3: Circular Linked List Approach
 * Time: O(n), Space: O(1)
 */
function rotateRightCircular(head, k) {
  if (!head || !head.next || k === 0) return head;

  // Step 1: Find length and get the tail
  let length = 1;
  let tail = head;
  while (tail.next) {
    length++;
    tail = tail.next;
  }

  // Step 2: Make it circular
  tail.next = head;

  // Step 3: Find new tail (length - k % length - 1 steps)
  k = k % length;
  let newTail = tail; // start from original tail
  for (let i = 0; i < length - k; i++) {
    newTail = newTail.next;
  }

  // Step 4: Break the circle
  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}

// Helper function to create linked list from array (for testing)
function createList(arr) {
  let dummy = new ListNode();
  let current = dummy;
  for (let num of arr) {
    current.next = new ListNode(num);
    current = current.next;
  }
  return dummy.next;
}

// Helper function to convert linked list to array (for testing)
function listToArray(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}

// Test cases
const testCases = [
  { input: [1, 2, 3, 4, 5], k: 2, expected: [4, 5, 1, 2, 3] },
  { input: [0, 1, 2], k: 4, expected: [2, 0, 1] }, // k > length
  { input: [1], k: 0, expected: [1] }, // single node, no rotation
  { input: [1, 2], k: 1, expected: [2, 1] }, // two nodes, rotate once
  { input: [], k: 3, expected: [] }, // empty list
];

// Test all approaches
function testAllApproaches() {
  for (let testCase of testCases) {
    const { input, k, expected } = testCase;
    const head = createList(input);

    console.log(`Input: [${input}], k: ${k}`);

    // Test Brute Force
    const resultBF = rotateRightBruteForce(head, k);
    console.log(`Brute Force: ${listToArray(resultBF)}`);

    // Reset head
    const head2 = createList(input);
    const resultOptimal = rotateRightOptimal(head2, k);
    console.log(`Optimal: ${listToArray(resultOptimal)}`);

    // Reset head
    const head3 = createList(input);
    const resultCircular = rotateRightCircular(head3, k);
    console.log(`Circular: ${listToArray(resultCircular)}`);

    console.log(`Expected: ${expected}`);
    console.log("---");
  }
}

testAllApproaches();
```

## Dry Run of Optimal Approach

### Example 1: [1,2,3,4,5], k = 2

1. Find length = 5, tail = 5
2. Effective k = 2 % 5 = 2
3. New tail position = 5 - 2 - 1 = 2 (node with value 3)
4. New head = 3.next = 4
5. Adjust pointers:
   - 3.next = null
   - 5.next = 1
6. New list: 4→5→1→2→3

### Example 2: [0,1,2], k = 4

1. Length = 3, tail = 2
2. Effective k = 4 % 3 = 1
3. New tail position = 3 - 1 - 1 = 1 (node with value 1)
4. New head = 1.next = 2
5. Adjust pointers:
   - 1.next = null
   - 2.next = 0
6. New list: 2→0→1

### Example 3: [1], k = 0

1. Length = 1, tail = 1
2. Effective k = 0 % 1 = 0 → return original list
3. No rotation needed

## Time and Space Complexity Analysis

### Brute Force Approach

- Time: O(k \* n) - For each of k rotations, we traverse up to n nodes
- Space: O(1) - Constant extra space used

### Optimal Approach

- Time: O(n) - Two passes through the list (one for length, one partial for new tail)
- Space: O(1) - Constant extra space used

### Circular Approach

- Time: O(n) - Similar to optimal approach
- Space: O(1) - Constant extra space used

The optimal and circular approaches are both O(n) time and O(1) space, making them much better than the brute force approach for large inputs. The circular approach is slightly more elegant as it handles the rotation by making the list circular temporarily.
