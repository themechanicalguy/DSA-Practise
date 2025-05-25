// LC 7 Reverse Integer
// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
// Example 1:
// Input: x = 123
// Output: 321
// Example 2:
// Input: x = -123
// Output: -321
// Example 3:
// Input: x = 120
// Output: 21

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (nums) {
  let isNeg = false;
  let revNum = 0;
  if (nums < 0) {
    isNeg = true;
    nums = -1 * nums;
  }

  while (nums > 0) {
    let ld = nums % 10;
    revNum = revNum * 10 + ld;
    nums = Math.floor(nums / 10);
  }

  if (isNeg) revNum = revNum * -1;

  return revNum >= Math.pow(2, 31) - 1 || revNum <= Math.pow(-2, 31)
    ? 0
    : revNum;
};
