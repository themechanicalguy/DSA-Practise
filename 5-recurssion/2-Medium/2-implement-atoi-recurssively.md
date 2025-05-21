# LC- 8. String to Integer (atoi)

## Problem Understanding

The `myAtoi` function needs to convert a string to a 32-bit signed integer following specific rules that mimic the behavior of the C/C++ `atoi` function.

## Intuition and Approach

The key steps in solving this problem are:

1. **Skip leading whitespace**
2. **Handle optional sign character (+ or -)**
3. **Read digits until a non-digit is encountered or string ends**
4. **Convert the digits to a number**
5. **Clamp the number to the 32-bit signed integer range**

We'll explore three approaches:

1. **Iterative Approach** - Simple character-by-character processing
2. **Regular Expression Approach** - Using regex to extract the number
3. **Optimized Iterative Approach** - Early termination and efficient digit processing

## Approach 1: Iterative Approach

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let oput = ""; // Initialize an empty string to store digits

  // Loop through each character in the input string
  for (let i = 0; i < s.length; i++) {
    if (parseInt(s[i]) != NaN) {
      oput += s[i]; // Append the character regardless of whether it's a digit or not
    }
  }

  // Try to parse the collected string to integer, default to 0 if parsing fails
  let res = parseInt(oput) ? parseInt(oput) : 0;

  // Clamp the result to 32-bit signed integer range
  if (res > 2 ** 31 - 1) {
    return 2 ** 31 - 1;
  } else if (res < -1 * 2 ** 31 - 1) {
    return -1 * Math.pow(2, 31);
  } else {
    return res;
  }
};
```

### Time and Space Complexity

- **Time Complexity**: O(n) - We process each character at most once
- **Space Complexity**: O(1) - We use constant extra space

## Approach 2: Regular Expression Approach

```javascript
function myAtoi(s) {
  const match = s.trimStart().match(/^[+-]?\d+/);
  if (!match) return 0;

  const num = parseInt(match[0], 10);
  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = -Math.pow(2, 31);

  if (num > INT_MAX) return INT_MAX;
  if (num < INT_MIN) return INT_MIN;
  return num;
}
```

### Time and Space Complexity

- **Time Complexity**: O(n) - Regular expression matching is linear
- **Space Complexity**: O(1) - We use constant extra space (though regex may use some internally)

## Approach 3 - Recurssivel Approach

```javascript
/**
 * Converts a string to a 32-bit signed integer.
 * @param {string} s - Input string
 * @returns {number} - 32-bit signed integer
 */
function myAtoi(s) {
  const INT_MAX = 2 ** 31 - 1; // 2147483647
  const INT_MIN = -(2 ** 31); // -2147483648

  // Trim leading whitespace
  s = s.trim();

  // Handle empty string
  if (!s) return 0;

  let index = 0;
  let sign = 1;
  let result = 0;

  // Handle sign
  if (s[index] === "-" || s[index] === "+") {
    sign = s[index] === "-" ? -1 : 1;
    index++;
  }

  // Recursive helper function to process digits
  function parseDigits(index, currentNum) {
    // Base case: end of string or non-digit encountered
    if (index >= s.length || isNaN(parseInt(s[index]))) {
      return currentNum;
    }

    // Convert character to digit
    const digit = parseInt(s[index]);

    // Check for overflow before adding new digit
    if (
      currentNum > Math.floor(INT_MAX / 10) ||
      (currentNum === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    // Update number and recurse
    currentNum = currentNum * 10 + digit;
    return parseDigits(index + 1, currentNum);
  }

  // Start parsing digits
  result = parseDigits(index, 0);

  // Apply sign and return
  return sign * result;
}
```

## Edge Cases Covered

1. Leading whitespace (" 42")
2. Signs ("-42", "+42")
3. Overflow ("2147483648", "-91283472332")
4. Mixed characters ("4193 with words")
5. No valid digits ("words and 987")

The optimal approach (Approach 3) provides the best balance of readability and performance, with clear overflow checking and efficient digit processing.
