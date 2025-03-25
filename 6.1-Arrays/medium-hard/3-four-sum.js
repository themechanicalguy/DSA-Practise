//LC- 18 4Sum
// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

/**
 * Finds all unique quadruplets in the array that sum to target (Brute Force)
 * Time Complexity: O(n^4)
 * Space Complexity: O(n) for storing result
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of quadruplets that sum to target
 */
function fourSumBruteForce(nums, target) {
  const result = [];
  const seenQuadruplets = new Set();
  const len = nums.length;

  // Iterate through all possible quadruplets
  for (let a = 0; a < len - 3; a++) {
    for (let b = a + 1; b < len - 2; b++) {
      for (let c = b + 1; c < len - 1; c++) {
        for (let d = c + 1; d < len; d++) {
          if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
            // Sort quadruplet to ensure uniqueness
            const quadruplet = [nums[a], nums[b], nums[c], nums[d]].sort(
              (x, y) => x - y
            );
            const quadrupletKey = quadruplet.join(",");

            // Add to result if not seen before
            if (!seenQuadruplets.has(quadrupletKey)) {
              seenQuadruplets.add(quadrupletKey);
              result.push(quadruplet);
            }
          }
        }
      }
    }
  }

  return result;
}

/**
 * Finds all unique quadruplets in the array that sum to target (Two Pointers)
 * Time Complexity: O(n^3)
 * Space Complexity: O(1) or O(n) depending on sorting implementation
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of quadruplets that sum to target
 */
function fourSumTwoPointers(nums, target) {
  const result = [];
  const len = nums.length;

  // Sort the array first
  nums.sort((x, y) => x - y);

  // Fix first two elements, use two pointers for the remaining two
  for (let a = 0; a < len - 3; a++) {
    // Skip duplicates for first element

    for (let b = a + 1; b < len - 2; b++) {
      // Skip duplicates for second element

      let left = b + 1;
      let right = len - 1;

      while (left < right) {
        const sum = nums[a] + nums[b] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[a], nums[b], nums[left], nums[right]]);

          // Skip duplicates for left pointer
          while (left < right && nums[left] === nums[left + 1]) left++;
          // Skip duplicates for right pointer
          while (left < right && nums[right] === nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum < target) {
          left++; // Need a larger sum
        } else {
          right--; // Need a smaller sum
        }
      }
      while (nums[b] === nums[b + 1]) b++;
    }
    while (nums[a] === nums[a + 1]) a++;
  }

  return result;
}
