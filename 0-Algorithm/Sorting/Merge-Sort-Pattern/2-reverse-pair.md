# Counting Reverse Pairs Using Merge Sort in JavaScript

## Intuition and Approach

### Problem Recap

We need to count pairs `(i, j)` where `i < j` and `nums[i] > 2 * nums[j]`.  
A brute-force approach would check all possible pairs, leading to an **O(n²)** time complexity, which is inefficient for large arrays.  
We need a more efficient solution, ideally **O(n log n)**.

### Why Merge Sort?

Merge sort is a divide-and-conquer algorithm that splits an array into smaller subarrays, sorts them, and merges them back.
During the merge step, we can compare elements from two sorted halves and count pairs that satisfy specific conditions.

The condition `nums[i] > 2 * nums[j]` suggests a comparison between elements at different indices, and merge sort’s merge phase naturally processes elements in a way that allows us to count such pairs efficiently.

### Key Insight

In merge sort, when merging two sorted subarrays, elements in the left subarray have indices less than those in the right subarray (i.e., `i < j` naturally holds).

- For a pair `(i, j)` where `i` is in the left subarray and `j` is in the right subarray, we can check if `nums[i] > 2 * nums[j]`.
- Since both subarrays are sorted, we can use two pointers to count valid pairs efficiently without checking every possible pair.

## Approach

1. **Modify Merge Sort**: Use merge sort to sort the array, but during the merge step, count the number of reverse pairs.
2. **Count Pairs in Merge**: For each element in the left subarray, find how many elements in the right subarray satisfy `nums[i] > 2 * nums[j]`. Since the subarrays are sorted, we can do this in linear time using pointers.
3. **Merge Normally**: After counting pairs, perform the standard merge to maintain the sorted order.
4. **Divide and Conquer**: Recursively apply the same logic to subarrays.

## Identifying Merge Sort Pattern

The merge sort pattern is suitable when:

- The problem involves counting or comparing pairs across different parts of the array.
- The condition (e.g., `nums[i] > 2 * nums[j]`) can be evaluated efficiently when elements are sorted.
- You need **O(n log n)** time complexity, as merge sort processes each element **O(log n)** times (due to the depth of recursion) and performs **O(n)** work per merge.

Here, the condition `nums[i] > 2 * nums[j]` and the requirement `i < j` align perfectly with the merge phase, where we compare elements from two sorted halves with `i < j`.

---

## JavaScript Solution with Comments

```javascript
function reversePairs(nums) {
  // Return 0 if array is empty or has one element
  if (!nums || nums.length < 2) return 0;

  // Start merge sort and count reverse pairs
  return mergeSort(nums, 0, nums.length - 1);
}

// Merge sort function that also counts reverse pairs
function mergeSort(nums, left, right) {
  // Base case: single element or empty array
  if (left >= right) return 0;

  // Find middle point
  const mid = Math.floor((left + right) / 2);

  // Recursively count pairs in left and right halves
  let count = mergeSort(nums, left, mid) + mergeSort(nums, mid + 1, right);

  // Count cross-subarray reverse pairs and merge
  count += mergeAndCount(nums, left, mid, right);

  return count;
}

// Merge two sorted subarrays and count reverse pairs
function mergeAndCount(nums, left, mid, right) {
  let count = 0;

  // Count reverse pairs where nums[i] > 2 * nums[j]
  // i is in left subarray, j is in right subarray
  let j = mid + 1; // Pointer for right subarray
  for (let i = left; i <= mid; i++) {
    // Move j until nums[i] <= 2 * nums[j]
    while (j <= right && nums[i] > 2 * nums[j]) {
      j++;
    }
    // All elements from mid+1 to j-1 form reverse pairs with nums[i]
    count += j - (mid + 1);
  }

  // Standard merge process
  const temp = [];
  let i = left; // Pointer for left subarray
  j = mid + 1; // Pointer for right subarray
  let k = 0; // Pointer for temp array

  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      temp[k++] = nums[i++];
    } else {
      temp[k++] = nums[j++];
    }
  }

  // Copy remaining elements from left subarray
  while (i <= mid) {
    temp[k++] = nums[i++];
  }

  // Copy remaining elements from right subarray
  while (j <= right) {
    temp[k++] = nums[j++];
  }

  // Copy merged elements back to original array
  for (let p = 0; p < temp.length; p++) {
    nums[left + p] = temp[p];
  }

  return count;
}
```

---

## Explanation of Code

### Main Function (`reversePairs`)

- **Purpose**: Initializes the process by calling `mergeSort` on the entire array.

### Merge Sort (`mergeSort`)

- **Purpose**: Recursively divides the array into smaller subarrays, counts reverse pairs in each half, and counts cross-subarray reverse pairs during merging.
- **Logic**:
  1. Base case: If the subarray has one or no elements, return `0`.
  2. Divide the array into two halves using the middle index.
  3. Recursively count reverse pairs in the left and right halves.
  4. Count reverse pairs that span across the two halves using the `mergeAndCount` function.
  5. Return the total count of reverse pairs.

### Merge and Count (`mergeAndCount`)

