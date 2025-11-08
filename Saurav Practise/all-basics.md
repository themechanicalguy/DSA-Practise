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

## Write a function to find factorial of a number using recurssion

```javascript
/**
 * 5! = 5 * 4 * 3 * 2 * 1
 * 5! = 5 * 4!
 * recurrence relation = f(n) = n * f(n-1)
 * Base Case = N == 0, return 1;
 */

function fact(N) {
  //base case
  if (N === 0) return 1;
  //recurrence relation
  let factorial = N * fact(N - 1);
  return factorial;
}

const res = fact(5);
console.log(res);
```

## Given a number n, the task is to return the list/vector of the factorial numbers smaller than or equal to n

```javascript
//https://www.geeksforgeeks.org/problems/find-all-factorial-numbers-less-than-or-equal-to-n3548/0

// Input: n = 3
// Output: 1 2
// Explanation: The first factorial number is 1 which is less than equal to n. The second number is 2 which is less than equal to n,but the third factorial number is 6 which is greater than n. So we print only 1 and 2.

// Input: n = 6
// Output: 1 2 6
// Explanation: The first three factorial numbers are less than equal to n but the fourth factorial number 24 is greater than n. So we print only first three factorial numbers.

// Approach 1: Recursive
function factorialNumbers(n) {
  const result = [];
  const getFactorialNumbers = (n, fact = 1, i = 1) => {
    if (fact > n) return result; // Base case: stop when factorial exceeds n

    result.push(fact); // Add the factorial to the result list

    if (fact * (i + 1) > n) return result; // Ensure the next factorial does not exceed n

    return getFactorialNumbers(n, fact * (i + 1), i + 1); // Recursive call
  };

  return getFactorialNumbers(n);
}

// Approach 2: Iterative
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

## Write a function to return 8th fibonacci number

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

## Given a string, print the string in reverse order.

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

## Given a string, check if it is palindrome or not.

```javascript
function palindromeCheck(str, s, e) {
  if (s > e) return true;
  if (str[s] !== str[e]) return false;
  return palindromeCheck(str, s + 1, e - 1);
}

let str = "abba";
console.log(palindromeCheck(str, 0, str.length - 1));
```

## You have been given a no. of stairs..

```javascript
/**
 * You have been given a no. of stairs. Initially, you are at the 0th stair, and you need to reach the Nth stair. Each time you can either climb one step or two steps. you are supposed to return the no. of distinct ways in which you can climb from 0th step to Nth step.
 */

function countDistinctWayToClimb(N) {
  //base case
  if (N < 0) return 0;
  if (N == 0) return 1;

  //recurence relation
  return countDistinctWayToClimb(N - 1) + countDistinctWayToClimb(N - 2);
}

console.log(countDistinctWayToClimb(4));
```

## Given a string and a character. find the last occurence of the char

```javascript
function getlastOccurence(str, i, char, ans) {
  if (i >= str.length) return ans;
  if (str[i] == char) ans = i;
  return getlastOccurence(str, i + 1, char, ans);
}

function lastOccurence(str, char) {
  let ans;
  let res = getlastOccurence(str, 0, char, ans);
  return res + 1;
}

lastOccurence("adajaafferetatajilkillljjim", "m");

lastOccurence("adajaafferetatajilkillljjim", "m");

lastOccurence("adaj", "a");
```

## given a number print all its digits in words

```javascript
//
// 412 i.e four one two

function sayDigits(N) {
  //0
  let arr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  if (N === 0) return; //FFT
  let digit = N % 10; //4

  sayDigits(Number.parseInt(N / 10)); //0
  console.log(arr[digit]);
}

sayDigits(412);
```

## Given a 2, base , exp numbers, return the result

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
