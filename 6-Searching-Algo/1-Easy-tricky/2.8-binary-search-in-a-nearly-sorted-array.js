//arr = [10,3,40,20,50,80,70]
//target = 70

function nearlySorted(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);

    //T
    //0 6
    if (arr[mid] === target) {
      //F
      return mid;
    } else if (mid - 1 > 0 && arr[mid - 1] === target) {
      //F
      //F
      return mid - 1;
    } else if (mid + 1 <= arr.length && arr[mid + 1] === target) {
      //F
      return mid + 1;
    } else if (arr[mid] < target) {
      //T
      start = mid + 2;
    } else {
      // mid = end - 2;
      end = mid - 2;
    }
    // mid = Math.floor(start + (end - start) / 2); //5 + 6-5/2 =5
  }
  return -1;
}

console.log(nearlySorted([10, 3, 40, 20, 50, 80, 70], 30));
