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

**Problem:** Sort an array in ascending order.  
**Approach:**

- Divide the array into halves.
- Recursively sort each half.
- Merge the two sorted halves.

### **Solution (JavaScript)**

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

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

const arr = [5, 3, 8, 4, 2];
console.log(mergeSort(arr)); // [2, 3, 4, 5, 8]
```

---

## **2. Counting Inversions (Modified Merge Sort)**

**Problem:** Count the number of inversions (pairs `(i, j)` where `i < j` and `arr[i] > arr[j]`).  
**Approach:**

- Modify `merge()` to count inversions when `left[i] > right[j]`.

### **Solution (JavaScript)**

```javascript
function countInversions(arr) {
  if (arr.length <= 1) return { sorted: arr, count: 0 };

  const mid = Math.floor(arr.length / 2);
  const left = countInversions(arr.slice(0, mid));
  const right = countInversions(arr.slice(mid));
  const merged = mergeAndCount(left.sorted, right.sorted);

  return {
    sorted: merged.sorted,
    count: left.count + right.count + merged.count,
  };
}

function mergeAndCount(left, right) {
  let result = [];
  let i = 0,
    j = 0,
    count = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      count += left.length - i; // All remaining left elements are > right[j]
      j++;
    }
  }

  return {
    sorted: [...result, ...left.slice(i), ...right.slice(j)],
    count,
  };
}

const arr = [3, 1, 2, 4];
const { count } = countInversions(arr);
console.log(count); // 2 (Pairs: (3,1), (3,2))
```

---

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

**Problem:** For each element in `nums`, count how many elements to its right are smaller.  
**Approach:**

- Use Merge Sort while tracking original indices.
- Count smaller elements during merging.

### **Solution (JavaScript)**

```javascript
function countSmaller(nums) {
  const counts = new Array(nums.length).fill(0);
  const indexedNums = nums.map((num, index) => ({ num, index }));

  mergeSortWithCount(indexedNums, counts);

  return counts;
}

function mergeSortWithCount(arr, counts) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortWithCount(arr.slice(0, mid), counts);
  const right = mergeSortWithCount(arr.slice(mid), counts);

  return mergeWithCount(left, right, counts);
}

function mergeWithCount(left, right, counts) {
  let result = [];
  let i = 0,
    j = 0;
  let rightCount = 0; // Tracks how many elements in right are smaller than left[i]

  while (i < left.length && j < right.length) {
    if (left[i].num > right[j].num) {
      result.push(right[j]);
      j++;
      rightCount++;
    } else {
      counts[left[i].index] += rightCount;
      result.push(left[i]);
      i++;
    }
  }

  while (i < left.length) {
    counts[left[i].index] += rightCount;
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

const nums = [5, 2, 6, 1];
console.log(countSmaller(nums)); // [2, 1, 1, 0]
```

---

## **5. Reverse Pairs (LeetCode 493)**

**Problem:** Count pairs `(i, j)` where `i < j` and `nums[i] > 2 * nums[j]`.  
**Approach:**

- Similar to inversion count, but with a modified condition (`nums[i] > 2 * nums[j]`).

### **Solution (JavaScript)**

```javascript
function reversePairs(nums) {
  return mergeSortAndCount(nums, 0, nums.length - 1);
}

function mergeSortAndCount(nums, left, right) {
  if (left >= right) return 0;

  const mid = Math.floor((left + right) / 2);
  let count =
    mergeSortAndCount(nums, left, mid) +
    mergeSortAndCount(nums, mid + 1, right);

  // Count reverse pairs
  let j = mid + 1;
  for (let i = left; i <= mid; i++) {
    while (j <= right && nums[i] > 2 * nums[j]) j++;
    count += j - (mid + 1);
  }

  // Merge
  const temp = [];
  let i = left,
    k = mid + 1;
  while (i <= mid && k <= right) {
    if (nums[i] <= nums[k]) {
      temp.push(nums[i++]);
    } else {
      temp.push(nums[k++]);
    }
  }
  while (i <= mid) temp.push(nums[i++]);
  while (k <= right) temp.push(nums[k++]);

  for (let i = left; i <= right; i++) {
    nums[i] = temp[i - left];
  }

  return count;
}

const nums = [1, 3, 2, 3, 1];
console.log(reversePairs(nums)); // 2
```

---

### **Key Takeaways**

1. **Divide & Conquer** → Break into subproblems, solve recursively, and merge.
2. **Merging Sorted Arrays** → Used in many problems (e.g., `merge k sorted lists`).
3. **Counting During Merge** → Track inversions, smaller elements, or special conditions (`nums[i] > 2*nums[j]`).
4. **External Sorting** → Useful for large datasets (not covered here, but follows similar logic).

These patterns help solve many algorithmic problems efficiently! 🚀
