//Given an array of numbers, return their sum
// [3,2,5,1,6] = 17

function getSum(arr, index, N) {
  //this base case is wrong
  // if (N === 0) return arr[0];

  //base case
  //1 if N=0 return 0
  if (N === 0) return 0;
  //2 if N=1 return the only item as sum
  if (N === 1) return arr[index];

  //recurssive relation
  return arr[index] + getSum(arr, index + 1, N - 1);
}
let res = getSum([3, 2, 5, 1, 6], 0, [3, 2, 5, 1, 6].length);
console.log(res);
