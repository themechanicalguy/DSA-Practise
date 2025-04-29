# LC315 - Counting Smaller Numbers to the Right using Merge Sort Approach

## Intuition

- The problem requires counting, for each element in the array, how many elements to its right are smaller than it. A naive approach would involve comparing each element with all elements to its right, resulting in an O(n²) time complexity.
- However, we can optimize this to O(n log n) using a Merge Sort-based approach, which leverages the divide-and-conquer strategy to count inversions efficiently.

## Why Merge Sort?

During the merge step of Merge Sort, when merging two sorted subarrays, we compare elements from both subarrays to place them in the correct order.
If an element from the left subarray is greater than an element from the right subarray, all remaining elements in the left subarray (up to the current index) are also greater than that right subarray element. This allows us to count "smaller elements to the right" efficiently.

The key intuition is:

- Modify the merge sort algorithm to track the number of smaller elements to the right for each element.

- Use an auxiliary array to store indices and values together, so we can update the result array (counts) based on the original positions.

- During the merge, when an element from the left subarray is placed after an element from the right subarray, increment the count for the left element’s original index by the number of remaining elements in the right subarray.

- This approach ensures we process each element in a sorted manner while maintaining the relative order and counting inversions in O(n log n) time.

## Solution Code

```javascript
/**
 * Counts the number of smaller elements to the right of each element
 * @param {number[]} nums - Input array
 * @return {number[]} - Array of counts
 */
function countSmaller(nums) {
  const counts = new Array(nums.length).fill(0);
  const indices = nums.map((_, i) => i); // Track original indices

  function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const merged = [];
    let left = start;
    let right = mid + 1;
    let rightCount = 0; // Count of elements from right that are smaller

    while (left <= mid && right <= end) {
      if (nums[indices[left]] > nums[indices[right]]) {
        rightCount++;
        merged.push(indices[right++]);
      } else {
        counts[indices[left]] += rightCount;
        merged.push(indices[left++]);
      }
    }

    // Handle remaining left elements
    while (left <= mid) {
      counts[indices[left]] += rightCount;
      merged.push(indices[left++]);
    }

    // Handle remaining right elements
    while (right <= end) {
      merged.push(indices[right++]);
    }

    // Update indices with merged order
    for (let i = start; i <= end; i++) {
      indices[i] = merged[i - start];
    }
  }

  mergeSort(0, nums.length - 1);
  return counts;
}
```

Let's do a detailed dry run of the simplified merge sort approach for counting smaller numbers to the right using the example `nums = [5, 2, 6, 1]`.

## Initial Setup

- `nums = [5, 2, 6, 1]`
- `counts = [0, 0, 0, 0]` (initialize all counts to 0)
- `indices = [0, 1, 2, 3]` (original indices of elements)

## Merge Sort Execution

### 1. First Split: mergeSort(0, 3)

- mid = floor((0+3)/2) = 1
- Recursively calls:
  - mergeSort(0, 1)
  - mergeSort(2, 3)

### 2. mergeSort(0, 1)

- mid = floor((0+1)/2) = 0
- Recursively calls:
  - mergeSort(0, 0) → base case (returns immediately)
  - mergeSort(1, 1) → base case (returns immediately)
- Now merge(0, 0, 1)

#### merge(0, 0, 1):

- left = 0 (points to indices[0] = 0 → nums[0] = 5)
- right = 1 (points to indices[1] = 1 → nums[1] = 2)
- rightCount = 0
- Compare nums[0] (5) > nums[1] (2)? Yes:
  - rightCount++ → rightCount = 1
  - merged = [1] (take right element's index)
  - right moves to 2 (out of bounds for this merge)
- Now left is still 0, right is 2 (while loop ends)
- Process remaining left elements:
  - counts[indices[0]] += rightCount → counts[0] += 1 → counts = [1, 0, 0, 0]
  - merged = [1, 0]
- Update indices[0..1] with merged array:
  - indices = [1, 0, 2, 3] (now sorted subarray [2, 5])

### 3. mergeSort(2, 3)

- mid = floor((2+3)/2) = 2
- Recursively calls:
  - mergeSort(2, 2) → base case
  - mergeSort(3, 3) → base case
- Now merge(2, 2, 3)

#### merge(2, 2, 3):

- left = 2 (indices[2] = 2 → nums[2] = 6)
- right = 3 (indices[3] = 3 → nums[3] = 1)
- rightCount = 0
- Compare nums[2] (6) > nums[3] (1)? Yes:
  - rightCount++ → rightCount = 1
  - merged = [3] (take right element's index)
  - right moves to 4 (out of bounds)
- Now left is still 2, right is 4 (while loop ends)
- Process remaining left elements:
  - counts[indices[2]] += rightCount → counts[2] += 1 → counts = [1, 0, 1, 0]
  - merged = [3, 2]
- Update indices[2..3] with merged array:
  - indices = [1, 0, 3, 2] (now sorted subarray [1, 6])

### 4. Final Merge: merge(0, 1, 3)

Now we merge the two sorted halves:

- Left half: indices[0..1] = [1, 0] → values [2, 5]
- Right half: indices[2..3] = [3, 2] → values [1, 6]

#### merge(0, 1, 3):

- left = 0 (indices[0] = 1 → nums[1] = 2)
- right = 2 (indices[2] = 3 → nums[3] = 1)
- rightCount = 0
- merged = []

**First Comparison:**

- nums[1] (2) > nums[3] (1)? Yes:
  - rightCount++ → rightCount = 1
  - merged = [3] (take right index)
  - right moves to 3 (indices[3] = 2 → nums[2] = 6)

**Second Comparison:**

- nums[1] (2) > nums[2] (6)? No:
  - counts[indices[0]] += rightCount → counts[1] += 1 → counts = [1, 1, 1, 0]
  - merged = [3, 1]
  - left moves to 1 (indices[1] = 0 → nums[0] = 5)

**Third Comparison:**

- nums[0] (5) > nums[2] (6)? No:
  - counts[indices[1]] += rightCount → counts[0] += 1 → counts = [2, 1, 1, 0]
  - merged = [3, 1, 0]
  - left moves to 2 (out of bounds)

**Process Remaining Right Elements:**

- merged = [3, 1, 0, 2]

**Update indices:**

- indices = [3, 1, 0, 2] (fully sorted array [1, 2, 5, 6])

## Final Result

The `counts` array is now `[2, 1, 1, 0]`, which matches the expected output.

## Step-by-Step Counts Update:

1. After first merge(0,0,1): counts = [1, 0, 0, 0]
2. After second merge(2,2,3): counts = [1, 0, 1, 0]
3. During final merge:
   - Added 1 to counts[1] → [1,1,1,0]
   - Added 1 to counts[0] → [2,1,1,0]

This demonstrates how the counts are built up during the merge sort process by tracking how many elements from the right half jump ahead of elements from the left half.
