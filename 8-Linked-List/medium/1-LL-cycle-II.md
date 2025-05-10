# LC 142. Linked List Cycle II

### Intuition and Approach

To detect the start of a cycle in a linked list, we can use Floyd's Tortoise and Hare algorithm, which involves two pointers moving at different speeds. Here's the intuition behind it:

1. **Detecting a Cycle**:

   - Use a slow pointer (moves one step at a time) and a fast pointer (moves two steps at a time).
   - If there's a cycle, the fast pointer will eventually meet the slow pointer inside the cycle. If they don't meet, there's no cycle.

2. **Finding the Start of the Cycle**:
   - Once a cycle is detected, reset one pointer to the head of the list and keep the other at the meeting point.
   - Move both pointers one step at a time. The point where they meet again is the start of the cycle.

### Why This Works

- When the slow pointer enters the cycle, the fast pointer is already inside the cycle.
- The fast pointer catches up to the slow pointer at some point because it moves faster.
- The distance from the head to the cycle start is equal to the distance from the meeting point to the cycle start when moving around the cycle.

### JavaScript Code

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (!head || !head.next) {
    return null; // No cycle if list is empty or has only one node
  }

  let slowPointer = head;
  let fastPointer = head;

  // Step 1: Detect if there's a cycle
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next; // Moves one step
    fastPointer = fastPointer.next.next; // Moves two steps

    if (slowPointer === fastPointer) {
      // Cycle detected, now find the start of the cycle
      slowPointer = head;
      while (slowPointer !== fastPointer) {
        slowPointer = slowPointer.next;
        fastPointer = fastPointer.next;
      }
      return slowPointer; // Both pointers meet at the start of the cycle
    }
  }

  return null; // No cycle found
};
```

### Dry Run Examples

#### Example 1: Given Input

**Input**: `head = [3,2,0,-4], pos = 1`  
**List Structure**:

- 3 -> 2 -> 0 -> -4  
   ^ |
  |\***\*\_\_\*\***|

1. **Initialization**: `slow = 3`, `fast = 3`
2. **Step 1**: `slow = 2`, `fast = 0`
3. **Step 2**: `slow = 0`, `fast = 2` (fast moves from -4 to 2)
4. **Step 3**: `slow = -4`, `fast = -4` (fast moves from 2 to 0 to -4)
   - Cycle detected (`slow === fast` at -4)
5. **Find Start**: Reset `slow = 3`, keep `fast = -4`
   - `slow = 2`, `fast = 2` (fast moves from -4 to 2)
   - `slow === fast` at 2, which is the start of the cycle.

**Output**: `tail connects to node index 1` (value 2)

---

#### Example 2: No Cycle

**Input**: `head = [1,2], pos = -1`  
**List Structure**: 1 -> 2 -> null

1. **Initialization**: `slow = 1`, `fast = 1`
2. **Step 1**: `slow = 2`, `fast = null` (fast.next is null, loop ends)
   - No cycle detected.

**Output**: `null`

---

#### Example 3: Cycle at Head

**Input**: `head = [1], pos = 0`  
**List Structure**: 1 -> (points back to itself)

1. **Initialization**: `slow = 1`, `fast = 1`
2. **Step 1**: `slow = 1`, `fast = 1` (fast moves from 1 to 1)
   - Cycle detected (`slow === fast` at 1)
3. **Find Start**: Reset `slow = 1`, keep `fast = 1`
   - `slow === fast` already at 1, which is the start of the cycle.

**Output**: `tail connects to node index 0` (value 1)

### Summary

- The algorithm efficiently detects the cycle and its start using two pointers.
- Time Complexity: O(n) (linear time, as each pointer traverses the list at most twice).
- Space Complexity: O(1) (constant space, only two pointers used).
