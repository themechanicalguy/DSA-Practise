# LC - 33 Search in Rotated Sorted Array

Given an integer array nums sorted in ascending order, possibly rotated at some pivot unknown to you beforehand,
and an integer target, return the index of target in nums, or -1 if target is not in nums.
You must write an algorithm with O(log n) runtime complexity.
Example 1:
Input: nums = `[4,5,6,7,0,1,2]`, target = `0`
Output: `4`

# Search in Rotated Sorted Array

## Intuition

The problem requires searching for a target value in a rotated sorted array with `O(log n)` time complexity.
A rotated sorted array is one that was originally sorted in ascending order but then rotated at some pivot point.

The key observations:

1. Even after rotation, one half of the array (either left or right of mid) will always be sorted
2. We can determine which half is sorted by comparing the first and last elements of that half
3. Based on which half is sorted and where the target lies, we can eliminate half of the array in each step

## Approaches

### 1. Single-pass Binary Search (Optimal)

- Modified binary search that checks which half is sorted and adjusts search range accordingly

```javascript
/**
 * Search in Rotated Sorted Array (Single-pass Binary Search)
 * @param {number[]} nums - Rotated sorted array with distinct values
 * @param {number} target - Value to search for
 * @return {number} - Index of target if found, otherwise -1
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Case 1: Found the target
    if (nums[mid] === target) return mid;

    // Case 2: Left half [left..mid] is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is within the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }
    // Case 3: Right half [mid..right] must be sorted (since left half isn't)
    else {
      // Check if target is within the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Search right half
      } else {
        right = mid - 1; // Search left half
      }
    }
  }

  // Target not found
  return -1;
}
```

## Time and Space Complexity Analysis

- Time Complexity: O(log n)
  - Single binary search pass
- Space Complexity: O(1)
  - Only constant extra space is used

The single-pass approach is more elegant and has the same theoretical complexity, though in practice it might be slightly faster due to doing only one binary search.

## Dry Run of Optimal Approach (Single-pass)

### Example 1:

nums = [4,5,6,7,0,1,2], target = 0

Initial: left = 0, right = 6

1. mid = 3 (nums[3]=7)
   - nums[0]=4 <= 7 (left half sorted)
   - target 0 is not between 4 and 7 → search right
   - left = 4
2. left=4, right=6
   mid=5 (nums[5]=1)
   - nums[4]=0 <= 1? No → right half must be sorted
   - target 0 is not between 1 and 2 → search left
   - right = 4
3. left=4, right=4
   mid=4 (nums[4]=0) → match, return 4

### Example 2:

nums = [4,5,6,7,0,1,2], target = 3

Initial: left = 0, right = 6

1. mid=3 (nums[3]=7)
   - left half sorted (4<=7)
   - 3 not between 4 and 7 → search right
   - left=4
2. left=4, right=6
   mid=5 (nums[5]=1)
   - nums[4]=0 <=1? No → right half sorted
   - 3 is between 1 and 2? No → search left
   - right=4
3. left=4, right=4
   mid=4 (nums[4]=0) → no match
   Exit loop, return -1

### Example 3:

nums = [5,1,3], target = 3

#### Initial State:

- left = 0, right = 2
- nums = [5, 1, 3]

#### Step 1:

- mid = Math.floor((0 + 2) / 2) = 1
- nums[mid] = nums[1] = 1
- Check if nums[left] (5) <= nums[mid] (1): 5 <= 1? → False
- So we enter the `else` block (right half must be sorted)

Now in the `else` block:

- Check if target (3) is in the right sorted half:
  - nums[mid] (1) < target (3) → True
  - target (3) <= nums[right] (3) → True
- Both conditions are true, so we search the right half:
  - left = mid + 1 = 2

#### Step 2:

- left = 2, right = 2
- mid = Math.floor((2 + 2) / 2) = 2
- nums[mid] = nums[2] = 3
- Found target, return 2

### Example 4 (Edge case):

nums = [1], target = 0

Initial: left=0, right=0

1. mid=0 (nums[0]=1) → no match
   Exit loop, return -1

### Edge Case Example:

nums = [3,1], target = 1

Initial: left=0, right=1

1. mid=0 (nums[0]=3)
   - nums[0] <= nums[0] → left half sorted
   - 1 not between 3 and 3 → search right
   - left=1
2. left=1, right=1
   mid=1 (nums[1]=1) → match, return 1

### 2. Binary Search with Pivot Finding (Two-pass)

- First find the pivot point (smallest element) using binary search
- Then perform binary search on the appropriate half

```javascript
/**
 * Find the index of the smallest element (pivot) in the rotated sorted array
 * @param {number[]} nums
 * @returns {number}
 */
function findPivot(nums) {
  let left = 0;
  let right = nums.length - 1;

  // Array is not rotated
  if (nums[left] < nums[right]) return 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Found the pivot (smallest element)
    if (nums[mid] > nums[mid + 1]) {
      return mid + 1;
    }

    if (nums[mid] < nums[left]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return 0;
}

/**
 * Binary search in a sorted subarray
 * @param {number[]} nums
 * @param {number} target
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
function binarySearch(nums, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

/**
 * Search in rotated sorted array (two-pass approach)
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
function searchTwoPass(nums, target) {
  const n = nums.length;

  if (n === 0) return -1;
  if (n === 1) return nums[0] === target ? 0 : -1;

  const pivot = findPivot(nums);

  // If target is the smallest element
  if (nums[pivot] === target) return pivot;

  // If array is not rotated, search the entire array
  if (pivot === 0) return binarySearch(nums, target, 0, n - 1);

  if (target >= nums[0]) {
    // Search in the left side of pivot
    return binarySearch(nums, target, 0, pivot - 1);
  } else {
    // Search in the right side of pivot
    return binarySearch(nums, target, pivot, n - 1);
  }
}

//One function - Find Pivot + Binary Search (Two Pass)
/*
- Search in rotated sorted array by first finding pivot, then binary searching
- @param {number[]} nums - The rotated sorted array
- @param {number} target - The value to search for
- @return {number} - Index of target or -1 if not found
*/
function searchRotatedArrayTwoPass(nums, target) {
  if (nums.length === 0) return -1;

  // Step 1: Find the index of the smallest element (pivot)
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const pivot = left;
  left = 0;
  right = nums.length - 1;

  // Step 2: Determine which side of the pivot to search
  if (target >= nums[pivot] && target <= nums[right]) {
    left = pivot;
  } else {
    right = pivot - 1;
  }

  // Step 3: Perform standard binary search
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// Example usage
const nums = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotatedArrayTwoPass(nums, target)); // Output: 4
```
