# 53. Maximum Subarray - July 19

## How Kadane's Algorithm Works

Kadane's Algorithm is an efficient solution for finding the maximum sum of a contiguous subarray within a one-dimensional array of numbers.
It's a dynamic programming approach that solves the problem in O(n) time with O(1) space complexity.

The algorithm works by maintaining two variables as it iterates through the array:

1. `maxCurrent`: Maximum sum of the subarray ending at the current position
2. `maxGlobal`: Maximum sum found so far

At each element, the algorithm decides whether to:

- Start a new subarray at the current element, or
- Continue the previous subarray by adding the current element

```javascript
function kadanesAlgorithm(nums) {
  if (nums.length === 0) return 0;

  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Decide whether to start new subarray or continue current one
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);

    // Update global maximum if current maximum is greater
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
}
```

# Boyer-Moore Voting Algorithm Explained

The Boyer-Moore Voting Algorithm is an efficient algorithm to find the majority element in a sequence, where the majority element is defined as an element that appears more than `⌊n/2⌋` times (where `n` is the size of the sequence).

## How the Algorithm Works

The algorithm works on the principle that if you cancel out each occurrence of the majority element with all the other elements, the majority element will still remain at the end.

The intuition is based on a `voting` or `pairing` concept:

- Imagine each element in the array as a vote. The majority element has more votes than all other elements combined, because it appears more than `⌊n/2⌋` times.
- The algorithm maintains a single candidate and a count of “votes” for that candidate.
- As we traverse the array:
  - If we see the `current` candidate, we `increment` the vote `count` (reinforcing the candidate).
  - If we see a different element, we `decrement` the vote `count` (as if the non-candidate cancels out a vote for the candidate).
  - If the `count` reaches `zero`, we pick a new candidate from the current element and reset the `count` to `1`.
- At the end, the `candidate` is the majority element because the majority element’s frequency ensures it “survives” the cancellation process.

## Why It Works

The algorithm essentially pairs each majority element with a non-majority element and cancels them out. Since there are more majority elements than all other elements combined, at least one majority element will remain uncanceled.

- Since the majority element appears more than `⌊n/2⌋` times, it has more occurrences than all other elements combined.
- When we pair a majority element with a non-majority element (by decrementing the count), the majority element’s occurrences will still remain after all non-majority elements are “canceled out.”
- Even if we temporarily switch candidates when the count reaches zero, the majority element’s dominance ensures it will eventually become the candidate again and maintain a positive count by the end.

## Key Properties

- **Single Pass:** The algorithm requires only one traversal of the array, making it `O(n)` in time complexity.
- **Constant Space:** It uses only two variables (candidate and count), achieving `O(1)` space complexity.
- **Guarantee-Based:** The problem guarantees a majority element exists, so we don’t need a second pass to verify the candidate (though in variations where no majority is guaranteed, a verification step would be needed).

### Algorithm Steps:

1. **Initialize**:

   - `candidate`: Stores the current potential majority element
   - `count`: Tracks the net advantage of the candidate over other elements

2. **Iterate through the array**:

   - If `count` is 0, we choose the current element as the new `candidate`
   - If the current element is the same as `candidate`, increment `count`
   - Otherwise, decrement `count`

3. **Final result**:
   - The `candidate` at the end is guaranteed to be the majority element (given that a majority exists)

## JavaScript Implementation

```javascript
function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  // Verification step (not needed per problem statement)
  // But good practice when majority isn't guaranteed
  count = 0;
  for (const num of nums) {
    if (num === candidate) count++;
  }

  return count > nums.length / 2 ? candidate : -1;
}

// Test cases
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(majorityElement([1])); // 1
console.log(majorityElement([4, 4, 4])); // 4
console.log(majorityElement([1, 3, 1, 3, 1, 2, 1])); // 1
```

# Dutch National Flag Algorithm - Detailed Explanation

## What is the Dutch National Flag Algorithm?

The Dutch National Flag Algorithm is a programming problem proposed by Edsger Dijkstra where we need to sort an array containing three distinct values (traditionally represented by the colors of the Dutch flag: red, white, and blue).
The algorithm partitions the array into three sections in a single pass with constant space complexity.

