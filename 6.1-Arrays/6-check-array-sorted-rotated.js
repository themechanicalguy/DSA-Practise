//LC-1752 Check if Array Is Sorted and Rotated
// Given an array nums, return true if the array was originally sorted in non-decreasing order,
// then rotated some number of positions (including zero). Otherwise, return false.
// There may be duplicates in the original array.
// An array is rotated if there is some index k where for every i and j such that i < j,
// the array[i] <= array[j] if i <= k, and array[i] <= array[j] if k <= i.
// Example 1:
// Input: nums = [3,4,5,1,2]
// Output: true
// Explanation: [1,2,3,4,5] is the original sorted array.
// You can rotate the array by 3 positions to begin on the the element of value 3: [3,4,5,1,2]
// Example 2:
// Input: nums = [2,1,3,4]
// Output: false
// Explanation: There is no sorted array once rotated that can make nums.
// Example 3:
// Input: nums = [1,2,3]
// Output: true
// Explanation: [1,2,3] is the original sorted array.
// You can rotate the array by 0 positions.
// Example 4:
// Input: nums = [1,1,1]
// Output: true
// Explanation: [1,1,1] is the original sorted array.
// You can rotate the array by 0 positions.
// Constraints:
// 1 <= nums.length <= 100

//brute force
function isRotatedSortedNaive(arr) {
  let n = arr.length;

  function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (isSorted(arr)) return true;
    arr.push(arr.shift()); // Rotate left
  }

  return false;
}
console.log(isRotatedSortedNaive([3, 4, 5, 1, 2])); // true

//Optimized

function isRotatedSorted(arr) {
  let n = arr.length;
  let countBreaks = 0;

  for (let i = 0; i < n; i++) {
    if (arr[i] > arr[(i + 1) % n]) {
      countBreaks++;
    }
    if (countBreaks > 1) return false;
  }

  return true;
}

// Example
console.log(isRotatedSorted([3, 4, 5, 1, 2])); // true
console.log(isRotatedSorted([2, 1, 3, 4])); // false
console.log(isRotatedSorted([1, 2, 3, 4, 5])); // true (zero rotation)
console.log(isRotatedSorted([5, 1, 2, 3, 4])); // true
console.log(isRotatedSorted([1, 3, 2, 4, 5])); // false
