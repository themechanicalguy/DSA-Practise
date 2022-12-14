// Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
// The relative order of the elements may be changed.
// https://leetcode.com/problems/remove-element/

const removeElement = (nums, val) => {
  let k = nums.length;
  for (let i = 0, j = 0; j < nums.length; i++, j++) {
    while (nums[j] === val) {
      j++;
      k--;
    }
    if (i !== j) nums[i] = nums[j];
  }
  return k;
};

// author: saurav

var removeElement = function (arr, val) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    if (arr[start] === val && arr[end] !== val)
      [arr[start], arr[end]] = [arr[end], arr[start]];
    if (arr[start] !== val) start++;
    if (arr[end] == val) end--;
  }
  return start;
};

// const result = removeElement([3, 2, 2, 3], 3);
const arr = [0, 1, 2, 2, 3, 0, 4, 2];
const result = removeElement(arr, 2);
console.log(arr, result, "result");
