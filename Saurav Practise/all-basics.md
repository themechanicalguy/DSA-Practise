# Learn Basic Math

# Count Digits

## Problem Understanding

We need to count the number of digits in a given integer `n`. The number 0 should return 1 digit.

## Approach 1: String Conversion (Most Intuitive)

```javascript
/**
 * Approach 1: Convert to string and get length
 * Intuition: Convert the number to a string and simply return its length
 * Time Complexity: O(d) where d is the number of digits
 * Space Complexity: O(d) for the string representation
 */
function countDigitsString(n) {
  // Handle negative numbers by taking absolute value
  const absoluteN = Math.abs(n);
  // Convert to string and get length
  return absoluteN.toString().length;
}
```

## Approach 2: Mathematical Approach (Optimal)

```javascript
/**
 * Approach 2: Mathematical approach using logarithm
 * Intuition: Use the mathematical property that floor(log10(n)) + 1 gives the number of digits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function countDigitsLogarithm(n) {
  // Handle the special case of 0
  if (n === 0) return 1;

  // Handle negative numbers
  const absoluteN = Math.abs(n);

  // Math.floor(Math.log10(absoluteN)) gives (number of digits - 1)
  // Adding 1 gives the actual number of digits
  return Math.floor(Math.log10(absoluteN)) + 1;
}
```

## Approach 3: Iterative Division

```javascript
/**
 * Approach 3: Iterative division by 10
 * Intuition: Repeatedly divide the number by 10 until it becomes 0, counting each division
 * Time Complexity: O(d) where d is the number of digits
 * Space Complexity: O(1)
 */
function countDigitsIterative(n) {
  // Handle 0 as a special case
  if (n === 0) return 1;

  let count = 0;
  let number = Math.abs(n); // Handle negative numbers

  // Keep dividing by 10 until number becomes 0
  while (number > 0) {
    number = Math.floor(number / 10);
    count++;
  }

  return count;
}
```

## Approach 4: Recursive Approach

```javascript
/**
 * Approach 4: Recursive division
 * Intuition: Similar to iterative approach but using recursion
 * Time Complexity: O(d) where d is the number of digits
 * Space Complexity: O(d) for the recursion stack
 */
function countDigitsRecursive(n) {
  // Handle negative numbers and base case
  const absoluteN = Math.abs(n);

  // Base case: if number is less than 10, it has 1 digit
  if (absoluteN < 10) {
    return 1;
  }

  // Recursive case: divide by 10 and add 1
  return 1 + countDigitsRecursive(Math.floor(absoluteN / 10));
}
```

## Complexity Analysis

| Approach          | Time Complexity | Space Complexity | Best For           |
| ----------------- | --------------- | ---------------- | ------------------ |
| String Conversion | O(d)            | O(d)             | Readability        |
| Logarithm         | O(1)            | O(1)             | Performance        |
| Iterative         | O(d)            | O(1)             | Memory efficiency  |
| Recursive         | O(d)            | O(d)             | Learning recursion |

Where `d` is the number of digits in the number.

## Dry Run of Optimal Approach (Logarithm Method)

Let's trace through the optimal mathematical approach with 3 examples:

### Example 1: n = 4

```
n = 4
absoluteN = Math.abs(4) = 4
Math.log10(4) ≈ 0.602
Math.floor(0.602) = 0
0 + 1 = 1
Output: 1 ✓
```

### Example 2: n = 14

```
n = 14
absoluteN = Math.abs(14) = 14
Math.log10(14) ≈ 1.146
Math.floor(1.146) = 1
1 + 1 = 2
Output: 2 ✓
```

### Example 3: n = 0 (Edge Case)

```
n = 0
Check: n === 0? Yes
Return: 1 ✓
```

### Example 4: n = -456 (Negative Number)

```
n = -456
absoluteN = Math.abs(-456) = 456
Math.log10(456) ≈ 2.659
Math.floor(2.659) = 2
2 + 1 = 3
Output: 3 ✓
```

# LC 7. Reverse Integer

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

## Intuition

The problem requires reversing the digits of a signed 32-bit integer while handling:

1. **Negative numbers** - preserve the sign but reverse the digits
2. **Trailing zeros** - should be removed when reversed
3. **Integer overflow** - if reversed number exceeds 32-bit range, return 0
4. **Environment constraint** - cannot use 64-bit integers

