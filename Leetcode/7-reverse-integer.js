// https://leetcode.com/problems/reverse-integer/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let ans = 0
    let sign = x < 0 ? -1 : 1;
    x *= sign

    while (x) {
      ans = ans * 10 + x % 10;
      x = parseInt(x / 10);
    }

    return (ans < (-1) * (2**31) || ans > 2**31 - 1) ? 0 : sign * ans;
};