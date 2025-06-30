# Find pairs with given sum in doubly linked list

https://www.geeksforgeeks.org/problems/find-pairs-with-given-sum-in-doubly-linked-list/1

## Problem Understanding

We need to find all pairs of distinct nodes in a sorted doubly linked list where the sum of their values equals a given target.

## Intuition

Since the list is sorted, we can use a two-pointer approach similar to what we'd use with a sorted array. One pointer starts at the beginning (smallest values) and another at the end (largest values), moving them inward based on whether their sum is less than or greater than the target.

## Approaches

### Approach 1: Brute Force (Nested Loops)

- For each node, iterate through all subsequent nodes to check for pairs
- Time complexity: O(n²)
- Space complexity: O(1)

### Approach 2: Hash Table

- Traverse the list once, storing seen values in a hash table
- For each node, check if (target - current value) exists in the hash table
- Time complexity: O(n)
- Space complexity: O(n)

### Approach 3: Two Pointers (Optimal for Sorted List)

- Use two pointers starting at head and tail
- Move pointers inward based on whether their sum is less than or greater than target
- Time complexity: O(n)
- Space complexity: O(1)

## Solution Code (All Approaches)

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}

// Approach 1: Brute Force (Nested Loops)
function findPairsBruteForce(dll, target) {
  const pairs = [];
  let current = dll.head;

  // Outer loop for first element of pair
  while (current !== null) {
    let runner = current.next;

    // Inner loop for second element of pair
    while (runner !== null) {
      if (current.data + runner.data === target) {
        pairs.push([current.data, runner.data]);
      }
      runner = runner.next;
    }
    current = current.next;
  }

  return pairs;
}

// Approach 2: Hash Table
function findPairsHashTable(head, target) {
  const pairs = [];
  const seenValues = new Set();
  let current = head;

  while (current !== null) {
    const complement = target - current.data;

    // Check if complement exists in seen values
    if (seenValues.has(complement)) {
      pairs.push([complement, current.data]);
    }

    // Add current value to seen values
    seenValues.add(current.data);
    current = current.next;
  }

  return pairs;
}

// Approach 3: Two Pointers (Optimal for sorted list)
function findPairsTwoPointers(dll, target) {
  const pairs = [];
  let left = dll.head;
  let right = dll.tail;

  // Move pointers towards each other
  while (
    left !== null &&
    right !== null &&
    left !== right &&
    right.next !== left
  ) {
    const sum = left.data + right.data;

    if (sum === target) {
      pairs.push([left.data, right.data]);
      left = left.next; // Move both pointers to find other possible pairs
      right = right.prev;
    } else if (sum < target) {
      left = left.next; // Need a larger sum, move left forward
    } else {
      right = right.prev; // Need a smaller sum, move right backward
    }
  }

  return pairs;
}

// Helper function to print the list
function printList(dll) {
  let current = dll.head;
  const values = [];
  while (current !== null) {
    values.push(current.data);
    current = current.next;
  }
  console.log(values.join(" <-> "));
}

// Test Cases
const dll = new DoublyLinkedList();
[1, 2, 4, 5, 6, 8, 9].forEach((num) => dll.append(num));

console.log("Original list:");
printList(dll);

const target = 7;
console.log(`\nTarget sum: ${target}`);

console.log("\nBrute Force Approach:");
console.log(findPairsBruteForce(dll, target));

console.log("\nHash Table Approach:");
console.log(findPairsHashTable(dll, target));

console.log("\nTwo Pointers Approach:");
console.log(findPairsTwoPointers(dll, target));
```

## Optimal Approach (Two Pointers) Analysis

### Time Complexity: O(n)

- We traverse the list at most once from both ends
- Each iteration moves at least one pointer
- In worst case, we do n/2 operations → O(n)

### Space Complexity: O(1)

- We only use a constant amount of extra space for pointers and the result array
- The output array is not counted in space complexity analysis unless it's auxiliary space

## Dry Run Examples

### Example 1: Normal Case

List: 1 <-> 2 <-> 4 <-> 5 <-> 6 <-> 8 <-> 9
Target: 7

Initial:
left = 1 (head), right = 9 (tail)

Iteration 1: 1 + 9 = 10 > 7 → move right to 8
Iteration 2: 1 + 8 = 9 > 7 → move right to 6
Iteration 3: 1 + 6 = 7 → found (1,6), move both (left=2, right=5)
Iteration 4: 2 + 5 = 7 → found (2,5), move both (left=4, right=4)
Stop (left === right)

Output: [(1,6), (2,5)]

### Example 2: No Pairs Exist

List: 1 <-> 2 <-> 3
Target: 10

Initial:
left = 1, right = 3

Iteration 1: 1 + 3 = 4 < 10 → move left to 2
Iteration 2: 2 + 3 = 5 < 10 → move left to 3
Stop (left === right)

Output: []

### Example 3: All Elements Form Pairs

List: 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6
Target: 7

Initial:
left = 1, right = 6

Iteration 1: 1 + 6 = 7 → found (1,6), move both (left=2, right=5)
Iteration 2: 2 + 5 = 7 → found (2,5), move both (left=3, right=4)
Iteration 3: 3 + 4 = 7 → found (3,4), move both (left=4, right=3)
Stop (right.next === left)

Output: [(1,6), (2,5), (3,4)]

This demonstrates the two-pointer approach works for all cases with a sorted doubly linked list.