## Approach 3: Optimized Mathematical with Early Exit

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (nums) {
  let isNeg = false;
  let revNum = 0;
  if (nums < 0) {
    isNeg = true;
    nums = -1 * nums;
  }

  while (nums > 0) {
    let ld = nums % 10;
    revNum = revNum * 10 + ld;
    nums = Math.floor(nums / 10);
  }

  if (isNeg) revNum = revNum * -1;

  return revNum >= Math.pow(2, 31) - 1 || revNum <= Math.pow(-2, 31)
    ? 0
    : revNum;
};
```

- **Time Complexity**: O(log₁₀(n)) - Same as approach 1
- **Space Complexity**: O(1) - Constant space

## Dry Run of Optimal Approach (Approach 1)

### Example 1: x = 123

```
Iteration 1:
  x = 123, reversed = 0
  lastDigit = 123 % 10 = 3
  x = Math.trunc(123 / 10) = 12
  reversed = 0 * 10 + 3 = 3

Iteration 2:
  x = 12, reversed = 3
  lastDigit = 12 % 10 = 2
  x = Math.trunc(12 / 10) = 1
  reversed = 3 * 10 + 2 = 32

Iteration 3:
  x = 1, reversed = 32
  lastDigit = 1 % 10 = 1
  x = Math.trunc(1 / 10) = 0
  reversed = 32 * 10 + 1 = 321

Result: 321
```

### Example 2: x = -123

```
Iteration 1:
  x = -123, reversed = 0
  lastDigit = -123 % 10 = -3
  x = Math.trunc(-123 / 10) = -12
  reversed = 0 * 10 + (-3) = -3

Iteration 2:
  x = -12, reversed = -3
  lastDigit = -12 % 10 = -2
  x = Math.trunc(-12 / 10) = -1
  reversed = -3 * 10 + (-2) = -32

Iteration 3:
  x = -1, reversed = -32
  lastDigit = -1 % 10 = -1
  x = Math.trunc(-1 / 10) = 0
  reversed = -32 * 10 + (-1) = -321

Result: -321
```

### Example 3: x = 120

```
Iteration 1:
  x = 120, reversed = 0
  lastDigit = 120 % 10 = 0
  x = Math.trunc(120 / 10) = 12
  reversed = 0 * 10 + 0 = 0

Iteration 2:
  x = 12, reversed = 0
  lastDigit = 12 % 10 = 2
  x = Math.trunc(12 / 10) = 1
  reversed = 0 * 10 + 2 = 2

Iteration 3:
  x = 1, reversed = 2
  lastDigit = 1 % 10 = 1
  x = Math.trunc(1 / 10) = 0
  reversed = 2 * 10 + 1 = 21

