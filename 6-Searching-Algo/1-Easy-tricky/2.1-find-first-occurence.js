function firstOccurence(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor(start + (end - start) / 2);
  let ans = -1;

  while (start <= end) {
    if (arr[mid] === target) {
      ans = mid;
      end = mid - 1;
    } else if (arr[mid] < target) {
      //right side
      start = mid + 1;
    } else if (arr[mid] > target) {
      //left side
      end = mid - 1;
    }
    mid = Math.floor(start + (end - start) / 2);
  }
  return ans;
}
console.log(firstOccurence([1, 3, 4, 4, 4, 4, 4, 6, 7, 9], 4));
