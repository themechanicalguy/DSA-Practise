/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const finalArray = [];

  if (k === 1) return nums;

  const findMaxI = (nums, start, end) => {
    let max = -Infinity;
    let ind = -1;
    for (let i = start; i < end; i++) {
      // wind.push(nums[i])
      if (max < nums[i]) {
        max = nums[i];
        ind = i;
      }
      // windMax = Math.max(windMax, nums[i]);
    }
    return [max, ind];
  };

  let [windMax, maxIndex] = findMaxI(nums, 0, k);
  finalArray.push(windMax);

  for (let i = k; i < nums.length; i++) {
    console.log('wind, ', windMax, '\nmaxIndex, ', maxIndex);
    if (windMax < nums[i]) {
      windMax = nums[i];
      maxIndex = i;
    } else if (maxIndex + k - 1 < i) {
      // windMax = -Infinity;
      [windMax, maxIndex] = findMaxI(nums, i - k + 1, i + 1);
    }
    finalArray.push(windMax);
    // var to hold windMax index so when windMax is out we can iterate and find the new max and set the windMax
    //
  }
  return finalArray;
};

/** INSPIRATION SOLUTION FROM OTHER LEETCODERS
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow2 = function (nums, k) {
  const res = [];
  let left = 0;
  let right = 0;
  const q = [];

  while (right < nums.length) {
    while (q.length > 0 && nums[right] > nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(right);

    if (left > q[0]) {
      q.shift();
    }

    if (right + 1 >= k) {
      res.push(nums[q[0]]);
      left++;
    }
    right++;
  }

  return res;
};

maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
maxSlidingWindow([1], 1);
maxSlidingWindow([7, 2, 4], 2);
