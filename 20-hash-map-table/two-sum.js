//LC 1 Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.
// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Output: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

/**
 * Finds indices of two numbers in nums that add up to target using brute force.
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of the two numbers
 */
function twoSumBruteForce(nums, target) {
  // Iterate through each element
  for (let firstIndex = 0; firstIndex < nums.length; firstIndex++) {
    // Check each subsequent element for a pair
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < nums.length;
      secondIndex++
    ) {
      // If pair sums to target, return their indices
      if (nums[firstIndex] + nums[secondIndex] === target) {
        return [firstIndex, secondIndex];
      }
    }
  }
  // No solution found (though problem guarantees one exists)
  return [];
}

function twoSumTwoPassHash(nums, target) {
  // Create a hash table (object) to store numbers and their indices
  const numToIndexMap = {};

  // First pass: Populate the hash table
  for (let i = 0; i < nums.length; i++) {
    numToIndexMap[nums[i]] = i;
  }

  // Second pass: Check for the complement
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    // Check if the complement exists in the hash table and it's not the same element
    if (
      numToIndexMap.hasOwnProperty(complement) &&
      numToIndexMap[complement] !== i
    ) {
      return [i, numToIndexMap[complement]];
    }
  }

  // If no solution is found, return an empty array
  return [];
}

// Example usage:
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSumTwoPassHash(nums, target)); // Output: [0, 1]
