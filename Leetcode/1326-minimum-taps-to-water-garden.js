/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function(n, ranges) {
    const nums = new Array(n + 1).fill(0);

    for (let i = 0; i <= n; ++i) {
      const l = Math.max(0, i - ranges[i]);
      const r = Math.min(n, i + ranges[i]);
      nums[l] = Math.max(nums[l], r - l);
    }

    let ans = 0;
    let end = 0;
    let farthest = 0;

    for (let i = 0; i < n; i++) {
      farthest = Math.max(farthest, i + nums[i]);
      if (i == end) {
        ++ans;
        end = farthest;
      }
    }

    return end == n ? ans : -1;
  
};
