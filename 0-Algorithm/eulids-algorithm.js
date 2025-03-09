//Eulids Algorithm
//The Euclidean algorithm is a method for finding the greatest common divisor of two numbers.
//The algorithm is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number.
//The algorithm is as follows:
//If a = 0, then the greatest common divisor is b.
//If b = 0, then the greatest common divisor is a.
//Otherwise, repeatedly subtract the smaller number from the larger number until both numbers are equal.
//The greatest common divisor is the result.
//The time complexity of the Euclidean algorithm is O(log(min(a, b))).
//The space complexity of the Euclidean algorithm is O(1).

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
