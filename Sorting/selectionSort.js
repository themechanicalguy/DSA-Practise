const selectionSort = (arr) => {
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  for (let i = 0; i < arr.length; i++) {
    let smallIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[smallIndex] > arr[j]) {
        smallIndex = j;
      }
    }
    if (i !== smallIndex) swap(arr, i, smallIndex);
  }
  return arr;
};
