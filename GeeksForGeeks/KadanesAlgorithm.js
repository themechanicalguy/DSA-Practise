// To find the contiguous sub array containing at least one number which has the maximum sum

/**
 * @param {number[]} arr
 * @param {number} N
 * @returns {number}
 */
class Solution {
  //Function to find the sum of contiguous subarray with maximum sum.
  maxSubarraySum(arr, N) {
    // code here
    // 1. initialize gMax, lInd, rInd, i, lMax
    // 1. loop over the array from point l=0, r=1
    // 2. increment r when sum > 0
    // 3. if gMax = Max (lMax, gMax)
    // 4. move the left pointer when value is less than 0;

    let gMax = arr[0];
    let l = 0;
    let lMax = arr[0];
    let r = 1;

    while (r < N) {
      if (lMax < 0) {
        l = r;
        lMax = 0;
      }

      lMax += arr[r];
      r++;
      gMax = Math.max(lMax, gMax);
    }
    return gMax;
  }
}
