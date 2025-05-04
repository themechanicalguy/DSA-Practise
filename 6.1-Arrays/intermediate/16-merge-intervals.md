### **LC- 56 Merge Intervals**

Given an array of intervals where intervals[i] = [starti, endi],merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

The problem requires merging overlapping intervals in an array. An interval is represented as `[start, end]`. Two intervals `[a, b]` and `[c, d]` overlap if `b >= c`. Overlapping intervals should be merged into a single interval `[min(a, c), max(b, d)]`.

### **Intuition and Approach**

1. **Sort the Intervals**: First, sort the intervals based on their start times. This allows us to process them in order and easily check for overlaps with the previous interval.
2. **Iterate and Merge**: Initialize a result array with the first interval. For each subsequent interval, compare its start with the end of the last interval in the result array:
   - If they overlap, merge them by updating the end of the last interval in the result.
   - If they don't overlap, add the current interval to the result array.

### **Pattern Identification**

This problem follows the **Merge Intervals** pattern, where sorting the intervals first simplifies the merging process. The key insight is that after sorting, overlapping intervals will be adjacent, making it easy to merge them in a single pass.

#### **1. Sorting and Merging (Optimal Approach)**

```javascript
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  // Sort intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = mergedIntervals[mergedIntervals.length - 1];

    // Check for overlap
    if (currentInterval[0] <= lastMergedInterval[1]) {
      // Merge the intervals by updating the end of the last merged interval
      lastMergedInterval[1] = Math.max(
        lastMergedInterval[1],
        currentInterval[1]
      );
    } else {
      // No overlap, add the current interval to the result
      mergedIntervals.push(currentInterval);
    }
  }

  return mergedIntervals;
}

// Example Usage
const intervals1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(mergeIntervals(intervals1)); // Output: [[1, 6], [8, 10], [15, 18]]

const intervals2 = [
  [1, 4],
  [4, 5],
];
console.log(mergeIntervals(intervals2)); // Output: [[1, 5]]

const intervals3 = [
  [1, 4],
  [0, 4],
];
console.log(mergeIntervals(intervals3)); // Output: [[0, 4]]
```

### **Dry Run for Examples**

## **Example 1:**

**Input:** `intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]`  
**Expected Output:** `[[1, 6], [8, 10], [15, 18]]`

### **Step-by-Step Execution:**

1. **Sort the intervals (already sorted in this case):**

   - `intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]`

2. **Initialize `mergedIntervals` with the first interval:**

   - `mergedIntervals = [[1, 3]]`

3. **Process `[2, 6]`:**

   - Compare `[2, 6]` with the last merged interval `[1, 3]`.
   - Check if `2 <= 3` → **Overlap exists**.
   - Merge them by updating the end of `[1, 3]` to `max(3, 6) = 6`.
   - Now, `mergedIntervals = [[1, 6]]`.

4. **Process `[8, 10]`:**

   - Compare `[8, 10]` with the last merged interval `[1, 6]`.
   - Check if `8 <= 6` → **No overlap**.
   - Append `[8, 10]` to `mergedIntervals`.
   - Now, `mergedIntervals = [[1, 6], [8, 10]]`.

5. **Process `[15, 18]`:**

   - Compare `[15, 18]` with the last merged interval `[8, 10]`.
   - Check if `15 <= 10` → **No overlap**.
   - Append `[15, 18]` to `mergedIntervals`.
   - Now, `mergedIntervals = [[1, 6], [8, 10], [15, 18]]`.

6. **Final Output:** `[[1, 6], [8, 10], [15, 18]]`

---

## **Example 2:**

**Input:** `intervals = [[1, 4], [4, 5]]`  
**Expected Output:** `[[1, 5]]`

### **Step-by-Step Execution:**

1. **Sort the intervals (already sorted):**

   - `intervals = [[1, 4], [4, 5]]`

2. **Initialize `mergedIntervals` with the first interval:**

   - `mergedIntervals = [[1, 4]]`

3. **Process `[4, 5]`:**

   - Compare `[4, 5]` with the last merged interval `[1, 4]`.
   - Check if `4 <= 4` → **Overlap exists**.
   - Merge them by updating the end of `[1, 4]` to `max(4, 5) = 5`.
   - Now, `mergedIntervals = [[1, 5]]`.

4. **Final Output:** `[[1, 5]]`

---

## **Example 3:**

**Input:** `intervals = [[1, 4], [0, 4]]`  
**Expected Output:** `[[0, 4]]`

### **Step-by-Step Execution:**

1. **Sort the intervals (based on start time):**

   - Original: `[[1, 4], [0, 4]]`
   - After sorting: `[[0, 4], [1, 4]]`

2. **Initialize `mergedIntervals` with the first interval:**

   - `mergedIntervals = [[0, 4]]`

3. **Process `[1, 4]`:**

   - Compare `[1, 4]` with the last merged interval `[0, 4]`.
   - Check if `1 <= 4` → **Overlap exists**.
   - Merge them by updating the end of `[0, 4]` to `max(4, 4) = 4`.
   - Now, `mergedIntervals = [[0, 4]]`.

4. **Final Output:** `[[0, 4]]`

---

## **Key Observations:**

1. **Sorting is crucial** to ensure that overlapping intervals are adjacent.
2. **Merging happens only when `current_start <= last_end`**.
3. **The merged interval's end is the maximum of the two ends** (`max(last_end, current_end)`).

### **Conclusion**

This approach efficiently merges overlapping intervals by:

1. Sorting the intervals first.
2. Iterating through them while merging adjacent overlapping intervals.
3. Returning the final list of non-overlapping intervals.