## Key Characteristics

1. **Three-way partitioning**: Divides the array into three sections:

   - Elements less than the pivot (0s)
   - Elements equal to the pivot (1s)
   - Elements greater than the pivot (2s)

2. **In-place sorting**: Doesn't require additional memory space

3. **Single pass**: Processes the array in O(n) time

## Algorithm Steps

1. Initialize three pointers:

   - `low` - tracks the boundary of 0s (starts at beginning)
   - `high` - tracks the boundary of 2s (starts at end)
   - `current` - the current element being processed (starts at beginning)

2. While `current` <= `high`:
   - If element is 0: swap with `low` pointer, increment both `low` and `current`
   - If element is 1: just increment `current`
   - If element is 2: swap with `high` pointer, decrement `high`

## JavaScript Implementation

```javascript
function sortColors(nums) {
  let low = 0;
  let high = nums.length - 1;
  let current = 0;

  while (current <= high) {
    if (nums[current] === 0) {
      // Swap with low pointer
      [nums[current], nums[low]] = [nums[low], nums[current]];
      low++;
      current++;
    } else if (nums[current] === 2) {
      // Swap with high pointer
      [nums[current], nums[high]] = [nums[high], nums[current]];
      high--;
      // Don't increment current as we need to check the new element
    } else {
      // It's 1, just move forward
      current++;
    }
  }
}
```

# Euclidean Algorithm: Finding Greatest Common Divisor (GCD)

## Problem Understanding

The Euclidean Algorithm is used to find the Greatest Common Divisor (GCD) of two integers. The GCD is the largest positive integer that divides both numbers without leaving a remainder.

**Key Properties:**

- GCD(a, 0) = |a|
- GCD(a, b) = GCD(b, a mod b)
- GCD is commutative: GCD(a, b) = GCD(b, a)

---

## Approach 1: Euclidean Algorithm (Subtraction-based)

### Intuition

Repeatedly subtract the smaller number from the larger number until both numbers become equal.

```javascript
/**
 * Euclidean Algorithm using subtraction
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @return {number} - GCD of the two numbers
 */
function gcdSubtraction(num1, num2) {
  // Convert to absolute values since GCD is always positive
  let a = Math.abs(num1);
  let b = Math.abs(num2);

  // Handle edge case where both numbers are zero
  if (a === 0 && b === 0) return 0;

  // GCD(a, 0) = a
  if (a === 0) return b;
  if (b === 0) return a;

  // Repeatedly subtract smaller from larger
  while (a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }

  return a;
}
```

**Time Complexity:** O(max(a, b)) - Can be inefficient for large numbers  
**Space Complexity:** O(1)

---

## Approach 2: Euclidean Algorithm (Division-based - Optimal)

### Intuition

Use modulus operation instead of subtraction for faster convergence. This is the standard Euclidean algorithm.

```javascript
/**
 * Standard Euclidean Algorithm using modulus (Optimal)
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @return {number} - GCD of the two numbers
 */
function gcdEuclidean(num1, num2) {
  // Convert to absolute values
  let a = Math.abs(num1);
  let b = Math.abs(num2);

  // Handle edge cases
  if (a === 0 && b === 0) return 0;
  if (a === 0) return b;
  if (b === 0) return a;

  // Euclidean algorithm using modulus
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
}
```

**Time Complexity:** O(log(min(a, b))) - Much faster than subtraction  
**Space Complexity:** O(1)

---

## Approach 3: Recursive Euclidean Algorithm

### Intuition

A recursive implementation of the Euclidean algorithm for cleaner code.

```javascript
/**
 * Recursive implementation of Euclidean Algorithm
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @return {number} - GCD of the two numbers
 */
function gcdRecursive(num1, num2) {
  // Convert to absolute values
  const a = Math.abs(num1);
  const b = Math.abs(num2);

  // Base cases
  if (a === 0 && b === 0) return 0;
  if (a === 0) return b;
  if (b === 0) return a;

  // Recursive case
  if (a % b === 0) {
    return b;
  } else {
    return gcdRecursive(b, a % b);
  }
}
```

