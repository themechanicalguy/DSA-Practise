// Given an array of numbers, use binary search to find a key in the array.
//[2,4,6,10,14,16],14

function printArr(arr, s, e) {
  for (let i = s; i < e; i++) {
    process.stdout.write(" " + arr[i]);
  }
  console.log("\n");
}

function binarySearch(arr, s, e, k) {
  printArr(arr, s, e);
  // base case 1
  if (s > e) return false;
  let mid = s + Number.parseInt((e - s) / 2);

  //base case 2
  if (arr[mid] === k) {
    console.log(mid, arr[mid]);
    return true;
  }

  if (arr[mid] < k) {
    // printArr(arr, mid + 1, e);
    return binarySearch(arr, mid + 1, e, k);
  } else {
    // printArr(arr, mid - 1, e);
    return binarySearch(arr, s, mid - 1, k);
  }
}
let arr = [2, 4, 6, 10, 14, 16];
let res = binarySearch(arr, 0, arr.length, 10);
console.log(res);
