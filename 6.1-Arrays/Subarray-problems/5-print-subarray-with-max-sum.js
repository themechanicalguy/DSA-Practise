//https://www.geeksforgeeks.org/print-the-maximum-subarray-sum/
//Print subarray with maximum sum
// Given an array arr[], the task is to print the subarray having maximum sum.

// Examples:

// Input: arr[] = {2, 3, -8, 7, -1, 2, 3}
// Output: 11
// Explanation: The subarray {7, -1, 2, 3} has the largest sum 11.

// Input: arr[] = {-2, -5, 6, -2, -3, 1, 5, -6}
// Output: {6, -2, -3, 1, 5}
// Explanation: The subarray {6, -2, -3, 1, 5} has the largest sum of 7.

// Function to find the subarray with maximum sum
function maxSumSubarray(arr) {
  // start and end of max sum subarray
  let resStart = 0,
    resEnd = 0;

  // Initialize the maximum subarray sum with the first element
  let maxSum = arr[0];

  for (let i = 0; i < arr.length; i++) {
    // Initialize current subarray sum with 0
    let currSum = 0;
    for (let j = i; j < arr.length; j++) {
      currSum += arr[j];

      // If current subarray has greater sum than maximum sum subarray,
      // then update the start and end of maximum sum subarray
      if (currSum > maxSum) {
        maxSum = currSum;
        resStart = i;
        resEnd = j;
      }
    }
  }

  let res = [];
  for (let i = resStart; i <= resEnd; i++) res.push(arr[i]);
  return res;
}

// Example usage
const arr = [2, 3, -8, 7, -1, 2, 3];
const res = maxSumSubarray(arr);

console.log(res.join(" "));

//Kadanes algorithm - Most Optimal---------------------------------------------------------------------------------------------
function maxSubarrayKadane(arr) {
  let maxSoFar = arr[0],
    maxEndingHere = arr[0];
  let start = 0,
    end = 0,
    tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxEndingHere + arr[i]) {
      maxEndingHere = arr[i];
      tempStart = i;
    } else {
      maxEndingHere += arr[i];
    }

    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
    }
  }

  return arr.slice(start, end + 1);
}

// Example usage:
console.log(maxSubarrayKadane([2, 3, -8, 7, -1, 2, 3])); // Output: [7, -1, 2, 3]