**Time Complexity:** O(log(min(a, b)))  
**Space Complexity:** O(log(min(a, b))) - Due to recursion stack

---

## Approach 4: Extended Euclidean Algorithm

### Intuition

Finds GCD and also coefficients x, y such that: ax + by = gcd(a, b)

```javascript
/**
 * Extended Euclidean Algorithm
 * Finds GCD and coefficients x, y such that: ax + by = gcd(a, b)
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @return {Object} - Object containing gcd, x, and y coefficients
 */
function extendedEuclidean(num1, num2) {
  let a = Math.abs(num1);
  let b = Math.abs(num2);

  // Handle edge cases
  if (a === 0 && b === 0) return { gcd: 0, x: 0, y: 0 };
  if (a === 0) return { gcd: b, x: 0, y: 1 };
  if (b === 0) return { gcd: a, x: 1, y: 0 };

  let x = 1,
    y = 0; // Coefficients for a
  let prevX = 0,
    prevY = 1; // Coefficients for b

  while (b !== 0) {
    const quotient = Math.floor(a / b);

    // Update a and b
    const temp = b;
    b = a % b;
    a = temp;

    // Update coefficients
    const tempX = x;
    const tempY = y;
    x = prevX - quotient * x;
    y = prevY - quotient * y;
    prevX = tempX;
    prevY = tempY;
  }

  // Adjust signs based on original inputs
  if (num1 < 0) prevX = -prevX;
  if (num2 < 0) prevY = -prevY;

  return {
    gcd: a,
    x: prevX,
    y: prevY,
  };
}
```

**Time Complexity:** O(log(min(a, b)))  
**Space Complexity:** O(1)

---

## Dry Run of Optimal Approach (Division-based)

### Example 1: gcd(56, 98)

```
Initial: a = 56, b = 98

Iteration 1:
  remainder = 56 % 98 = 56
  a = 98, b = 56

Iteration 2:
  remainder = 98 % 56 = 42
  a = 56, b = 42

Iteration 3:
  remainder = 56 % 42 = 14
  a = 42, b = 14

Iteration 4:
  remainder = 42 % 14 = 0
  a = 14, b = 0

Loop exits (b = 0)
Return a = 14

GCD(56, 98) = 14 ✓
```

### Example 2: gcd(270, 192)

```
Initial: a = 270, b = 192

Iteration 1:
  remainder = 270 % 192 = 78
  a = 192, b = 78

Iteration 2:
  remainder = 192 % 78 = 36
  a = 78, b = 36

Iteration 3:
  remainder = 78 % 36 = 6
  a = 36, b = 6

Iteration 4:
  remainder = 36 % 6 = 0
  a = 6, b = 0

Loop exits (b = 0)
Return a = 6

GCD(270, 192) = 6 ✓
```

### Example 3: gcd(17, 13) - Co-prime numbers

```
Initial: a = 17, b = 13

Iteration 1:
  remainder = 17 % 13 = 4
  a = 13, b = 4

Iteration 2:
  remainder = 13 % 4 = 1
  a = 4, b = 1

Iteration 3:
  remainder = 4 % 1 = 0
  a = 1, b = 0

Loop exits (b = 0)
Return a = 1

GCD(17, 13) = 1 ✓ (co-prime)
```

### Edge Case Examples:

**Example 4: gcd(0, 15)**

```
a = 0, b = 15
Since a === 0, immediately return b = 15
GCD(0, 15) = 15 ✓
```

**Example 5: gcd(0, 0)**

```
a = 0, b = 0
Special case: return 0
GCD(0, 0) = 0 ✓
```

**Example 6: gcd(-24, 18)**

```
Convert to absolute values: a = 24, b = 18

Iteration 1:
  remainder = 24 % 18 = 6
  a = 18, b = 6

Iteration 2:
  remainder = 18 % 6 = 0
  a = 6, b = 0

Return a = 6
GCD(-24, 18) = 6 ✓
```

---

## Complete Solution with All Approaches