Result: 21
```

### Edge Case: x = 1534236469 (would overflow)

```
This number when reversed becomes 9646324351 which is > INT_MAX
The algorithm detects overflow during the iteration and returns 0
```

# LC 9. Palindrome Number

## Problem Understanding

A palindrome number reads the same forwards and backwards. We need to check if a given integer satisfies this property.

**Key Observations:**

- Negative numbers cannot be palindromes (due to the '-' sign)
- Single-digit numbers are always palindromes
- Numbers ending with 0 (except 0 itself) cannot be palindromes

---

## Approach 1: Convert to String (Most Intuitive)

### Intuition

Convert the number to a string and check if it reads the same forwards and backwards.

```javascript
/**
 * Check if number is palindrome by converting to string
 * @param {number} x - The number to check
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindromeString(x) {
  // Negative numbers and numbers ending with 0 (except 0) cannot be palindromes
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  // Convert to string and check if it reads the same forwards and backwards
  const numStr = x.toString();
  return numStr === numStr.split("").reverse().join("");
}
```

**Time Complexity:** O(n) where n is number of digits  
**Space Complexity:** O(n) for storing the string

---

## Approach 2: Two Pointers on String

### Intuition

Use two pointers to compare characters from start and end without reversing the entire string.

```javascript
/**
 * Check palindrome using two pointers on string representation
 * @param {number} x - The number to check
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindromeTwoPointers(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  const numStr = x.toString();
  let left = 0;
  let right = numStr.length - 1;

  while (left < right) {
    if (numStr[left] !== numStr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

---

## Approach 3: Mathematical Reversal (Optimal)

### Intuition

Reverse the number mathematically and compare with original. We only need to reverse half of the number to avoid overflow.

```javascript
/**
 * Optimal solution - Reverse half of the number mathematically
 * @param {number} x - The number to check
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindromeOptimal(x) {
  // Edge cases: negative numbers and numbers ending with 0 (except 0)
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  // Single digit numbers are always palindromes
  if (x >= 0 && x < 10) {
    return true;
  }

  let reversedHalf = 0;
  let originalNumber = x;

  // Reverse only half of the number
  while (originalNumber > reversedHalf) {
    const lastDigit = originalNumber % 10;
    reversedHalf = reversedHalf * 10 + lastDigit;
    originalNumber = Math.floor(originalNumber / 10);
  }

  // For even digits: originalNumber === reversedHalf
  // For odd digits: originalNumber === Math.floor(reversedHalf / 10)
  return (
    originalNumber === reversedHalf ||
    originalNumber === Math.floor(reversedHalf / 10)
  );
}
```

**Time Complexity:** O(log₁₀n) - We're processing half the digits  
**Space Complexity:** O(1) - Only using constant extra space

---

## Dry Run of Optimal Approach

### Example 1: x = 121

```
Initial: originalNumber = 121, reversedHalf = 0

Iteration 1:
  lastDigit = 121 % 10 = 1
  reversedHalf = 0 * 10 + 1 = 1
  originalNumber = floor(121 / 10) = 12
  Condition: 12 > 1? Yes, continue

Iteration 2:
  lastDigit = 12 % 10 = 2
  reversedHalf = 1 * 10 + 2 = 12
  originalNumber = floor(12 / 10) = 1
  Condition: 1 > 12? No, exit loop

Check: originalNumber(1) === reversedHalf(12)? No
Check: originalNumber(1) === floor(12 / 10) = 1? Yes → Return true
```

### Example 2: x = -121

```
Edge case: negative number → immediately return false
```

### Example 3: x = 10

```
Edge case: ends with 0 and not 0 itself → immediately return false
```

### Example 4: x = 1221 (Even digits)

```
Initial: originalNumber = 1221, reversedHalf = 0

Iteration 1:
  lastDigit = 1
  reversedHalf = 1
  originalNumber = 122

Iteration 2:
  lastDigit = 2
  reversedHalf = 12
  originalNumber = 12

Condition: 12 > 12? No, exit loop

Check: 12 === 12? Yes → Return true
```

### Example 5: x = 12321 (Odd digits)

```
Initial: originalNumber = 12321, reversedHalf = 0

Iteration 1:
  lastDigit = 1
  reversedHalf = 1
  originalNumber = 1232

Iteration 2:
  lastDigit = 2
  reversedHalf = 12
  originalNumber = 123

Iteration 3:
  lastDigit = 3
  reversedHalf = 123
  originalNumber = 12

Condition: 12 > 123? No, exit loop

Check: 12 === 123? No
Check: 12 === floor(123 / 10) = 12? Yes → Return true
```

---

# Armstrong Number Check

## Problem Understanding

An Armstrong number (also called narcissistic number) is a number that equals the sum of its own digits each raised to the power of the number of digits.

**Mathematical Definition:**
For an n-digit number: `abcd... = aⁿ + bⁿ + cⁿ + dⁿ + ...`

**Key Points:**

- Single-digit numbers are Armstrong numbers (0-9)
- Need to count digits first
- Need to extract and process each digit

---

## Approach 1: Convert to String (Intuitive)

### Intuition

Convert the number to string to easily count digits and access individual digits.

```javascript
/**
 * Check Armstrong number using string conversion
 * @param {number} n - The number to check
 * @return {boolean} - True if Armstrong number, false otherwise
 */
function isArmstrongString(n) {
  // Convert number to string to easily access digits
  const numStr = n.toString();
  const numDigits = numStr.length;

  let sum = 0;

  // Calculate sum of digits raised to power of number of digits
  for (let i = 0; i < numDigits; i++) {
    const digit = parseInt(numStr[i]);
    sum += Math.pow(digit, numDigits);
  }

  // Check if sum equals original number
  return sum === n;
}
```

**Time Complexity:** O(d) where d is number of digits  
**Space Complexity:** O(d) for storing the string

---

## Approach 2: Mathematical Approach (Optimal)

### Intuition

Use mathematical operations to extract digits without converting to string.

```javascript
/**
 * Check Armstrong number using mathematical operations (Optimal)
 * @param {number} n - The number to check
 * @return {boolean} - True if Armstrong number, false otherwise
 */
