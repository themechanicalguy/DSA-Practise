# LC- 27. Remove Element

## Problem Understanding

Given an integer array nums and an integer `val`, remove all occurrences of `val` in nums `in-place`. The order of the elements may be changed.
Then return the number of elements in nums which are not equal to val.

Example 1:
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2,
with the first two elements of nums being 2.

Example 2:
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5,
with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).

## Approaches

### Approach 1: Two Pointers Technique (Optimal)

This is the most efficient approach with O(n) time and O(1) space complexity.

**Intuition**:

- We can maintain two pointers:
  - `nonValPointer` to track the position where the next non-val element should be placed
  - `currentPointer` to iterate through the array
- When we find an element not equal to `val`, we place it at `nonValPointer` and increment the pointer
- We always increment `currentPointer`

```javascript
/**
 * Removes all occurrences of 'val' from the array in-place using two pointers.
 * @param {number[]} nums - Array of numbers (order can be changed)
 * @param {number} val - Value to remove from the array
 * @return {number} - Count of elements not equal to 'val'
 */
function removeElement(nums, val) {
  // Initialize 'nonValPointer' to track the position where non-'val' elements should be placed
  let nonValPointer = 0;

  // Loop through each element in the array
  for (let currentPointer = 0; currentPointer < nums.length; currentPointer++) {
    // If the current element is NOT equal to 'val'
    if (nums[currentPointer] !== val) {
      // Place the non-'val' element at 'nonValPointer'
      nums[nonValPointer] = nums[currentPointer];
      // Move 'nonValPointer' forward to the next position
      nonValPointer++;
    }
    // If it is equal to 'val', skip it (do nothing)
    // in case of equal only currentPointer is incremented, keeping nonValPointer at position where it will be updated on next valid condition
  }

  // 'nonValPointer' now represents the count of elements not equal to 'val'
  return nonValPointer;
}
```

**Time Complexity**: O(n) - We traverse the array once
**Space Complexity**: O(1) - We use constant extra space

### Approach 2: Two Pointers with Swapping (When Val is Rare)

This approach is efficient when the elements to remove are rare as it reduces the number of copy operations.

```javascript
/**
 * Removes all occurrences of val by swapping with last element
 * @param {number[]} nums - Array of numbers
 * @param {number} val - Value to remove
 * @return {number} - Count of elements not equal to val
 */
function removeElementSwap(nums, val) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1];
      right--;
    } else {
      left++;
    }
  }

  return left;
}
```

**Time Complexity**: O(n) - In worst case we do n operations
**Space Complexity**: O(1) - Constant space used

## Dry Run of Optimal Approach (Two Pointers)

### Example 1: Basic Case

Input: nums = [3,2,2,3], val = 3

- Initial: nonValPointer = 0
- currentPointer = 0: nums[0] == 3 → skip
- currentPointer = 1: nums[1] == 2 → nums[0] = 2, nonValPointer = 1
- currentPointer = 2: nums[2] == 2 → nums[1] = 2, nonValPointer = 2
- currentPointer = 3: nums[3] == 3 → skip
- Final nums: [2,2,_,_], return 2

### Example 2: Multiple Occurrences

Input: nums = [0,1,2,2,3,0,4,2], val = 2

- Initial: nonValPointer = 0
- currentPointer = 0: nums[0] == 0 → nums[0] = 0, nonValPointer = 1
- currentPointer = 1: nums[1] == 1 → nums[1] = 1, nonValPointer = 2
- currentPointer = 2: nums[2] == 2 → skip
- currentPointer = 3: nums[3] == 2 → skip
- currentPointer = 4: nums[4] == 3 → nums[2] = 3, nonValPointer = 3
- currentPointer = 5: nums[5] == 0 → nums[3] = 0, nonValPointer = 4
- currentPointer = 6: nums[6] == 4 → nums[4] = 4, nonValPointer = 5
- currentPointer = 7: nums[7] == 2 → skip
- Final nums: [0,1,3,0,4,_,_,_], return 5

### Example 3: Edge Case - All Elements Equal to Val

Input: nums = [4,4,4], val = 4

- Initial: nonValPointer = 0
- currentPointer = 0: nums[0] == 4 → skip
- currentPointer = 1: nums[1] == 4 → skip
- currentPointer = 2: nums[2] == 4 → skip
- Final nums: [_,_,_], return 0

### Example 4: Edge Case - Empty Array

Input: nums = [], val = 0

- Immediately return 0 since array is empty

## Conclusion

The two pointers approach is optimal with O(n) time and O(1) space complexity. It efficiently moves non-val elements to the front of the array in a single pass. The swapping approach can be more efficient when val elements are rare, but has the same asymptotic complexity. The filter approach, while simple, doesn't meet the in-place requirement.

The optimal solution works well because:

1. It maintains the relative order of non-val elements (though the problem allows order changes)
2. It only requires a single pass through the array
3. It uses constant extra space
4. It handles all edge cases correctly
