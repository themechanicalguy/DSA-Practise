/**
 * Given three sorted arrays A, B, and C of not necessarily same sizes. 
 * Calculate the minimum absolute difference between the maximum and minimum
 * number of any triplet A[i], B[j], C[k] 
 * such that they belong to arrays A, B and C respectively, 
 * i.e., minimize (max(A[i], B[j], C[k]) – min(A[i], B[j], C[k]))
 
Input : A : [ 1, 4, 5, 8, 10 ]
        B : [ 6, 9, 15 ]
        C : [ 2, 3, 6, 6 ]
Output : 1
Explanation: When we select A[i] = 5
B[j] = 6, C[k] = 6, we get the minimum difference 
as max(A[i], B[j], C[k]) - min(A[i], B[j], C[k]))
= |6-5| = 1 

Input : A = [ 5, 8, 10, 15 ]
        B = [ 6, 9, 15, 78, 89 ]
        C = [ 2, 3, 6, 6, 8, 8, 10 ]
Output : 1
Explanation: When we select A[i] = 10
b[j] = 9, C[k] = 10.

*/
//NAIVE APPROCH
// function minMaxmin(arr1, arr2, arr3) {
//   let globalMin = Infinity;
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       for (let k = 0; k < arr3.length; k++) {
//         let tempMax = Math.max(arr1[i], arr2[j], arr3[k]);
//         let tempMin = Math.min(arr1[i], arr2[j], arr3[k]);
//         let minimize = Math.abs(tempMax - tempMin);
//         globalMin = Math.min(globalMin, minimize);
//       }
//     }
//   }
//   return globalMin;
// }
// REFACTORED
function minMaxmin(arr1, arr2, arr3) {
  let i = 0;
  let j = 0;
  let k = 0;
  let globalMin = Infinity;
  while (i < arr1.length && j < arr2.length && k < arr3.length) {
    let tempMax = Math.max(arr1[i], arr2[j], arr3[k]);
    let tempMin = Math.min(arr1[i], arr2[j], arr3[k]);
    let minimize = Math.abs(tempMax - tempMin);
    if (tempMin === arr1[i]) {
      i++;
    } else if (tempMin === arr2[j]) {
      j++;
    } else {
      k++;
    }
    globalMin = Math.min(globalMin, minimize);
  }
  return globalMin;
}
// minMaxmin([5, 8, 10, 15], [6, 9, 15, 78, 89], [2, 3, 6, 6, 8, 8, 10]);
console.log(minMaxmin([-1], [-2], [-3]));
