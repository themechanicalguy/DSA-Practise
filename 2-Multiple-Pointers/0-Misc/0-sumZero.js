/**
 * WAF called sumZero which accepts a sorted array of integers
 * The function should find the first pair where the sum is 0.
 * Return an array that includes both the values that sum to zero
 * or undefined if pair doesn't exists
 */

// Naive Approach

function naiveSumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

naiveSumZero([-3, -2, -1, 0, 1, 2, 3]);

// Refactored
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum < 0) {
      left++;
    } else {
      right++;
    }
  }
  return -1;
}
