let arr = [1, 5, 7, -1, 5];

function lowerBound(arr, start, end, key) {
  while (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (arr[mid] < key) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return start;
}

function upperBound(arr, start, end, key) {
  while (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (arr[mid] <= key) start = mid + 1;
    else end = mid;
  }
  return start;
}

function getPairsCount(arr, sum) {
  let size = arr.length;
  arr.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < size - 1; i++) {
    let diff = sum - arr[i];
    let lower = lowerBound(arr, i + 1, size, diff);
    let upper = upperBound(arr, i + 1, size, diff);
    count = count + upper - lower;
  }
  return count;
}

console.log(getPairsCount([1, 4, 4, 5, 5, 5, 6, 6, 11], 11));
