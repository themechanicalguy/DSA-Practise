# LC-50 Implementing pow(x, n)

## Problem Understanding

We need to implement a function that calculates x raised to the power n (x^n) efficiently. The challenge is to handle both positive and negative exponents, as well as edge cases, in an optimal way.

## Approaches

### 1. Brute Force Approach (Iterative)

Multiply x by itself n times (or 1/x for negative n).

### 1. Brute Force (Iterative)

```javascript
/**
 * Calculates x raised to the power n using iterative multiplication
 * @param {number} x - The base number
 * @param {number} n - The exponent
 * @return {number} The result of x^n
 */
function powBruteForce(x, n) {
  if (n === 0) return 1; // Any number to power 0 is 1

  let result = 1;
  const absN = Math.abs(n);

  for (let i = 0; i < absN; i++) {
    result *= x;
  }

  return n > 0 ? result : 1 / result;
}
```

**Time Complexity**: O(n) - Linear time since we perform n multiplications
**Space Complexity**: O(1) - Constant space

### 2. Brute Force Approach (Recursive)

Recursive version of the iterative approach.

```javascript
/**
 * Calculates x raised to the power n using recursive multiplication
 * @param {number} x - The base number
 * @param {number} n - The exponent
 * @return {number} The result of x^n
 */
function powRecursive(x, n) {
  if (n === 0) return 1;

  if (n > 0) {
    return x * powRecursive(x, n - 1);
  } else {
    return 1 / (x * powRecursive(x, -n - 1));
  }
}
```

**Time Complexity**: O(n)
**Space Complexity**: O(n) - Due to recursion stack

### 3. Optimized Approach (Fast Power/Exponentiation by Squaring)

This approach reduces the time complexity by dividing the problem into smaller subproblems.

```javascript
/**
 * Calculates x^n using exponentiation by squaring (recursive)
 * @param {number} x - The base number
 * @param {number} n - The exponent
 * @return {number} The result of x^n
 */
function powOptimizedRecursive(x, n) {
  if (n === 0) return 1;

  const half = powOptimizedRecursive(x, Math.floor(Math.abs(n) / 2));
  let result = half * half;

  // If n is odd, multiply by x one more time
  if (Math.abs(n) % 2 === 1) {
    result *= x;
  }

  return n > 0 ? result : 1 / result;
}
```

**Time Complexity**: O(log n) - We halve the problem at each step
**Space Complexity**: O(log n) for recursive, O(1) for iterative

### 4. Optimized Iterative (Fast Power)

```javascript
/**
 * Calculates x^n using exponentiation by squaring (iterative)
 * @param {number} x - The base number
 * @param {number} n - The exponent
 * @return {number} The result of x^n
 */
function powOptimizedIterative(x, n) {
  if (n === 0) return 1;

  let result = 1;
  let absN = Math.abs(n);
  let currentProduct = x;

  while (absN > 0) {
    if (absN % 2 === 1) {
      result *= currentProduct;
    }
    currentProduct *= currentProduct;
    absN = Math.floor(absN / 2);
  }

  return n > 0 ? result : 1 / result;
}
```

### 5. Using Math Library (Not for interviews)

```javascript
function powUsingMath(x, n) {
  return x ** n;
  // or return Math.pow(x, n);
}
```

## Optimal Approach Analysis

The optimal approach is the iterative fast power (exponentiation by squaring) because:

- Time Complexity: O(log n) - Much faster than O(n) for large n
- Space Complexity: O(1) - Better than recursive versions which use stack space

## Dry Run of Optimal Approach (Iterative)

### Example 1: x = 2, n = 10

1. absN = 10, result = 1, currentProduct = 2
2. 10 is even: result stays 1
   currentProduct = 4 (2^2)
   absN = 5
3. 5 is odd: result = 4
   currentProduct = 16 (4^2)
   absN = 2
4. 2 is even: result stays 4
   currentProduct = 256 (16^2)
   absN = 1
5. 1 is odd: result = 4 \* 256 = 1024
   currentProduct = 65536 (256^2)
   absN = 0
6. Return 1024 (since n was positive)

### Example 2: x = 2.1, n = 3

1. absN = 3, result = 1, currentProduct = 2.1
2. 3 is odd: result = 2.1
   currentProduct = 4.41 (2.1^2)
   absN = 1
3. 1 is odd: result = 2.1 \* 4.41 = 9.261
   currentProduct = 19.4481 (4.41^2)
   absN = 0
4. Return 9.261 (since n was positive)

### Example 3: x = 2, n = -2 (Edge case)

1. absN = 2, result = 1, currentProduct = 2
2. 2 is even: result stays 1
   currentProduct = 4 (2^2)
   absN = 1
3. 1 is odd: result = 4
   currentProduct = 16 (4^2)
   absN = 0
4. Return 1/4 = 0.25 (since n was negative)

### Edge Case: x = 0, n = 0

JavaScript typically returns 1 for 0^0 (though mathematically undefined)
Our function returns 1 due to the initial check

### Edge Case: x = 1, n = large number (e.g., 2147483647)

Optimal approach handles this in O(log n) time (31 steps) instead of O(n)

### Edge Case: x = -1, n = -2147483648

Handles correctly by using absolute value and then inverting if n was negative

The optimal approach efficiently handles all these cases with logarithmic time complexity.
