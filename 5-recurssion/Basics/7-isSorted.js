//Given an array of numbers, find if they are sorted or not
// 2,4,6,9,11,13 ==> return true

function isSorted(arr, index, N) {
  //this base case will not work in all cases
  // if (N === 0) return;
  //base case : if the array has 0 or 1 element, then it is already sorted
  if (N === 0 || N === 1) return true;
  if (arr[index] > arr[index + 1]) return false;
  return isSorted(arr, index + 1, N - 1);
}
let arr = [1, 2, 3, 9, 13, 11];
let res = isSorted(arr, 0, arr.length);
console.log(res);
