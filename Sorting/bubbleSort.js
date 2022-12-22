const bubbleSort = (arr) => {
  let noSwaps;
  // BIG O is O(n^2)
  for (let i = arr.length; i > 0; i--) {
    // noSwap is an optimization if a flow goes without a swap then all the other unchecked elements are already swapped. So we can break free from there.
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        // comparing adjacent value to sort the values
        noSwaps = false;
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      if (noSwaps) break;
    }
    return noSwaps;
  }
  return temp;
};
