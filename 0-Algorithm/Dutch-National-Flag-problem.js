/**
 * Given an array A[] consisting of only 0s, 1s, and 2s. 
 * The task is to write a function that sorts the given array.
 * The functions should put all 0s first, then all 1s and all 2s in last.
This problem is also the same as the famous “Dutch National Flag problem”. 
The problem was proposed by Edsger Dijkstra. The problem is as follows:

Examples:

    Input: {0, 1, 2, 0, 1, 2}
    Output: {0, 0, 1, 1, 2, 2}

    Input: {0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1}
    Output: {0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2}
 */

// low tracks the boundary for 0s.
// high tracks the boundary for 2s.
// mid iterates through the array, swapping elements as needed.

function sortColors(nums) {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}

///////[0,0,0,0,0, 1, 1, 1, 1, 1, 2, 2]
sorted([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]);
