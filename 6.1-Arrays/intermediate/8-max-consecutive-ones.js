//LC-485. Max Consecutive Ones

//Approach 1: Iterative Count (Optimal)
function findMaxConsecutiveOnes(nums) {
  let maxCount = 0,
    currentCount = 0;

  for (let num of nums) {
    if (num === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }

  return maxCount;
}

// Example Usage:
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // Output: 2

//Approach 3: Using split() and map()
function findMaxConsecutiveOnes(nums) {
  return Math.max(
    ...nums
      .join("")
      .split("0")
      .map((ones) => ones.length),
    0
  );
}

// Example Usage:
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // Output: 2

//Approach 4: Using Two-Pointer Technique

function findMaxConsecutiveOnes(nums) {
  let start = 0,
    maxCount = 0,
    n = nums.length;

  while (start < n) {
    if (nums[start] === 1) {
      let end = start;
      while (end < n && nums[end] === 1) end++;
      maxCount = Math.max(maxCount, end - start);
      start = end;
    } else {
      start++;
    }
  }

  return maxCount;
}

// Example Usage:
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // Output: 2
