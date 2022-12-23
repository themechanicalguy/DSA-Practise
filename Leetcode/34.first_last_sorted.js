// Find First and Last Position of Element in Sorted Array

/**
 * 
Input: (nums = [5, 7, 7, 8, 8, 10]), (target = 8);
Output: [3, 4];

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Input: nums = [], target = 0
Output: [-1,-1]
*/

/**
 // BINARY SEARCH KIND OF PROBLEM
 // THE BELOW ONE IS FINE BUT IT WILL TAKE MORE TIME IN CASE THE ARRAY IS MADE UP OF ONLY THE TARGET AND LARGE LENGTH
// AND BECAUSE OF THIS THE SOLUTION WILL TAKE MORE THAN EXPECTED n(log n);
const firstLast = (nums, target) => {
  let l = 0;
  let r = nums.length - 1;
  let mid = parseInt((r + l) / 2);

  while (l <= r) {
    // comparator should be < or equal to or else the edge case of array size 1 will not be satisfied
    if (nums[mid] === target) {
      let left = mid;
      let right = mid;
      while (nums[left - 1] === target) {
        left--;
      }

      while (nums[right + 1] === target) {
        right++;
      }

      return [left, right];
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
    mid = parseInt((r + l) / 2);
  }
  return [-1, -1];
};
*/

const firstOccurance = (nums, target) => {
  let l = 0;
  let r = nums.length - 1;
  let result = -1;

  while (l <= r) {
    // comparator should be < or equal to or else the edge case of array size 1 will not be satisfied
    mid = Math.floor((r + l) / 2);
    if (nums[mid] === target) {
      // If arr[mid] is same as x, we
      // update res and move to the left
      // half.
      r = mid - 1;
      result = mid;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return result;
};

const lastOccurance = (nums, target) => {
  let l = 0;
  let r = nums.length - 1;
  let result = -1;

  while (l <= r) {
    // comparator should be < or equal to or else the edge case of array size 1 will not be satisfied
    mid = Math.floor((r + l) / 2);
    if (nums[mid] === target) {
      // If arr[mid] is same as x, we
      // update res and move to the left
      // half.
      l = mid + 1;
      result = mid;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return result;
};

const morefirstLast = (nums, target) => {
  return [firstOccurance(nums, target), lastOccurance(nums, target)];
};

// console.log('result is', firstLast([5, 7, 7, 8, 8, 10], 8));
console.log('result is', morefirstLast([1], 1));
