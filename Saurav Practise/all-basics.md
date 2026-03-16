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

## Understanding Math.log10

## What is Math.log10?

Math.log10 is a function that tells you the power you need to raise 10 to get a given number.

## Simple Explanation

- If you have a number like 100, `Math.log10(100)` asks: "10 raised to what exponent equals 100?" The answer is 2, because 10² = 100.
- For 1000, it’s 3 (10³ = 1000).
- For numbers between 0 and 1, like 0.01, the answer is negative: 10⁻² = 0.01, so `log10(0.01) = –2`.

## Key Points

- It only works for positive numbers (greater than 0).
- It can be thought of as the "order of magnitude" – e.g., `log10(500)` is about 2.7, meaning 500 is between 10² = 100 and 10³ = 1000, closer to 1000.
- It’s used in many real‑world contexts: measuring sound intensity (decibels), earthquake strength (Richter scale), acidity (pH), and comparing things that vary over huge ranges.

**Math.log10 gives the exponent when the number is written as a power of 10.**

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

---

### Refactor 1: Direct Simplification

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let reversedNum = 0;

  // Math.abs handles the negative sign natively
  let num = Math.abs(x);

  while (num > 0) {
    let lastDigit = num % 10;
    reversedNum = reversedNum * 10 + lastDigit;
    num = Math.floor(num / 10);
  }

  // Restore the negative sign if the original input was negative
  if (x < 0) reversedNum *= -1;

  // Use defined constants instead of calculating Math.pow on every run
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  // Check bounds
  if (reversedNum > INT_MAX || reversedNum < INT_MIN) {
    return 0;
  }

  return reversedNum;
};
```

- **Time Complexity**: O(log₁₀(n)) - Same as approach 1
- **Space Complexity**: O(1) - Constant space

## Dry Run: Refactor 1 (Direct Simplification)

Here is a step-by-step dry run of the `Refactor 1: Direct Simplification` approach using three distinct examples, including edge cases.

**Constants used in all runs:**

- `INT_MAX = 2147483647`
- `INT_MIN = -2147483648`

---

### Example 1: `x = 120` (Positive Number Ending in Zero)

- **Initialization:**
  - `x = 120`
  - `reversedNum = 0`
  - `num = Math.abs(120) = 120`

- **Iteration 1:**
  - Condition: `num > 0` (`120 > 0`) ➔ **True**
  - `lastDigit = 120 % 10 = 0`
  - `reversedNum = (0 * 10) + 0 = 0`
  - `num = Math.floor(120 / 10) = 12`

- **Iteration 2:**
  - Condition: `num > 0` (`12 > 0`) ➔ **True**
  - `lastDigit = 12 % 10 = 2`
  - `reversedNum = (0 * 10) + 2 = 2`
  - `num = Math.floor(12 / 10) = 1`

- **Iteration 3:**
  - Condition: `num > 0` (`1 > 0`) ➔ **True**
  - `lastDigit = 1 % 10 = 1`
  - `reversedNum = (2 * 10) + 1 = 21`
  - `num = Math.floor(1 / 10) = 0`

- **Iteration 4:**
  - Condition: `num > 0` (`0 > 0`) ➔ **False** (Loop terminates)

- **Post-Loop Processing:**
  - **Sign Restoration:** Is `x < 0`? (`120 < 0`) ➔ **False**. `reversedNum` remains `21`.
  - **Bounds Check:** Is `21 > 2147483647` OR `21 < -2147483648`? ➔ **False**.
- **Final Output:** `21`

---

### Example 2: `x = -123` (Negative Number)

- **Initialization:**
  - `x = -123`
  - `reversedNum = 0`
  - `num = Math.abs(-123) = 123` _(Sign is temporarily stripped)_

- **Iteration 1:**
  - Condition: `num > 0` (`123 > 0`) ➔ **True**
  - `lastDigit = 123 % 10 = 3`
  - `reversedNum = (0 * 10) + 3 = 3`
  - `num = Math.floor(123 / 10) = 12`

- **Iteration 2:**
  - Condition: `num > 0` (`12 > 0`) ➔ **True**
  - `lastDigit = 12 % 10 = 2`
  - `reversedNum = (3 * 10) + 2 = 32`
  - `num = Math.floor(12 / 10) = 1`

- **Iteration 3:**
  - Condition: `num > 0` (`1 > 0`) ➔ **True**
  - `lastDigit = 1 % 10 = 1`
  - `reversedNum = (32 * 10) + 1 = 321`
  - `num = Math.floor(1 / 10) = 0`

- **Iteration 4:**
  - Condition: `num > 0` (`0 > 0`) ➔ **False** (Loop terminates)

- **Post-Loop Processing:**
  - **Sign Restoration:** Is `x < 0`? (`-123 < 0`) ➔ **True**. `reversedNum = 321 * -1 = -321`.
  - **Bounds Check:** Is `-321 > 2147483647` OR `-321 < -2147483648`? ➔ **False**.
- **Final Output:** `-321`

---

### Example 3: `x = 1534236469` (Overflow Scenario)

_Note: If we reverse this mathematically, it becomes `9646324351`, which is greater than `INT_MAX` (2147483647)._

- **Initialization:**
  - `x = 1534236469`
  - `reversedNum = 0`
  - `num = Math.abs(1534236469) = 1534236469`

- **Iterations 1 through 10:**
  - _Fast-forwarding through the extraction and building process..._
  - The loop extracts digits one by one (`9`, `6`, `4`, `6`, etc.) and builds `reversedNum`.
  - Upon finishing the final iteration, `reversedNum = 9646324351` and `num = 0`. Loop terminates.

- **Post-Loop Processing:**
  - **Sign Restoration:** Is `x < 0`? (`1534236469 < 0`) ➔ **False**. `reversedNum` remains `9646324351`.
  - **Bounds Check:** Is `reversedNum > INT_MAX`? (`9646324351 > 2147483647`) ➔ **True**!
  - Because the condition is met, the function immediately returns `0`.
- **Final Output:** `0`

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

You are given an integer `n`. You need to find all the divisors of `n`. Return all the divisors of `n` as an array or list in a `sorted` order.

**A number which completely divides another number is called it's divisor.**

Examples:
Input: n = 6
Output = [1, 2, 3, 6]
Explanation: The divisors of 6 are 1, 2, 3, 6.

Input: n = 8
Output: [1, 2, 4, 8]
Explanation: The divisors of 8 are 1, 2, 4, 8.

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

---

# Check for prime numbers

You are given an integer n. You need to check if the number is prime or not. Return true if it is a prime number, otherwise return false.

A prime number is a number which has no divisors except 1 and itself.

Examples:
Input: n = 5

Output: true

Explanation: The only divisors of 5 are 1 and 5 , So the number 5 is prime.

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

---

# GCD of Two numbers

**Problem Statement:** Given two integers `N1` and `N2`, find their greatest common divisor.

- The Greatest Common Divisor of any two integers is the largest number that divides both integers.

## Approach 1

```javascript
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
```

- Time Complexity: O(min(N1, N2)) where N1 and N2 is the input number.

## Approach 2

```javascript
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
```

- Time Complexity: O(min(N1, N2)) where N1 and N2 is the input number.

---

## Given a number n, the task is to return the list/vector of the factorial numbers smaller than or equal to n

**Input:** n = 3
**Output:** 1 2
**Explanation:** The first factorial number is 1 which is less than equal to n. The second number is 2 which is less than equal to n,but the third factorial number is 6 which is greater than n. So we print only 1 and 2.

**Input:** n = 6
**Output:** 1 2 6
**Explanation:** The first three factorial numbers are less than equal to n but the fourth factorial number 24 is greater than n. So we print only first three factorial numbers.

```javascript
//https://www.geeksforgeeks.org/problems/find-all-factorial-numbers-less-than-or-equal-to-n3548/0

