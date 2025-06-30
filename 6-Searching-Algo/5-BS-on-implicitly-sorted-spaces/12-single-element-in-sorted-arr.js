//LC 540 Single Element in a Sorted Array
// Given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once.
// Your solution should run in O(log n) time complexity.
// Example 1:
// Input: nums = [1,1,2,2,3,3,4,5,5]
// Output: 4
// Explanation: The single element is 4.
// Example 2:
// Input: nums = [1,2,2,3,3,4,4,5,5]
// Output: 1
// Explanation: The single element is 1.

/**
 * Finds the single non-duplicate element in a sorted array using binary search.
 * @param {number[]} nums - Sorted array of integers where every element appears twice except one
 * @return {number} - The single element
 */
function oddOccurence(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (start === end) return start;
    if (mid % 2 === 0) {
      if (arr[mid] === arr[mid + 1]) {
        start = mid + 2;
      } else {
        end = mid;
      }
    } else {
      if (arr[mid] === arr[mid - 1]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
}
console.log(oddOccurence([3, 3, 1, 1, 2, 2, 3, 3, 4, 4, 8, 5, 5, 9, 9]));
