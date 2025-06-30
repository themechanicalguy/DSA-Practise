//LC- 239 - https://leetcode.com/problems/sliding-window-maximum/
// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right.
// You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Return the max sliding window.
// Example:
// Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
// Output: [3,3,5,5,6,7]
// Explanation:
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
// Approach: Using Deque
// Time complexity: O(N)
// Space complexity: O(N)

//Bruce Force Approach
// Time complexity: O(N*k)
// Space complexity: O(N)

var maxSlidingWindow = function (nums, k) {
  let res = [];
  if (nums.length === 1) {
    res.push(nums[0]);
    return res;
  }
  if (k === 1) return nums;

  let start = 0;

  while (start < nums.length - k + 1) {
    let i = start;
    let j = start + k;
    let max = -Infinity;
    while (i < j) {
      max = Math.max(max, nums[i]);
      i++;
    }
    res.push(max);
    start++;
  }
  return res;
};

function maxSlidingWindow(nums, k) {
  let result = [];
  for (let i = 0; i <= nums.length - k; i++) {
    let max = Math.max(...nums.slice(i, i + k));
    result.push(max);
  }
  return result;
}

// Example usage:
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]

//Optimized Approach---------------------------------
/**
 * First Loop (for first k elements)
    Ensures the deque only stores the indices of the largest elements in the current window.
    Removes elements from the back that are smaller than the current element.
    Adds the index to the deque.
 * Second Loop (for remaining elements)
    Removes indices that are out of the window.
    Removes smaller elements from the back.
    Adds the index to the deque.
    Pushes the maximum value (front of the deque) to result.
 */

function maxSlidingWindow(nums, k) {
  //store indexes in dequeue
  const dq = [];
  const ans = [];

  for (let i = 0; i < k; i++) {
    while (dq.length > 0 && nums[dq[dq.length - 1]] < nums[i]) dq.pop();
    //insert element if dq is empty
    dq.push(i);
  }

  ans.push(nums[dq[0]]);

  for (let i = k; i < nums.length; i++) {
    // Remove elements that are out of this window
    if (dq.length > 0 && dq[0] < i - k) {
      dq.shift();
    }
    //additional
    while (dq.length > 0 && nums[dq[dq.length - 1]] < nums[i]) dq.pop();
    dq.push(i);
    //store ans
    ans.push(nums[dq[0]]);
  }

  return ans;
}

maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
