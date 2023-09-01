/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {

    // Let f(i) := i's # of 1's in bitmask
    // f(i) = f(i / 2) + i % 2
    let ans = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; ++i)
      ans[i] = ans[Math.floor(i / 2)] + i % 2;

    return ans;
};
