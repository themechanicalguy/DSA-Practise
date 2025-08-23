# LC 160. Intersection of Two Linked Lists

## Problem Understanding

We need to find the node where two singly-linked lists intersect. The intersection is defined by reference (memory address), not just value. If there's no intersection, we return null.

## Intuition

The key observation is that after the intersection point, both lists share the same nodes. The challenge is that the lists may have different lengths before the intersection.

## Approaches

### 1. Brute Force (Nested Loops)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

// Approach 1: Brute Force - Nested Loops
const getIntersectionNodeBruteForce = function (headA, headB) {
  let currentA = headA;

  while (currentA !== null) {
    let currentB = headB;
    while (currentB !== null) {
      if (currentA === currentB) {
        return currentA; // Intersection found
      }
      currentB = currentB.next;
    }
    currentA = currentA.next;
  }

  return null; // No intersection
};
```

**Time Complexity:** `O(m*n)`  
**Space Complexity:** O(1)

Compare each node of list A with every node of list B until we find a match.

### 2. Hash Set

```javascript
// Approach 2: Hash Set
const getIntersectionNodeHashSet = function (headA, headB) {
  const visitedNodes = new Set();
  let currentA = headA;

  // Store all nodes of list A in the set
  while (currentA !== null) {
    visitedNodes.add(currentA);
    currentA = currentA.next;
  }

  // Check list B for any node present in the set
  let currentB = headB;
  while (currentB !== null) {
    if (visitedNodes.has(currentB)) {
      return currentB; // Intersection found
    }
    currentB = currentB.next;
  }

  return null; // No intersection
};
```

**Time Complexity:** O(m+n)  
**Space Complexity:** O(m) or O(n)

Traverse one list and store nodes in a hash set, then check the other list for any node present in the set.

### 3. Two Pointers (Optimal)

```javascript
// Approach 3: Two Pointers (Optimal)
const getIntersectionNode = function (headA, headB) {
  // Handle edge cases: if either list is empty
  if (!headA || !headB) return null;

  // Initialize two pointers
  let pointerA = headA;
  let pointerB = headB;

  // Traverse until pointers meet or both reach null
  while (pointerA !== pointerB) {
    // Move pointerA to next node
    pointerA = pointerA ? pointerA.next : headB;
    // Move pointerB to next node
    pointerB = pointerB ? pointerB.next : headA;
  }

  // Return intersection node (or null if no intersection)
  return pointerA;
};
```

**Time Complexity:** O(m+n)  
**Space Complexity:** O(1)

## Optimal Approach Explanation (Two Pointers)

The two-pointer approach works because:

1. Both pointers traverse the same total distance (lengthA + lengthB)
2. If there's an intersection, they'll meet at the intersection point
3. If there's no intersection, they'll both become null at the same time

### Dry Run Examples

**Example 1: Given Test Case**

```
ListA: 4 -> 1 -> 8 -> 4 -> 5
ListB: 5 -> 6 -> 1 -> 8 -> 4 -> 5
Intersection at node with value 8
```

Initialize: pointerA = headA (4), pointerB = headB (5).

Step 1: pointerA = 1, pointerB = 6 (not equal).

Step 2: pointerA = 8, pointerB = 1 (not equal).

Step 3: pointerA = 4, pointerB = 8 (not equal).

Step 4: pointerA = 5, pointerB = 4 (not equal).

Step 5: pointerA = null, pointerB = 5 (not equal).

Step 6: pointerA = headB (5), pointerB = null (not equal).

Step 7: pointerA = 6, pointerB = headA (4) (not equal).

Step 8: pointerA = 1, pointerB = 1 (not equal, different nodes).

Step 9: pointerA = 8, pointerB = 8 (equal, same node).

Return: Node with value 8.

Output: Intersected at 8.

**Example 2: No Intersection**

```
ListA: 1 -> 2 -> 3
ListB: 4 -> 5
```

PointerA path: 1,2,3,null,4,5,null
PointerB path: 4,5,null,1,2,3,null
Both reach null at same time, return null

**Example 3: Same Length Lists Intersecting**

```
ListA: 1 -> 2 -> 3 -> 4
ListB: 5 -> 3 -> 4
Intersection at node with value 3
```

PointerA path: 1,2,3
PointerB path: 5,3
They meet at node with value 3

The two-pointer approach for finding the intersection node of two linked lists works by ensuring that both pointers traverse the same total distance (length of list A + length of list B) before either meeting at the intersection point or both reaching the end (null).

### Why We Switch Heads, Intuition Behind Interchanging heads in 2 Pointers approach:

The goal is to find the intersection node (where both lists share the same node in memory) or determine there’s no intersection. The challenge is that the lists may have different lengths before the intersection point, so simply traversing them simultaneously won’t align the pointers at the intersection. The pointer swap addresses this by ensuring both pointers travel the same total distance, which aligns them at the intersection if one exists.

1. **Equalizing the Total Distance Traveled:**

   - When one pointer reaches the end of its list, we switch it to the head of the other list.
   - This ensures that both pointers traverse:
     - The unique part of list A
     - The unique part of list B
     - The common part (if any)

2. **Meeting at Intersection:**
   - If there's an intersection, both pointers will reach it after traversing the same total number of nodes.
   - If there's no intersection, both pointers will eventually be null at the same time.

### Detailed Explanation:

Consider two lists:

- List A has length `m` with `k` nodes before intersection
- List B has length `n` with `l` nodes before intersection
- The common part has length `c`

Pointer A will traverse:

- `k` nodes (A's unique part)
- `c` nodes (common part)
- Then `l` nodes (B's unique part when switched to headB)

Pointer B will traverse:

- `l` nodes (B's unique part)
- `c` nodes (common part)
- Then `k` nodes (A's unique part when switched to headA)

Both pointers traverse exactly `k + l + c` nodes before either:

- Meeting at the intersection point (after `k + l` steps)
- Or reaching null (if no intersection)

### Example Walkthrough:

Given:

```
List A: 4 -> 1 -> 8 -> 4 -> 5 (length 5)
List B: 5 -> 6 -> 1 -> 8 -> 4 -> 5 (length 6)
Intersection at node with value 8
```

Pointer A path:

1. 4 (A head)
2. 1
3. 8 (intersection)
4. 4
5. 5 (end of A, switch to B head)
6. 5 (B head)
7. 6
8. 1
9. 8 (meets pointer B here)

Pointer B path:

1. 5 (B head)
2. 6
3. 1
4. 8 (intersection)
5. 4
6. 5 (end of B, switch to A head)
7. 4 (A head)
8. 1
9. 8 (meets pointer A here)

They meet at the intersection node (8) after both traversing exactly 9 nodes (5 from A + 4 from B before intersection).

### Edge Case - No Intersection:

List A: 1 -> 2 -> 3
List B: 4 -> 5

Pointer A path:

1. 1
2. 2
3. 3
4. null (switch to B head)
5. 4
6. 5
7. null

Pointer B path:

1. 4
2. 5
3. null (switch to A head)
4. 1
5. 2
6. 3
7. null

Both reach null at same time, confirming no intersection.

This approach elegantly handles all cases with O(1) space and O(m+n) time complexity.
