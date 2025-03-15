//LC- 485. Max Consecutive Ones

function findMaxConsecutiveOnes(nums) {
  let left = 0,
    maxCount = 0,
    n = nums.length;

  while (left < n) {
    if (nums[left] === 1) {
      let right = left;
      while (right < n && nums[right] === 1) right++;
      maxCount = Math.max(maxCount, right - left);
      left = right;
    } else {
      left++;
    }
  }

  return maxCount;
}

// Example Usage:
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // Output: 2