function getFactorialNumbersIterative(n) {
  let result = [],
    fact = 1,
    i = 1;
  while (fact <= n) {
    result.push(fact);
    i++;
    fact *= i;
  }
  return result;
}
```

# Learn Basic Recurssion

## 1- Print number from N to 1.

```javascript
function counter(N) {
  if (N < 1) return;
  console.log(N);
  counter(N - 1);
}
// counter(5);
```

## 2- Print sum of number from a given range

```javascript
function sumRange(num) {
  if (num == 1) return 1;
  return num + sumRange(num - 1);
}
// sumRange(3);
```

## 3 - Print factorial for a given number

```javascript
function fact(N) {
  if (N === 1) return 1;
  return N * fact(N - 1);
}
// fact(6);
```

## 4 - return the odd number array from a given array, using helper function recurssion

```javascript
function recrFunction(array, resultArr) {
  if (array.length === 0) {
    return resultArr;
  }
  if (array[0] % 2 !== 0) {
    resultArr?.push(array[0]);
  }
  recrFunction(array.slice(1), resultArr);
}
function helperFunction(arr) {
  const resultArr = [];
  recrFunction(arr, resultArr);
  return resultArr;
}
helperFunction([1, 2, 3, 4, 5]);

// 5 - with pure recurssionfunction pureRecurssion(arr) { - pure recurssion is least applicable. it can be applied to only simple tasks
function pureRecurssion(arr) {
  let resArr = [];
  if (arr.length === 0) return resArr;

  if (arr[0] % 2 !== 0) resArr.push(arr[0]);
  // arr.slice(arr.concat(pureRecurssion(arr)))
  resArr = resArr.concat(pureRecurssion(arr.slice(1)));
  return resArr;
}

