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
// Recursive function to divide array and sort
function mergeSort(arrayToSort) {
  // Base case: if array has 1 or fewer elements, it's already sorted
  if (arrayToSort.length <= 1) {
    return arrayToSort;
  }

  // Find the middle point to split the array
  const midPoint = Math.floor(arrayToSort.length / 2);

  // Split into left and right halves
  const leftHalf = arrayToSort.slice(0, midPoint);
  const rightHalf = arrayToSort.slice(midPoint);

  // Recursively sort both halves
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}
// Function to merge two sorted arrays into one sorted array
function merge(leftArray, rightArray) {
  let mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and merge in sorted order
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      mergedArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      mergedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from leftArray, if any
  while (leftIndex < leftArray.length) {
    mergedArray.push(leftArray[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from rightArray, if any
  while (rightIndex < rightArray.length) {
    mergedArray.push(rightArray[rightIndex]);
    rightIndex++;
  }

  return mergedArray;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Recursive Merge Sort:", mergeSort(unsortedArray));

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

Merge Sort is a classic **divide-and-conquer** algorithm that recursively splits an array into smaller subarrays, sorts them, and then merges them back together. Many problems share similar patterns or can be efficiently solved using variations of the Merge Sort approach.

### **Key Problem Patterns Solvable Using Merge Sort Concepts**

1. **Standard Sorting** – Direct application of Merge Sort.
2. **Inversion Count** – Counting inversions in an array.
3. **External Sorting** – Sorting large datasets that don’t fit in memory.
4. **Merge k Sorted Arrays/Lists** – Combining multiple sorted sequences.
5. **Reverse Pairs (Leetcode 493)** – Counting pairs where `nums[i] > 2*nums[j]` and `i < j`.
6. **Count Smaller/Larger Elements After Self (Leetcode 315)** – For each element, count how many elements to the right are smaller.
7. **Closest Pair of Points** – Finding the two closest points in a plane (modified Merge Sort approach).
8. **Custom Sorting with Merging Logic** – Problems requiring merging with special conditions.

---

### **How to Identify Merge Sort Pattern?**

1. **Divide & Conquer Nature** – If the problem can be broken into smaller subproblems, solved independently, and then combined.
2. **Merging Two Sorted Sequences** – If merging two sorted halves plays a key role.
3. **Counting Pairs/Inversions** – If the problem involves counting pairs with certain conditions (e.g., `i < j` and `arr[i] > arr[j]`).
4. **External Data Handling** – If data is too large to fit in memory (external sorting).

---

### **Approach to Solve Merge Sort-Based Problems**

1. **Divide** – Split the problem into smaller subproblems (usually halves).
2. **Conquer** – Recursively solve the subproblems.
3. **Merge** – Combine the results while applying the required logic (e.g., counting inversions).

### **Merge Sort-Based Problem Patterns in JavaScript**

Merge Sort is a **divide-and-conquer** algorithm that recursively splits an array, sorts subarrays, and merges them. Many problems can be solved using its logic or slight modifications.

---

## **1. Standard Merge Sort (Basic Implementation)**

## **2. Counting Inversions (Modified Merge Sort)**

## **3. Merge k Sorted Arrays (Divide & Conquer)**

**Problem:** Merge `k` sorted arrays into one sorted array.  
**Approach:**

- Use a divide-and-conquer strategy to merge pairs of arrays recursively.

### **Solution (JavaScript)**

```javascript
function mergeKSortedArrays(arrays) {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];

  const mid = Math.floor(arrays.length / 2);
  const left = mergeKSortedArrays(arrays.slice(0, mid));
  const right = mergeKSortedArrays(arrays.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

const arrays = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];
console.log(mergeKSortedArrays(arrays)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## **4. Count Smaller Elements After Self (LeetCode 315)**

## **5. Reverse Pairs (LeetCode 493)**

---

### **Key Takeaways**

1. **Divide & Conquer** → Break into subproblems, solve recursively, and merge.
2. **Merging Sorted Arrays** → Used in many problems (e.g., `merge k sorted lists`).
3. **Counting During Merge** → Track inversions, smaller elements, or special conditions (`nums[i] > 2*nums[j]`).
4. **External Sorting** → Useful for large datasets (not covered here, but follows similar logic).

These patterns help solve many algorithmic problems efficiently! 🚀
