//LC-283 - Move Zeroes
// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.
//
// Example 1:
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
//
// Example 2:
// Input: nums = [0]
// Output: [0]
//
// Constraints:
// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1

var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      j = i;
      break;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0 && nums[j] === 0 && i > j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }

  return nums;
};
// two pointers This approach moves all zeros to the end while maintaining the order of non-zero elements in O(n) time and O(1) space.
function moveZeroe(nums) {
  let left = 0; // Pointer for the position to place the next non-zero element

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      // Swap only when necessary
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
  }
}

// Counting Zeroes Approach
// Count the number of zeros.
// Remove all zeros from the array.
// Append the counted zeros at the end.
function moveZeroes(nums) {
  let zeroCount = 0;

  // Remove zeros and count them
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      zeroCount++;
      nums.splice(i, 1);
      i--; // Adjust index after removal
    }
  }

  // Append zeros at the end
  while (zeroCount > 0) {
    nums.push(0);
    zeroCount--;
  }
}

// Example usage
let nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums); // Output: [1, 3, 12, 0, 0]
