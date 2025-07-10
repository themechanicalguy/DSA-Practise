# LC- 26. Remove Duplicates from Sorted Array

## Problem Understanding

We need to remove duplicates from a sorted array in-place (without creating a new array) and return the count of unique elements. The first k elements of the array should contain the unique elements in their original order.

## Approach 1: Two Pointers Technique (Optimal)

This is the most efficient approach with O(n) time and O(1) space complexity.

**Intuition**:

- Since the array is sorted, all duplicates will be adjacent.
- We can maintain two pointers:
  - `uniquePointer` to track the position where the next unique element should be placed
  - `currentPointer` to iterate through the array
- When we find a new unique element, we place it at `uniquePointer` and increment both pointers
- Otherwise, we just increment `currentPointer`

```javascript
/**
 * Removes duplicates from a sorted array in-place using the two-pointer technique.
 * @param {number[]} nums - Sorted array of numbers (non-decreasing order)
 * @return {number} - Count of unique elements after removing duplicates
 */
function removeDuplicates(nums) {
  // Edge case: If the array is empty, return 0 immediately
  if (nums.length === 0) return 0;

  // Initialize the 'uniquePointer' to track the position of the last unique element
  let uniquePointer = 0;

  // Loop through the array starting from the second element (currentPointer = 1)
  for (let currentPointer = 1; currentPointer < nums.length; currentPointer++) {
    // If the current element is different from the last unique element
    if (nums[currentPointer] !== nums[uniquePointer]) {
      // Move 'uniquePointer' forward to the next position-
      // as we are preserving order and array is sorted- so increment first and swap next
      uniquePointer++;
      // Copy the new unique element to the 'uniquePointer' position
      nums[uniquePointer] = nums[currentPointer];
    }
    // If they are the same, do nothing (skip duplicates)
  }

  // The number of unique elements is 'uniquePointer + 1' (since it's 0-based index)
  return uniquePointer + 1;
}
```

**Time Complexity**: O(n) - We traverse the array once
**Space Complexity**: O(1) - We use constant extra space

## Dry Run of Optimal Approach (Two Pointers)

### Example 1: Basic Case

Input: [1, 1, 2]

- Initial: uniquePointer = 0, nums = [1,1,2]
- currentPointer = 1: nums[1] == nums[0] (1==1) → do nothing
- currentPointer = 2: nums[2] != nums[0] (2!=1) → uniquePointer=1, nums[1]=2
- Final nums: [1,2,_], return 2

### Example 2: Longer Array

Input: [0,0,1,1,1,2,2,3,3,4]

- Initial: uniquePointer = 0, nums = [0,0,1,1,1,2,2,3,3,4]
- currentPointer = 1: 0==0 → skip
- currentPointer = 2: 1!=0 → uniquePointer=1, nums[1]=1
- currentPointer = 3: 1==1 → skip
- currentPointer = 4: 1==1 → skip
- currentPointer = 5: 2!=1 → uniquePointer=2, nums[2]=2
- currentPointer = 6: 2==2 → skip
- currentPointer = 7: 3!=2 → uniquePointer=3, nums[3]=3
- currentPointer = 8: 3==3 → skip
- currentPointer = 9: 4!=3 → uniquePointer=4, nums[4]=4
- Final nums: [0,1,2,3,4,_,_,_,_,_], return 5

### Example 3: Edge Case - Empty Array

Input: []

- Immediately return 0 since array is empty

### Example 4: Edge Case - All Same Elements

Input: [7,7,7]

- Initial: uniquePointer = 0, nums = [7,7,7]
- currentPointer = 1: 7==7 → skip
- currentPointer = 2: 7==7 → skip
- Final nums: [7,_,_], return 1

## Conclusion

The two pointers approach is optimal with O(n) time and O(1) space complexity. It works well because the array is sorted, allowing us to efficiently skip duplicates by comparing adjacent elements. The other approaches, while simpler, don't meet the in-place requirement of the problem.
