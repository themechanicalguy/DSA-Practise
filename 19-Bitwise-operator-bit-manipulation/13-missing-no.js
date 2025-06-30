//LC-268
//Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
//Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?
// Example 1:
// Input: nums = [3,0,1]
// Output: 2
// Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
// Example 2:
// Input: nums = [0,1]
// Output: 2

//Approach 2: Using XOR (Bit Manipulation, Optimal)
/*

Explanation:

XOR cancels out duplicate numbers: A ⊕ A = 0
Compute XOR of all numbers from 0 to n, and XOR of all elements in nums.
The missing number is the XOR difference.

*/

function missingNumber(nums) {
  let xorAll = 0,
    xorNums = 0;
  let n = nums.length;

  for (let i = 0; i <= n; i++) {
    xorAll ^= i;
  }

  for (let num of nums) {
    xorNums ^= num;
  }

  return xorAll ^ xorNums;
}

// Example Usage:
console.log(missingNumber([3, 0, 1])); // Output: 2
console.log(missingNumber([0, 1])); // Output: 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // Output: 8
