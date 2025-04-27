//https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1
// Given an unsorted array arr of positive integers. One number a from the set [1, 2,....,n] is missing and one number b occurs twice in the array. Find numbers a and b.
// Note: The test cases are generated such that there always exists one missing and one repeating number within the range [1,n].
// Examples:
// Input: arr[] = [2, 2]
// Output: [2, 1]
// Explanation: Repeating number is 2 and smallest positive missing number is 1.

// Approach 1: Using Hash Map (Frequency Count)
function findMissingRepeating(nums) {
  const fMap = {};
  let res = new Array(2);
  for (let i = 0; i < nums.length; i++) {
    const arritem = nums[i];
    fMap[arritem] = (fMap[arritem] || 0) + 1;
  }
  for (let i = 1; i <= nums.length; i++) {
    let missing = !fMap[i];
    if (missing) {
      res[1] = i;
    }
    if (fMap[i] > 1) {
      res[0] = i;
    }
  }
  return res;
}

findMissingRepeating([3, 5, 4, 1, 1]);

//Approach 2: Using Mathematical Equations
function findMissingAndRepeating(nums) {
  const n = nums.length;

  // Calculate expected and actual sums
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);

  // Calculate expected and actual sum of squares
  const expectedSumSquares = (n * (n + 1) * (2 * n + 1)) / 6;
  const actualSumSquares = nums.reduce((sum, num) => sum + num * num, 0);

  // Differences
  const sumDiff = expectedSum - actualSum; // missing - repeating
  const sumSquaresDiff = expectedSumSquares - actualSumSquares; // missing² - repeating²

  // Solve the equations
  const missingPlusRepeating = sumSquaresDiff / sumDiff;

  const missingNumber = (sumDiff + missingPlusRepeating) / 2;
  const repeatingNumber = (missingPlusRepeating - sumDiff) / 2;

  return [repeatingNumber, missingNumber];
}

// Example usage
console.log(findMissingAndRepeating([2, 2])); // Output: [2, 1]
