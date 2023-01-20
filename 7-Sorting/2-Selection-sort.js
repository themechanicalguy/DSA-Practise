//Selection sort:
// similar to bubble sort, but instead of first placing large values into sorted position,
// it places small values into sorted position

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    //store the first element as the smallest value you've seen so far
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      //compare the item to the next item in the array untill you find a smaller number
      if (arr[j] < arr[min]) {
        // update the minimum
        min = j;
      }
    }
    // if min is the the i, then swap
    if (min !== i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
  return arr;
}

console.log(selectionSort([7, 4, 2, 8, 1, 9]));
