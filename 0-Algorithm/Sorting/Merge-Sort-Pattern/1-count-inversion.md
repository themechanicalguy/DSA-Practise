# Inversion Count using Merge Sort in JavaScript

## Intuition and Approach

The inversion count problem can be solved efficiently using a modified merge sort algorithm. Here's why merge sort is suitable:

1. **Divide and Conquer**: Merge sort naturally divides the array into smaller subarrays, making it easier to count inversions at different levels.
2. **Merge Process**: During the merging of sorted subarrays, we can count inversions when we take elements from the right subarray before the left subarray (since they're out of order).

### Key Insight:

When merging two sorted halves, if an element in the right half is smaller than an element in the left half, it forms inversions with all remaining elements in the left half because the left half is sorted.

## Solution Code

```javascript
/**
 * Counts the number of inversions in the array using Merge Sort.
 * An inversion is a pair (i, j) where i < j and arr[i] > arr[j].
 * @param {number[]} arr - Input array of integers
 * @return {number} - Number of inversions
 */
function countInversions(arr) {
  // Helper function to perform merge sort and count inversions
  function mergeSort(array, start, end) {
    if (start >= end) return 0; // Base case: single element or empty array

    const mid = Math.floor((start + end) / 2);
    let inversionCount = 0;

    // Recursively count inversions in left and right halves
    inversionCount += mergeSort(array, start, mid);
    inversionCount += mergeSort(array, mid + 1, end);

    // Count inversions during the merge step
    inversionCount += mergeAndCount(array, start, mid, end);

    return inversionCount;
  }

  // Merges two sorted subarrays and counts inversions
  function mergeAndCount(array, start, mid, end) {
    const leftSubarray = array.slice(start, mid + 1); // Left subarray
    const rightSubarray = array.slice(mid + 1, end + 1); // Right subarray
    let inversionCount = 0;

    let leftIndex = 0; // Index for left subarray
    let rightIndex = 0; // Index for right subarray
    let mergedIndex = start; // Index for merged array

    // Merge the two subarrays while counting inversions
    while (
      leftIndex < leftSubarray.length &&
      rightIndex < rightSubarray.length
    ) {
      if (leftSubarray[leftIndex] <= rightSubarray[rightIndex]) {
        // No inversion: copy from left subarray
        array[mergedIndex++] = leftSubarray[leftIndex++];
      } else {
        // Inversion: leftSubarray[leftIndex] > rightSubarray[rightIndex]
        // All elements from leftIndex to end of leftSubarray form inversions
        array[mergedIndex++] = rightSubarray[rightIndex++];
        inversionCount += leftSubarray.length - leftIndex;
      }
    }

    // Copy remaining elements from left subarray, if any
    while (leftIndex < leftSubarray.length) {
      array[mergedIndex++] = leftSubarray[leftIndex++];
    }

    // Copy remaining elements from right subarray, if any
    while (rightIndex < rightSubarray.length) {
      array[mergedIndex++] = rightSubarray[rightIndex++];
    }

    return inversionCount;
  }

  // Create a copy of the input array to avoid modifying it
  const arrayCopy = [...arr];
  return mergeSort(arrayCopy, 0, arrayCopy.length - 1);
}

// Example usage
const arr = [2, 4, 1, 3, 5];
console.log(countInversions(arr)); // Output: 3
```

## Code Explanation

1. **mergeAndCount()**:

   - Merges two sorted subarrays and counts inversions during the merge.
   - When an element from the right subarray is placed before elements in the left subarray, it means it's smaller than all remaining elements in the left subarray (hence we add leftSubarray.length - leftIndex; to the count).

2. **mergeSortAndCount()**:

   - Recursively divides the array into halves until single elements remain.
   - Combines inversion counts from left half, right half, and during merging.

3. **inversionCount()**:
   - Wrapper function that initiates the merge sort process and returns the total inversion count.

Let's perform a dry run of the `countInversions` function with three different examples to understand how it works.

### Example 1: [2, 4, 1, 3, 5]

**Expected Output: 3** (Inversions: (2,1), (4,1), (4,3))

#### Dry Run:

Let's perform a **detailed dry run** of the `countInversions` function with the input array `[2, 4, 1, 3, 5]`. We'll track the state of `arrayCopy` at every step and count inversions explicitly.

---

### **Initial Setup**

- **Input Array:** `[2, 4, 1, 3, 5]`
- **arrayCopy:** `[2, 4, 1, 3, 5]` (copy of input)
- Call `mergeSort(arrayCopy, 0, 4)` (since indices are `0` to `4`).

---

### **Step 1: mergeSort(arrayCopy, 0, 4)**

- `start = 0`, `end = 4`
- `mid = (0 + 4) // 2 = 2`
- Recursively sort and count inversions in left (`[0, 2]`) and right (`[3, 4]`) halves.
- Then merge and count inversions between the two halves.

#### **Recursive Calls:**

1. `mergeSort(arrayCopy, 0, 2)` → Sort `[2, 4, 1]`
2. `mergeSort(arrayCopy, 3, 4)` → Sort `[3, 5]`
3. `mergeAndCount(arrayCopy, 0, 2, 4)` → Merge `[1, 2, 4]` and `[3, 5]` and count inversions.

---

### **Step 2: mergeSort(arrayCopy, 0, 2)**

- `start = 0`, `end = 2` (subarray `[2, 4, 1]`)
- `mid = (0 + 2) // 2 = 1`
- Recursively sort and count inversions in left (`[0, 1]`) and right (`[2, 2]`).

#### **Recursive Calls:**

1. `mergeSort(arrayCopy, 0, 1)` → Sort `[2, 4]`
2. `mergeSort(arrayCopy, 2, 2)` → Sort `[1]` (base case)
3. `mergeAndCount(arrayCopy, 0, 1, 2)` → Merge `[2, 4]` and `[1]` and count inversions.

---

### **Step 3: mergeSort(arrayCopy, 0, 1)**

- `start = 0`, `end = 1` (subarray `[2, 4]`)
- `mid = (0 + 1) // 2 = 0`
- Recursively sort and count inversions in left (`[0, 0]`) and right (`[1, 1]`).

#### **Recursive Calls:**

1. `mergeSort(arrayCopy, 0, 0)` → `[2]` (base case, returns `0`)
2. `mergeSort(arrayCopy, 1, 1)` → `[4]` (base case, returns `0`)
3. `mergeAndCount(arrayCopy, 0, 0, 1)` → Merge `[2]` and `[4]` and count inversions.

#### **Merge Step (`mergeAndCount(arrayCopy, 0, 0, 1)`)**

- `leftSubarray = [2]`, `rightSubarray = [4]`
- Compare `2` and `4`:
  - `2 ≤ 4` → No inversion, copy `2` → `arrayCopy = [2, 4, 1, 3, 5]`
  - Then copy `4` → `arrayCopy` remains `[2, 4, 1, 3, 5]`
- **Inversions added:** `0`
- **Return:** `0`

---

### **Step 4: mergeSort(arrayCopy, 2, 2)**

- Base case (`start == end`), returns `0`.

---

### **Step 5: mergeAndCount(arrayCopy, 0, 1, 2)**

- Now, `leftSubarray = [2, 4]`, `rightSubarray = [1]`
- Compare `2` and `1`:
  - `2 > 1` → **Inversion detected!**
    - All remaining elements in `leftSubarray` (`[2, 4]`) are > `1`.
    - **Inversions added:** `leftSubarray.length - leftIndex = 2 - 0 = 2`
    - Copy `1` → `arrayCopy = [1, 4, 2, 3, 5]`
- Now, `rightSubarray` is exhausted, copy remaining `leftSubarray` (`[2, 4]`):
  - `arrayCopy = [1, 2, 4, 3, 5]`
- **Inversions added in this step:** `2`
- **Return:** `2`

---

### **Step 6: mergeSort(arrayCopy, 3, 4)**

- `start = 3`, `end = 4` (subarray `[3, 5]`)
- `mid = (3 + 4) // 2 = 3`
- Recursively sort and count inversions in left (`[3, 3]`) and right (`[4, 4]`).

#### **Recursive Calls:**

1. `mergeSort(arrayCopy, 3, 3)` → `[3]` (base case, returns `0`)
2. `mergeSort(arrayCopy, 4, 4)` → `[5]` (base case, returns `0`)
3. `mergeAndCount(arrayCopy, 3, 3, 4)` → Merge `[3]` and `[5]` and count inversions.

#### **Merge Step (`mergeAndCount(arrayCopy, 3, 3, 4)`)**

- `leftSubarray = [3]`, `rightSubarray = [5]`
- Compare `3` and `5`:
  - `3 ≤ 5` → No inversion, copy `3` → `arrayCopy = [1, 2, 4, 3, 5]`
  - Then copy `5` → `arrayCopy` remains `[1, 2, 4, 3, 5]`
- **Inversions added:** `0`
- **Return:** `0`

---

### **Step 7: mergeAndCount(arrayCopy, 0, 2, 4)**

- Now, `leftSubarray = [1, 2, 4]`, `rightSubarray = [3, 5]`
- Compare `1` and `3`:
  - `1 ≤ 3` → No inversion, copy `1` → `arrayCopy = [1, 2, 4, 3, 5]`
- Compare `2` and `3`:
  - `2 ≤ 3` → No inversion, copy `2` → `arrayCopy = [1, 2, 4, 3, 5]`
- Compare `4` and `3`:
  - `4 > 3` → **Inversion detected!**
    - Only `4` is > `3` in `leftSubarray`.
    - **Inversions added:** `leftSubarray.length - leftIndex = 3 - 2 = 1`
    - Copy `3` → `arrayCopy = [1, 2, 3, 4, 5]`
- Compare `4` and `5`:
  - `4 ≤ 5` → No inversion, copy `4` → `arrayCopy = [1, 2, 3, 4, 5]`
- Copy remaining `5` → `arrayCopy` remains `[1, 2, 3, 4, 5]`
- **Inversions added in this step:** `1`
- **Return:** `1`

---

### **Summing Up Inversions**

- From `mergeAndCount(arrayCopy, 0, 0, 1)`: `0`
- From `mergeAndCount(arrayCopy, 0, 1, 2)`: `2`
- From `mergeAndCount(arrayCopy, 3, 3, 4)`: `0`
- From `mergeAndCount(arrayCopy, 0, 2, 4)`: `1`
- **Total Inversions:** `0 + 2 + 0 + 1 = 3`

---

### **Final Output**

The function returns `3`, which matches the number of inversions in `[2, 4, 1, 3, 5]`:

1. **(2, 1)**
2. **(4, 1)**
3. **(4, 3)**

---

### **Summary of `arrayCopy` Changes**

| Step | Subarray Being Merged | `arrayCopy` State | Inversions Added |
| ---- | --------------------- | ----------------- | ---------------- |
| 1    | `[2]` + `[4]`         | `[2, 4, 1, 3, 5]` | 0                |
| 2    | `[2,4]` + `[1]`       | `[1, 2, 4, 3, 5]` | 2                |
| 3    | `[3]` + `[5]`         | `[1, 2, 4, 3, 5]` | 0                |
| 4    | `[1,2,4]` + `[3,5]`   | `[1, 2, 3, 4, 5]` | 1                |

**Final Answer:** `3` ✅
