//LC 8 Strings to Integer (atoi)
// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).
// The algorithm for myAtoi(string s) is as follows:
// 1. Read in and ignore any leading whitespace.
// 2. Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character if it is either.
// 3. Convert the characters following the '-' or '+' as long as the next character is a digit. Stop when the next character is not a digit.
// 4. The resulting number should be represented as a string of digits.
// 5. If no digits were read, then the integer is 0.
// 6. The sign should be determined by the preceding '-' or '+' character (if present).
// 7. If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range.

//Approach 1: Iterative Character Processing
function myAtoi(s) {
  let index = 0;
  let sign = 1;
  let result = 0;
  const n = s.length;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  // 1. Skip leading whitespace
  while (index < n && s[index] === " ") {
    index++;
  }

  // 2. Handle optional sign
  if (index < n && (s[index] === "+" || s[index] === "-")) {
    sign = s[index] === "-" ? -1 : 1;
    index++;
  }

  // 3. Convert digits to number
  while (index < n && s[index] >= "0" && s[index] <= "9") {
    const digit = s.charCodeAt(index) - "0".charCodeAt(0);

    // Check for overflow before adding the new digit
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    index++;
  }

  // 4. Apply sign and clamp
  result *= sign;
  return Math.max(INT_MIN, Math.min(INT_MAX, result));
}
