// Find pivot element in an array
//arr = [3,4,5,6,7,1,2]
// pivot element:- The element at which the monotonic order breaks is the pivot element
// Order breaks at the pivot element. At some platform is pivot & at some  platform 1
// is the pivot element.

//Brute Force Approach
// Linear Search

//Optimized Appraoch

function pivot(arr) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor(start + (end - start) / 2);
  while (start <= end) {
    if (start === end) {
      return start;
    }
    //suppose our mid comes at index 4, then arr[mid] == 7
    // 7 is greater then both sides
    // so this is the pivot, we need to handle it seperately
    if (mid + 1 < arr.length && arr[mid] > arr[mid + 1]) {
      return mid;
    }
    //suppose out mid comes at index 5, then arr[mid] == 1,
    // 1 is smaller then both side
    // so pivot is mid-1, we need to handle it seperately
    if (mid - 1 >= 0 && arr[mid - 1] > arr[mid]) {
      return mid - 1;
    }
    if (arr[start] >= arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    mid = Math.floor(start + (end - start) / 2);
  }
  return -1;
}

console.log(pivot([5, 6, 7, 8, 9, 10, 1, 2, 3]));