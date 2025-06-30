/**
 * Counting Triangles
You are given an array of N non-negative integers, A0, A1 ,…, AN-1.
Considering each array element Ai as the edge length of some line segment, 
count the number of triangles which you can form using these array values.
Notes:
    You can use any value only once while forming each triangle.
     Order of choosing the edge lengths doesn’t matter. Any triangle formed should have a positive area.
    Return answer modulo 109 + 7.
For example,
A = [1, 1, 1, 2, 2]
{1,1,1}, {}
Return: 4

Given an unsorted array of positive integers, find the number of triangles that can be formed with three 
different array elements as three sides of triangles. For a triangle to be possible from 3 values, 
the sum of any of the two values (or sides) must be greater than the third value (or third side). 

Examples: 
Input: arr= {4, 6, 3, 7}
[3,4,6,7]
Output: 3
Explanation: There are three triangles 
possible {3, 4, 6}, {4, 6, 7} and {3, 6, 7}. 
Note that {3, 4, 7} is not a possible triangle.  

Input: arr= {10, 21, 22, 100, 101, 200, 300}.
Output: 6

Explanation: There can be 6 possible triangles:
{10, 21, 22}, {21, 100, 101}, {22, 100, 101}, 
{10, 100, 101}, {100, 101, 200} and {101, 200, 300}

 */
// REFACTORED
function countTriangles(arr) {
  let count = 0;
  arr.sort((a, b) => a - b);
  //   a,b,c
  // a + b > c
  for (let c = arr.length - 1; c > 2; c--) {
    let a = 0;
    let b = c - 1;
    while (a < b) {
      if (arr[a] + arr[b] > arr[c]) {
        count += b - a;
        b--;
      } else {
        a++;
      }
    }
  }
  return count;
}

// NAIVE APPROACH - 0(N3)
// function countTriangle(arr) {
//   let count = 0;
//   // arr.sort((a, b) => a - b);
//   //    let k = 0;
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       // k = i + j
//       for (let k = j + 1; k < arr.length; k++) {
//         if (
//           arr[i] + arr[j] > arr[k] &&
//           arr[i] + arr[k] > arr[j] &&
//           arr[j] + arr[k] > arr[i]
//         ) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }
console.log(countTriangles([4, 6, 3, 7]));
