//https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1
/*
You are given an array arr[] of integers, where each element arr[i] represents the number of pages in the ith book. You also have an integer k representing the number of students. The task is to allocate books to each student such that:

Each student receives atleast one book.
Each student is assigned a contiguous sequence of books.
No book is assigned to more than one student.
The objective is to minimize the maximum number of pages assigned to any student. In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the smallest possible maximum.

Note: Return -1 if a valid assignment is not possible, and allotment should be in contiguous order (see the explanation for better understanding).
Input: arr[] = [12, 34, 67, 90], k = 2
Output: 113

*/
//Approach 1: Binary Search Approach (Optimal Solution)
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

//Brute Force Approach

function minPagesBruteForce(books, students) {
  const n = books.length;

  // If number of books is less than students, allocation impossible
  if (n < students) return -1;

  // Generate all possible partitions
  const allPartitions = generatePartitions(books, students);

  // Find minimum of maximum sums
  let minMaxPages = Infinity;

  for (let partition of allPartitions) {
    let maxPagesInPartition = Math.max(
      ...partition.map((group) => group.reduce((sum, pages) => sum + pages, 0))
    );
    minMaxPages = Math.min(minMaxPages, maxPagesInPartition);
  }

  return minMaxPages === Infinity ? -1 : minMaxPages;
}

// Helper function to generate all valid partitions
function generatePartitions(books, maxGroups) {
  const result = [];

  function partitionHelper(current, remaining, groups) {
    if (remaining.length === 0) {
      if (groups.length <= maxGroups) {
        result.push([...groups]);
      }
      return;
    }

    // Add to current group
    if (current.length > 0) {
      partitionHelper([], remaining, [...groups, current]);
    }

    // Add to new group
    partitionHelper([...current, remaining[0]], remaining.slice(1), groups);
  }

  partitionHelper([], books, []);
  return result;
}

// Test
const books2 = [12, 34, 67, 90];
const students2 = 2;
console.log(minPagesBruteForce(books2, students2)); // Output: 113
