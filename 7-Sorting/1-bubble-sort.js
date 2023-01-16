// Implement bubble sort
// the concept of bubble sort is that on the first iteration the largest element would
// be reaching its right position and similarly for others as well.

function bubbleSort(arr) {
  //start a loop with a variable i from array index 0 to end
  for (let i = 0; i < arr.length; i++) {
    //start a inner loop with a variable j from 0 to n-i
    for (let j = 0; j < arr.length - i; j++) {
      // swap if arr[j] > arr[j+1]
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 8, 3, 2, 1]));
