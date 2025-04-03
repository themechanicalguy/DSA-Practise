function oddOccurence(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (start === end) return start;
    if (mid % 2 === 0) {
      if (arr[mid] === arr[mid + 1]) {
        start = mid + 2;
      } else {
        end = mid;
      }
    } else {
      if (arr[mid] === arr[mid - 1]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
}
console.log(oddOccurence([3, 3, 1, 1, 2, 2, 3, 3, 4, 4, 8, 5, 5, 9, 9]));
