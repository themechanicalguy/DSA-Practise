// Problem Statement: Given an integer N, check whether it is prime or not. A prime number is a number that is only divisible by 1
// and itself and the total number of divisors is 2.

//Brute Force
function checkPrime(n) {
  // Initialize a counter variable to
  // count the number of factors.
  let cnt = 0;
  // Loop through numbers from 1 to n.
  for (let i = 1; i <= n; i++) {
    // If n is divisible by i
    // without any remainder.
    if (n % i === 0) {
      // Increment the counter.
      cnt = cnt + 1;
    }
  }

  // If the number of
  // factors is exactly 2.
  if (cnt === 2) {
    // Return true, indicating
    // that the number is prime.
    return true;
  }
  // If the number of
  // factors is not 2.
  else {
    // Return false, indicating
    // that the number is not prime.
    return false;
  }
}

//Optimized

function checkPrime(n) {
  // Initialize a counter variable to
  // count the number of factors.
  let cnt = 0;

  // Loop through numbers from 1
  // to the square root of n.
  for (let i = 1; i <= Math.sqrt(n); i++) {
    // If n is divisible by i
    // without any remainder.
    if (n % i === 0) {
      // Increment the counter.
      cnt = cnt + 1;

      // If n is not a perfect square,
      // count its reciprocal factor. ----check this condition
      if (i !== n / i) {
        cnt = cnt + 1;
      }
    }
  }

  // If the number of
  // factors is exactly 2.
  if (cnt === 2) {
    // Return true, indicating
    // that the number is prime.
    return true;
  }
  // If the number of
  // factors is not 2.
  else {
    // Return false, indicating
    // that the number is not prime.
    return false;
  }
}
