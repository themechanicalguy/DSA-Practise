// LC- 704. Binary Search
// Binary search works only for sorted array

let arr = [1, 3, 4, 6, 8, 9, 11, 12, 15, 16, 17, 18, 19];
let k = 15;

function binarSearch(arr, k) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    // console.log("start--> ", start, "end->>", end);
    // console.log(mid, "--> element ", arr[mid]);
    if (arr[mid] === k) {
      return mid;
    } else if (arr[mid] < k) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

console.log(binarSearch(arr, k));
