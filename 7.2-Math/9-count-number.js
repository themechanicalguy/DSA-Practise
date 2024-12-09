// Problem Statement: Given an integer N, return the number of digits in N.

//Brute Force
function countDigits(n) {
  // Initialize a counter variable 'cnt' to store the count of digits.
  let cnt = 0;
  // While loop iterates until 'n' becomes 0 (no more digits left).
  while (n > 0) {
    // Increment the counter for each digit encountered.
    cnt = cnt + 1;
    // Divide 'n' by 10 to remove the last digit.
    n = Math.floor(n / 10);
  }
  // Return the count of digits.
  return cnt;
}

//Time Complexity: O(log10N + 1) where N is the input number.
// The time complexity is determined by the number of digits in the input integer N.
// In the worst case when N is a multiple of 10 the number of digits in N is log10N + 1.

//Optimzed Approach
function countDigits(n) {
  // Initialize a variable 'cnt' to store the count of digits.
  let count = Math.floor(Math.log10(n) + 1);

  // The expression Math.floor(Math.log10(n) + 1) calculates the number of digits in 'n'
  // and rounds it down to the nearest whole number.

  // Adding 1 to the result accounts for the case when 'n' is a power of 10, ensuring that the count is correct.

  // Return the count of digits in 'n'.
  return count;
}

let N = 329823;
console.log("N: " + N);
let digits = countDigits(N);
console.log("Number of Digits in N: " + digits);

//Time Complexity: O(1)as simple arithmetic operations in constant time are computed on integers.
