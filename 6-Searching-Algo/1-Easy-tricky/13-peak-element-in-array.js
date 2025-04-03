//[0,10,5,2]

function peakElement(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let mid = Math.floor(start + (start + end) / 2);
    if (arr[mid] > arr[mid + 1]) {
      end = mid;
    } else if (arr[mid] < arr[mid] + 1) {
      start = mid + 1;
    }
  }
  return start;
}

console.log(peakElement([0, 10, 5, 2]));
