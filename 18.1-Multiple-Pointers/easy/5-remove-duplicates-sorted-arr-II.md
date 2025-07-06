# LC 80. Remove Duplicates from Sorted Array II

Given an integer array `nums` sorted in `non-decreasing order`, remove some duplicates `in-place` such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return k after placing the final result in the first k slots of `nums`.

### Problem Understanding

- The problem requires us to modify a sorted array in-place such that each unique element appears at most twice.
- The relative order of the elements should be maintained. The solution should return the length of the modified array (denoted as `k`), and the first `k` elements should contain the valid elements. The elements beyond `k` can be ignored.

**Key points:**

- `Sorted array:` Since the array is sorted, duplicates are adjacent, making it easier to track consecutive occurrences.
- `At most twice:` For each unique element, we allow up to two occurrences in the result.
- `In-place:` We cannot use extra arrays; we must overwrite elements in the input array.
- `O(1) extra memory:` Only a constant amount of additional variables can be used.
- `Return k:` The number of elements in the valid result, with the first k elements of the array holding the final result.

The challenge is to decide which elements to keep and where to place them in the array while iterating, ensuring each unique element appears no more than twice.

### Intuition

Since the array is sorted, we can process elements sequentially, tracking how many times each element appears. We need to:

- Identify when an element should be included (if it’s the first or second occurrence).
- Place included elements at the correct position in the array.
- Keep track of the position where the next valid element should be placed.
- Return the count of valid elements (`k`).

The optimal approach uses a two-pointer technique:

- One pointer (writeIndex) indicates where to place the next valid element.
- Another pointer (implicitly the loop index) scans through the array to identify valid elements.
- We also track the count of occurrences of the current element to ensure it doesn’t exceed two.

Alternative approaches might involve counting occurrences in a single pass or shifting elements, but these could be less efficient or violate the O(1) space constraint if not carefully designed.

### Approaches

1. **Two-pointer Technique**:
   - **Slow Pointer (`writeIndex`)**: Tracks the position where the next valid element should be written.
   - **Fast Pointer (`i`)**: Iterates through each element in the array.
   - For each element `nums[i]`, compare it with `nums[writeIndex - 2]`. If they are different, it means we can include `nums[i]` in the valid part (since we haven't exceeded two occurrences yet).

### Solution Code

```javascript
/**
 * Removes duplicates such that each element appears at most twice.
 * @param {number[]} nums - Sorted array in non-decreasing order.
 * @return {number} - Length of the modified array.
 */
function removeDuplicates(nums) {
  // If array has 2 or fewer elements, no duplicates to remove
  if (nums.length <= 2) {
    return nums.length;
  }

  // Initialize writeIndex to 2, as first two elements are always kept
  let writeIndex = 2; // Start from the third element

  // Start from third element (index 2)
  for (let i = 2; i < nums.length; i++) {
    // If the current element is different from the element two positions before writeIndex
    if (nums[i] !== nums[writeIndex - 2]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}
```

### Explanation

1. **Initial Check**: If the array length is 2 or less, no duplicates beyond twice can exist, so return the array length as-is.
2. **Two-pointer Initialization**: `writeIndex` starts at 2 because the first two elements are always valid (even if they are duplicates).
3. **Iteration**: For each element starting from index 2:
   - Compare the current element with the element at `writeIndex - 2`. If they are different, it means the current element can be included in the valid part (as it hasn't appeared twice yet in the valid segment).
   - Copy the current element to `writeIndex` and increment `writeIndex`.
4. **Result**: The `writeIndex` at the end of the loop gives the length of the modified array.

### Time and Space Complexity

- **Time Complexity**: O(n), where `n` is the length of the array. We traverse the array once.
- **Space Complexity**: O(1), as we modify the array in-place without using extra space.

### Dry Run with Examples

**Example 1**:

- Input: `nums = [1,1,1,2,2,3]`
- Initial `writeIndex = 2`
- Iteration:
  - i=2: nums[2] (1) vs nums[0] (1) → same → skip
  - i=3: nums[3] (2) vs nums[1] (1) → different → nums[2] = 2, writeIndex = 3
  - i=4: nums[4] (2) vs nums[1] (1) → different → nums[3] = 2, writeIndex = 4
  - i=5: nums[5] (3) vs nums[2] (2) → different → nums[4] = 3, writeIndex = 5
- Final `nums = [1,1,2,2,3,_]`, `k = 5`

**Example 2**:

- Input: `nums = [0,0,1,1,1,1,2,3,3]`
- Initial `writeIndex = 2`
- Iteration:
  - i=2: nums[2] (1) vs nums[0] (0) → different → nums[2] = 1, writeIndex = 3
  - i=3: nums[3] (1) vs nums[1] (0) → different → nums[3] = 1, writeIndex = 4
  - i=4: nums[4] (1) vs nums[2] (1) → same → skip
  - i=5: nums[5] (1) vs nums[2] (1) → same → skip
  - i=6: nums[6] (2) vs nums[4] (1) → different → nums[4] = 2, writeIndex = 5
  - i=7: nums[7] (3) vs nums[3] (1) → different → nums[5] = 3, writeIndex = 6
  - i=8: nums[8] (3) vs nums[4] (2) → different → nums[6] = 3, writeIndex = 7
- Final `nums = [0,0,1,1,2,3,3,_,_]`, `k = 7`

**Edge Case Example**:

- Input: `nums = [1,1,1,1]`
- Initial `writeIndex = 2`
- Iteration:
  - i=2: nums[2] (1) vs nums[0] (1) → same → skip
  - i=3: nums[3] (1) vs nums[0] (1) → same → skip
- Final `nums = [1,1,_,_]`, `k = 2`

## 2. Count-Based Approach

This approach counts the occurrences of each element and ensures no more than two are included, using a write pointer to place valid elements.

```javascript
/**
 * Removes duplicates from a sorted array, allowing each element to appear at most twice.
 * @param {number[]} nums - Sorted array in non-decreasing order
 * @return {number} - Length of the modified array
 */
function removeDuplicatesCountBased(nums) {
  // If array has 2 or fewer elements, no duplicates to remove
  if (nums.length <= 2) return nums.length;

  // Initialize writeIndex to track where to place next valid element
  let writeIndex = 1;
  let count = 1; // Count of current element occurrences

  // Iterate through array starting from second element
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      // Same as previous element, increment count
      count++;
    } else {
      // New element, reset count
      count = 1;
    }

    // Include element if its count is 1 or 2
    if (count <= 2) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}
```

**Time Complexity:** O(n)
Single pass through the array, with constant-time operations (comparisons and assignments) per element.

**Space Complexity:** O(1)
Uses only writeIndex and count as extra variables.
