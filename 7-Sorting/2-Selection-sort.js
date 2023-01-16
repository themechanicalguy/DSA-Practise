//Selection sort
function selectionSort(arr) {
  // let minIndex =
  for (let i = 0; i < arr.length; i++) {
    //0
    let min = i; //0
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        //9<1 F
        min = j; //4
      }
    }
    if (min !== i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
  return arr;
}

console.log(selectionSort([7, 4, 2, 8, 1, 9]));
