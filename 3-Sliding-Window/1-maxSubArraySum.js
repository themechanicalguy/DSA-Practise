/**
 * WAF maxSubArraySum that accepts an array in integers and a number called n. The function should calculate the maximum
 * sum of n consecutive elements in the array
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
function maxSubArraySum(arr, n) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < n) return false;
  //getting the sum of first n numbers
  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  //checking for max sum in the whole array
  for (let i = n; i < arr.length; i++) {
    tempSum = tempSum - arr[i - n] + arr[i];
    maxSum = Math.max(tempSum, maxSum);
  }
  return maxSum;
}

maxSubArraySum([1, 2, 3, 2, 8, 1, 5], 2);
maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4);
maxSubArraySum([4, 2, 1, 6, 2], 4);
