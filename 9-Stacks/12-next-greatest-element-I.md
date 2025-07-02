# LC 496. Next Greater Element I

The next greater element of some element `x` in an array is the first greater element that is to the right of `x` in the same array.

You are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.

For each `0 <= i < nums1.length`, find the index j such that `nums1[i] == nums2[j]` and determine the next greater element of `nums2[j]` in `nums2`.
If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

## Problem Understanding & Intuition

We need to find the next greater element for each element in `nums1` based on their positions in `nums2`. The next greater element is the first element to the right in `nums2` that is larger than the current element. If no such element exists, the answer is `-1`.

- The problem requires finding the first element to the right of each element in `nums2` that corresponds to an element in `nums1` and is greater than it.
- Since `nums1` is a subset of `nums2`, each element in `nums1` exists in `nums2`.
- The key challenge is efficiently locating each element from `nums1` in `nums2` and then finding its next greater element to the right.

**Key Observations:**

- We need to map each element in `nums1` to its index in `nums2`.
- For each such element in `nums2`, we must find the first element to its right that is greater.
- If no such element exists, we return -1.
- The output array `ans` has the same length as `nums1`, where ans[i] is the next greater element for `nums1[i]`.

**Challenges:**

- Naive searching for each element and its next greater element can be inefficient.
- We can optimize by preprocessing `nums2` to compute next greater elements, then map results to `nums1`.

## Approaches

## 1. **Brute Force Approach**: For each element in `nums1`, find its position in `nums2` and then scan the remaining elements to the right to find the next greater element.

**Intuition**:

- For each element in `nums1`, find its index in `nums2`.
- From that index, scan rightward in `nums2` to find the first element greater than the current element.
- If no such element is found, return -1.

**Steps**:

1. Iterate over each element in `nums1`.
2. For each element, find its index in `nums2`.
3. From that index, scan to the right to find the first element greater than the current element.
4. If found, add it to the result; otherwise, add `-1`.

**Solution Code**:

```javascript
/**
 * Finds the next greater element for each element in nums1 based on their positions in nums2.
 * This uses a brute force approach by scanning nums2 for each element in nums1.
 * @param {number[]} nums1 - The subset array for which we need to find next greater elements.
 * @param {number[]} nums2 - The main array where we search for next greater elements.
 * @return {number[]} - An array containing the next greater elements for nums1.
 */
function nextGreaterElement(nums1, nums2) {
  // Initialize an empty array to store the results
  const result = [];

  // Iterate over each number in nums1
  for (const num of nums1) {
    // Initialize variables to track if the next greater element is found and its value
    let found = false;
    let nextGreater = -1;

    // Find the index of the current number in nums2
    const index = nums2.indexOf(num);

    // Iterate through the elements to the right of the current number in nums2
    for (let i = index + 1; i < nums2.length; i++) {
      // If a greater element is found, update nextGreater and break the loop
      if (nums2[i] > num) {
        nextGreater = nums2[i];
        found = true;
        break;
      }
    }

    // Push the next greater element (or -1 if not found) into the result array
    result.push(nextGreater);
  }

  // Return the final result array
  return result;
}
```

**Time Complexity**: O(n \* m), where n is the length of `nums1` and m is the length of `nums2`. For each element in `nums1`, we might scan the entire `nums2`.
**Space Complexity**: O(1), excluding the space for the result array.

## 2. Stack-Based Approach

Use a stack to keep track of elements in `nums2` and a hash map to store the next greater elements for each element in `nums2`.
This approach efficiently finds the next greater elements in linear time.

**Intuition**:

- Use a monotonic stack to efficiently compute the next greater element for each element in `nums2`.
- A monotonic stack maintains elements in a specific order (e.g., increasing). When we encounter a larger element, we pop elements from the stack, as the current element is their next greater element.
- Store the next greater elements in a hash map for O(1) lookups.
- Map each element in `nums1` to its next greater element using the hash map.

**Steps**:

