function pivot(arr, start, end) {
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const piv = arr[start];
  let swapInd = start;

  for (let i = start; i <= end; i++) {
    if (arr[i] < piv) {
      swapInd++;
      swap(arr, swapInd, i);
    }
  }
  swap(arr, swapInd, start);
  return swapInd;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  // Base condition
  if (start >= end) return arr;

  const point = pivot(arr, start, end);

  quickSort(arr, start, point - 1);
  quickSort(arr, point + 1, end);
  return arr;
}

const result = quickSort([4, 3, 2, 1, 9, 8, 5, 7, 6]);
console.log(result);
