//LC-189
// Given an array, rotate the array to the right by k steps, where k is non-negative.
//
// Example 1:
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
//
// Example 2:
// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
//
// Constraints:
// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105
//
// Follow up:
// Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.

//Brute force approach - Using Extra Array (Copy Approach)

function rotate(nums, k) {
  let n = nums.length;
  k = k % n; // Handle cases where k > nums.length
  let newArr = new Array(n);

  // Copy elements to the new positions
  for (let i = 0; i < n; i++) {
    newArr[(i + k) % n] = nums[i];
  }

  // Copy back to original array
  for (let i = 0; i < n; i++) {
    nums[i] = newArr[i];
  }
  return nums;
}

// Example
let arr = [1, 2, 3, 4, 5, 6, 7];
rotate(arr, 3);
console.log(arr); // Output: [5, 6, 7, 1, 2, 3, 4]

//rverse approach - Using Reverse Approach

function rotateR(nums, k) {
  let n = nums.length;
  k = k % n;

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]]; // Swap elements
      start++;
      end--;
    }
  }

  reverse(nums, 0, k); // Reverse first k elements
  reverse(nums, k + 1, n - 1); // Reverse rest
  reverse(nums, 0, n - 1); // Reverse whole array

  return nums;
}
