//LC-300 -Longest Increasing Subsequence
//Recurssive approach
//--------------------This solution will not work
var lengthOfLISWr = function (nums) {
  let n = nums.length;
  let i = 0;

  const solve = (i) => {
    if (i >= n) return 0;
    let pick = 0;
    if (i === 0 || nums[i] > nums[i - 1]) {
      pick = 1 + solve(i + 1);
    }
    let unPick = solve(i + 1);
    return Math.max(pick, unPick);
  };

  return solve(0);
};

var lengthOfLISRecr = function (nums) {
  let n = nums.length;

  const solve = (curr, prev) => {
    if (curr >= n) return 0;
    let pick = 0;
    if (prev === -1 || nums[curr] > nums[prev]) {
      pick = 1 + solve(curr + 1, curr);
    }
    let unPick = solve(curr + 1, prev);
    return Math.max(pick, unPick);
  };

  return solve(0, -1);
};

//memo

var lengthOfLISMemo = function (nums) {
  let n = nums.length;
  let dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));

  const solve = (curr, prev) => {
    if (curr >= n) return 0;
    if (dp[curr][prev + 1] !== -1) return dp[curr][prev + 1];
    let pick = 0;
    if (prev === -1 || nums[curr] > nums[prev]) {
      pick = 1 + solve(curr + 1, curr);
    }
    let unPick = solve(curr + 1, prev);
    let ans = Math.max(pick, unPick);
    return (dp[curr][prev + 1] = ans);
  };

  return solve(0, -1);

  // return dp[0,n-1];
};

//Tabulation - 1D array

function lengthOfLIS(nums) {
  if (!nums.length) return 0;

  // Create a dp table where dp[i] represents the length of the longest
  // increasing subsequence that ends at index i
  const dp = new Array(nums.length).fill(1);

  // Fill the table bottom-up
  for (let i = 0; i < nums.length; i++) {
    // For each position, look at all previous positions
    for (let j = 0; j < i; j++) {
      // If we find a smaller number before current position
      if (nums[j] < nums[i]) {
        // Update dp[i] if including nums[j] gives a longer sequence
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // Return the maximum value in the dp table
  return Math.max(...dp);
}

//Tabulation - 2D array

// Test case
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // Output: 4

//Space optimization
if (!nums.length) return 0;

// dp[i] represents the length of the longest increasing subsequence
// that ends with nums[i]
const dp = new Array(nums.length).fill(1);

// Keep track of maximum length found so far
let maxLength = 1;

// For each position, look back at all previous positions
for (let i = 1; i < nums.length; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[i] > nums[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  maxLength = Math.max(maxLength, dp[i]);
}

return maxLength;

//Most optimized approach -- Using binary search

function lengthOfLIS(nums) {
  if (!nums.length) return 0;

  // dp array will store the smallest tail of all increasing subsequences
  // of different lengths
  const dp = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > dp[dp.length - 1]) {
      // If current number is larger than the largest tail,
      // we can extend the longest subsequence
      dp.push(nums[i]);
    } else {
      // Find the position where we can replace a number
      // with the current number to maintain increasing order
      const position = binarySearch(dp, nums[i]);
      dp[position] = nums[i];
    }
  }

  return dp.length;
}

// Binary search helper function to find the position
// where target should be inserted/replaced
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

// Test case
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // Output: 4
