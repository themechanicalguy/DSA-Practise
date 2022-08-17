/**
 * Pattern used to explain Sliding Window Pattern
 *
 * WAF maxSubArraySum that accepts an ARRAY in integers and a number called N.
 * The function should calculate the maximum sum of N consecutive elements in the array
 */

// Naive Approach
function maxSubArraySum(arr, n) {
  if (arr.length < n) {
    return false;
  }
  let maxSum = Number.MIN_VALUE;
  for (let i = 0; i < arr.length - n + 1; i++) {
    let tempSum = 0;
    for (let j = 0; j < n; j++) {
      tempSum = tempSum + arr[i + j];
    }
    if (tempSum > maxSum) {
      maxSum = tempSum;
    }
  }
  return maxSum;
}

// Refactor
function maxSubArraySum(arr, N) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < N) return false;
  //getting the sum of first N numbers
  for (let i = 0; i < N; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  //checking for max sum in the whole array
  for (let i = N; i < arr.length; i++) {
    // substract previous number and add the next number
    tempSum = tempSum - arr[i - N] + arr[i];
    // assign maximum to maxSum
    maxSum = Math.max(tempSum, maxSum);
  }
  return maxSum;
}

maxSubArraySum([1, 2, 3, 2, 8, 1, 5], 2);
maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4);
maxSubArraySum([4, 2, 1, 6, 2], 4);
