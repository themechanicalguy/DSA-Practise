// two pointer approach
var findClosestElements = function (arr, k, x) {
  let low = 0;
  let high = arr.length;
  let res = [];
  while (high - low >= k) {
    if (x - arr[low] > arr[high] - x) {
      low++;
    } else {
      high--;
    }
  }
  for (let i = low; i <= high; i++) {
    res.push(arr[i]);
  }
  return res;
};
