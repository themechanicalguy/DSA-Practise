//User function Template for javascript

/**
 * @param {number[]} a
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */

function isPossibleSoln(arr, n, m, soln) {
  let pageSum = 0;
  let st = 1;
  for (let i = 0; i < n; i++) {
    if (arr[i] > soln) return false;
    if (pageSum + arr[i] > soln) {
      st++;
      pageSum = arr[i];
      if (st > m) return false;
    } else {
      pageSum += arr[i];
    }
  }
  return true;
}
//Function to find minimum number of pages.
function findPages(arr, n, m) {
  // edge case
  if (m > n) return -1;
  let ans = -1;
  let start = 0;
  let end = arr.reduce((acc, i) => acc + i);

  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (this.isPossibleSoln(arr, n, m, mid)) {
      ans = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return ans;
  //your code here
}
