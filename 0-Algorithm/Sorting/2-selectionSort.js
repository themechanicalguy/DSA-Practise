//Selection sort:
// similar to bubble sort, but instead of first placing large values into sorted position, it places small values into sorted position.

/**
 * Steps of Selection Sort:
    1- Start with the first element as the minimum.
    2- Scan the rest of the array to find the smallest element.
    3- Swap the smallest element with the first unsorted element.
    4- Move to the next unsorted element and repeat until the entire array is sorted.
 */

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    //store the first element as the smallest value you've seen so far
    let min = i;
    //Find the smallest element in the rest of the array
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
