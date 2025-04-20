// LC-179
/**
Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
Since the result may be very large, so you need to return a string instead of an integer.
Example 1:
Input: nums = [10,2]
Output: "210"
Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"
*/

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  let res = nums.map((item) => String(item));

  res.sort((a, b) => {
    let t1 = a + b;
    let t2 = b + a;
    return t2 - t1;
    // return t2 - t1;
  });
  if (res[0] === "0") return "0";

  return res.join("");
};
