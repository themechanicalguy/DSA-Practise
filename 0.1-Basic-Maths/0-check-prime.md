# Prime Number Check

## Understanding Prime Numbers

A prime number is a natural number greater than 1, that has no positive divisors other than 1 and itself.
The first few prime numbers are 2, 3, 5, 7, 11, etc.

## Intuition and Approach

To determine if a number n is prime, we need to:

**Handle edge cases:**

- If n is less than or equal to 1, it’s not prime.
- If n is 2, it’s the only even prime number.
- If n is even and greater than 2, it’s not prime (since it’s divisible by 2).

**Check for divisors:**

- For a number n, we only need to check divisors up to the square root of n. This is because if n is divisible by a number d greater than its square root, it must also be divisible by a corresponding smaller number n/d (which is less than the square root).
  - Divisors come in pairs: (d, n/d).
  - If `d ≤ √n (10)`, then `n/d ≥ √n (10)`.
  - For example:
    - When d = 4 (less than 10), n/d = 100/4 = 25 (greater than 10).
    - When d = 25 (greater than 10), n/d = 100/25 = 4 (less than 10).
  - The pairs are symmetric around √n. Checking divisors up to `√n (i.e., 1, 2, 4, 5, 10)` implicitly checks the larger divisors (100, 50, 25, 20, 10).
- If no divisors are found (other than 1 and n), the number is prime.

**Optimization considerations:**

- Avoid checking all numbers up to n, as this is inefficient.
- Skip even numbers after checking 2.
- Use mathematical properties (like square root) to minimize iterations.

### 1. Naive Approach (O(n) time)

Check all numbers from 2 to n-1 to see if any divide n.

```javascript
function isPrimeNaive(n) {
  if (n <= 1) return false; // 1 and below are not prime
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false; // found a divisor
  }
  return true;
}
```

**Time Complexity:** O(n) - We check up to n-1 numbers  
**Space Complexity:** O(1) - Constant space

### 2. Optimized Approach (O(√n) time)

We only need to check divisors up to √n because a larger factor would require a smaller factor that we would have already checked.

```javascript
function isPrimeOptimized(n) {
  if (n <= 1) return false;
  if (n === 2) return true; // 2 is the only even prime
  if (n % 2 === 0) return false; // no even number >2 is prime

  // Check odd divisors up to √n
  const sqrtN = Math.sqrt(n);
  for (let i = 3; i <= sqrtN; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
```

**Time Complexity:** O(√n) - We only check up to √n  
**Space Complexity:** O(1) - Constant space

### 3. Sieve of Eratosthenes (O(n log log n) time for precomputation)

If we need to check primality for multiple numbers or a range, we can precompute prime numbers using the Sieve of Eratosthenes and store results for quick lookup. This is overkill for a single number but useful for multiple queries.

```javascript
/**
 * Checks if a number is prime using a precomputed sieve for a given range.
 * @param {number} n - The number to check for primality.
 * @returns {boolean} - True if n is prime, false otherwise.
 */
function isPrimeSieve(n) {
  // Handle edge cases
  if (n <= 1) return false;
  if (n === 2) return true;

  // Create a boolean array "isPrime" and initialize all entries as true
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  // Use Sieve of Eratosthenes to mark non-prime numbers
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      // Mark multiples of i as non-prime
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime[n];
}
```
