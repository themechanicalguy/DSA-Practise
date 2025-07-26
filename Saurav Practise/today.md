# 2300. Successful Pairs of Spells and Potions --26 July

You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

Example 1:

Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:

- 0th spell: 5 \* [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
- 1st spell: 1 \* [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
- 2nd spell: 3 \* [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
  Thus, [4,0,3] is returned.
  Example 2:

**Brute Force**

```javascript
var successfulPairs = function (spells, potions, success) {
  // obj- multiply spells item with all potion items
  // check if items are greater >= success
  // then increase count for that spell and push it to result array after that spell is completed
  const res = [];

  for (let spell of spells) {
    let count = 0;
    for (let potion of potions) {
      let strength = spell * potion;
      if (strength >= success) {
        count++;
      }
    }
    res.push(count);
  }

  return res;
};
```

FAILED FOR OPTIMIZED

#### **2. Optimized Approach (Sorting + Binary Search)**

```javascript
/**
 * Optimized approach: Sort potions and use binary search for each spell.
 * @param {number[]} spells - Array of spell strengths.
 * @param {number[]} potions - Array of potion strengths.
 * @param {number} success - Threshold for a successful pair.
 * @return {number[]} - Array where each element represents the count of successful potions for the corresponding spell.
 */
function successfulPairs(spells, potions, success) {
  const n = spells.length; // Number of spells
  const m = potions.length; // Number of potions
  const pairs = new Array(n).fill(0); // Initialize result array with zeros

  potions.sort((a, b) => a - b); // Sort potions in ascending order

  for (let i = 0; i < n; i++) {
    // Iterate over each spell
    const spell = spells[i]; // Current spell strength
    // Calculate the minimum potion strength needed for success
    const minPotion = Math.ceil(success / spell);

    // Binary search to find the first potion >= minPotion
    let left = 0; // Start of search range
    let right = m - 1; // End of search range
    let firstSuccessfulIndex = m; // Default to m (no successful potions)

    while (left <= right) {
      // Binary search loop
      const mid = Math.floor((left + right) / 2); // Midpoint
      if (potions[mid] >= minPotion) {
        // If mid potion is sufficient
        firstSuccessfulIndex = mid; // Update first successful index
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }

    // Number of successful potions is total potions - first successful index
    pairs[i] = m - firstSuccessfulIndex;
  }

  return pairs; // Return the result array
}
```

### **Dry Run of Optimal Approach**

#### **Example 1:**

- `spells = [5, 1, 3]`, `potions = [1, 2, 3, 4, 5]`, `success = 7`

1. Sort `potions`: Already sorted `[1, 2, 3, 4, 5]`.
2. For `spell = 5`:
   - `minPotion = ceil(7 / 5) = 2`.
   - Binary search for first `potion >= 2`: index `1` (value `2`).
   - Successful potions: `5 - 1 = 4` (`[2, 3, 4, 5]`).
3. For `spell = 1`:
   - `minPotion = ceil(7 / 1) = 7`.
   - Binary search for first `potion >= 7`: index `5` (no such potion).
   - Successful potions: `5 - 5 = 0`.
4. For `spell = 3`:
   - `minPotion = ceil(7 / 3) = 3`.
   - Binary search for first `potion >= 3`: index `2` (value `3`).
   - Successful potions: `5 - 2 = 3` (`[3, 4, 5]`).

- **Output**: `[4, 0, 3]`.

---

# Pattern - 2 - Search in Rotated Sorted Array

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

**Key characteristics:**

- The array is divided into `two sorted subarrays` due to rotation.
- At least one half of the array (left or right of the midpoint) is always sorted.
- i.e Find a target or a specific property (e.g., minimum) in a sorted array that has been rotated at an unknown pivot.

**Common problems include:**

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

# LC - 33 Search in Rotated Sorted Array

# LC- 81 Search in Rotated Sorted Array II

# LC- 153 Find Minimum in Rotated Sorted Array

# Find out how many times has an array been rotated

# LC- 4. Median of Two Sorted Arrays

# Missing Number in Sorted Array of Natural Numbers

# LC- 1539 Kth Missing Positive Number

# LC 540 Single Element in a Sorted Array

# LC - 162 Find Peak Element

# Find pivot element in an array
