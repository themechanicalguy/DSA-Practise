const fncBruteForce = (nums, i) => {
  if (nums.length === i) return true;

  if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
    if (fnc(nums, i + 2)) return true;

    if (nums[i] === nums[i + 2]) {
      if (fnc(nums, i + 3)) return true;
    }
  }
  if (
    i + 2 < nums.length &&
    nums[i] == nums[i + 1] - 1 &&
    nums[i] === nums[i + 2] - 2
  ) {
    if (fnc(nums, i + 3)) return true;
  }
  return false;
};

const fnc = (nums, i, dp) => {
  if (nums.length === i) return true;
  if (dp[i] !== -1) return dp[i];

  if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
    if (fnc(nums, i + 2, dp)) {
      return (dp[i] = true);
    }

    if (nums[i] === nums[i + 2]) {
      if (fnc(nums, i + 3, dp)) return (dp[i] = true);
    }
  }
  if (
    i + 2 < nums.length &&
    nums[i] == nums[i + 1] - 1 &&
    nums[i] === nums[i + 2] - 2
  ) {
    if (fnc(nums, i + 3, dp)) return (dp[i] = true);
  }
  return (dp[i] = false);
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var validPartition = function (nums) {
  const dp = new Array(nums.length).fill(-1);
  fncBruteForce(nums, 0);
  return fnc(nums, 0, dp);
};

validPartition([1, 1, 1, 2, 3]);
