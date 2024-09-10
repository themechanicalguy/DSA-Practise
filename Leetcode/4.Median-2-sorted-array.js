/** 
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).
Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 
Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// https://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-different-sizes/
var findMedianSortedArrays = function(nums1, nums2) {
    
    const n1 = nums1.length;
    const n2 = nums2.length;
    if (n1 > n2)
      return findMedianSortedArrays(nums2, nums1);

    let l = 0;
    let r = n1;

    while (l <= r) {
      const partition1 = Math.floor((l + r) / 2);
      const partition2 = Math.floor((n1 + n2 + 1) / 2) - partition1;
      const maxLeft1 = partition1 == 0 ? -Infinity : nums1[partition1 - 1];
      const maxLeft2 = partition2 == 0 ? -Infinity : nums2[partition2 - 1];
      const minRight1 = partition1 == n1 ? Infinity : nums1[partition1];
      const minRight2 = partition2 == n2 ? Infinity : nums2[partition2];
      console.log(partition1, partition2)
      if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1)
        return (n1 + n2) % 2 == 0
            ? (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) * 0.5
            : Math.max(maxLeft1, maxLeft2);
      else if (maxLeft1 > minRight2)
        r = partition1 - 1;
      else
        l = partition1 + 1;

    }
};


// BELOW IS THE OPTIMIZED SOLUTION
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
    const n = nums1.length;
    const m = nums2.length;
    let i = 0;
     
    // Current index of input array nums2[]
    let j = 0;
    let count;
    let m1 = -1, m2 = -1;
 
    // Since there are (n+m) elements,
    // There are following two cases
    // if n+m is odd then the middle
    // index is median i.e. (m+n)/2
    if ((m + n) % 2 == 1)
    {
        for(count = 0;
            count <= (n + m) / 2;
            count++)
        {
            if (i != n && j != m)
            {
                m1 = (nums1[i] > nums2[j]) ?
                    nums2[j++] : nums1[i++];
            }
            else if(i < n)
            {
                m1 = nums1[i++];
            }
             
            // For case when j<m,
            else
            {
                m1 = nums2[j++];
            }
        }
        return m1;
    }
 
    // Median will be average of elements
    // at index ((m+n)/2 - 1) and (m+n)/2
    // in the array obtained after merging
    // nums1 and nums2
    else
    {
        for(count = 0;
            count <= (n + m) / 2;
            count++)
        {
            m2 = m1;
            if (i != n && j != m)
            {
                m1 = (nums1[i] > nums2[j]) ?
                    nums2[j++] : nums1[i++];
            }
            else if(i < n)
            {
                m1 = nums1[i++];
            }
             
            // For case when j<m,
            else
            {
                m1 = nums2[j++];
            }
        }
        return (m1 + m2) / 2;
    }
};
