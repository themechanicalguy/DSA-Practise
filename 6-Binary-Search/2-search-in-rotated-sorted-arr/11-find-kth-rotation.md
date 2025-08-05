### Understanding the Problem

We are given an array of size `n` that has been rotated `k` times. A rotation means moving the first element of the array to the end. Our task is to find the value of `k` (the number of rotations performed).

**Examples:**

1. `[1, 2, 3, 4, 5]` → Not rotated (`k = 0`).
2. `[3, 4, 5, 1, 2]` → Rotated 3 times (`k = 3`).

### Observations:

- The array is sorted in ascending order before rotation.
- After `k` rotations, the smallest element in the array will be at position `k` (0-based index).
- The array is divided into two sorted parts: one from `0` to `k-1` and another from `k` to `n-1`.

### Approaches to Solve the Problem:

#### 1. Linear Search (Brute Force)

- **Intuition**: The number of rotations is equal to the index of the minimum element in the array.
- **Approach**: Traverse the array to find the index of the smallest element.
- **Time Complexity**: O(n) - We traverse the array once.
- **Space Complexity**: O(1) - No extra space is used.

#### 2. Binary Search (Optimal)

- **Intuition**: Since the array is sorted and then rotated, we can use binary search to find the pivot (smallest element).
- **Approach**:
  - The smallest element is the only element for which the previous element is greater than it.
  - Use binary search to find such an element.
- **Time Complexity**: O(log n) - Binary search halves the search space each time.
- **Space Complexity**: O(1) - No extra space is used.

### Solutions in JavaScript:

#### 1. Linear Search Approach

```javascript
/**
 * Finds the number of times a sorted array has been rotated using linear search.
 * @param {number[]} rotatedArray - The rotated sorted array.
 * @returns {number} - The number of rotations.
 */
function countRotationsLinear(rotatedArray) {
  // The number of rotations is equal to the index of the smallest element.
  let minIndex = 0;
  for (let i = 1; i < rotatedArray.length; i++) {
    if (rotatedArray[i] < rotatedArray[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

// Example Usage:
console.log(countRotationsLinear([1, 2, 3, 4, 5])); // Output: 0
console.log(countRotationsLinear([3, 4, 5, 1, 2])); // Output: 3
console.log(countRotationsLinear([5, 1, 2, 3, 4])); // Output: 1
```

#### 2. Binary Search Approach

**Simple Appraoch**

```javascript
/**
 * Function to find the number of times a sorted array has been right-rotated.
 * @param {number[]} arr - The rotated sorted array.
 * @return {number} - The number of rotations.
 */
function findRotationCount(arr) {
  let left = 0;
  let right = arr.length - 1;

  // Binary search with < condition
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Check if the middle element is greater than the rightmost element
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // The index of the smallest element is the number of rotations
  return left;
}

// Test cases
console.log(findRotationCount([5, 1, 2, 3, 4])); // Output: 1
console.log(findRotationCount([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationCount([2, 4, 6, 9])); // Output: 0 (assuming original array is [2, 4, 6, 9])
console.log(findRotationCount([6, 9, 2, 4])); // Output: 2
```

```javascript
/**
 * Finds the number of times a sorted array has been rotated using binary search.
 * @param {number[]} rotatedArray - The rotated sorted array.
 * @returns {number} - The number of rotations.
 */
function countRotationsBinary(rotatedArray) {
  const n = rotatedArray.length;
  let left = 0;
  let right = n - 1;

  // If the array is not rotated at all.
  if (rotatedArray[left] <= rotatedArray[right]) {
    return 0;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Taking modulo arr.length wraps the index around to the start of the array.
    // For example, if arr.length = 4 and mid = 3,
    // then (3 + 1) % 4 = 4 % 4 = 0,
    // which is the first index of the array.
    const next = (mid + 1) % n;
    // Taking modulo arr.length wraps the index around to the end of the array.
    // For example, if arr.length = 4 and mid = 0,
    // then (0 - 1 + 4) % 4 = 3 % 4 = 3,
    // which is the last index of the array.
    const prev = (mid - 1 + n) % n;

    // Check if mid is the smallest element.
    if (
      rotatedArray[mid] <= rotatedArray[next] &&
      rotatedArray[mid] <= rotatedArray[prev]
    ) {
      return mid;
    }

    // Decide which half to search.
    if (rotatedArray[mid] <= rotatedArray[right]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return 0;
}

// Example Usage:
console.log(countRotationsBinary([1, 2, 3, 4, 5])); // Output: 0
console.log(countRotationsBinary([3, 4, 5, 1, 2])); // Output: 3
console.log(countRotationsBinary([5, 1, 2, 3, 4])); // Output: 1
```

### Dry Run of Binary Search Approach:

#### Example 1: `[1, 2, 3, 4, 5]`

- Initial: `left = 0`, `right = 4`.
- Check if `arr[left] <= arr[right]` → `1 <= 5` → `true`. Return `0`.

#### Example 2: `[3, 4, 5, 1, 2]`

- Initial: `left = 0`, `right = 4`.
- `arr[left] > arr[right]` → proceed.
- `mid = 2` → `arr[mid] = 5`.
  - `next = 3`, `prev = 1`.
  - Check if `5 <= 1 && 5 <= 4` → `false`.
  - Since `5 <= 2` → `false`, so `left = 3`.
- Now `left = 3`, `right = 4`.
- `mid = 3` → `arr[mid] = 1`.
  - `next = 4`, `prev = 2`.
  - Check if `1 <= 2 && 1 <= 5` → `true`. Return `3`.

#### Example 3: `[5, 1, 2, 3, 4]`

- Initial: `left = 0`, `right = 4`.
- `arr[left] > arr[right]` → proceed.
- `mid = 2` → `arr[mid] = 2`.
  - `next = 3`, `prev = 1`.
  - Check if `2 <= 3 && 2 <= 1` → `false`.
  - Since `2 <= 4` → `true`, so `right = 1`.
- Now `left = 0`, `right = 1`.
- `mid = 0` → `arr[mid] = 5`.
  - `next = 1`, `prev = 4`.
  - Check if `5 <= 1 && 5 <= 4` → `false`.
  - Since `5 <= 1` → `false`, so `left = 1`.
- Now `left = 1`, `right = 1`.
- `mid = 1` → `arr[mid] = 1`.
  - `next = 2`, `prev = 0`.
  - Check if `1 <= 2 && 1 <= 5` → `true`. Return `1`.

### Edge Cases:

1. Not rotated at all (`[1, 2, 3, 4, 5]`).
2. Rotated `n` times (same as original array, `k = 0`).
3. Single element (`[1]` → `k = 0`).
4. All elements same (`[1, 1, 1, 1]` → `k = 0`).

### Conclusion:

- The binary search approach is optimal with O(log n) time.
- The linear approach is simpler but slower (O(n)).
