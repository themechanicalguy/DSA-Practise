//Problem Statement: Given an integer N return the reverse of the given number.
//Note: If a number has trailing zeros, then its reverse will not include them. For e.g., reverse of 10400 will be 401 instead of 00401.

function reverse(num) {
  let revNum = 0;
  // Start a while loop to reverse the digits of the input integer.
  let n = num;
  while (n > 0) {
    // Extract the last digit of 'n' and store it in 'ld'.
    let ld = n % 10;
    // Multiply the current reverse number by 10 and add the last digit.
    revNum = revNum * 10 + ld;
    // Remove the last digit from 'n'.
    n = Math.floor(n / 10);
  }

  return n;
}
