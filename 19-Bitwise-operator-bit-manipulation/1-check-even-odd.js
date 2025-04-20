function isEven(number) {
  // Using bitwise AND with 1
  // If number & 1 is 0, it's even
  // If number & 1 is 1, it's odd
  return (number & 1) === 0;
}

// Example usage
console.log(isEven(4)); // true (even)
console.log(isEven(7)); // false (odd)
console.log(isEven(0)); // true (even)
console.log(isEven(-2)); // true (even)

//Explanation:
// The bitwise AND (&) operation checks the least significant bit (LSB) of the number.
// For even numbers, the LSB is 0 (e.g., 4 is 100 in binary, 4 & 1 = 0).
// For odd numbers, the LSB is 1 (e.g., 7 is 111 in binary, 7 & 1 = 1).
// This method is more efficient than using modulo (number % 2).
