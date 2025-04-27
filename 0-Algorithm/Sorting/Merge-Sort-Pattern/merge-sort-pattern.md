# Merge Sort Algorithm in JavaScript

## Intuition and Approach

Merge sort is a divide-and-conquer algorithm that works by:

1. **Dividing** the unsorted array into n subarrays, each containing one element (which is trivially sorted)
2. **Conquering** by repeatedly merging subarrays to produce new sorted subarrays until there's only one subarray remaining

The key insight is that it's easier to merge two already sorted arrays than to sort an unsorted one. The algorithm has O(n log n) time complexity in all cases, making it very efficient for large datasets.

## Edge Cases

- Empty array: should return empty array
- Single element array: already sorted, return as-is
- Array with all identical elements: already sorted
- Already sorted array: should return the same array

## Solution Code

```javascript
function mergeSort(nums) {
  // Base case: if array has 0 or 1 element, it's already sorted
  if (nums.length <= 1) {
    return nums;
  }

  // Find the middle point to divide the array into two halves
  const middle = Math.floor(nums.length / 2);

  // Split the array into left and right halves
  const left = nums.slice(0, middle);
  const right = nums.slice(middle);

  // Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from left and right arrays and add the smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add any remaining elements from left array
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Add any remaining elements from right array
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

// Example usage:
const nums = [7, 4, 1, 5, 3];
const sortedNums = mergeSort(nums);
console.log(sortedNums); // Output: [1, 3, 4, 5, 7]
```

## Code Explanation

1. **mergeSort function**:

   - Base case handles arrays of length 0 or 1 (already sorted)
   - Divides the array into two halves using the middle index
   - Recursively sorts each half
   - Merges the sorted halves using the merge function

2. **merge function**:
   - Creates an empty result array and initializes pointers for both input arrays
   - Compares elements from both arrays and pushes the smaller one to result
   - After one array is exhausted, pushes remaining elements from the other array
   - Returns the merged, sorted array

The algorithm works by breaking down the problem into smaller subproblems (sorting smaller arrays) and then combining their solutions (merging sorted arrays). This approach ensures optimal O(n log n) time complexity while being stable (maintaining order of equal elements).

### **1. Standard Merge Sort Variations**

Merge Sort is a fundamental sorting algorithm that serves as the foundation for several important Data Structures and Algorithms (DSA) problems. Here are different types of DSA problems based on or related to Merge Sort:

- **Sorting an Array**: The classic problem where you need to sort an array in ascending/descending order.
- **Sorting a Linked List**: Merge Sort is highly efficient for linked lists due to its O(1) space complexity (if implemented properly).
- **External Sorting**: Merge Sort is used when data is too large to fit in memory (e.g., sorting large files on disk).

### **2. Counting Inversions**

- **Problem**: Given an array, count the number of inversions (pairs `(i, j)` where `i < j` and `arr[i] > arr[j]`).
- **Merge Sort Approach**: Modify the merge step to count inversions while merging two sorted subarrays.
- **Example**:
  - Input: `[8, 4, 2, 1]`
  - Output: `6` (inversions are `(8,4), (8,2), (8,1), (4,2), (4,1), (2,1)`).

### **3. Merge Two Sorted Arrays**

- **Problem**: Given two sorted arrays, merge them into a single sorted array.
- **Merge Sort Approach**: Directly use the merge step of Merge Sort.
- **Example**:
  - Input: `[1, 3, 5]` and `[2, 4, 6]`
  - Output: `[1, 2, 3, 4, 5, 6]`.

### **4. K-Sorted Arrays (Merge K Sorted Lists)**

- **Problem**: Given `K` sorted arrays/lists, merge them into a single sorted array.
- **Merge Sort Approach**: Extend the merge step to work with multiple lists (using a min-heap for efficiency).
- **Example**:
  - Input: `[ [1, 4, 5], [1, 3, 4], [2, 6] ]`
  - Output: `[1, 1, 2, 3, 4, 4, 5, 6]`.

### **5. Finding Median of Two Sorted Arrays**

- **Problem**: Given two sorted arrays, find the median of the combined array.
- **Merge Sort Approach**: Merge the two arrays and find the median.
- **Optimized Approach**: Use binary search for O(log(min(m, n))) time.
- **Example**:
  - Input: `[1, 3]` and `[2]`
  - Output: `2.0` (merged array `[1, 2, 3]`, median is `2`).

### **6. Merge Sort for Custom Objects**

- **Problem**: Sort an array of custom objects (e.g., sorting students by marks).
- **Merge Sort Approach**: Modify the comparison logic in the merge step.
- **Example**:
  - Input: `[{name: "Alice", marks: 85}, {name: "Bob", marks: 75}]`
  - Output: `[{name: "Bob", marks: 75}, {name: "Alice", marks: 85}]` (sorted by marks).

### **7. Smallest/Largest Elements in a Sorted Matrix**

- **Problem**: Given a row-wise and column-wise sorted matrix, find the `K`th smallest/largest element.
- **Merge Sort Approach**: Use a min-heap to merge rows efficiently.
- **Example**:
  - Input: `[[1, 5, 9], [10, 11, 13], [12, 13, 15]]`, `K = 8`
  - Output: `13` (8th smallest element).

### **8. Reverse Pairs (Advanced Inversion Count)**

- **Problem**: Count the number of reverse pairs `(i, j)` where `i < j` and `arr[i] > 2 * arr[j]`.
- **Merge Sort Approach**: Modify the merge step to count such pairs.
- **Example**:
  - Input: `[1, 3, 2, 3, 1]`
  - Output: `2` (pairs `(3,1)` and `(3,1)`).

### **9. Merge Without Extra Space**

- **Problem**: Given two sorted arrays, merge them in-place without extra space.
- **Approach**: Use the **Gap Method** (derived from Shell Sort) or **Insertion Sort + Merge**.
- **Example**:
  - Input: `[1, 3, 5, 7]` and `[0, 2, 6, 8, 9]`
  - Output: `[0, 1, 2, 3, 5, 6, 7, 8, 9]`.

### **10. Count of Range Sum**

- **Problem**: Given an array, count the number of subarrays whose sum lies in a given range `[lower, upper]`.
- **Merge Sort Approach**: Use **Prefix Sum + Merge Sort** to count valid ranges efficiently.
- **Example**:
  - Input: `[-2, 5, -1]`, `lower = -2`, `upper = 2`
  - Output: `3` (subarrays `[-2], [-2,5,-1], [5,-1]`).

---

### **Key Takeaways**

- Merge Sort is **not just for sorting**—it's useful for **divide-and-conquer problems**.
- Many problems involve **modifying the merge step** (e.g., counting inversions, reverse pairs).
- Merge Sort is **stable** (maintains order of equal elements), making it useful for custom sorting.
- It’s **efficient for linked lists** (O(1) space) and **external sorting** (large datasets).

Would you like a detailed solution for any of these problems? 🚀
