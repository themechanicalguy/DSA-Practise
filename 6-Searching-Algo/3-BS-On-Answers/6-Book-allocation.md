# Book Allocation Problem

https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1

## Problem Statement

You are given an array `arr[]` of integers, where each element `arr[i]` represents the number of pages in the `ith` book.
You also have an integer `k` representing the number of students. The task is to allocate books to each student such that:

- Each student receives atleast one book.
- Each student is assigned a contiguous sequence of books.
- No book is assigned to more than one student.

The objective is to `minimize the maximum number of pages` assigned to any student.
In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the `smallest possible maximum`.

- **Note:** Return -1 if a valid assignment is not possible, and allotment should be in contiguous order (see the explanation for better understanding).
- **Input:** arr[] = `[12, 34, 67, 90]`, k = `2`
- **Output:** 113
- **Explanation:**
  - Allocation can be done in following ways:
    - `[12]` and `[34, 67, 90]` Maximum Pages = 191
    - `[12, 34]` and `[67, 90]` Maximum Pages = 157
    - `[12, 34, 67]` and `[90]` Maximum Pages = 113.
    - Therefore, the minimum of these cases is 113, which is selected as the output.

## Problem Understanding

We need to allocate books (represented by pages in an array) to students such that:

1. Every student gets at least one book
2. Books are assigned in contiguous sequences (e.g., books at indices `[i, i+1, ..., j]` go to one student).
3. No book is assigned to more than one student.
4. We minimize the maximum pages any student has to read

## Intuition

This is a classic optimization problem that can be solved using binary search. The key insights:

- The minimum possible maximum is the largest single book (since one student must get at least that)
- The maximum possible maximum is the sum of all pages (if one student gets all books)
- We can use binary search between these bounds to find the minimal maximum allocation

This is a classic optimization problem that resembles the `split array into k subarrays` problem. The key insight is that we need to find the smallest possible maximum sum of pages (for any student) that allows a valid allocation. Since the books must be assigned contiguously, we’re essentially partitioning the array into `k` contiguous subarrays, and the maximum sum of any subarray should be as small as possible.

## Why Binary Search?

A brute-force approach would involve trying every possible way to split the array into `k` contiguous parts and computing the `maximum` sum for each split, which is computationally expensive. Instead, notice that:

- If we guess a maximum number of pages `maxPages` that any student can have, we can check if it’s possible to allocate the books to `k` students such that no student gets more than maxPages pages.
- If we can allocate with `maxPages`, then higher values might also work, but we want the smallest possible `maxPages`.
- If we cannot allocate with maxPages, then lower values won’t work either.

This suggests a binary search on the possible values of `maxPages`. The range for `maxPages` is:

- **Lower bound:** The maximum number of pages in a single book `(Math.max(...arr))`, because each student must get at least one book, and we can’t have a maximum less than the largest book.
- **Upper bound:** The sum of all pages `(arr.reduce((a, b) => a + b, 0))`, because in the worst case, one student gets all books.

For each guessed `maxPages`, we greedily try to assign books to students, ensuring each student’s total pages don’t exceed `maxPages`. If we can assign to `k` or fewer students, the guess is feasible; otherwise, it’s not.

## Approach 1: Binary Search Approach (Optimal Solution)

```javascript
/**
 * Allocates books to students using binary search approach
 * @param {number[]} books - Array where books[i] represents pages in ith book
 * @param {number} students - Number of students to allocate books to
 * @return {number} - Minimum possible maximum pages allocated or -1 if invalid
 */
function allocateBooksBinarySearch(books, students) {
  // If number of students is greater than number of books, allocation is impossible
  if (students > books.length) {
    return -1;
  }

  let totalPages = books.reduce((sum, pages) => sum + pages, 0);
  let maxPagesInSingleBook = Math.max(...books);

  // The minimum possible maximum pages is at least the largest single book
  // The maximum possible maximum pages is the sum of all pages
  let low = maxPagesInSingleBook;
  let high = totalPages;
  let result = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    // Check if current mid value is feasible
    if (isAllocationPossible(books, students, mid)) {
      // If feasible, try for a smaller value
      result = mid;
      high = mid - 1;
    } else {
      // If not feasible, try for a larger value
      low = mid + 1;
    }
  }

  return result;
}

/**
 * Helper function to check if allocation with given maximum pages is possible
 * @param {number[]} books - Array of book pages
 * @param {number} students - Number of students
 * @param {number} maxPagesPerStudent - Maximum pages allowed per student
 * @return {boolean} - True if allocation is possible, false otherwise
 */
function isAllocationPossible(books, students, maxPagesPerStudent) {
  let currentStudentCount = 1;
  let currentPagesSum = 0;

  for (let pages of books) {
    // If single book exceeds maxPages, allocation impossible
    if (pages > maxPagesPerStudent) return false;

    // If adding current book exceeds the max pages, assign to next student
    if (currentPagesSum + pages > maxPagesPerStudent) {
      currentStudentCount++;
      currentPagesSum = pages;

      // If we've exceeded the number of students, allocation is impossible
      if (currentStudentCount > students) {
        return false;
      }
    } else {
      currentPagesSum += pages;
    }
  }

  return true;
}
```

### Time and Space Complexity Analysis

**Binary Search Approach:**

- Time Complexity: O(n log(sum)) where n is number of books and sum is total pages
  - Binary search runs O(log(sum)) times
  - Each isAllocationPossible check is O(n)
- Space Complexity: O(1) - uses constant extra space

## Dry Run with Examples

### Example 1: [12, 34, 67, 90], k=2

1. left = 90 (max), right = 203 (sum)
2. mid = 146 → possible? [12+34+67,90] → 113,90 → max=113 → possible
   - result=146, right=145
3. mid=117 → possible? [12+34+67,90] → 113,90 → possible
   - result=117, right=116
4. mid=103 → possible? [12+34,67,90] → needs 3 students → not possible
   - left=104
5. mid=110 → possible? [12+34+67,90] → possible
   - result=110, right=109
     ... continues until left > right
     Final result is 113

### Example 2: [15, 17, 20], k=5

- More students (5) than books (3) → immediately return -1

### Example 3: [22, 23, 67], k=1

- Only 1 student gets all books → sum is 112
- Binary search: left=67, right=112
- First mid=89 → possible (but we can do better)
- Eventually returns 112

This approach efficiently narrows down the search space to find the optimal solution.
