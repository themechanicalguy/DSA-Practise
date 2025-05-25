// Problem Statement: Given two integers N1 and N2, find their greatest common divisor.
//The Greatest Common Divisor of any two integers is the largest number that divides both integers.

function findGcd(n1, n2) {
  // Initialize gcd to 1
  let gcd = 1;

  // Iterate from 1 up to the minimum of n1 and n2
  for (let i = 1; i <= Math.min(n1, n2); i++) {
    // Check if i is a common factor of both n1 and n2
    if (n1 % i === 0 && n2 % i === 0) {
      // Update gcd to the current common factor i
      gcd = i;
    }
  }

  // Return the greatest common divisor (gcd)
  return gcd;
}

//Time Complexity: O(min(N1, N2)) where N1 and N2 is the input number.

/**
 * Eulids Algorithm -  gcd(a,b) = gcd(a-b,b)
 */
function gcd(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;

  while (a > 0 && b > 0) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }
  return a === 0 ? b : a;
}

//Time Complexity: O(min(N1, N2)) where N1 and N2 is the input number.
