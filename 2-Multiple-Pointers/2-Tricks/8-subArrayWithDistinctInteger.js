/**
 * Problem Description IMP:
Given an array A of positive integers,call a (contiguous,not necessarily distinct) subarray of A good,
if the number of different integers in that subarray is exactly B.
(For example: [1, 2, 3, 1, 2] has 3 different integers 1, 2 and 3)
Return the number of good subarrays of A.

Example 
Input 1:
 A = [1, 2, 1, 2, 3]
 B = 2
Input 2:
 A = [1, 2, 1, 3, 4]
 B = 3

Output 1:
 7
Output 2:
 3

 */

// [1, 2, 1, 3, 4];
// [0, 1, 2, 3, 4];
function atMostK(arr, n, k) {
  //n = 5
  // k=2
  // to store the result
  let count = 0; //0
  // left boundary of window
  let left = 0; //0
  // right boundary of window
  let right = 0; //4
  // Map to keep track of number of distinct elements in the current window
  let map = new Map();
  /**
   map={
    3:1,
    4:1   
   }
   */
  // loop to calculate the count
  while (right < n) {
    //TTTTTF
    // calculating the frequency of the element in the current window
    if (map.has(arr[right])) {
      map.set(arr[right], map.get(arr[right]) + 1);
    } else {
      map.set(arr[right], 1);
    }
    // Shrinking the window from left if the count of distinct element exceeds K
    while (map.size > k) {
      //TTFT
      map.set(arr[left], map.get(arr[left]) - 1);
      if (map.get(arr[left]) === 0) {
        map.delete(arr[left]);
      }
      left++; //3
    }
    // Adding the count of subarrays with at most K distinct elements in the current window
    count += right - left + 1; // 10
    right++; //5
  }
  return count;
}
// function to return the count of subarrays with exactly K distinct elements
function exactlyK(arr, n, k) {
  // Count of subarray with exactly K distinct elements is equal to deifference of the count
  // of subarrays with at most K distinct elements and the count of subarrays with atmost (k-1) distinct elements
  return atMostK(arr, n, k) - atMostK(arr, n, k - 1); //13 - 10 = 3
}

let arr = [1, 2, 1, 3, 4];
let n = arr.length;
let k = 3;

exactlyK(arr, n, k);
