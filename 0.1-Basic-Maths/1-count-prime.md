# Lc 204 204. Count Primes

## Problem Understanding

We need to count how many prime numbers exist that are strictly less than a given integer n. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.

## Approaches to Solve the Problem

### 1. Brute Force Approach (Check each number individually)

For every number less than n, check if it's prime using the optimized primality test.

```javascript
function countPrimesBruteForce(n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
}

// Helper function to check primality (from previous solution)
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
```

**Time Complexity:** O(n√n) - For each number up to n, we do a √n check  
**Space Complexity:** O(1) - Constant space

### 2. Sieve of Eratosthenes (Optimal Approach)

This ancient algorithm efficiently finds all primes up to a given limit by iteratively marking non-prime numbers.

```javascript
function countPrimes(n) {
  if (n <= 2) return 0;

  // Initialize a boolean array where index represents the number
  // and value represents whether it's prime (true) or not (false)
  const isPrime = new Array(n).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  // Mark non-primes starting from 2
  for (let currentNum = 2; currentNum * currentNum < n; currentNum++) {
    if (isPrime[currentNum]) {
      // Mark all multiples of currentNum as non-prime
      for (
        let multiple = currentNum * currentNum;
        multiple < n;
        multiple += currentNum
      ) {
        isPrime[multiple] = false;
      }
    }
  }

  // Count all primes
  return isPrime.filter((val) => val).length;
}
```

**Time Complexity:** O(n log log n) - Highly efficient for this problem  
**Space Complexity:** O(n) - We need to store the sieve array

### 3. Optimized Sieve (Sieve of Eratosthenes with some optimizations)

We can add small optimizations like treating even numbers separately.

```javascript
function countPrimesOptimized(n) {
  if (n <= 2) return 0;

  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;

  // Handle even numbers
  for (let i = 4; i < n; i += 2) {
    isPrime[i] = false;
  }

  // Check only odd numbers
  for (let currentNum = 3; currentNum * currentNum < n; currentNum += 2) {
    if (isPrime[currentNum]) {
      for (
        let multiple = currentNum * currentNum;
        multiple < n;
        multiple += currentNum * 2
      ) {
        isPrime[multiple] = false;
      }
    }
  }

  return isPrime.filter((val) => val).length;
}
```

**Time Complexity:** Still O(n log log n) but with better constants  
**Space Complexity:** O(n) - Same as basic sieve

## Dry Run of Sieve of Eratosthenes

**Example 1: n = 10**

1. Initialize array: [F, F, T, T, T, T, T, T, T, T]
2. Start with 2: Mark multiples 4,6,8 → [F,F,T,T,F,T,F,T,F,T]
3. Next is 3: Mark multiples 9 (6 already marked) → [F,F,T,T,F,T,F,T,F,F]
4. Stop at √10 ≈ 3.16
5. Count primes: 2,3,5,7 → 4

**Example 2: n = 2 (Edge case)**

- Immediately return 0 (no primes less than 2)

**Example 3: n = 20**

1. Initialize array for 20 elements
2. Mark multiples of 2: 4,6,8,10,12,14,16,18
3. Mark multiples of 3: 9,15 (6,12,18 already marked)
4. Mark multiples of 5: 25 > 20 → stop
5. Primes: 2,3,5,7,11,13,17,19 → 8

## Final Solution (Sieve of Eratosthenes)

```javascript
/**
 * Counts the number of primes less than n using Sieve of Eratosthenes
 * @param {number} n - The upper limit (exclusive)
 * @returns {number} - Count of primes less than n
 */
function countPrimes(n) {
  if (n <= 2) return 0;

  // Initialize sieve array - index represents number, value represents primality
  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;

  // Mark non-primes starting from first prime (2)
  for (let currentNum = 2; currentNum * currentNum < n; currentNum++) {
    if (isPrime[currentNum]) {
      // Mark all multiples of currentNum as non-prime
      // Start from currentNum^2 to avoid re-marking smaller multiples
      for (
        let multiple = currentNum * currentNum;
        multiple < n;
        multiple += currentNum
      ) {
        isPrime[multiple] = false;
      }
    }
  }

  // Count all remaining true values in the array
  return isPrime.filter((prime) => prime).length;
}

// Test cases
console.log(countPrimes(10)); // 4
console.log(countPrimes(2)); // 0 (edge case)
console.log(countPrimes(20)); // 8
```

**Key Points:**

- The Sieve of Eratosthenes is the most efficient algorithm for this problem
- It works by eliminating multiples of each prime number starting from 2
- The optimization of starting from currentNum^2 avoids redundant checks
- Space complexity is O(n) due to the sieve array, but this is acceptable for most practical cases

For very large n (beyond 10^7), more memory-efficient versions of the sieve exist, but this implementation works well for typical programming challenge constraints.
