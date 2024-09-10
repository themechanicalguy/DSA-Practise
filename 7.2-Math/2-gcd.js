// FInd the gcd of 2 numbers

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