function isArmstrongMathematical(n) {
  // Handle negative numbers (Armstrong numbers are non-negative)
  if (n < 0) return false;

  // Single-digit numbers are always Armstrong numbers
  if (n >= 0 && n < 10) return true;

  let temp = n;
  let numDigits = 0;
  let sum = 0;

  // First pass: Count number of digits
  let countTemp = n;
  while (countTemp > 0) {
    numDigits++;
    countTemp = Math.floor(countTemp / 10);
  }

  // Second pass: Calculate sum of digits raised to power
  temp = n;
  while (temp > 0) {
    const digit = temp % 10;
    sum += Math.pow(digit, numDigits);
    temp = Math.floor(temp / 10);
  }

  return sum === n;
}
```

**Time Complexity:** O(d) where d is number of digits  
**Space Complexity:** O(1) - Only using primitive variables

---

## Approach 3: Single Pass Mathematical

### Intuition

Combine digit counting and sum calculation in a single pass by storing digits temporarily.

```javascript
/**
 * Check Armstrong number with single pass (stores digits)
 * @param {number} n - The number to check
 * @return {boolean} - True if Armstrong number, false otherwise
 */
function isArmstrongSinglePass(n) {
  if (n < 0) return false;
  if (n < 10) return true;

  const digits = [];
  let temp = n;

  // Extract all digits and store them
  while (temp > 0) {
    digits.push(temp % 10);
    temp = Math.floor(temp / 10);
  }

  const numDigits = digits.length;
  let sum = 0;

  // Calculate sum using stored digits
  for (let i = 0; i < numDigits; i++) {
    sum += Math.pow(digits[i], numDigits);
  }

  return sum === n;
}
```

**Time Complexity:** O(d)  
**Space Complexity:** O(d) for storing digits array

---

## Approach 4: Optimized with Exponentiation Optimization

### Intuition

Pre-calculate powers to avoid repeated Math.pow calls.

```javascript
/**
 * Check Armstrong number with power pre-calculation
 * @param {number} n - The number to check
 * @return {boolean} - True if Armstrong number, false otherwise
 */
function isArmstrongOptimized(n) {
  if (n < 0) return false;
  if (n < 10) return true;

  // Count digits and extract them simultaneously
  const digits = [];
  let temp = n;
  let numDigits = 0;

  while (temp > 0) {
    digits.push(temp % 10);
    temp = Math.floor(temp / 10);
    numDigits++;
  }

  // Pre-calculate powers for each possible digit (0-9)
  const powers = [];
  for (let i = 0; i <= 9; i++) {
    powers[i] = Math.pow(i, numDigits);
  }

  // Calculate sum using pre-computed powers
  let sum = 0;
  for (let i = 0; i < numDigits; i++) {
    sum += powers[digits[i]];
  }

  return sum === n;
}
```

**Time Complexity:** O(d)  
**Space Complexity:** O(d + 10) = O(d)

---

## Dry Run of Optimal Approach (Mathematical)

### Example 1: n = 153

```
Step 1: Count digits
  temp = 153
  Iteration 1: temp = 15, numDigits = 1
  Iteration 2: temp = 1, numDigits = 2
  Iteration 3: temp = 0, numDigits = 3
  numDigits = 3

Step 2: Calculate sum
  temp = 153
  Iteration 1: digit = 153 % 10 = 3, sum += 3³ = 27, temp = 15
  Iteration 2: digit = 15 % 10 = 5, sum += 5³ = 125 + 27 = 152, temp = 1
  Iteration 3: digit = 1 % 10 = 1, sum += 1³ = 1 + 152 = 153, temp = 0

Check: sum(153) === n(153) → true ✓
```

### Example 2: n = 123

```
Step 1: Count digits
  temp = 123
  Iteration 1: temp = 12, numDigits = 1
  Iteration 2: temp = 1, numDigits = 2
  Iteration 3: temp = 0, numDigits = 3
  numDigits = 3

Step 2: Calculate sum
  temp = 123
  Iteration 1: digit = 3, sum += 3³ = 27, temp = 12
  Iteration 2: digit = 2, sum += 2³ = 8 + 27 = 35, temp = 1
  Iteration 3: digit = 1, sum += 1³ = 1 + 35 = 36, temp = 0

Check: sum(36) === n(123) → false ✓
```

### Example 3: n = 9474 (4-digit Armstrong number)

```
Step 1: Count digits
  temp = 9474
  Iterations: 947 → 94 → 9 → 0
  numDigits = 4

