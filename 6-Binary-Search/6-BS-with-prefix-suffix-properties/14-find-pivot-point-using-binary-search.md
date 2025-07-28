### Problem Understanding

We are given a rotated sorted array of distinct integers. A rotated sorted array is one that was originally sorted in ascending order but has been rotated at some pivot point. Our goal is to find the pivot element, which is the smallest element in the array and the point where the order of elements changes from increasing to decreasing or vice versa.

**Example:**

- Input: `[3,4,5,6,7,1,2]`
- Output: `1` (the pivot element where the order breaks)

### Intuition

Since the array is rotated but still maintains a sorted order in two parts, we can use a modified binary search to efficiently find the pivot element. The pivot element is the only element in the array that is smaller than its previous element in a sorted array.

Key Observations:

1. In a normally sorted array (not rotated), the first element is the smallest.
2. In a rotated sorted array, the pivot is the point where the order breaks, i.e., where `arr[i] > arr[i+1]`.
3. The pivot element is the smallest element in the array.

#### Approach 1: Linear Search

```javascript
/**
 * Finds the pivot element in a rotated sorted array using linear search.
 * @param {number[]} arr - The rotated sorted array.
 * @return {number} - The pivot element.
 */
function findPivotLinear(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return arr[i + 1];
    }
  }
  return arr[0]; // If no pivot found, array is not rotated
}
```

#### Approach 2: Modified Binary Search (Optimal)

**Modified Binary Search**:

- Use binary search to find the pivot by comparing the middle element with the first and last elements.

- **Initialization**: Start with `left` at the beginning and `right` at the end of the array.
- **Binary Search Loop**:
  - Calculate `mid`.
  - If `arr[mid] > arr[right]`, the pivot is in the right half.
  - Else, the pivot is in the left half including `mid`.
- **Termination**: When `left` equals `right`, `arr[left]` is the pivot.

```javascript
/**
 * Finds the pivot element in a rotated sorted array using binary search.
 * @param {number[]} arr - The rotated sorted array.
 * @return {number} - The pivot element.
 */
function findPivotBinary(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return arr[left];
}
```

#### Dry Runs Example 1: `[3,4,5,6,7,1,2]`

- Initial: left = 0, right = 6
- mid = 3, arr[3] = 6 > arr[6] = 2 → left = 4
- mid = 5, arr[5] = 1 < arr[6] = 2 → right = 5
- mid = 4, arr[4] = 7 > arr[5] = 1 → left = 5
- Now left == right → return arr[5] = 1

#### Example 2: `[7,1,2,3,4,5,6]`

- Initial: left = 0, right = 6
- mid = 3, arr[3] = 3 < arr[6] = 6 → right = 3
- mid = 1, arr[1] = 1 < arr[3] = 3 → right = 1
- mid = 0, arr[0] = 7 > arr[1] = 1 → left = 1
- Now left == right → return arr[1] = 1

#### Edge Case: `[1,2,3,4,5]` (Not rotated)

- Initial: left = 0, right = 4
- mid = 2, arr[2] = 3 < arr[4] = 5 → right = 2
- mid = 1, arr[1] = 2 < arr[2] = 3 → right = 1
- mid = 0, arr[0] = 1 < arr[1] = 2 → right = 0
- Now left == right → return arr[0] = 1

### Conclusion

The modified binary search approach is optimal for this problem, efficiently finding the pivot in O(log n) time. The linear search, while straightforward, is less efficient for large arrays. The binary search method leverages the sorted properties of the array to quickly narrow down the pivot's location.
