const merge = (arr, l, m, r) => {
  const newArr = [];
  let i = 0;
  let j = 0;
  while (i < m - l + 1 && j < r - m) {
    if (arr[i + l] < arr[j + m + 1]) {
      newArr.push(arr[i + l]);
      i++;
    } else {
      newArr.push(arr[j + m + 1]);
      j++;
    }
  }
  while (i < m - l + 1) {
    newArr.push(arr[i + l]);
    i++;
  }
  while (j < r - m) {
    newArr.push(arr[j + m + 1]);
    j++;
  }

  let k = 0;
  while (k < newArr.length) {
    arr[k + l] = newArr[k];
    k++;
  }
  return;
};

const _mergeSort = (arr, left, right) => {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);
  _mergeSort(arr, left, mid);
  _mergeSort(arr, mid + 1, right);

  merge(arr, left, mid, right);
};

const mergeSort = (arr) => {
  _mergeSort(arr, 0, arr.length - 1);
  return arr;
};

console.log(mergeSort([4, 3, 2, 1, 9, 8, 5, 7, 6]));
