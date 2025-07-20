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
 * Finds the maximum product of any contiguous subarray using dynamic programming.
 * @param {number[]} nums - The input array of integers.
 * @return {number} - The maximum product.
 */
function maxProduct(nums) {
  // Edge case: if the array is empty, return 0 (though problem says nums.length >= 1)
  if (nums.length === 0) return 0;

  // Initialize variables to keep track of:
  // - maxProduct: maximum product up to the current element
  // - minProduct: minimum product up to the current element (to handle negative numbers)
  // - result: the overall maximum product found so far
  let maxProduct = nums[0];
  let minProduct = nums[0];
  let result = nums[0];

  // Iterate through the array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // Calculate the new maxProduct and minProduct:
    // - The new maxProduct is the maximum among:
    //   a) The current number itself (starting a new subarray)
    //   b) The product of maxProduct and current number (extending the positive product)
    //   c) The product of minProduct and current number (extending the negative product, which might flip to positive)
    const tempMax = Math.max(num, maxProduct * num, minProduct * num);

    // Similarly, the new minProduct is the minimum among:
    //   a) The current number itself (starting a new subarray)
    //   b) The product of maxProduct and current number (extending the positive product, which might become negative)
    //   c) The product of minProduct and current number (extending the negative product)
    minProduct = Math.min(num, maxProduct * num, minProduct * num);

    // Update maxProduct to the newly computed tempMax
    maxProduct = tempMax;

    // Update the overall result to be the maximum between the current result and the new maxProduct
    result = Math.max(result, maxProduct);
  }

  // Return the maximum product found
  return result;
}

// Example usage:
const nums2 = [2, 3, -2, 4];
console.log(maxProduct(nums2)); // Output: 6

//Approach 3: Optimized Two-Pass Approach -- Good approach

// Intuition:
// Zeros split the array into segments where we need to find the maximum product within each segment.
// Within a segment (no zeros), the maximum product is either:
// The product of the entire segment (if the number of negative numbers is even).
// The product up to the first negative number or from the last negative number onward (if the number of negative numbers is odd).
// Compute products from both left-to-right and right-to-left to handle all cases efficiently.

// Time Complexity: O(n), where n is the length of the array.
// Space Complexity: O(1), as we only use a few variables.

/**
 * Finds the maximum product of a contiguous subarray using two-pass approach.
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum product
 */
function maxProductTwoPass(nums) {
  if (!nums || nums.length === 0) return 0;

  // Initialize maximum product
  let maxProduct = nums[0];
  let forwardProduct = 1;
  let backwardProduct = 1;

  // Forward pass: compute product from left to right
  for (let i = 0; i < nums.length; i++) {
    forwardProduct *= nums[i];
    maxProduct = Math.max(maxProduct, forwardProduct);
    // Reset product if zero is encountered
    if (forwardProduct === 0) forwardProduct = 1;
  }

  // Backward pass: compute product from right to left
  for (let i = nums.length - 1; i >= 0; i--) {
    backwardProduct *= nums[i];
    maxProduct = Math.max(maxProduct, backwardProduct);
    // Reset product if zero is encountered
    if (backwardProduct === 0) backwardProduct = 1;
  }

  return maxProduct;
}

// Solved in one iteration
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let n = nums.length;
  if (!nums || nums.length === 0) return 0;

  // Initialize maximum product
  let maxProduct = nums[0];
  let prefixMultiplication = 1;
  let suffixMultiplication = 1;

  // Forward pass: compute product from left to right
  for (let i = 0; i < nums.length; i++) {
    // prefixMultiplication *= nums[i];
    // maxProduct = Math.max(maxProduct, prefixMultiplication);
    // Reset product if zero is encountered
    if (prefixMultiplication === 0) prefixMultiplication = 1;
    if (suffixMultiplication === 0) suffixMultiplication = 1;
    prefixMultiplication *= nums[i];
    suffixMultiplication *= nums[n - i - 1];
    maxProduct = Math.max(
      maxProduct,
      Math.max(prefixMultiplication, suffixMultiplication)
    );
  }

  // Backward pass: compute product from right to left
  // for (let i = nums.length - 1; i >= 0; i--) {
  //     suffixMultiplication *= nums[i];
  //     maxProduct = Math.max(maxProduct, suffixMultiplication);
  //     // Reset product if zero is encountered
  //     if (suffixMultiplication === 0) suffixMultiplication = 1;
  // }

  return maxProduct;
};

// Analysis: Can We Use Only the Forward Pass?
// The Optimized Two-Pass Approach computes the maximum product by:

// Forward Pass: Iterates left to right, maintaining a running product (forwardProduct), resetting it at zeros,
// and updating the global maximum product (maxProduct).

// Backward Pass: Iterates right to left, maintaining a running product (backwardProduct), resetting it at zeros, and updating maxProduct.

// The forward pass alone computes the product of all subarrays starting from the beginning of each segment (delimited by zeros) up to each position.
// However, the maximum product subarray may not always be captured by the forward pass alone, because:
// The maximum product subarray might end before the last negative number in a segment, and the forward pass may continue multiplying numbers
// that reduce the product.

// A subarray that excludes the first negative number (but includes later numbers) might yield a larger product, which the forward pass
// alone cannot capture without considering suffixes.

// To determine if the forward pass is sufficient, we need to check if it can always capture the maximum product subarray in all cases.
// If there’s a case where the maximum product subarray is missed by the forward pass but captured by the backward pass, then a single pass is insufficient.

// Example usage:
// nums = [3, -1, 4];
// Expected output: 4
// Output in Single Pass  => 3
