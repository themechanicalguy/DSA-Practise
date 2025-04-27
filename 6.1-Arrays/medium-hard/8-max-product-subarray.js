//LC 152. Maximum Product Subarray
// Given an integer array nums, find a subarray that has the largest product, and return the product.
// The test cases are generated so that the answer will fit in a 32-bit integer.
// Example 1:
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.

//Approach 1. Brute Force Solution

/**
 * Finds the maximum product of any subarray using brute force
 * @param {number[]} nums - The input array
 * @return {number} - The maximum product found
 */
function maxProductBruteForce(nums) {
  if (nums.length === 0) return 0;

  let maxProduct = nums[0];

  for (let i = 0; i < nums.length; i++) {
    let currentProduct = 1;
    for (let j = i; j < nums.length; j++) {
      currentProduct *= nums[j];
      maxProduct = Math.max(maxProduct, currentProduct);
    }
  }

  return maxProduct;
}

// Example usage:
const nums = [2, 3, -2, 4];
console.log(maxProductBruteForce(nums)); // Output: 6

//Approach 2. Dynamic Programming
/**
 * Finds the maximum product of any subarray using dynamic programming
 * @param {number[]} nums - The input array
 * @return {number} - The maximum product found
 */
function maxProduct(nums) {
  if (nums.length === 0) return 0;

  let maxProductSoFar = nums[0];
  let minProductSoFar = nums[0];
  let result = maxProductSoFar;

  for (let i = 1; i < nums.length; i++) {
    const currentNum = nums[i];

    // Calculate new max and min considering current number
    const tempMax = Math.max(
      currentNum,
      currentNum * maxProductSoFar,
      currentNum * minProductSoFar
    );

    minProductSoFar = Math.min(
      currentNum,
      currentNum * maxProductSoFar,
      currentNum * minProductSoFar
    );

    maxProductSoFar = tempMax;

    // Update the overall result
    result = Math.max(result, maxProductSoFar);
  }

  return result;
}

// Example usage:
const nums2 = [2, 3, -2, 4];
console.log(maxProduct(nums2)); // Output: 6
