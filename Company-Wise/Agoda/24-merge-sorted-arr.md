# LC 88. Merge Sorted Array

## Intuition

The problem requires merging two sorted arrays into one sorted array in-place, using the first array (nums1) which has enough space to accommodate all elements. The key challenge is to do this efficiently without using additional space for the merged array.

### Optimal Two Pointers Approach (End to Start)

- Use three pointers starting from the end of both arrays and the end of the merged array
- Compare elements and place the larger one at the end of nums1
- Works in-place without additional space
- Most efficient approach

### Optimal Two Pointers (End to Start)

```javascript
/**
 * Merges two sorted arrays in-place using three pointers from the end
 * Time Complexity: O(m+n) - linear time
 * Space Complexity: O(1) - no additional space needed
 */
function mergeOptimal(nums1, m, nums2, n) {
  let pointer1 = m - 1; // Points to last element in nums1's initial part
  let pointer2 = n - 1; // Points to last element in nums2
  let current = m + n - 1; // Points to last position in nums1

  // While both arrays have elements to compare
  while (pointer1 >= 0 && pointer2 >= 0) {
    // Place the larger element at the current position
    if (nums1[pointer1] > nums2[pointer2]) {
      nums1[current] = nums1[pointer1];
      pointer1--;
    } else {
      nums1[current] = nums2[pointer2];
      pointer2--;
    }
    current--;
  }

  // If there are remaining elements in nums2, copy them to nums1
  // (No need to check nums1 as those elements are already in place)
  while (pointer2 >= 0) {
    nums1[current] = nums2[pointer2];
    pointer2--;
    current--;
  }
  // nums1 now contains the merged sorted array
}
```

## Dry Run of Optimal Approach

Let's do a detailed dry run of the optimal approach (end-to-start merging) for the given input:

### Initial State:

```
nums1 = [4, 5, 6, 0, 0, 0] (m = 3)
nums2 = [1, 2, 3] (n = 3)
```

### Pointer Initialization:

```
pointer1 = m - 1 = 2 (points to 6 in nums1)
pointer2 = n - 1 = 2 (points to 3 in nums2)
current = m + n - 1 = 5 (last position in nums1)
```

### Step-by-Step Execution:

**Iteration 1:**

- Compare nums1[2] (6) vs nums2[2] (3)
- 6 > 3 → nums1[5] = 6
- Move pointers:
  - pointer1 = 1 (now points to 5)
  - current = 4
- Array state:
  - nums1 = [4,5,6,0,0,6]
  - nums2 = [1,2,3]

**Iteration 2:**

- Compare nums1[1] (5) vs nums2[2] (3)
- 5 > 3 → nums1[4] = 5
- Move pointers:
  - pointer1 = 0 (now points to 4)
  - current = 3
- Array state:
  - nums1 = [4,5,6,0,5,6]
  - nums2 = [1,2,3]

**Iteration 3:**

- Compare nums1[0] (4) vs nums2[2] (3)
- 4 > 3 → nums1[3] = 4
- Move pointers:
  - pointer1 = -1 (no more elements in nums1)
  - current = 2
- Array state:
  - nums1 = [4,5,6,4,5,6]
  - nums2 = [1,2,3]

**Exit Main Loop:**

- pointer1 is now -1 (nums1 exhausted)
- Enter remaining elements copy for nums2

**Remaining Elements Copy:**

- pointer2 = 2, current = 2
- nums1[2] = nums2[2] = 3

  - pointer2 = 1, current = 1
  - nums1 = [4,5,3,4,5,6]

- nums1[1] = nums2[1] = 2

  - pointer2 = 0, current = 0
  - nums1 = [4,2,3,4,5,6]

- nums1[0] = nums2[0] = 1
  - pointer2 = -1, current = -1
  - nums1 = [1,2,3,4,5,6]

### Final State:

```
nums1 = [1, 2, 3, 4, 5, 6]
```

### Key Observations:

1. The algorithm correctly handles the case where all elements in nums2 are smaller than nums1 elements
2. The remaining elements copy phase is crucial here (runs 3 times)
3. The merging happens perfectly in-place without additional memory
4. The final array is properly sorted in non-decreasing order

This dry run demonstrates how the optimal approach efficiently merges the arrays by working backwards and carefully placing each element in its correct final position.

### Example 1:

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3

Initial state:
pointer1 = 2 (points to 3)
pointer2 = 2 (points to 6)
current = 5

Iteration 1:
3 < 6 → nums1[5] = 6
pointer2 = 1, current = 4
nums1 = [1,2,3,0,0,6]

Iteration 2:
3 < 5 → nums1[4] = 5
pointer2 = 0, current = 3
nums1 = [1,2,3,0,5,6]

Iteration 3:
3 > 2 → nums1[3] = 3
pointer1 = 1, current = 2
nums1 = [1,2,3,3,5,6]

Iteration 4:
2 == 2 → nums1[2] = 2
pointer2 = -1, current = 1
nums1 = [1,2,2,3,5,6]

pointer2 < 0 → exit loop
Final result: [1,2,2,3,5,6]

### Example 2:

Input: nums1 = [1], m = 1, nums2 = [], n = 0

pointer1 = 0, pointer2 = -1, current = 0
No iterations occur as pointer2 is already -1
Final result: [1]

### Example 3:

Input: nums1 = [0], m = 0, nums2 = [1], n = 1

pointer1 = -1, pointer2 = 0, current = 0
First while condition false (pointer1 < 0)
Second while:
nums1[0] = 1
pointer2 = -1, current = -1
Final result: [1]

## Complexity Analysis

3. Optimal Two Pointers:
   - Time: O(m+n) - Single pass through both arrays
   - Space: O(1) - In-place merging

The optimal approach is clearly the best as it provides linear time complexity with constant space usage.