```javascript
/**
 * Euclidean Algorithm - Complete Implementation
 */

// Approach 1: Subtraction-based
function gcdSubtraction(num1, num2) {
  let a = Math.abs(num1);
  let b = Math.abs(num2);

  if (a === 0 && b === 0) return 0;
  if (a === 0) return b;
  if (b === 0) return a;

  while (a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }

  return a;
}

// Approach 2: Division-based (Optimal)
function gcdEuclidean(num1, num2) {
  let a = Math.abs(num1);
  let b = Math.abs(num2);

  if (a === 0 && b === 0) return 0;
  if (a === 0) return b;
  if (b === 0) return a;

  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
}

// Approach 3: Recursive
function gcdRecursive(num1, num2) {
  const a = Math.abs(num1);
  const b = Math.abs(num2);

  if (a === 0 && b === 0) return 0;
  if (a === 0) return b;
  if (b === 0) return a;

  if (a % b === 0) {
    return b;
  } else {
    return gcdRecursive(b, a % b);
  }
}

// Approach 4: Extended Euclidean Algorithm
function extendedEuclidean(num1, num2) {
  let a = Math.abs(num1);
  let b = Math.abs(num2);

  if (a === 0 && b === 0) return { gcd: 0, x: 0, y: 0 };
  if (a === 0) return { gcd: b, x: 0, y: 1 };
  if (b === 0) return { gcd: a, x: 1, y: 0 };

  let x = 1,
    y = 0;
  let prevX = 0,
    prevY = 1;

  while (b !== 0) {
    const quotient = Math.floor(a / b);

    const temp = b;
    b = a % b;
    a = temp;

    const tempX = x;
    const tempY = y;
    x = prevX - quotient * x;
    y = prevY - quotient * y;
    prevX = tempX;
    prevY = tempY;
  }

  if (num1 < 0) prevX = -prevX;
  if (num2 < 0) prevY = -prevY;

  return {
    gcd: a,
    x: prevX,
    y: prevY,
  };
}

// Utility function to verify extended Euclidean result
function verifyExtendedEuclidean(a, b, result) {
  const verification = a * result.x + b * result.y;
  return verification === result.gcd;
}

// Test cases
console.log("Testing Euclidean Algorithm Implementations:");
const testCases = [
  [56, 98],
  [270, 192],
  [17, 13],
  [0, 15],
  [15, 0],
  [0, 0],
  [-24, 18],
  [48, 18],
  [101, 103], // Prime numbers
];

testCases.forEach(([a, b]) => {
  console.log(`\nGCD(${a}, ${b}):`);
  console.log(`Subtraction: ${gcdSubtraction(a, b)}`);
  console.log(`Euclidean: ${gcdEuclidean(a, b)}`);
  console.log(`Recursive: ${gcdRecursive(a, b)}`);

  const extendedResult = extendedEuclidean(a, b);
  console.log(
    `Extended: GCD = ${extendedResult.gcd}, coefficients: x = ${extendedResult.x}, y = ${extendedResult.y}`
  );
  console.log(
    `Verification: ${a}*${extendedResult.x} + ${b}*${extendedResult.y} = ${
      extendedResult.gcd
    } (${verifyExtendedEuclidean(a, b, extendedResult)})`
  );
});
```

## Complexity Analysis Summary

| Approach           | Time Complexity   | Space Complexity  | Use Case                        |
| ------------------ | ----------------- | ----------------- | ------------------------------- |
| Subtraction        | O(max(a, b))      | O(1)              | Educational, small numbers      |
| Division (Optimal) | O(log(min(a, b))) | O(1)              | General purpose, most efficient |
| Recursive          | O(log(min(a, b))) | O(log(min(a, b))) | Clean code, small numbers       |
| Extended           | O(log(min(a, b))) | O(1)              | When coefficients needed        |

## Key Insights

1. **Mathematical Foundation**: GCD(a, b) = GCD(b, a mod b)
2. **Edge Cases**: Handle zeros and negative numbers properly
3. **Efficiency**: Division-based approach is optimal for practical use
4. **Extended Version**: Useful for solving linear Diophantine equations and modular inverses

**Recommendation**: Use the division-based Euclidean algorithm for general GCD calculations due to its optimal time complexity and constant space usage.
