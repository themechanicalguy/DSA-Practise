//https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1
// Given two sorted arrays a[] and b[] and an element k, the task is to find the element that would be at the kth position of the combined sorted array.
// Examples :
// Input: a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
// Output: 6
// Explanation: The final combined sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.

//1. Brute Force Approach (Merge and Find)
/**
 * Finds the kth element in combined sorted array using merge approach
 * @param {number[]} arr1 - First sorted array
 * @param {number[]} arr2 - Second sorted array
 * @param {number} k - Index to find (1-based)
 * @returns {number} The kth element
 */
function findKthElementByMerge(arr1, arr2, k) {
  const merged = [];
  let i = 0,
    j = 0;

  // Merge the two arrays (similar to merge sort)
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }

  // Add remaining elements from arr1
  while (i < arr1.length) {
    merged.push(arr1[i++]);
  }

  // Add remaining elements from arr2
  while (j < arr2.length) {
    merged.push(arr2[j++]);
  }

  // Return the kth element (adjusting for 1-based index)
  return merged[k - 1];
}

//Approach -2. Binary Search Approach (Most Efficient)
/**
 * Finds the kth element using binary search approach
 * @param {number[]} arr1 - First sorted array
 * @param {number[]} arr2 - Second sorted array
 * @param {number} k - Index to find (1-based)
 * @returns {number} The kth element
 */
function findKthElementBinarySearch(arr1, arr2, k) {
  // Ensure arr1 is the smaller array to minimize binary search steps
  if (arr1.length > arr2.length) {
    return findKthElementBinarySearch(arr2, arr1, k);
  }

  const m = arr1.length;
  const n = arr2.length;
  let low = 0,
    high = Math.min(k, m);

  while (low <= high) {
    // Partition arr1 such that we take partition1 elements from arr1
    const partition1 = Math.floor((low + high) / 2);
    // Partition arr2 such that partition1 + partition2 = k
    const partition2 = k - partition1;

    // Handle edge cases where partitions are at boundaries
    const maxLeft1 = partition1 === 0 ? -Infinity : arr1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : arr1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : arr2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : arr2[partition2];

    // Check if we've found the correct partition
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // The kth element is the maximum of the left partitions
      return Math.max(maxLeft1, maxLeft2);
    } else if (maxLeft1 > minRight2) {
      // We need to move left in arr1
      high = partition1 - 1;
    } else {
      // We need to move right in arr1
      low = partition1 + 1;
    }
  }

  // If all elements in arr1 are smaller than arr2's elements
  return arr2[k - 1];
}
