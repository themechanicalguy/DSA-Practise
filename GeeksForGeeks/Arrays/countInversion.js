/**
 * @param {number[]} arr
 * @param {number} N
 * @returns {number}
 */

// As per the observation for a reversed arr the inversion need is to be sum of all elements from ( 0 -> N-1)
/**
 * for length = 1 : already swapped so 0;
 * for length = 2 : swaps = 1
 * for length = 3 : swaps = 3
 * for length = 4 : swaps = 6
 * for length = 5 : swaps = 10
 * for length = 6 : swaps = 15
 *
 * Here merge sort is used and in merge sort we can find no of swaps from where we can calculate inversion
 */
class Solution {
  // Function to count inversions in the array.
  inversionCount(arr, N) {
    //your code here
    let count = 0;

    const doMerge = (arr1, arr2) => {
      const N1 = arr1.length;
      const N2 = arr2.length;

      let l = 0,
        r = 0;
      const mergedArr = [];
      while (l < N1 || r < N2) {
        if (l === N1 || (r < N2 && arr1[l] > arr2[r])) {
          mergedArr.push(arr2[r]);
          // Appropriate position to increase count;
          count += N1 - l;
          r++;
        } else {
          mergedArr.push(arr1[l]);
          l++;
        }
      }
      return mergedArr;
    };
    const doMergeSort = (arr) => {
      if (arr.length <= 1) return arr;

      const mid = arr.length / 2;
      let left = doMergeSort(arr.slice(0, mid));
      let right = doMergeSort(arr.slice(mid));

      let mergedArr = doMerge(left, right);

      return mergedArr;
    };

    let result = doMergeSort(arr);
    return count;
  }
}
