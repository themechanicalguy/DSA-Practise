// 35. Search Insert Position
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:

// Input: nums = [1,3,5,6], target = 5
// Output: 2
// Example 2:

// Input: nums = [1,3,5,6], target = 2
// Output: 1
// Example 3:

// Input: nums = [1,3,5,6], target = 7
// Output: 4
/**
 * 
 * @param {array} nums 
 * @param {number} target 
 * @returns 
const searchInsert = (nums, target) => {
  let mid;
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);

    if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  if (nums[mid] > target) return mid;
  else return mid + 1;
  // console.log(mid, 'mid');
};
*/

// IN THE ABOVE SOLUTION I HAVE USED THE MID VALUE HOWEVER WE CAN USE END VALUE WHICH DIRECTLY POINTS THE POSITION BEFORE THAT. AS SHOWN IN BELOW ONE.
const searchInsert = (arr, K) => {
  let start = 0;
  let end = arr.length - 1;

  // Traverse the search space
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    // If K is found
    if (arr[mid] == K) return mid;
    else if (arr[mid] < K) start = mid + 1;
    else end = mid - 1;
  }

  // Return insert position
  return end + 1;
};
console.log(searchInsert([1, 3, 5, 7], -1));
