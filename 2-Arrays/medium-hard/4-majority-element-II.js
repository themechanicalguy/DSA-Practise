//LC-229 Majority Element II
//Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.
//Follow-up: Could you solve the problem in linear time and in O(1) space?
//Example 1:
//Input: nums = [3,2,3]
//Output: [3]
//Example 2:
//Input: nums = [1]
//Output: [1]
//Example 3:
//Input: nums = [1,2]
//Output: [1,2]
//Constraints:  1 <= nums.length <= 5 * 104  -109 <= nums[i] <= 109

//Approach 1: Hash Map (Frequency Counting)

function majorityElementHashMap(nums) {
  const n = nums.length;
  const threshold = Math.floor(n / 3); // Calculate threshold (⌊n/3⌋)
  const frequencyMap = new Map(); // To store element frequencies
  const result = [];

  // Count frequency of each element
  for (let num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Check which elements exceed the threshold
  for (let [num, count] of frequencyMap) {
    if (count > threshold) {
      result.push(num);
    }
  }

  return result;
}
//Approach 2: Boyer-Moore Voting Algorithm (Extended for ⌊n/3⌋)

function majorityElementBoyerMoore(nums) {
  const n = nums.length;
  const threshold = Math.floor(n / 3); // Threshold for majority
  let candidate1 = null,
    candidate2 = null; // Two possible candidates
  let count1 = 0,
    count2 = 0; // Counters for candidates

  // First pass: Find potential candidates
  for (let num of nums) {
    if (candidate1 === num) {
      count1++;
    } else if (candidate2 === num) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  // Second pass: Count actual frequencies of candidates
  count1 = 0;
  count2 = 0;
  for (let num of nums) {
    if (num === candidate1) count1++;
    if (num === candidate2) count2++;
  }

  // Check which candidates exceed threshold
  const result = [];
  if (count1 > threshold) result.push(candidate1);
  if (count2 > threshold && candidate2 !== candidate1) result.push(candidate2);

  return result;
}