Step 2: Calculate sum
  temp = 9474
  Iteration 1: digit = 4, sum += 4⁴ = 256, temp = 947
  Iteration 2: digit = 7, sum += 7⁴ = 2401 + 256 = 2657, temp = 94
  Iteration 3: digit = 4, sum += 4⁴ = 256 + 2657 = 2913, temp = 9
  Iteration 4: digit = 9, sum += 9⁴ = 6561 + 2913 = 9474, temp = 0

Check: sum(9474) === n(9474) → true ✓
```

### Edge Case Examples:

**Example 4: n = 0**

```
Single-digit number → immediately return true ✓
```

**Example 5: n = 9**

```
Single-digit number → immediately return true ✓
```

**Example 6: n = -153**

```
Negative number → immediately return false ✓
```

---

# Divisors of a Number

## Intuition

Divisors come in pairs: if `i` divides `n`, then `n/i` also divides `n`. We can leverage this property to optimize our solution.

## Approach 1: Brute Force

```javascript
/**
 * Brute Force Approach - Check all numbers from 1 to n
 * Time Complexity: O(n)
 * Space Complexity: O(d) where d is number of divisors
 */
function findDivisorsBruteForce(n) {
  const divisors = [];

  // Check every number from 1 to n
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }

  return divisors;
}
```

## Approach 2: Optimized (Square Root Method)

```javascript
/**
 * Optimized Approach - Check up to sqrt(n)
 * Time Complexity: O(√n)
 * Space Complexity: O(d) where d is number of divisors
 */
function findDivisorsOptimized(n) {
  const divisors = [];

  // Handle edge case
  if (n <= 0) return divisors;

  // Iterate only up to sqrt(n)
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      // Add the smaller divisor
      divisors.push(i);

      // If it's not a perfect square, add the larger divisor
      if (i !== n / i) {
        divisors.push(n / i);
      }
    }
  }

  // Sort the divisors
  divisors.sort((a, b) => a - b);
  return divisors;
}
```

## Approach 3: Two Arrays Method (More Efficient)

```javascript
/**
 * Two Arrays Approach - Separate smaller and larger divisors
 * Time Complexity: O(√n)
 * Space Complexity: O(d) where d is number of divisors
 */
function findDivisorsTwoArrays(n) {
  const smallerDivisors = [];
  const largerDivisors = [];

  // Handle edge case
  if (n <= 0) return [];

  // Iterate up to sqrt(n)
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      // Add smaller divisor
      smallerDivisors.push(i);

      // If not perfect square, add larger divisor to separate array
      if (i !== n / i) {
        largerDivisors.unshift(n / i);
      }
    }
  }

  // Combine arrays: smaller divisors + larger divisors (in reverse)
  return [...smallerDivisors, ...largerDivisors];
}
```

## Dry Run with Examples

### Example 1: n = 6

```
i = 1: 6%1=0 → divisors: [1], larger: [6]
i = 2: 6%2=0 → divisors: [1,2], larger: [3,6]
Result: [1,2,3,6] ✓
```

### Example 2: n = 8

```
i = 1: 8%1=0 → divisors: [1], larger: [8]
i = 2: 8%2=0 → divisors: [1,2], larger: [4,8]
Result: [1,2,4,8] ✓
```

### Example 3: n = 16 (Perfect Square)

```
i = 1: 16%1=0 → divisors: [1], larger: [16]
i = 2: 16%2=0 → divisors: [1,2], larger: [8,16]
i = 3: 16%3≠0 → skip
i = 4: 16%4=0 → divisors: [1,2,4], larger: [4,8,16]
Result: [1,2,4,8,16] ✓
```

## Complete Solution with All Approaches

```javascript
/**
 * Comprehensive divisor finder with multiple approaches
 */

// Approach 1: Brute Force
function divisorsBruteForce(n) {
  if (n <= 0) return [];

  const result = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      result.push(i);
    }
  }
  return result;
}

