//LC-128. Longest Consecutive Sequence

// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

// Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9

//Approach 1- Sorting Approach - O(n log n) Time Complexity (for comparison)

function longestConsecutiveSort(nums) {
  if (!nums.length) return 0;

  nums.sort((a, b) => a - b);
  let longest = 1;
  let current = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      if (nums[i] === nums[i - 1] + 1) {
        current++;
      } else {
        current = 1;
      }
      longest = Math.max(longest, current);
    }
  }

  return longest;
}

//Approach 2- HashSet and Sequence Building - O(n) Time Complexity

var longestConsecutive = function (nums) {
  // Create a Set from array to remove duplicates and enable O(1) lookup
  const numSet = new Set(nums);
  let longestSequence = 0;

  // Iterate through each number in the set
  for (const num of numSet) {
    // Only start checking sequence if num is the start of a sequence
    // (i.e., num-1 doesn't exist in set)
    if (!numSet.has(num - 1)) {
      let currentSequenceLen = 1;

      // Keep checking for consecutive numbers
      while (numSet.has(num + currentSequenceLen)) {
        currentSequenceLen++;
      }

      // Update longest sequence if current sequence is longer
      longestSequence = Math.max(longestSequence, currentSequenceLen);
    }
  }

  return longestSequence;
};

// Test
const nums1 = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutiveSequence(nums1)); // Output: 4
