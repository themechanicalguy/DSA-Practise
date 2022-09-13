/** Counting Subarrays!
Problem Description
Given an array A of N non-negative numbers and you are also given non-negative number B.
You need to find the number of subarrays in A having sum less than B. We may assume that there is no overflow.

Input 1:

 A = [2, 5, 6]
 B = 10
Output: 4

Input 2:

 A = [1, 11, 2, 3, 15]
 B = 10
Output:  4

Example Explanation

Explanation 1:

 The subarrays with sum less than B are {2}, {5}, {6} and {2, 5},

Explanation 2:

 The subarrays with sum less than B are {1}, {2}, {3} and {2, 3}

 */

//  [2,5,6] B=10
// {2},{5},{6},{2,5}

// initialize a variable count with 0
// run a loop from start to end
// check if start and end index < B, if true count ++
// check for the subarr sum between start to end, if true count++

function subarr(A, B) {
  let count = 0;
  let start = 0;
  let end = A.length;
  while (start < end) {
    if (A[start] < B) count++;
    if (A[end] < B) count++;
    let sum = sum + A[start];
  }
}
