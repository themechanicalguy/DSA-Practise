# Adding 1 to a Number Represented by a Linked List

https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1

## Problem Understanding

- The linked list represents a number where each node’s data is a digit, and the digits are concatenated from head to tail to form the number. For example:
  Input: 4->5->6 represents 456.

- Adding 1 gives 457, so the output linked list is 4->5->7.

**Edge cases to consider:**

- Single node: 9 + 1 (becomes 10, i.e., 1->0).

- All 9’s: 9->9->9 + 1 (becomes 1000, i.e., 1->0->0->0).

- Large numbers: 1->2->3->4 + 1(becomes 1->2->3->5).

- Leading zeros in the result (not applicable since the input is a valid number starting with a non-zero digit).

- The challenge is to handle the carry that propagates when adding 1, especially in cases where the carry affects multiple nodes or adds a new node (e.g., 9->9 becomes 1->0->0).

## Approaches

### Approach 1: Convert to Number, Add 1, Convert Back

1. Traverse the linked list and convert it to a number
2. Add 1 to the number
3. Convert the result back to a linked list

```javascript
class ListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// Approach 1: Convert to Number, Add 1, Convert Back
function addOneToListHead(head) {
  // Convert list to number
  let num = 0;
  let current = head;
  while (current) {
    num = num * 10 + current.data;
    current = current.next;
  }

  // Add 1 to the number
  num += 1;

  // Convert number back to list
  const numStr = num.toString();
  let newHead = new ListNode(parseInt(numStr[0]));
  let temp = newHead;
  for (let i = 1; i < numStr.length; i++) {
    temp.next = new ListNode(parseInt(numStr[i]));
    temp = temp.next;
  }

  return newHead;
}
```

**Limitation**: This won't work for very large numbers (beyond JavaScript's safe integer limit)

### Approach 2: Reverse List, Add with Carry, Reverse Back

1. Reverse the linked list
2. Add 1 to the first node, propagating any carry
3. Reverse the list back to original order

```javascript
// Approach 2: Reverse List, Add with Carry, Reverse Back
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function addOneReverse(head) {
  if (!head) return new ListNode(1);

  // Reverse the linked list
  let reversed = reverseList(head);
  let current = reversed;
  let carry = 1; // We want to add 1

  while (current) {
    const sum = current.data + carry;
    current.data = sum % 10;
    carry = Math.floor(sum / 10);

    if (!current.next && carry > 0) {
      current.next = new ListNode(carry);
      carry = 0;
    }

    current = current.next;
  }

  // Reverse back and return
  return reverseList(reversed);
}
```

### Approach 3: Recursive Approach

Use recursion to reach the end of the list and add the carry while unwinding the stack.

```javascript
// Approach 3: Recursive Approach
function addOneRecursive(head) {
  const carry = addWithCarry(head);
  if (carry > 0) {
    const newHead = new ListNode(carry);
    newHead.next = head;
    return newHead;
  }
  return head;
}

function addWithCarry(node) {
  if (!node) return 1; // We want to add 1

  const sum = node.data + addWithCarry(node.next);
  node.data = sum % 10;
  return Math.floor(sum / 10);
}
```

### Approach 4: Using Stack

Use a stack to store nodes, then process them from end to start.

```javascript
// Approach 4: Using Stack
function addOneStack(head) {
  const stack = [];
  let current = head;

  // Push all nodes to stack
  while (current) {
    stack.push(current);
    current = current.next;
  }

  let carry = 1; // We want to add 1
  while (stack.length > 0 && carry > 0) {
    const node = stack.pop();
    const sum = node.data + carry;
    node.data = sum % 10;
    carry = Math.floor(sum / 10);
  }

  if (carry > 0) {
    const newHead = new ListNode(carry);
    newHead.next = head;
    return newHead;
  }

  return head;
}

// Helper function to print list
function printList(head) {
  let current = head;
  let result = "";
  while (current) {
    result += current.data + (current.next ? "->" : "");
    current = current.next;
  }
  console.log(result);
}
```

```javascript
// Test cases
const list1 = new ListNode(4, new ListNode(5, new ListNode(6)));
console.log("Original list:");
printList(list1);

console.log("\nApproach 1:");
const result1 = addOneToListHead(list1);
printList(result1);

console.log("\nApproach 2:");
const result2 = addOneReverse(list1);
printList(result2);

console.log("\nApproach 3:");
const result3 = addOneRecursive(list1);
printList(result3);

console.log("\nApproach 4:");
const result4 = addOneStack(list1);
printList(result4);
```

## Complexity Analysis

### Approach 1 (Convert to Number):

- Time: O(n) for traversal + O(n) for conversion back = O(n)
- Space: O(n) for the new list
- Limitation: Doesn't work for very large numbers

### Approach 2 (Reverse, Add, Reverse):

- Time: O(n) for first reverse + O(n) for addition + O(n) for second reverse = O(n)
- Space: O(1) additional space (in-place modification)

### Approach 3 (Recursive):

- Time: O(n) for recursion stack
- Space: O(n) for recursion stack

### Approach 4 (Stack):

- Time: O(n) for pushing to stack + O(n) for popping = O(n)
- Space: O(n) for stack storage

## Optimal Approach

Approach 2 (Reverse, Add, Reverse) is generally optimal as it:

1. Handles arbitrarily large numbers
2. Has O(n) time and O(1) space (excluding the input list)
3. Modifies the list in-place

## Dry Run with Examples

### Example 1: 4->5->6

1. Original: 4->5->6 (456)
2. Reverse: 6->5->4
3. Add 1 with carry:
   - 6+1=7 (carry 0)
   - 5+0=5
   - 4+0=4
4. Reverse back: 4->5->7 (457)

### Example 2: 9->9->9

1. Original: 9->9->9 (999)
2. Reverse: 9->9->9
3. Add 1 with carry:
   - 9+1=0 (carry 1)
   - 9+1=0 (carry 1)
   - 9+1=0 (carry 1)
   - Add new node for carry
4. List becomes 0->0->0->1
5. Reverse back: 1->0->0->0 (1000)

### Example 3: 1->2->3 (Edge case - no carry propagation)

1. Original: 1->2->3 (123)
2. Reverse: 3->2->1
3. Add 1 with carry:
   - 3+1=4 (carry 0)
   - 2+0=2
   - 1+0=1
4. Reverse back: 1->2->4 (124)
