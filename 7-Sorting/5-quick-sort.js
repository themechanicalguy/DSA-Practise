//insertion sort
//partition logic
//recurssion call

//swap function
//find the pivot index
function pivot(arr, start, end) {
  let pivotItem = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotItem) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }
  swap(arr, start, swapIndex);
  return swapIndex;
}

//swap function
//swap function
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  //base case
  if (start < end) {
    let pivotIndex = pivot(arr, start, end);
    //left partition sort
    quickSort(arr, start, pivotIndex - 1);
    //right partition
    quickSort(arr, pivotIndex + 1, end);
  }
  return arr;
}
let arr = [80, 10, 40, 0.3, 0.2, 20, 50, 30];

quickSort(arr);

quickSort(arr);
