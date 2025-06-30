### Simplified Problem Statement:

You have a linked list where each node has:

1. A `value`.
2. A `next` pointer (points to the next node in the list).
3. A `random` pointer (points to some random node in the list or `NULL`).

Your task is to create a **deep copy** of this linked list. This means:

- The copied list should have the exact same structure as the original.
- The `next` and `random` pointers in the copied list should point to the corresponding nodes in the copied list (not the original list).
- The original list should remain unchanged after the operation.

### Example:

**Original Linked List:**

```
Node 0: value = 1, next = Node 1, random = Node 3
Node 1: value = 3, next = Node 2, random = Node 3
Node 2: value = 5, next = Node 3, random = NULL
Node 3: value = 9, next = NULL, random = Node 3
```

(Here, `Node i` refers to the node at position `i` in the original list.)

**Copied Linked List:**

```
Node 0': value = 1, next = Node 1', random = Node 3'
Node 1': value = 3, next = Node 2', random = Node 3'
Node 2': value = 5, next = Node 3', random = NULL
Node 3': value = 9, next = NULL, random = Node 3'
```

(Here, `Node i'` refers to the node at position `i` in the copied list.)

### Key Points:

1. The copied list should be completely independent of the original list.
2. No pointers in the copied list should refer to nodes in the original list.
3. The original list must remain unchanged after the copy is made.

### Approach to Solve the Problem:

A common way to solve this problem is to use a hash map to keep track of the mapping between original nodes and copied nodes. Here's a step-by-step approach:

1. **First Pass - Create Copy Nodes:**

   - Traverse the original list and create a copy of each node.
   - Store the mapping from original node to copied node in a hash map (e.g., `original_node -> copied_node`).
   - At this point, the `next` and `random` pointers of the copied nodes are not set.

2. **Second Pass - Set Next and Random Pointers:**

   - Traverse the original list again.
   - For each original node, get its corresponding copied node from the hash map.
   - Set the `next` pointer of the copied node to the copied version of the original node's `next`.
   - Set the `random` pointer of the copied node to the copied version of the original node's `random`.

3. **Return the Head of the Copied List:**
   - The head of the copied list is the copied version of the head of the original list (accessed via the hash map).

# Deep Copy of a Linked List with Random Pointers in JavaScript

## Problem Understanding

We need to create a deep copy of a linked list where each node has:

- `val`: The node's value
- `next`: Pointer to the next node
- `random`: Pointer to a random node in the list

The copy must be completely independent of the original list with all pointers correctly mapped to nodes in the new list.

## Approaches

### 1. Hash Map Approach (Two Pass)

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

```javascript
function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();
  let current = head;

  // First pass: create all nodes and store mapping
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }

  // Second pass: assign next and random pointers
  current = head;
  while (current) {
    map.get(current).next = map.get(current.next) || null;
    map.get(current).random = map.get(current.random) || null;
    current = current.next;
  }

  return map.get(head);
}
```

### 2. Interleaving Nodes Approach (Three Pass)

**Time Complexity:** O(n)  
**Space Complexity:** O(1) (excluding output space)

```javascript
function copyRandomList(head) {
  if (!head) return null;

  // First pass: interleave copied nodes
  let current = head;
  while (current) {
    const copy = new Node(current.val);
    copy.next = current.next;
    current.next = copy;
    current = copy.next;
  }

  // Second pass: assign random pointers
  current = head;
  while (current) {
    if (current.random) {
      current.next.random = current.random.next;
    }
    current = current.next.next;
  }

  // Third pass: separate lists
  current = head;
  const newHead = head.next;
  let copyCurrent = newHead;

  while (current) {
    current.next = current.next.next;
    current = current.next;
    if (copyCurrent.next) {
      copyCurrent.next = copyCurrent.next.next;
      copyCurrent = copyCurrent.next;
    }
  }

  return newHead;
}
```

### 3. Recursive Approach with Hash Map

**Time Complexity:** O(n)  
**Space Complexity:** O(n) (due to recursion stack)

```javascript
function copyRandomList(head, map = new Map()) {
  if (!head) return null;
  if (map.has(head)) return map.get(head);

  const node = new Node(head.val);
  map.set(head, node);

  node.next = copyRandomList(head.next, map);
  node.random = copyRandomList(head.random, map);

  return node;
}
```

## Dry Runs

### Example 1:

Original List: [[1,3], [3,3], [5,null], [9,3]]

Visual Representation:

```
Node0: val=1, next=Node1, random=Node3
Node1: val=3, next=Node2, random=Node3
Node2: val=5, next=Node3, random=null
Node3: val=9, next=null, random=Node3
```

**Hash Map Approach:**

1. First pass creates all new nodes and stores in map
   - map = {Node0: Node0', Node1: Node1', Node2: Node2', Node3: Node3'}
2. Second pass sets pointers:
   - Node0'.next = Node1', Node0'.random = Node3'
   - Node1'.next = Node2', Node1'.random = Node3'
   - Node2'.next = Node3', Node2'.random = null
   - Node3'.next = null, Node3'.random = Node3'

### Example 2:

Original List: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Visual Representation:

```
Node0: val=7, next=Node1, random=null
Node1: val=13, next=Node2, random=Node0
Node2: val=11, next=Node3, random=Node4
Node3: val=10, next=Node4, random=Node2
Node4: val=1, next=null, random=Node0
```

**Interleaving Approach:**

1. First pass interleaves:
   - Original: 7 → 13 → 11 → 10 → 1 → null
   - After: 7 → 7' → 13 → 13' → 11 → 11' → 10 → 10' → 1 → 1' → null
2. Second pass sets random pointers:
   - 13'.random = 7' (original 13.random was Node0, now points to Node0.next)
3. Third pass separates lists

### Example 3:

Original List: [[1,1],[2,1]]

Visual Representation:

```
Node0: val=1, next=Node1, random=Node1
Node1: val=2, next=null, random=Node1
```

**Recursive Approach:**

1. Creates Node0' (val=1)
2. Recursively creates Node1' (val=2)
3. Sets Node0'.next = Node1'
4. Sets Node0'.random = Node1'
5. Sets Node1'.next = null
6. Sets Node1'.random = Node1'

## Final Notes

- The hash map approach is straightforward and easy to understand
- The interleaving approach is more space efficient but modifies the original list temporarily
- The recursive approach is elegant but may cause stack overflow for very large lists

Choose the approach based on your specific constraints (space vs. readability vs. preservation of original list).
