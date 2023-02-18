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
  while (start < end) {
    let mid = Math.floor(start + (end - start) / 2);
    //suppose our mid comes at index 4, then arr[mid] == 7
    // 7 is greater then both sides
    // so this is the pivot, we need to handle it seperately
    if (mid + 1 < arr.length && arr[mid] > arr[mid + 1]) {
      return arr[mid];
    }
    //suppose out mid comes at index 5, then arr[mid] == 1,
    // 1 is smaller then both side
    // so pivot is mid-1, we need to handle it seperately
    if (mid - 1 >= 0 && arr[mid - 1] > arr[mid]) {
      return arr[mid - 1];
    }
    // bad practise
    // if (arr[mid] > arr[start]) {
    //   start = mid;
    // } else if (arr[mid] < arr[start]) {
    //   end = mid - 1;
    // }

    if (arr[start] >= arr[mid]) {
      end = mid - 1;
    } else {
      //for single element make sure using start < end in while loop
      start = mid;
    }
  }
  return start;
}

console.log(pivot([[4, 5, 6, 7, 0, 1, 2]]));
