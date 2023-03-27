//Search in a rotated sorted array
function pivot(arr) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor(start + (end - start) / 2);
  while (start <= end) {
    if (start === end) {
      return start;
    }
    if (mid + 1 < arr.length && arr[mid] > arr[mid + 1]) {
      return mid;
    }
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
function binarySearch(arr, k, pivot) {
  let start = pivot;
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

const search = function (nums, target) {
  let pivotElement = pivot(nums);
  console.log(pivotElement);

  if (target >= nums[0] && target <= nums[pivotElement]) {
    let ans = binarySearch(nums, target, pivotElement);
    return ans;
  }
  if (
    pivotElement + 1 < nums.length &&
    target >= nums[pivotElement + 1] &&
    target <= nums[nums.length - 1]
  ) {
    let ans = binarySearch(nums, target, pivotElement + 1);
    return ans;
  }
  return -1;
};

console.log(search([3, 5, 1], 3));
