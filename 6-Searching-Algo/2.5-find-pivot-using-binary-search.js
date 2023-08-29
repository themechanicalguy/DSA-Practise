// Find pivot element in an array - modified binary search
//arr = [3,4,5,6,7,1,2]
// pivot element:- The element at which the monotonic order breaks is the pivot element
// Order breaks at the pivot element. At some platform is 7 pivot & at some  platform 1
// is the pivot element.

//Brute Force Approach
// Linear Search

//Optimized Appraoch

function pivot(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (start === end) {
      return start;
    }
    //suppose our mid comes at index 4, then arr[mid] == 7 --success case 1
    // 7 is greater then both sides
    // so this is the pivot, we need to handle it seperately
    if (mid + 1 < arr.length && arr[mid] > arr[mid + 1]) {
      return mid;
    }
    //suppose out mid comes at index 5, then arr[mid] == 1, -- success case 2
    // 1 is smaller then both side
    // so pivot is mid-1, we need to handle it seperately
    if (mid - 1 >= 0 && arr[mid - 1] > arr[mid]) {
      return mid - 1;
    }
    //now other 2 condition is to search on left or right part of the array
    if (arr[start] >= arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

console.log(pivot([5, 6, 7, 8, 9, 10, 1, 2, 3]));
