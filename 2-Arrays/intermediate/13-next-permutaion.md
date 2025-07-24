# LC-31. Next Permutation

Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).
The replacement must be in place and use only constant extra memory.

Example 1:
Input: nums = `[1,2,3]`
Output: `[1,3,2]`

## Understanding the Problem

- A permutation is an arrangement of elements in a specific order.
- The "next permutation" is the lexicographically next greater arrangement of numbers.

If no such arrangement exists (like [3,2,1]), we return the smallest possible permutation ([1,2,3]).

## Intuition

To find the next permutation, we need to:

1. Find the first decreasing element from the end (pivot)
2. Find the smallest element larger than the pivot to its right
3. Swap them
4. Reverse the suffix after the pivot to get the smallest possible order

This approach ensures we get the next permutation in lexicographical order with minimal changes.

## Approaches

### 1. Optimal Approach (Single Pass)

This is the most efficient approach with O(n) time and O(1) space.

```javascript
/**
 * Finds the next permutation of the given array in-place.
 * @param {number[]} nums - The array to modify
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  // Step 1: Find the first decreasing element from the end (pivot)
  let pivot = -1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      break;
    }
  }

  // Step 2- Edge Case- if pivot = -1; just reverse the array and return
  if (pivot === -1) {
    nums.reverse();
    return nums;
  }

  // Step 3: Find the smallest element larger than nums[pivot] to its right
  // take pivot element and compare from the last value of array and find the next max value and swap, break
  for (let i = nums.length - 1; i > pivot; i--) {
    if (nums[pivot] < nums[i]) {
      [nums[pivot], nums[i]] = [nums[i], nums[pivot]];
      break;
    }
  }

  // Step 4: Reverse the suffix after the pivot
  let left = pivot + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }

  return nums;
}
```

**Time Complexity:** O(n) - In worst case, we make two passes through the array
**Space Complexity:** O(1) - We modify the array in-place

### 2. Brute Force Approach (Not Recommended)

This approach would generate all permutations, sort them, and find the next one. However, it's impractical for larger arrays due to O(n!) time complexity.

## Dry Run Examples

### Example 1: [1, 2, 3]

1. Find pivot: 2 (nums[0] = 1 < nums[1] = 2)
2. Find successor: 3 (nums[2] > nums[0])
3. Swap: [2, 1, 3]
4. Reverse suffix after pivot (index 0): reverse [1,3] → [2,3,1]
   Wait no - actually after swap it's [1,3,2] (I see I made a mistake in the steps)

Correct steps:
Original: [1,2,3]

1. Pivot is at index 0 (value 1)
2. Successor is index 2 (value 3)
3. Swap: [3,2,1]
4. Reverse from index 1: [3,1,2]
   Wait this seems incorrect - let me re-examine.

Actually, the correct steps should be:

1. Find first decreasing from end: compare 2 < 3? Yes, pivot is index 1 (value 2)
2. Find successor: from end, first > 2 is 3 at index 2
3. Swap: [1,3,2]
4. Reverse after pivot (index 1): only one element, no change
   Result: [1,3,2]

### Example 2: [3, 2, 1]

1. Pivot: no decreasing element found (pivot = -1)
2. Skip swap step
3. Reverse entire array: [1, 2, 3]

### Example 3: [1, 1, 5]

1. Pivot: index 1 (value 1) since 1 < 5
2. Successor: index 2 (value 5 > 1)
3. Swap: [1,5,1]
4. Reverse after index 1: only one element, no change
   Result: [1,5,1]

## Edge Cases Covered

1. Already at last permutation ([3,2,1] → [1,2,3])
2. Duplicate elements ([1,1,5] → [1,5,1])
3. Single element array remains unchanged
4. Sorted array ([1,2,3] → [1,3,2])

This problem demonstrates how a careful observation of the permutation pattern can lead to an efficient solution without generating all permutations.
