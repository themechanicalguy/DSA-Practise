# LC- 35 Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

## Problem Understanding

The problem requires finding the position of a target value in a sorted array or the index where it would be inserted if not present, with O(log n) time complexity. Since the array is sorted and the time complexity constraint is O(log n), a binary search algorithm is the natural choice, as it efficiently narrows down the search space by half in each step.

## Intuition:

- In a `sorted array`, we can use binary search to locate the `target` by comparing it with the `middle` element of the current `search range`.
- If the `target` equals the `middle` element, we return its index.
- If the `target` is smaller, we search in the `left` half; if larger, we search in the `right` half.
- If the `target` is not found, the binary search will converge to the point where the `search range` collapses (i.e., `left > right`).
- At this point, the `left` pointer indicates the position where the target would be inserted to maintain the sorted order. This is because, during binary search, when we adjust the `left` or `right` pointers, `left` ends up at the position where the `target` should be inserted if it’s not present.

```javascript
//Binary Search Approach
/**
 * Finds the index of target in a sorted array or the insertion point using iterative binary search.
 * @param {number[]} nums - Sorted array of distinct integers
 * @param {number} target - Target value to find or insert
 * @returns {number} Index of target or where it should be inserted
 */
function findInsertPositionBinaryIterative(sortedArray, targetValue) {
  let leftBound = 0;
  let rightBound = sortedArray.length - 1;

  while (leftBound <= rightBound) {
    const middleIndex = Math.floor((leftBound + rightBound) / 2);
    const middleValue = sortedArray[middleIndex];

    if (middleValue === targetValue) {
      // Target found at middle index
      return middleIndex;
    } else if (middleValue < targetValue) {
      // Search the right half
      leftBound = middleIndex + 1;
    } else {
      // Search the left half
      rightBound = middleIndex - 1;
    }
  }

  // If not found, leftBound is the insert position
  return leftBound;
}
```

## Approach 2 : Brute Force

```javascript
//Brute force approach
// Time Complexity: O(n)
// Linear Search (Brute Force)
/**
 * Finds the insert position using linear search
 * @param {number[]} sortedArray - Array of distinct integers in ascending order
 * @param {number} targetValue - Value to search or insert
 * @return {number} Index where target is found or should be inserted
 */
function findInsertPositionLinear(sortedArray, targetValue) {
  // Iterate through each element in the array
  for (
    let currentIndex = 0;
    currentIndex < sortedArray.length;
    currentIndex++
  ) {
    // If current element is equal or larger than target, return this position
    if (sortedArray[currentIndex] >= targetValue) {
      return currentIndex;
    }
  }
  // If all elements are smaller, target should be inserted at the end
  return sortedArray.length;
}
```
