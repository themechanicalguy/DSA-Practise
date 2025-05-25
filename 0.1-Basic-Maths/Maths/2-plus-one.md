# LC-66. Plus One

## Problem Understanding

We need to increment a large integer represented as an array of digits (where each element is a digit from 0-9) by one. The challenge is to handle the carry-over correctly when we have trailing 9's (e.g., [1,2,9] becomes [1,3,0], and [9,9] becomes [1,0,0]).

## Approaches

### Approach 1: Schoolbook Addition with Carry

This approach mimics how we would add numbers manually, starting from the least significant digit (end of array) and moving left while handling carry.

```javascript
/**
 * Increments a large integer represented as an array of digits by one.
 * @param {number[]} digits - Array representing the large integer (MSD first)
 * @return {number[]} - Resulting array after increment
 */
function plusOne(digits) {
  let carry = 1; // Start with carry=1 to implement the "+1" operation

  // Process digits from least significant to most
  for (let i = digits.length - 1; i >= 0; i--) {
    let sum = digits[i] + carry;
    digits[i] = sum % 10;
    carry = Math.floor(sum / 10);

    // Early exit if no more carry to propagate
    if (carry === 0) {
      break;
    }
  }

  // If there's carry left after processing all digits
  if (carry > 0) {
    digits.unshift(carry);
  }

  return digits;
}
```

### Approach 2: Convert to Number and Back (Limited Use)

This approach converts the array to a number, increments it, then converts back to an array. This won't work for very large numbers due to JavaScript's number precision limitations.

```javascript
/**
 * Increments by converting to number (only works for small numbers)
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOneNumberConversion(digits) {
  // Convert array to number - this will fail for very large numbers
  const num = parseInt(digits.join(""), 10) + 1;

  // Convert back to array
  return num.toString().split("").map(Number);
}
```

### Approach 3: Optimized Carry Handling (Best Approach)

This is similar to the first approach but optimized to stop early if no more carry needs to be propagated.

```javascript
/**
 * Optimized version that handles carry more efficiently
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOneOptimized(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits; // No carry to propagate, return immediately
    }
    digits[i] = 0; // Set current digit to 0 and carry over
  }

  // If we're here, all digits were 9, so we need to add a 1 at front
  // return [1, ...digits];
  digits.push(0);
  digits[0] = 1;
  return digits;
}
```

## Complexity Analysis

### Approach 1 (Schoolbook Addition):

- Time Complexity: O(n) in worst case (when we have to carry all the way), O(1) in best case (no carry)
- Space Complexity: O(1) (in-place modification), O(n) if we consider unshift operation which may require array reallocation

### Approach 2 (Number Conversion):

- Time Complexity: O(n) for conversions
- Space Complexity: O(n) for new array creation
- Note: This approach fails for very large numbers (greater than Number.MAX_SAFE_INTEGER)

### Approach 3 (Optimized Carry Handling):

- Time Complexity: O(n) in worst case, O(1) in best case
- Space Complexity: O(1) for most cases, O(n) only when we need to add a new digit (all 9s case)

## Dry Run Examples

### Example 1: No carry propagation

Input: [1, 2, 3]

- Start from end: 3 → 3+1=4 (no carry)
- Result: [1, 2, 4]

### Example 2: Single carry

Input: [1, 2, 9]

- 9 → 9+1=10 (set to 0, carry 1)
- 2 → 2+1=3 (no further carry)
- Result: [1, 3, 0]

### Example 3: All 9s (edge case)

Input: [9, 9, 9]

- First 9 → 0, carry 1
- Second 9 → 0, carry 1
- Third 9 → 0, carry 1
- Still have carry → add 1 at beginning
- Result: [1, 0, 0, 0]

The optimized approach (Approach 3) is generally the best as it:

1. Handles all cases correctly
2. Has early termination when possible
3. Is easy to understand and maintain
4. Has optimal time and space complexity for most cases
