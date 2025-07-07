# LC 13. Roman to Integer

## Intuition

Roman numerals follow specific rules where symbols are added from left to right in descending order of value. However, there are special cases where a smaller numeral precedes a larger one, indicating subtraction (like IV for 4 or IX for 9).

The key insight is that when a smaller value appears before a larger value, it should be subtracted rather than added. Otherwise, we simply accumulate the values.

## Approaches

### 1. Left-to-Right Pass with Subtraction Detection

This approach scans the string from left to right, adding the corresponding values. If a smaller value appears before a larger value, we subtract the smaller value (since we've already added it in the previous step, we subtract twice its value).

```javascript
/**
 * Converts Roman numerals to integer using left-to-right approach
 * @param {string} s - Roman numeral string
 * @return {number} - Converted integer
 */
function romanToInt(s) {
  // Create a mapping of Roman numeral characters to their values
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0; // Initialize the total value

  // Loop through each character in the string from left to right
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanValues[s[i]]; // Get value of current character
    const nextValue = romanValues[s[i + 1]]; // Get value of next character

    // Check if subtraction case exists (current value < next value)
    if (nextValue > currentValue) {
      // Add the difference (nextValue - currentValue) to total
      total += nextValue - currentValue;
      i++; // Skip the next character since we've already processed it
    } else {
      // Normal case: add current value to total
      total += currentValue;
    }
  }

  return total; // Return the computed total
}
```

**Time Complexity:** O(n) - We traverse the string once
**Space Complexity:** O(1) - We use constant space for the value mapping

### Solution 2: Right-to-Left Pass

This approach starts from the end of the string and moves left. We keep track of the largest value seen so far. If the current value is smaller than the largest seen, we subtract it; otherwise, we add it and update the largest value.

```javascript
/**
 * Converts Roman numerals to integer using right-to-left approach
 * @param {string} s - Roman numeral string
 * @return {number} - Converted integer
 */
function romanToInt(s) {
  // Create a mapping of Roman numeral characters to their values
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0; // Initialize the total value
  let prevValue = 0; // Track the previous value for subtraction cases

  // Loop through each character in the string from right to left
  for (let i = s.length - 1; i >= 0; i--) {
    const currentValue = romanValues[s[i]]; // Get value of current character

    // If current value is less than previous value, it's a subtraction case
    if (currentValue < prevValue) {
      total -= currentValue; // Subtract current value
    } else {
      total += currentValue; // Otherwise, add current value
    }

    prevValue = currentValue; // Update previous value for next iteration
  }

  return total; // Return the computed total
}
```

**Time Complexity:** O(n) - We traverse the string once
**Space Complexity:** O(1) - We use constant space for the value mapping

## Dry Run of Optimal Approach (Right-to-Left)

Let's test the right-to-left approach with the given examples:

### Example 1: "III"

1. i=2: 'I' (1), prev=0 → add 1 (total=1)
2. i=1: 'I' (1), prev=1 → add 1 (total=2)
3. i=0: 'I' (1), prev=1 → add 1 (total=3)
   Result: 3

### Example 2: "LVIII"

1. i=4: 'I' (1), prev=0 → add 1 (total=1)
2. i=3: 'I' (1), prev=1 → add 1 (total=2)
3. i=2: 'I' (1), prev=1 → add 1 (total=3)
4. i=1: 'V' (5), prev=1 → add 5 (total=8)
5. i=0: 'L' (50), prev=5 → add 50 (total=58)
   Result: 58

### Example 3: "MCMXCIV" (Edge case with all subtraction combinations)

1. i=6: 'V' (5), prev=0 → add 5 (total=5)
2. i=5: 'I' (1), prev=5 → subtract 1 (total=4)
3. i=4: 'C' (100), prev=1 → add 100 (total=104)
4. i=3: 'X' (10), prev=100 → subtract 10 (total=94)
5. i=2: 'M' (1000), prev=10 → add 1000 (total=1094)
6. i=1: 'C' (100), prev=1000 → subtract 100 (total=994)
7. i=0: 'M' (1000), prev=100 → add 1000 (total=1994)
   Result: 1994

The right-to-left approach efficiently handles all cases, including the subtraction combinations, by comparing each digit with the previous one processed.
