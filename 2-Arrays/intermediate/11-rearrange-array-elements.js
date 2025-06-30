//LC 2149 - Rearrange Array Elements by Sign

/*
You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers.

You should return the array of nums such that the the array follows the given conditions:

Every consecutive pair of integers have opposite signs.
For all integers with the same sign, the order in which they were present in nums is preserved.
The rearranged array begins with a positive integer.
Return the modified array after rearranging the elements to satisfy the aforementioned conditions.


*/

//Using 2 arrays
var rearrangeArray = function (nums) {
  const posArr = [];
  const negArr = [];
  for (let item of nums) {
    if (item < 0) negArr.push(item);
    else posArr.push(item);
  }

  let i = 0,
    j = 0;
  let k = 0;
  while (k < nums.length) {
    if (k % 2 === 0) {
      nums[k] = posArr[i];
      k++;
      i++;
    } else {
      nums[k] = negArr[j];
      k++;
      j++;
    }
  }

  return nums;
};

var rearrangeArray = function (nums) {
  // Separate positive and negative numbers into two arrays
  const positives = nums.filter((num) => num > 0);
  const negatives = nums.filter((num) => num < 0);

  // Create result array starting with positive
  const result = [];
  for (let i = 0; i < positives.length; i++) {
    result.push(positives[i]);
    result.push(negatives[i]);
  }

  return result;
};

//Approach 2: Single Pass with Two Pointers --Optimal

function rearrangeArray(nums) {
  // First, count positives to ensure we start with positive
  const result = new Array(nums.length);
  let posIndex = 0; // Index for positive numbers
  let negIndex = 1; // Index for negative numbers

  // Place all positives at even indices
  for (let num of nums) {
    if (num > 0) {
      result[posIndex] = num;
      posIndex += 2;
    }
  }

  // Place all negatives at odd indices
  for (let num of nums) {
    if (num < 0) {
      result[negIndex] = num;
      negIndex += 2;
    }
  }

  return result;
}
