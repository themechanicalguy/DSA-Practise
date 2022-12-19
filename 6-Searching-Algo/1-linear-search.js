//Implement linear search

function linearSearch(arr, k) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === k) return i;
  }
  return -1;
}
