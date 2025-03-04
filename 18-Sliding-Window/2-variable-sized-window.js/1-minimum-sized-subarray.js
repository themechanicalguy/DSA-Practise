//LC-209
// Minimum Size Subarray Sum
// Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

//Brute Force Approach
// Time complexity: O(N^2)
// Space complexity: O(1)

var minSubArrayLen = function (target, nums) {
  let start = 0;
  let end = 0;
  let winSize = Infinity;

  const getSum = (i, j) => {
    let sum = 0;
    for (let start = i; start <= j; start++) {
      sum = sum + nums[start];
    }
    return sum;
  };

  while (start <= end && end < nums.length) {
    let sum = getSum(start, end);
    if (sum >= target) {
      winSize = Math.min(winSize, end - start + 1);
      start++;
    } else {
      end++;
    }
  }

  return winSize === Infinity ? 0 : winSize;
};

//optimized approach
// Time complexity: O(N)
// Space complexity: O(1)
// Approach: Sliding Window

// Algorithm:
//      1. Initialize start and end as 0.
//      2. Initialize sum as 0.
//      3. Iterate over the array.
//      4. Increment end and add the element to sum.
//      5. If sum is greater than or equal to target, then update the winSize.
//      6. Increment start and subtract the element from sum.
//      7. Return winSize.
//      8. If winSize is Infinity, then return 0.
//      9. Done.
var minSubArrayLen = function (target, nums) {
  let start = 0;
  let end = 0;
  let winSize = Infinity;
  let sum = 0;

  while (end < nums.length) {
    sum = sum + nums[end];

    while (sum >= target) {
      winSize = Math.min(winSize, end - start + 1);
      sum = sum - nums[start];
      start++;
    }

    end++;
  }

  return winSize === Infinity ? 0 : winSize;
};
