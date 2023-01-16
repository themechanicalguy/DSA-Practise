//insertion sort

function insertionSort(arr) {
  //start by picking the 2nd element from arr
  for (let i = 1; i < arr.length; i++) {
    //hold the 2nd value in a variable
    let currentVal = arr[i];
    //compare the second with one before & swap if necessary
    let j = i - 1;
    while (j >= 0 && arr[j] > currentVal) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentVal;
  }
  return arr;
}
insertionSort([5, 3, 4, 1, 2]);
