//implement bubble sort using recurssion
function bubbleSort(arr, n) {
  //base case
  if (n == 0 || n == 1) return;
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }
  bubbleSort(arr, n - 1);
  return arr;
}

let arr = [13, 5, 3, 17, 18];
let res = bubbleSort(arr, arr.length);
console.log(res);
