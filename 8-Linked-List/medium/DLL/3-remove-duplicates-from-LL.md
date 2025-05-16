# Removing Duplicates from a Sorted Doubly Linked List

https://www.geeksforgeeks.org/problems/remove-duplicates-from-a-sorted-doubly-linked-list/1

## Intuition

In a sorted doubly linked list, all duplicate nodes will be adjacent to each other. We can take advantage of this property to efficiently remove duplicates by traversing the list once and skipping over duplicate nodes.

## Approaches

### 1. Iterative Approach (Optimal)

- Traverse the list while comparing each node with its next node
- If duplicates are found, adjust pointers to skip the duplicate
- Handle edge cases like empty list or single node list

### 2. Hash Set Approach (Alternative)

- Use a hash set to track seen values
- Remove nodes whose values are already in the set
- This works for unsorted lists too but uses extra space

## Optimal Solution (Iterative Approach)

```javascript
class Node {
  constructor(data) {
    this.data = data; // Store the data
    this.prev = null; // Pointer to previous node
    this.next = null; // Pointer to next node
  }
}

function removeDuplicates(head) {
  // If list is empty or has only one node, no duplicates possible
  if (head === null || head.next === null) {
    return head;
  }

  let current = head; // Start from the head of the list

  while (current !== null && current.next !== null) {
    if (current.data === current.next.data) {
      // Found a duplicate
      let duplicate = current.next; // Store the duplicate node
      current.next = duplicate.next; // Skip the duplicate

      if (duplicate.next !== null) {
        duplicate.next.prev = current; // Update prev pointer of next node if it exists
      }

      // Clean up references (optional in JavaScript due to garbage collection)
      duplicate.prev = null;
      duplicate.next = null;
    } else {
      current = current.next; // Move to next node if no duplicate
    }
  }

  return head; // Return the modified list
}
```

## Time and Space Complexity Analysis

**Iterative Approach:**

- Time Complexity: O(n) - We traverse the list once
- Space Complexity: O(1) - We use constant extra space

**Hash Set Approach:**

- Time Complexity: O(n) - We traverse the list once
- Space Complexity: O(n) - In worst case we store all values in the hash set

## Dry Run Examples

### Example 1: Normal case with duplicates

Input: 1<->1<->1<->2<->3<->4

1. Start at first 1, compare with next (1) - duplicate found
   - Skip the second 1, list: 1<->1<->2<->3<->4
2. Still at first 1, compare with next (1) - duplicate found
   - Skip the next 1, list: 1<->2<->3<->4
3. Move to 2, compare with 3 - no duplicate
4. Move to 3, compare with 4 - no duplicate
   Output: 1<->2<->3<->4

### Example 2: All duplicates

Input: 2<->2<->2

1. Start at first 2, compare with next (2) - duplicate found
   - Skip the second 2, list: 2<->2
2. Still at first 2, compare with next (2) - duplicate found
   - Skip the next 2, list: 2
     Output: 2

### Example 3: No duplicates

Input: 5<->6<->7

1. Compare 5 and 6 - no duplicate
2. Compare 6 and 7 - no duplicate
   Output remains unchanged: 5<->6<->7

### Edge Case: Empty list

Input: null
Output: null

### Edge Case: Single node

Input: 3
Output: 3
