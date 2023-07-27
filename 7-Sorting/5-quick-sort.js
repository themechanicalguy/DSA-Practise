//insertion sort
//partition logic
//recurssion call

//swap function
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

//find the pivot index
function pivot(arr, start, end) {
  let pivotItem = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i] < pivotItem) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }
  swap(arr, start, swapIndex);
  return swapIndex;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  let pivotIndex = pivot(arr, start, end);
  //base case
  if (start >= end) return arr;
  //left partition sort
  quickSort(arr, start, pivotIndex - 1);
  //right partition
  quickSort(arr, pivotIndex + 1, end - 1);
  return arr;
}
let arr = [8, 20, 4, 0, 2, 50, 1];

quickSort(arr);
