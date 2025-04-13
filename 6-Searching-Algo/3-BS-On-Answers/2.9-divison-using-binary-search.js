//Given two integers one is a dividend and the other is the divisor,
//we need to find the quotient when the dividend is divided by the divisor without the use of any ” / “ and ” % “ operators.

// Function to find the quotient using binary search
function divide_binary_search(dividend, divisor) {
  if (divisor == 1) return dividend;

  if (divisor == -1) return -dividend;

  // Declaring and Initialising the variables.
  let low = 0,
    high = Math.abs(dividend),
    mid;

  // To store the Quotient.
  let quotient = 0;

  while (low <= high) {
    // Calculating mid.
    mid = low + ((high - low) >> 1);

    // To search in lower bound.
    if (Math.abs(mid * divisor) > Math.abs(dividend)) high = mid - 1;
    // To search in upper bound.
    else {
      quotient = mid;
      low = mid + 1;
    }
  }

  // Checking the parity and returning the Quotient.
  if ((dividend < 0 && divisor < 0) || (dividend > 0 && divisor > 0))
    return quotient;
  else return -quotient;
}

let dividend = 10,
  divisor = 2;

console.log("The Quotient is : " + divide_binary_search(dividend, divisor));
