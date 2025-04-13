//LC- 4. Median of Two Sorted Arrays
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).
// Example 1:
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

// Approach 1: Merge and Find Median (Brute Force - O(m+n) time)

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArraysMerge(nums1, nums2) {
  const mergedArray = [];
  let i = 0; // Pointer for nums1
  let j = 0; // Pointer for nums2

  // Merge the two sorted arrays
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      mergedArray.push(nums1[i]);
      i++;
    } else {
      mergedArray.push(nums2[j]);
      j++;
    }
  }

  // Add remaining elements from nums1
  while (i < nums1.length) {
    mergedArray.push(nums1[i]);
    i++;
  }

  // Add remaining elements from nums2
  while (j < nums2.length) {
    mergedArray.push(nums2[j]);
    j++;
  }

  // Calculate median
  const length = mergedArray.length;
  if (length % 2 === 0) {
    // Even length: average of middle two elements
    const mid = length / 2;
    return (mergedArray[mid - 1] + mergedArray[mid]) / 2;
  } else {
    // Odd length: middle element
    return mergedArray[Math.floor(length / 2)];
  }
}

//Approach 2: Optimized Merge (O(m+n) time, O(1) space)
function findMedianSortedArraysOptimizedMerge(nums1, nums2) {
  const totalLength = nums1.length + nums2.length;
  let medianPosition = Math.floor(totalLength / 2);
  let isEven = totalLength % 2 === 0;

  let i = 0; // Pointer for nums1
  let j = 0; // Pointer for nums2
  let current = 0;
  let prev = 0;

  // We only need to iterate up to the median position
  for (let count = 0; count <= medianPosition; count++) {
    prev = current;

    // Move the pointer of the array with the smaller element
    if (i < nums1.length && (j >= nums2.length || nums1[i] < nums2[j])) {
      current = nums1[i];
      i++;
    } else {
      current = nums2[j];
      j++;
    }
  }

  return isEven ? (prev + current) / 2 : current;
}

//Approach 3: Binary Search (O(log(min(m,n))) time)
function findMedianSortedArraysBinarySearch(nums1, nums2) {
  // Ensure nums1 is the smaller array to reduce search space
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  const isEven = totalLength % 2 === 0;
  const halfLength = Math.floor(totalLength / 2);

  let left = 0;
  let right = m;

  while (left <= right) {
    // Partition nums1
    const partition1 = Math.floor((left + right) / 2);
    // Partition nums2 is determined by partition1
    const partition2 = halfLength - partition1;

    // Get the four elements around the partition
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    // Check if we've found the correct partition
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if (isEven) {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      // Too far right in nums1, move left
      right = partition1 - 1;
    } else {
      // Too far left in nums1, move right
      left = partition1 + 1;
    }
  }

  // Should never reach here for valid inputs
  throw new Error("Input arrays are not sorted or invalid");
}
