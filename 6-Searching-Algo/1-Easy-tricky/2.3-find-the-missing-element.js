// find the missing element
// Modified binary search
function missingElement(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2);
    if (arr[mid] !== mid + 1 && arr[mid - 1] === mid) {
      return mid + 1;
    }
    if (arr[mid] !== mid + 1) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}
missingElement([1, 2, 3, 4, 5, 6, 7, 9, 10]);
