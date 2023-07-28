/**
 * Given a sorted array of integers, WAF called search that accepts
 * a value and returns the index where the value passed to the function is located. return -1 if not found
 */

//Naive Approach
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}

// Refactor
function search(arr, val) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] < val) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return -1;
}
