//LC-239

//Brute Force
function maxSlidingWindow(nums, k) {
  let output = [];

  for (let i = 0; i <= nums.length - k; i++) {
    let maxi = nums[i];
    for (let j = i; j < i + k; j++) {
      maxi = Math.max(maxi, nums[j]);
    }
    output.push(maxi);
  }

  return output;
}

//Optimal

var maxSlidingWindowOp = function (nums, k) {
  // Decreasing monotonic queue so the maximum value is at the front
  const dequeue = [];
  const output = [];
  /*
   * The goal is to maintain a decreasing monotonic queue and register
   * max value as the window shifts.
   *
   * nums = [1,3,-1,-3,5,3,6,7], k = 3
   *
   * i        queue           output
   * 0        [1]             []
   * 1        [3]             []
   * 2        [3, -1]         [3]
   * 3        [3, -1, -3]     [3, 3]
   * 4        [5]             [3, 3, 5]
   * 5        [5, 3]          [3, 3, 5, 5]
   * 6        [6]             [3, 3, 5, 5, 6]
   * 7        [7]             [3, 3, 5, 5, 6, 7]
   */
  for (let i = 0; i < nums.length; i++) {
    // add the number at the right position queue
    while (nums[i] > dequeue[dequeue.length - 1]) {
      dequeue.pop();
    }
    dequeue.push(nums[i]);
    /**
     * once the window fully overlaps the array, we can start register
     * the maximum values in each iteration.
     */
    if (i >= k - 1) {
      output.push(dequeue[0]);
      // remove maximum value when it's moving outside of the window
      if (nums[i - k + 1] === dequeue[0]) {
        dequeue.shift();
      }
    }
  }

  return output;
};
