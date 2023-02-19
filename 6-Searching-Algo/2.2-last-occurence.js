function lastOccurence(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor(start + (end - start) / 2);
  let ans = -1;

  while (start <= end) {
    if (arr[mid] === target) {
      ans = mid;
      start = mid + 1;
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else if (arr[mid] > target) {
      end = mid - 1;
    }
    mid = Math.floor(start + (end - start) / 2);
  }
  return ans;
}

console.log(lastOccurence([1, 3, 4, 5, 7, 7, 7, 7, 9, 11], 7));