- **Purpose**: Merges two sorted subarrays and counts reverse pairs where `nums[i] > 2 * nums[j]`.
- **Logic**:
  1. **Count Reverse Pairs**:
     - Use two pointers: one for the left subarray (`i`) and one for the right subarray (`j`).
     - For each element `nums[i]` in the left subarray, move `j` in the right subarray until `nums[i] <= 2 * nums[j]`.
     - The number of elements from `mid+1` to `j-1` in the right subarray forms reverse pairs with `nums[i]`.
  2. **Merge Subarrays**:
     - Use a temporary array to merge the two sorted subarrays.
     - Compare elements from the left and right subarrays, and add the smaller element to the temporary array.
     - Copy any remaining elements from both subarrays to the temporary array.
  3. **Copy Back**:
     - Copy the merged elements from the temporary array back to the original array.
  4. Return the count of reverse pairs.

---

## Time and Space Complexity

### Time Complexity

- **Merge Sort**: **O(n log n)**
  - The array is divided into `log n` levels.
  - Each merge operation takes **O(n)** time, including counting reverse pairs.
- **Overall**: **O(n log n)**.

### Space Complexity

- **Temporary Array**: **O(n)**
  - Used during the merge step to store merged elements.
- **Recursive Stack**: **O(log n)**
  - Due to the depth of recursion.
- **Overall**: **O(n)** (dominant term is the temporary array).

---

### Dry Run for `nums = [1, 3, 2, 3, 1]`

**Initial Call:** `reversePairs([1, 3, 2, 3, 1])`

1. **First Split:** `left = 0`, `right = 4`

   - `mid = 2`
   - Recursive calls:
     - `mergeSort(nums, 0, 2)` → `[1, 3, 2]`
     - `mergeSort(nums, 3, 4)` → `[3, 1]`

2. **Left Half (`[1, 3, 2]`):**

   - `left = 0`, `right = 2`
   - `mid = 1`
   - Recursive calls:
     - `mergeSort(nums, 0, 1)` → `[1, 3]`
     - `mergeSort(nums, 2, 2)` → `[2]` (base case, returns 0)
   - **Merge and Count for `[1, 3]` and `[2]`:**
     - `i = 0`, `nums[i] = 1`
       - `j = 2`, `nums[j] = 2`
       - `1 > 2 * 2`? No → `j` remains at 2
       - `count += 2 - 2 = 0`
     - `i = 1`, `nums[i] = 3`
       - `j = 2`, `nums[j] = 2`
       - `3 > 2 * 2`? No → `j` remains at 2
       - `count += 2 - 2 = 0`
     - Merge `[1, 3]` and `[2]` → `[1, 2, 3]`
   - **Total count for `[1, 3, 2]`:** `0 (left) + 0 (right) + 0 (merge) = 0`

3. **Right Half (`[3, 1]`):**

   - `left = 3`, `right = 4`
   - `mid = 3`
   - Recursive calls:
     - `mergeSort(nums, 3, 3)` → `[3]` (base case, returns 0)
     - `mergeSort(nums, 4, 4)` → `[1]` (base case, returns 0)
   - **Merge and Count for `[3]` and `[1]`:**
     - `i = 3`, `nums[i] = 3`
       - `j = 4`, `nums[j] = 1`
       - `3 > 2 * 1`? Yes → `j++` → `j = 5` (out of bounds)
       - `count += 5 - 4 = 1`
     - Merge `[3]` and `[1]` → `[1, 3]`
   - **Total count for `[3, 1]`:** `0 (left) + 0 (right) + 1 (merge) = 1`

4. **Merge and Count for `[1, 2, 3]` and `[1, 3]`:**
   - `i = 0`, `nums[i] = 1`
     - `j = 3`, `nums[j] = 1`
     - `1 > 2 * 1`? No → `j` remains at 3
     - `count += 3 - 3 = 0`
   - `i = 1`, `nums[i] = 2`
     - `j = 3`, `nums[j] = 1`
     - `2 > 2 * 1`? No → `j` remains at 3
     - `count += 3 - 3 = 0`
   - `i = 2`, `nums[i] = 3`
     - `j = 3`, `nums[j] = 1`
     - `3 > 2 * 1`? Yes → `j++` → `j = 4`, `nums[j] = 3`
     - `3 > 2 * 3`? No → `j` remains at 4
     - `count += 4 - 3 = 1`
   - Merge `[1, 2, 3]` and `[1, 3]` → `[1, 1, 2, 3, 3]`
   - **Total count for `[1, 3, 2, 3, 1]`:** `0 (left) + 1 (right) + 1 (merge) = 2`

**Final Output:** `2` (which matches the example)

### Explanation of Count Calculation:

- **Reverse Pair (1, 4):** `nums[1] = 3`, `nums[4] = 1` → `3 > 2 * 1` → Valid
- **Reverse Pair (3, 4):** `nums[3] = 3`, `nums[4] = 1` → `3 > 2 * 1` → Valid
- These are the only two reverse pairs in the array.

### Key Points:

- The merge sort approach efficiently counts reverse pairs by leveraging the sorted subarrays during the merge step.
- The `mergeAndCount` function counts pairs where `nums[i] > 2 * nums[j]` by moving the `j` pointer while the condition holds.
- The total count is the sum of counts from left, right, and cross-subarray pairs.
