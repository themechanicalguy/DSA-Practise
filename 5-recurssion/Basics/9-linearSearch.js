// Given an array, a key, return true if the key exists in the array.
// [2,4,6,10,14,16], key = 6, Output: true.

function linearSearch(arr, k, index, N) {
  //base case
  if (N === 0) return false;
  if (arr[index] === k) return true;
  // recursive relation
  return linearSearch(arr, k, index + 1, N - 1);
}
let res = linearSearch(
  [2, 4, 9, 10, 14, 16],
  6,
  0,
  [2, 4, 9, 10, 14, 16].length
);
console.log(res);
