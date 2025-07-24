# Search in Rotated Sorted Array

- The **Search in Rotated Sorted Array** pattern is a variation of the binary search algorithm used to find a target element in a sorted array that has been rotated at some unknown `pivot` point.
- The array is originally sorted in `ascending` order, but after rotation, a portion of it is shifted to the end.
- For example, `[1, 2, 3, 4, 5]` rotated at index 2 becomes `[3, 4, 5, 1, 2]`.
- The challenge is to efficiently locate the target element while maintaining the `O(log n)` time complexity of binary search.

## Identifying the Pattern

You can identify this pattern when:

- The input is a `sorted array` that has been `rotated` at some pivot.
- The array has `no duplicates` (or duplicates are explicitly handled in some variations).
- You need to `find an element` or determine its `index` in the array.
- The problem requires `logarithmic time complexity` (O(log n)), suggesting a binary search-based approach.
- Key characteristics:
  - The array is divided into `two sorted subarrays` due to rotation.
  - At least one half of the array (left or right of the midpoint) is always sorted.
- i.e Find a target or a specific property (e.g., minimum) in a sorted array that has been rotated at an unknown pivot.

Common problems include:

- Finding a target element in a rotated sorted array.
- Finding the pivot (rotation point) or the minimum element.
- Variations like searching in an array with duplicates.

## Intuition

The core idea is to adapt binary search to handle the rotation. In a regular sorted array, binary search compares the target with the middle element and eliminates half of the array. In a rotated sorted array:

- **Determine which half is sorted:** By comparing the `middle` element with the array's endpoints, you can identify which half (left or right) is sorted.
- **Check if the target lies in the sorted half:** If the `target` is within the range of the sorted half, apply standard binary search on that half. Otherwise, search the other (unsorted) half.
- **Handle edge cases:** Empty arrays, single-element arrays, or cases where the array is not rotated.

The intuition relies on the fact that even after rotation, one half of the array is always sorted, allowing us to decide which half to search based on the target’s value relative to the sorted portion.

## Approach

- **Initialize pointers:** Use two pointers, `low` and `right`, to represent the search range (initially 0 and `n-1`).
- **Binary search loop:**
  - Compute the `middle` index: `mid` = `Math.floor((left + right) / 2)`.
  - Check if the `middle` element is the target: if `(arr[mid] === target)` return `mid`.
  - Determine which half is sorted by comparing `arr[mid]` with `arr[left]` or `arr[right]`:
    - If arr[left] <= arr[mid], the left half (left to mid) is sorted.
    - If arr[mid] <= arr[right], the right half (mid to right) is sorted.
  - For the sorted half, check if the `target` lies within its range (e.g., for left half: arr[left] <= target < arr[mid]).
    - If `yes`, search the sorted half `(right = mid - 1 or left = mid + 1)`.
    - If `no`, search the other half.
- **Termination:** If `left > right`, the target is not in the array, `return -1`.

## Time Complexity

**O(log n)**

## Examples

1. **Search for a target** in a rotated sorted array (e.g., LeetCode: _Search in Rotated Sorted Array_).
2. **Find the minimum element** in a rotated sorted array (e.g., LeetCode: _Find Minimum in Rotated Sorted Array_).

## Conditions

- The array was originally sorted but rotated.
- No duplicates (or special handling for duplicates, as in LeetCode: _Search in Rotated Sorted Array II_).
