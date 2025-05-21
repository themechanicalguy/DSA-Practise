# LC 1922. Count Good Numbers

### **Problem Understanding**

A digit string is considered "good" if:

- **Digits at even indices (0-based)** are even (0, 2, 4, 6, 8).
- **Digits at odd indices** are prime (2, 3, 5, 7).

Given an integer `N`, we need to count all possible good digit strings of length `N`.
Since the number can be very large, we return it modulo \(10^9 + 7\).

### **Key Observations**

1. **Positions Matter**:
   - For even indices (0, 2, 4, ...), the digit must be even (5 choices: 0, 2, 4, 6, 8).
   - For odd indices (1, 3, 5, ...), the digit must be prime (4 choices: 2, 3, 5, 7).
2. **Total Choices**:
   - If `N` is even, there are `N/2` even positions and `N/2` odd positions.
   - If `N` is odd, there are `(N + 1)/2` even positions and `N/2` odd positions.
3. **Total Good Strings**:
   - The total is the product of choices for even and odd positions: `(5^even_positions) * (4^odd_positions)`.

## 1. Mathematical Approach with Modular Exponentiation (Optimal)

```javascript
const MOD = 1e9 + 7;

/**
 * Computes the number of good digit strings of length N.
 * @param {number} N - The length of the digit string.
 * @return {number} - The count of good digit strings modulo 1e9 + 7.
 */
function countGoodStrings(N) {
  const evenPositions = Math.ceil(N / 2); // Number of even indices (0-based)
  const oddPositions = Math.floor(N / 2); // Number of odd indices

  // Function to compute (base^power) % MOD efficiently
  const powMod = (base, power) => {
    let result = 1;
    while (power > 0) {
      if (power % 2 === 1) {
        result = (result * base) % MOD;
      }
      base = (base * base) % MOD;
      power = Math.floor(power / 2);
    }
    return result;
  };

  const evenChoices = powMod(5, evenPositions);
  const oddChoices = powMod(4, oddPositions);

  return (evenChoices * oddChoices) % MOD;
}

// Test Cases
console.log(countGoodStrings(1)); // Output: 5
console.log(countGoodStrings(2)); // Output: 20 (5 * 4)
console.log(countGoodStrings(3)); // Output: 100 (5 * 4 * 5)
```

## 2 Recursive Approach (Brute Force)

```javascript
// Function to count good digit strings recursively
function countGoodStringsRecursive(N) {
  const MOD = 1000000007; // Modulo to keep numbers manageable
  const evenDigits = [0, 2, 4, 6, 8]; // 5 even digits for even indices
  const primeDigits = [2, 3, 5, 7]; // 4 prime digits for odd indices

  // Helper function to build strings recursively
  // index: current position in the string (0 to N-1)
  function buildString(index) {
    // Base case: if we've built a string of length N, count it as 1 valid string
    if (index === N) {
      return 1;
    }

    let total = 0;
    // Choose digits based on whether index is even or odd
    const validDigits = index % 2 === 0 ? evenDigits : primeDigits;

    // Try each valid digit for the current index
    for (let digit of validDigits) {
      // Move to the next index and add the number of valid strings from there
      total = (total + buildString(index + 1)) % MOD;
    }

    return total;
  }

  // Start building from index 0
  return buildString(0);
}
```

## Iterative Approach

```javascript
//Gives TLF in LC
const MOD = 1e9 + 7;
var countGoodNumbers = function (N) {
  let result = 1;
  for (let i = 0; i < N; i++) {
    if (i % 2 === 0) {
      // Even index: even digit
      result = (result * 5) % MOD;
    } else {
      // Odd index: prime digit
      result = (result * 4) % MOD;
    }
  }
  return result;
};
```
