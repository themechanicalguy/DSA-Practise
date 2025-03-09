//LC-1838 : Frequency of the Most Frequent Element
//https://leetcode.com/problems/frequency-of-the-most-frequent-element/
//TC: O(NlogN)
//SC: O(1)

//Bruce Force Approach
//Time Complexity: O(N^2)
//Space Complexity: O(1)

var maxFrequency = function (nums, k) {
  let n = nums.length;
  let maxFreq = 0;

  for (let i = 0; i < n; i++) {
    let target = nums[i];
    let remainingK = k;
    let freq = 1;

    for (let j = 0; j < n; j++) {
      if (i !== j && nums[j] <= target) {
        let diff = target - nums[j];
        if (diff <= remainingK) {
          remainingK -= diff;
          freq++;
        }
      }
    }
    maxFreq = Math.max(maxFreq, freq);
  }

  return maxFreq;
};

//Sliding Window
function maxFrequency(nums, k) {
  //Sorting helps because we want to make elements equal to a larger number, so grouping similar numbers together makes sense.
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let left = 0;
  let right = 0;
  let sum = 0;
  let res = 0;
  //We try to expand a window (subarray) that contains numbers we can make equal using at most 𝑘 k operations.
  while (right < n) {
    sum += nums[right];
    //If the sum to make all elements in the window equal to nums[right] exceeds  𝑘 k, then shrink the window.
    while ((right - left + 1) * nums[right] - sum > k) {
      sum -= nums[left];
      //The left boundary (left) moves forward if we exceed the allowed 𝑘 k operations.
      left++;
    }
    res = Math.max(res, right - left + 1);
    // The right boundary (right) keeps expanding.
    right++;
  }
  return res;
}
