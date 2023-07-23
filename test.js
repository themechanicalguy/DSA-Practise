/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  //init a maxCount as 0
  let maxCount = 0;
  //start a loop from 0 to n
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);
    if (nums[i] === 1) {
      count++; //3
      maxCount = Math.max(count, maxCount); //3
      // console.log(count, maxCount);
    } else {
      count = 0;
    }
  }
  // return maxCount;
  //check if current element is 1, then increase count and set maxCount
  //if it is zero, then make count 0
  //return maxCount
};
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
