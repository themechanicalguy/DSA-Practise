//insertion sort
//partition logic
//recurssion call

//find the pivot index
function pivot(arr, start, end) {
  //swap function
  function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  let pivotItem = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i < arr.length; i++) {
    if (arr[i] < pivotItem) {
      swapIndex++;
      swap(arr, swapIndex, i);
      // console.log(arr);
    }
  }
  // console.log(pivotItem)
  swap(arr, start, swapIndex);
  console.log(arr);
  return swapIndex;
}
let arr = [8, 20, 4, 0, 2, 50, 1];
// pivot(arr,0,arr.length-1);
function quickSort(arr, start = 0, end = arr.length - 1) {
  let pivotIndex = pivot(arr, start, end);
  //base case
  if (start >= end) return arr;
  //left partition sort
  quickSort(arr, start, pivotIndex - 1);
  //right partition
  console.log(pivotIndex);
  console.log(end);
  quickSort(arr, pivotIndex + 1, end - 1);
  return arr;
}

quickSort(arr);
