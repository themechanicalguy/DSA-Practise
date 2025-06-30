//Given an array arr[].
// Rotate the array to the left (counter-clockwise direction) by d steps, where d is a positive integer.
// Do the mentioned change in the array in place.
function rotateLeftExtraSpace(nums, k) {
  let n = nums.length;
  k = k % n; // Handle cases where k > n

  let temp = new Array(n); // Create a temporary array

  for (let i = 0; i < n; i++) {
    temp[i] = nums[(i + k) % n]; // Copy elements with shifted index
  }

  return temp; // Return new rotated array
}

// Example:
console.log(rotateLeftExtraSpace([1, 2, 3, 4, 5], 2)); // Output: [3, 4, 5, 1, 2]

function rotateLeftReverse(nums, k) {
  k = k % nums.length;

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  reverse(nums, 0, k - 1); // Reverse the first part
  reverse(nums, k, nums.length - 1); // Reverse the second part
  reverse(nums, 0, nums.length - 1); // Reverse the whole array

  return nums;
}
