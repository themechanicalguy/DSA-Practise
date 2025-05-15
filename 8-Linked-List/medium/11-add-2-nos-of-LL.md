# LC-2. Add Two Numbers

### Problem Pattern Identification

This problem involves adding two numbers represented as linked lists where each node contains a digit of the number in reverse order. The key pattern here is **linked list traversal with carry propagation**, similar to how you would manually add numbers digit by digit from the least significant digit (rightmost) to the most significant digit (leftmost).

### Intuition and Approach

1. **Intuition**: Since the digits are stored in reverse order, the head of the linked list represents the least significant digit. This makes it straightforward to add corresponding digits from both lists along with any carry from the previous addition, just like how you would add numbers on paper.
2. **Approach**:
   - Traverse both linked lists simultaneously.
   - Add corresponding digits along with any carry from the previous addition.
   - The sum digit is `(sum % 10)`, and the new carry is `Math.floor(sum / 10)`.
   - If one list is exhausted before the other, continue with the remaining list, adding digits with the carry.
   - After both lists are exhausted, if there's any remaining carry, add it as a new node.

### Solution Approaches in JavaScript

#### Approach 1: Iterative Approach

This is the most straightforward approach where we iterate through both lists, add the digits, handle the carry, and build the result list.

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val);
 *     this.next = (next===undefined ? null : next);
 * }
 */

/**
 * Adds two numbers represented as linked lists (digits stored in reverse order).
 * @param {ListNode} l1 - First linked list representing a number.
 * @param {ListNode} l2 - Second linked list representing a number.
 * @return {ListNode} - Result linked list representing the sum.
 */
function addTwoNumbers(l1, l2) {
  // Create a dummy head node to simplify the code (avoids extra checks for the first node)
  let dummyHead = new ListNode(0);
  // `current` will be used to traverse and build the result list
  let current = dummyHead;
  // `carry` stores the carry-over from each digit addition
  let carry = 0;

  // Loop until both lists are fully traversed and no carry remains
  while (l1 !== null || l2 !== null || carry !== 0) {
    // Extract the current digit from each list (0 if the list is exhausted)
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    // Compute the sum of current digits and any carry from the previous step
    const sum = val1 + val2 + carry;
    // Update carry for the next iteration (carry = sum / 10)
    carry = Math.floor(sum / 10);
    // Create a new node with the digit value (sum % 10)
    current.next = new ListNode(sum % 10);
    // Move `current` to the newly created node
    current = current.next;

    // Move to the next nodes in the input lists (if they exist)
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  // The result starts from `dummyHead.next` (since `dummyHead` was just a placeholder)
  return dummyHead.next;
}
```

### Time and Space Complexity Analysis

- **Time Complexity**: `O(max(n, m))` where `n` and `m` are the lengths of the two linked lists. We traverse each list once.
- **Space Complexity**:
  - Iterative: `O(max(n, m))` for the result linked list.
  - Recursive: `O(max(n, m))` for the recursion stack and the result linked list.

### Dry Run of Optimal (Iterative) Approach

#### Example 1: Normal Case

Input: `l1 = [2,4,3]`, `l2 = [5,6,4]`

- Initial: carry = 0, dummyHead -> 0, current -> dummyHead
- Step 1: val1=2, val2=5, sum=7, carry=0, current.next=7
- Step 2: val1=4, val2=6, sum=10, carry=1, current.next=0
- Step 3: val1=3, val2=4, sum=8 (3+4+1), carry=0, current.next=8
- Result: `[7,0,8]`

#### Example 2: Different Lengths

Input: `l1 = [9,9,9,9,9,9,9]`, `l2 = [9,9,9,9]`

- Initial: carry = 0
- Step 1-4: Add corresponding digits, carry propagates.
- Step 5-7: Continue with l1, adding digits with carry.
- Final carry=1, add new node.
- Result: `[8,9,9,9,0,0,0,1]`

#### Example 3: Edge Case (One List Empty)

Input: `l1 = [0]`, `l2 = [0]`

- Initial: carry = 0
- Step 1: val1=0, val2=0, sum=0, carry=0, current.next=0
- Result: `[0]`

### Optimal Approach

The iterative approach is optimal because:

- It avoids the overhead of recursion (stack frames).
- It handles all edge cases (different lengths, final carry) gracefully.
- It is easy to understand and implement.
