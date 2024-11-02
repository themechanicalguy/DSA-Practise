// 2501. Longest Square Streak in an Array
// https://leetcode.com/problems/longest-square-streak-in-an-array/
// Diff: Medium

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function (nums) {
  const newNum = [...new Set(nums)].sort((a, b) => b - a);
  let max = 0;
  // nums.erase(std::unique(nums.begin(), nums.end()), nums.end());
  // ranges::sort(nums, greater<>());

  // const int maxNum = ranges::max(nums);
  const maxNum = newNum[0];
  // dp[i] := the longest square streak starts with i
  // vector<int> dp(maxNum + 1);
  const dp = new Array(maxNum + 1).fill(0);

  for (const num of newNum) {
    dp[num] = 1;
    const squaredNum = num * num;
    if (squaredNum <= maxNum) dp[num] += dp[squaredNum];
  }

  const ans = dp.reduce((a, b) => (a > b ? a : b));
  return ans < 2 ? -1 : ans;
};
