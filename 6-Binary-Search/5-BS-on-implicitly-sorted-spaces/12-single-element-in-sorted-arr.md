# LC 540 Single Element in a Sorted Array

Given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once. Your solution should run in `O(log n)` time complexity.

- Example 1: Input: nums = [1,1,2,2,3,3,4,5,5], Output: 4
  Explanation: The single element is 4.

- Example 2: Input: nums = [1,2,2,3,3,4,4,5,5], Output: 1
  Explanation: The single element is 1.

### Problem Understanding

We are given a sorted array of integers where every element appears exactly twice, except for one element that appears exactly once. Our goal is to find that single element efficiently. The constraints are that the solution must run in `O(log n)` time (which hints at a binary search approach) and O(1) space.

### Intuition

Since the array is sorted, binary search is a natural choice for achieving O(log n) time complexity. The key observation is that in a perfectly paired array (all elements appearing twice), `the first occurrence of an element is at an even index and the second at the next odd index`. The presence of a single unpaired element disrupts this pattern.

For example:

- In `[1,1,2,3,3,4,4,8,8]`, before the single element `2`, pairs are at indices (0,1), (2,3), etc. After `2`, the pairs shift their positions.
- We can use binary search to check the middle element and compare it with its neighbors to determine if the single element is on the left or right.

### Approaches

1. **Binary Search**:
   - Initialize `left` and `right` pointers.
   - Calculate `mid`. If `mid` is even, the next element should be the same, and if `mid` is odd, the previous element should be the same.
   - Based on whether these conditions hold, adjust `left` or `right` to narrow down the search space.

### Solution Code

```javascript
/**
 * Finds the single element in a sorted array where every other element appears twice.
 * @param {number[]} nums - The sorted array of integers.
 * @return {number} - The single element.
 */
function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // Ensure mid is even to check pairs correctly
    if (mid % 2 === 1) {
      mid--; // Adjust mid to be even
    }
    // Check if mid and mid+1 are the same, then left side of mid is balanced
    if (nums[mid] === nums[mid + 1]) {
      // The single element is on the right side
      left = mid + 2;
    } else {
      // The single element is on the left side including mid
      right = mid;
    }
  }
  // When left === right, we've found the single element
  return nums[left];
}
```

### Explanation

1. **Initialization**: Start with `left` at the beginning and `right` at the end of the array.
2. **Binary Search Loop**:
   - Calculate `mid` and adjust it to be even if it's odd to maintain the pair checking logic.
   - Check if `nums[mid]` and `nums[mid + 1]` are the same. If they are, the single element must be on the right side of `mid + 1`. Otherwise, it's on the left side including `mid`.
3. **Termination**: When `left` and `right` converge, `nums[left]` is the single element.

### Time and Space Complexity

- **Time Complexity**: O(log n) because each iteration halves the search space.
- **Space Complexity**: O(1) as we use a constant amount of extra space.

### Dry Runs

**Example 1**: `nums = [1,1,2,3,3,4,4,8,8]`

- Initial: left = 0, right = 8
- mid = 4 (even), nums[4] = 3, nums[5] = 4 → not equal → right = 4
- mid = 2 (even), nums[2] = 2, nums[3] = 3 → not equal → right = 2
- mid = 1 (odd → adjust to 0), nums[0] = 1, nums[1] = 1 → equal → left = 2
- Now left = right = 2 → return nums[2] = 2

**Example 2**: `nums = [3,3,7,7,10,11,11]`

- Initial: left = 0, right = 6
- mid = 3 (odd → adjust to 2), nums[2] = 7, nums[3] = 7 → equal → left = 4
- mid = 5 (odd → adjust to 4), nums[4] = 10, nums[5] = 11 → not equal → right = 4
- Now left = right = 4 → return nums[4] = 10

**Edge Case Example**: `nums = [1,1,2]`

- Initial: left = 0, right = 2
- mid = 1 (odd → adjust to 0), nums[0] = 1, nums[1] = 1 → equal → left = 2
- Now left = right = 2 → return nums[2] = 2

This approach efficiently narrows down the search space to find the single element in logarithmic time.