1. Initialize a stack and a hash map to store the next greater elements.
2. Iterate over `nums2`:
   - While the stack is not empty and the top element is less than the current element, set the next greater element of the top element to the current element and pop it from the stack.
   - Push the current element onto the stack.
3. After processing `nums2`, any remaining elements in the stack have no next greater element, so their value in the hash map remains `-1`.
4. For each element in `nums1`, retrieve its next greater element from the hash map.

**Solution Code**:

```javascript
/**
 * Finds the next greater element for each element in nums1 based on their positions in nums2.
 * @param {number[]} nums1 - The subset array for which we need to find next greater elements.
 * @param {number[]} nums2 - The main array where we search for next greater elements.
 * @return {number[]} - An array containing the next greater elements for nums1.
 */
function nextGreaterElement(nums1, nums2) {
  // Initialize an empty stack to keep track of elements in nums2
  const stack = [];
  // Initialize a hash map to store the next greater element for each number in nums2
  const nextGreaterMap = {};

  // Iterate through each number in nums2 to find next greater elements
  for (const num of nums2) {
    // While the stack is not empty and the top element of the stack is less than the current number
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      // The next greater element for the top element is the current number
      nextGreaterMap[stack.pop()] = num;
    }
    // Push the current number onto the stack
    stack.push(num);
  }

  // After processing all numbers, any remaining elements in the stack have no next greater element
  while (stack.length > 0) {
    nextGreaterMap[stack.pop()] = -1;
  }

  // For each number in nums1, retrieve its next greater element from the map
  return nums1.map((num) => nextGreaterMap[num]);
}
```

**Time Complexity**: O(n + m), where n is the length of `nums1` and m is the length of `nums2`. We process each element in `nums2` once and each element in `nums1` once.
**Space Complexity**: O(m), for the stack and the hash map, which stores up to m elements.

### Dry Run of Optimal Approach (Stack-Based)

**Example 1**:

- `nums1 = [4,1,2]`, `nums2 = [1,3,4,2]`
  - Process `nums2`:
    - Stack: [], nextGreaterMap: {}
    - 1: stack = [1]
    - 3: 1 < 3 → nextGreaterMap = {1: 3}, stack = [3]
    - 4: 3 < 4 → nextGreaterMap = {1: 3, 3: 4}, stack = [4]
    - 2: 4 > 2 → stack = [4, 2]
  - Remaining stack: nextGreaterMap = {1: 3, 3: 4, 4: -1, 2: -1}
  - For `nums1`:
    - 4 → -1
    - 1 → 3
    - 2 → -1
  - Result: [-1, 3, -1]

**Example 2**:

- `nums1 = [2,4]`, `nums2 = [1,2,3,4]`
  - Process `nums2`:
    - Stack: [], nextGreaterMap: {}
    - 1: stack = [1]
    - 2: 1 < 2 → nextGreaterMap = {1: 2}, stack = [2]
    - 3: 2 < 3 → nextGreaterMap = {1: 2, 2: 3}, stack = [3]
    - 4: 3 < 4 → nextGreaterMap = {1: 2, 2: 3, 3: 4}, stack = [4]
  - Remaining stack: nextGreaterMap = {1: 2, 2: 3, 3: 4, 4: -1}
  - For `nums1`:
    - 2 → 3
    - 4 → -1
  - Result: [3, -1]

**Edge Case**:

- `nums1 = [1]`, `nums2 = [1]`
  - Process `nums2`:
    - Stack: [1]
    - Remaining stack: nextGreaterMap = {1: -1}
  - For `nums1`:
    - 1 → -1
  - Result: [-1]

### Optimal Approach: Monotonic Stack

- The monotonic stack approach is optimal due to its `O(m + n)` time complexity.
- Let’s dive deeper into why it works and perform a dry run with three examples, including edge cases.

**Why Monotonic Stack Works:**

- The stack maintains elements in increasing order. When a new element is larger than the stack’s top, it becomes the next greater element for the popped element(s).
- This ensures each element in `nums2` is processed once, with at most one push and one pop.
- The hash map allows O(1) mapping of `nums1` elements to their next greater elements.
