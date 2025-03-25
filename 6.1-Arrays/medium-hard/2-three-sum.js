//LC- 15 Three Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

/**
 * Finds all unique triplets in the array that sum to zero (Brute Force)
 * Time Complexity: O(n^3)
 * Space Complexity: O(n) for storing result
 * @param {number[]} nums - Array of integers
 * @return {number[][]} - Array of triplets that sum to zero
 */
function threeSumBruteForce(nums) {
  const result = [];
  const seenTriplets = new Set();
  const len = nums.length;

  // Iterate through all possible triplets
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      for (let k = j + 1; k < len; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          // Sort triplet to ensure uniqueness
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const tripletKey = triplet.join(",");

          // Add to result if not seen before
          if (!seenTriplets.has(tripletKey)) {
            seenTriplets.add(tripletKey);
            result.push(triplet);
          }
        }
      }
    }
  }

  return result;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length === 0) return [];
  let res = [];
  // Sort array to handle duplicates better
  nums.sort((a, b) => a - b);
  // Fix the first element and use two pointers for the remaining two
  for (let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        // Found a valid triplet
        res.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates for the left pointer
        while (nums[left] === nums[left + 1]) left++;
        // Skip duplicates for the right pointer
        while (nums[right] === nums[right - 1]) right--;
        // Move pointers
        left++;
        right--;
      } else if (sum < 0) {
        // If the sum is less than zero, move the left pointer to the right
        left++; // Need a larger sum
      } else {
        // If the sum is greater than zero, move the right pointer to the left
        right--; // Need a smaller sum
      }
    }
    while (nums[i] === nums[i + 1]) i++;
  }
  return res;
};
