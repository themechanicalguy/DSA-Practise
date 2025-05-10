# LC -234. Palindrome Linked List

## Intuition and Approach

A palindrome is a sequence that reads the same backward as forward. For a singly linked list, we need to check if the sequence of node values forms a palindrome.

### Key Observations:

1. We can't directly access elements by index in a linked list like in an array.
2. We need to compare the first half with the reversed second half of the list.

### Approaches:

1. **Array Conversion Approach**:

   - Convert the linked list to an array
   - Use two pointers to check if the array is a palindrome
   - Time: O(n), Space: O(n)

2. **Reverse Second Half Approach**:

   - Find the middle of the list using fast and slow pointers
   - Reverse the second half of the list
   - Compare the first half with the reversed second half
   - Time: O(n), Space: O(1)

3. **Recursive Approach**:
   - Use recursion to compare nodes from start and end
   - Time: O(n), Space: O(n) due to recursion stack

## Pattern Identification

This problem follows the:

- Two-pointer technique (for finding middle and comparing)
- Linked list reversal pattern (for the optimal solution)
- Divide and conquer (splitting the list into halves)

### Reverse Second Half Approach (Optimal)

```javascript
function isPalindrome(head) {
  if (head === null || head.next === null) {
    return true;
  }

  // Step 1: Find the middle of the list
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half
  let prev = null;
  let current = slow;
  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  // Step 3: Compare first half and reversed second half
  let firstHalf = head;
  let secondHalf = prev;
  while (secondHalf !== null) {
    if (firstHalf.val !== secondHalf.val) {
      return false;
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  return true;
}
```

### 3. Recursive Approach

```javascript
function isPalindromeRecursive(head) {
  let frontPointer = head;

  function recursivelyCheck(currentNode) {
    if (currentNode !== null) {
      if (!recursivelyCheck(currentNode.next)) {
        return false;
      }
      if (currentNode.val !== frontPointer.val) {
        return false;
      }
      frontPointer = frontPointer.next;
    }
    return true;
  }

  return recursivelyCheck(head);
}
```

## Dry Runs

### Example 1: [1,2,2,1]

1. Array approach:

   - Array: [1,2,2,1]
   - Compare 1==1, 2==2 → true

2. Reverse second half:

   - Middle at second 2
   - Reverse second half: 1→2→null
   - Compare 1-1, 2-2 → true

3. Recursive:
   - Compare outermost 1-1, then inner 2-2 → true

### Example 2: [1,2]

1. Array approach:

   - Array: [1,2]
   - Compare 1≠2 → false

2. Reverse second half:

   - Middle at 2
   - Reverse second half: 2→null
   - Compare 1≠2 → false

3. Recursive:
   - Compare 1≠2 → false

### Example 3: [1,0,1]

1. Array approach:

   - Array: [1,0,1]
   - Compare 1==1, 0==0 → true

2. Reverse second half:

   - Middle at 0
   - Reverse second half: 1→0→null
   - Compare 1-1, 0-0 → true

3. Recursive:
   - Compare 1-1, then 0-0 → true