// Approach 2: Optimized (Recommended)
function divisorsOptimized(n) {
  if (n <= 0) return [];

  const result = [];
  const sqrtN = Math.sqrt(n);

  for (let i = 1; i <= sqrtN; i++) {
    if (n % i === 0) {
      result.push(i);
      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }

  result.sort((a, b) => a - b);
  return result;
}

// Approach 3: Two Arrays (Most Efficient)
function divisorsTwoArrays(n) {
  if (n <= 0) return [];

  const smaller = [];
  const larger = [];
  const sqrtN = Math.sqrt(n);

  for (let i = 1; i <= sqrtN; i++) {
    if (n % i === 0) {
      smaller.push(i);
      if (i !== n / i) {
        larger.unshift(n / i);
      }
    }
  }

  return [...smaller, ...larger];
}

// Test function
function testDivisors() {
  const testCases = [6, 8, 16, 1, 25, 100];

  testCases.forEach((n) => {
    console.log(`\nDivisors of ${n}:`);
    console.log(`Brute Force:     [${divisorsBruteForce(n)}]`);
    console.log(`Optimized:       [${divisorsOptimized(n)}]`);
    console.log(`Two Arrays:      [${divisorsTwoArrays(n)}]`);
  });
}

// Run tests
testDivisors();
```

## Complexity Analysis

| Approach    | Time Complexity | Space Complexity | When to Use        |
| ----------- | --------------- | ---------------- | ------------------ |
| Brute Force | O(n)            | O(d)             | Small numbers only |
| Optimized   | O(√n)           | O(d)             | General purpose    |
| Two Arrays  | O(√n)           | O(d)             | Most efficient     |

**Note:**

- `d` represents the number of divisors (typically much smaller than `n`)
- For large numbers, the optimized approaches are significantly faster
- The Two Arrays approach avoids sorting, making it the most efficient

## Edge Cases Handled

- n = 1 → [1]
- n = 0 → []
- n < 0 → []
- Perfect squares (like 16, 25) → handled correctly without duplicates

The **Two Arrays approach** is recommended for most use cases as it's efficient and handles all edge cases properly.

---

# Check for prime numbers

## Approach 1: Naive Approach

**Intuition**: Check divisibility by all numbers from 2 to n-1.

```javascript
function isPrimeNaive(n) {
  // Handle edge cases
  if (n <= 1) return false;
  if (n <= 3) return true;

  // Check divisibility by all numbers from 2 to n-1
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false; // Found a divisor, not prime
    }
  }

  return true; // No divisors found, prime number
}
```

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

## Approach 2: Optimized - Check up to √n

**Intuition**: If n has a divisor d, then n/d is also a divisor. One of them must be ≤ √n.

```javascript
function isPrimeSqrt(n) {
  // Handle edge cases
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Check divisibility up to square root of n
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}
```

**Time Complexity**: O(√n)  
**Space Complexity**: O(1)

## Approach 3: 6k ± 1 Optimization

**Intuition**: All primes greater than 3 are of the form 6k±1.

```javascript
function isPrimeOptimized(n) {
  // Handle edge cases
  if (n <= 1) return false;
  if (n <= 3) return true;

  // Eliminate even numbers and multiples of 3
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Check for divisors in the form of 6k ± 1
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}
```

**Time Complexity**: O(√n)  
**Space Complexity**: O(1)

## Approach 4: Sieve of Eratosthenes (for multiple queries)

**Intuition**: Precompute primes up to a limit for multiple queries.

```javascript
class PrimeChecker {
  constructor(maxLimit = 1000000) {
    this.maxLimit = maxLimit;
    this.sieve = this.generateSieve();
  }

  generateSieve() {
    const sieve = new Array(this.maxLimit + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i * i <= this.maxLimit; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= this.maxLimit; j += i) {
          sieve[j] = false;
        }
      }
    }

    return sieve;
  }

  isPrime(n) {
    if (n < 0 || n > this.maxLimit) {
      throw new Error(`Number ${n} is out of precomputed range`);
    }
    return this.sieve[n];
  }
}

// Usage for single number check
function isPrimeWithSieve(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  const limit = Math.sqrt(n);
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
```

**Time Complexity**:

- Precomputation: O(n log log n)
- Query: O(1)  
  **Space Complexity**: O(n)

## Dry Run of Optimal Approach (Approach 3)

Let's test with 3 examples:

### Example 1: n = 17 (Prime)

```
n = 17
n <= 1? No
n <= 3? No
n % 2 === 0? 17 % 2 = 1 ≠ 0
n % 3 === 0? 17 % 3 = 2 ≠ 0

Loop: i from 5 to √17 ≈ 4.12 (so loop doesn't execute)
Return true ✓
```

### Example 2: n = 15 (Composite)

```
n = 15
n <= 1? No
n <= 3? No
n % 2 === 0? 15 % 2 = 1 ≠ 0
n % 3 === 0? 15 % 3 = 0 ✓ → Return false ✓
```

### Example 3: n = 2 (Edge case - Prime)

```
n = 2
n <= 1? No
n <= 3? Yes → Return true ✓
```

### Example 4: n = 1 (Edge case - Not prime)

```
n = 1
n <= 1? Yes → Return false ✓
```

---

# Learn Basic Recurssion
