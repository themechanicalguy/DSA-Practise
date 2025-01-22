/**
 * Problem Statement: Given an integer N, return all divisors of N.
 * A divisor of an integer N is a positive integer that divides N without leaving a remainder.
 * In other words, if N is divisible by another integer without any remainder, then that integer is considered a divisor of N.
 */

//Brute Force

function allDivisorBF(num) {
  let res = [];
  for (let i = 0; i <= num; i++) {
    if (num % i === 0) {
      res.push(i);
    }
  }
  return res;
}

//Optimized

function findDivisors(n) {
  // Initialize an empty
  // array to store the divisors
  let divisors = [];

  // Iterate up to the square
  // root of n to find divisors
  // Calculate the square root of n
  let sqrtN = Math.sqrt(n);

  // Loop from 1 to the
  // square root of n
  for (let i = 1; i <= sqrtN; ++i) {
    // Check if i divides n
    // without leaving a remainder
    if (n % i === 0) {
      // Add divisor i to the array
      divisors.push(i);

      // Add the counterpart divisor
      // if it's different from i
      if (i !== n / i) {
        // Add the counterpart
        // divisor to the array
        divisors.push(n / i);
      }
    }
  }

  // Return the array of divisors
  return divisors;
}