pureRecurssion([1, 2, 3, 4, 5]);
```

## 5 Write a function to return 8th fibonacci number

```javascript
// 0,1,1,2,3,5,8,13,21,34 ==> Output 13

function findFibonacci(N) {
  //base case
  if (N == 0) return 0;
  if (N == 1) return 1;
  //recursive relation
  //f(n) = f(n-1) + f(n-2);
  return findFibonacci(N - 1) + findFibonacci(N - 2);
}

let res = findFibonacci(8);
console.log(res);

//print fibonacci upto a number------------------------------------

function printFibonacci(n) {
  let num = "";
  function fibonacci(n) {
    //base cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    //recurssive relation
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  for (let i = 0; i < n; i++) {
    num += fibonacci(i) + " ";
  }
  return num;
}
printFibonacci(10);

/**
 * @param {number} n
 * @return {number}
 *----------------------------------------*/
var fib = function (n) {
  let memo = new Array(n);
  if (n < 2) return n;
  if (memo[n]) return memo[n];
  return (memo[n] = fib(n - 1) + fib(n - 2));
};
```

## 6 Reverse a given Array

**Problem Statement:** You are given an array. The task is to reverse the array and print it.

```javascript
function reverseArrayRecursive(arr, start = 0, end = arr.length - 1) {
  // Base case: If start pointer meets or crosses end pointer, we are done
  if (start >= end) {
    return arr;
  }

  // Swap the elements
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;

  // Recursive call: move start right by 1, move end left by 1
  return reverseArrayRecursive(arr, start + 1, end - 1);
}

// Example usage
let array2 = [10, 20, 30, 40];
console.log("Recursive:", reverseArrayRecursive(array2));
// Output: [40, 30, 20, 10]
```

## 7 Given a string, print the string in reverse order.

```javascript
function reverseString(str, start, end) {
  if (start > end) return str;

  // swapping using destructuring assignment
  [str[start], str[end]] = [str[end], str[start]];
  console.log(str[start], str[end]);

  return reverseString(str, start + 1, end - 1);
  // return str;
}

let str = "abcde";
let res = reverseString(str, 0, str.length - 1);
console.log(res);
```

## 8 Given a string, check if it is palindrome or not.

```javascript
function palindromeCheck(str, s, e) {
  if (s > e) return true;
  if (str[s] !== str[e]) return false;
  return palindromeCheck(str, s + 1, e - 1);
}

let str = "abba";
console.log(palindromeCheck(str, 0, str.length - 1));
```

## 9 Given a 2, base , exp numbers, return the result

```javascript
// i.e 3,3 = 9
// 2,3 = 8

function power(a, b) {
  //base case
  if (b === 0) return 1;
  if (b === 1) return a;

  // recurssive call
  let ans = power(a, Number.parseInt(b / 2));

  if (b % 2 === 0) return ans * ans;
  else return a * ans * ans;
}

let res = power(2, 3);
console.log(res);
```
