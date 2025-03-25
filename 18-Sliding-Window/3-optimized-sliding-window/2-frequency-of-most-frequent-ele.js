//LC-1838 : Frequency of the Most Frequent Element
//https://leetcode.com/problems/frequency-of-the-most-frequent-element/
//TC: O(NlogN)
//SC: O(1)

//Bruce Force Approach
//Time Complexity: O(N^2)
//Space Complexity: O(1)
//below code is not working for all test cases Wrong Answer 9 / 73 testcases passed
var maxFrequency = function (nums, k) {
  let n = nums.length;
  let maxFreq = 0;

  for (let i = 0; i < n; i++) {
    let target = nums[i];
    let remainingK = k;
    let freq = 1;

    for (let j = 0; j < n; j++) {
      //Because you will try to make all equal to i, nums[i] so i !== j condition is added
      if (i !== j && nums[j] <= target) {
        let diff = target - nums[j];
        if (diff <= remainingK) {
          remainingK -= diff;
          freq++;
        }
      }
    }
    maxFreq = Math.max(maxFreq, freq);
  }

  return maxFreq;
};

//Sliding Window
function maxFrequency(nums, k) {
  //Sorting helps because we want to make elements equal to a larger number, so grouping similar numbers together makes sense.
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let left = 0;
  let right = 0;
  let sum = 0;
  let res = 0;
  //We try to expand a window (subarray) that contains numbers we can make equal using at most 𝑘 k operations.
  while (right < n) {
    sum += nums[right];
    //If the sum to make all elements in the window equal to nums[right] exceeds  𝑘 k, then shrink the window lrft++.
    while ((right - left + 1) * nums[right] - sum > k) {
      sum -= nums[left];
      //The left boundary (left) moves forward if we exceed the allowed 𝑘 k operations.
      left++;
    }
    res = Math.max(res, right - left + 1);
    // The right boundary (right) keeps expanding.
    right++;
  }
  return res;
}

// using for loop

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxFrequency(nums, k) {
  // Sort the array to make it easier to calculate the required operations
  nums.sort((a, b) => a - b);

  let maxFrequency = 1; // Initialize the maximum frequency
  let left = 0; // Left pointer of the sliding window
  let currentSum = 0; // Sum of elements in the current window

  // Iterate through the array with the right pointer
  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right]; // Add the current element to the sum

    // Calculate the number of operations needed to make all elements in the window equal to nums[right]
    // The number of operations is: (nums[right] * windowSize) - currentSum
    // If the number of operations exceeds k, move the left pointer to the right
    while (nums[right] * (right - left + 1) - currentSum > k) {
      currentSum -= nums[left]; // Remove the leftmost element from the sum
      left++; // Move the left pointer to the right
    }

    // Update the maximum frequency if the current window size is larger
    maxFrequency = Math.max(maxFrequency, right - left + 1);
  }

  return maxFrequency;
}

// Example usage:
const nums = [1, 2, 4];
const k = 5;
console.log(maxFrequency(nums, k)); // Output: 3
