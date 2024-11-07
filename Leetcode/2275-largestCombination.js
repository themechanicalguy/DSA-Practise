// 2275. Largest Combination With Bitwise AND Greater Than Zero
// https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/
// Diff: Medium
// Help Solved
/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function(candidates) {
    const kMaxBit = 24;
    let ans = 0;

    for (let i = 0; i < kMaxBit; ++i) {
      let count = 0;
      for (const candidate of candidates)
        if ((candidate >> i & 1) == 1)
          ++count;
      ans = Math.max(ans, count);
    }

    return ans;    
};
