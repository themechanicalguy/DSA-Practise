# 12. Integer to Roman

## Problem Understanding

The goal is to convert a positive integer into a Roman numeral string based on the given rules.
Roman numerals are constructed by processing the decimal place values (thousands, hundreds, tens, units) from `highest to lowest`, converting each into the appropriate symbols `(M, D, C, L, X, V, I)` while respecting the subtractive notation (e.g., IV for 4, IX for 9) and the rule against repeating certain symbols more than three times.

## Intuition

The problem requires converting a decimal number to a Roman numeral following specific rules. Roman numerals are constructed by combining letters from a fixed set where each letter represents a specific value. The key challenges are:

1. Handling subtractive combinations (like IV for 4 or IX for 9)
2. Ensuring symbols aren't repeated more than allowed (max 3 for I, X, C, M)
3. Building the numeral from largest to smallest value

## Approaches

### Approach 1: Greedy Algorithm with Value-Symbol Mapping

Use a predefined array of value-symbol pairs, greedily selecting the largest possible Roman numeral value from the number and append the corresponding symbol to the result until the number is reduced to zero..

```javascript
function intToRoman(num) {
  // Create an array of value-symbol pairs in descending order
  // This includes both regular symbols and subtractive combinations
  const valueSymbols = [
    [1000, "M"], // 1000 -> M
    [900, "CM"], // 900 -> CM (subtractive)
    [500, "D"], // 500 -> D
    [400, "CD"], // 400 -> CD (subtractive)
    [100, "C"], // 100 -> C
    [90, "XC"], // 90 -> XC (subtractive)
    [50, "L"], // 50 -> L
    [40, "XL"], // 40 -> XL (subtractive)
    [10, "X"], // 10 -> X
    [9, "IX"], // 9 -> IX (subtractive)
    [5, "V"], // 5 -> V
    [4, "IV"], // 4 -> IV (subtractive)
    [1, "I"], // 1 -> I
  ];

  let roman = ""; // Initialize the result string

  // Iterate through each value-symbol pair
  for (const [value, symbol] of valueSymbols) {
    // While the current number is greater than or equal to the current value
    while (num >= value) {
      roman += symbol; // Append the symbol to the result
      num -= value; // Subtract the value from the number
    }
    // Early exit if we've reduced the number to zero
    if (num === 0) break;
  }

  return roman; // Return the constructed Roman numeral
}
```

### How It Works:

- Define an array romanMap with value-symbol pairs, including subtractive forms (e.g., 900 = CM).
- Iterate through the array, repeatedly subtracting the largest possible value and appending its symbol.
- Continue until the input number becomes 0.

**Time Complexity:** O(1). The input is bounded (1 ≤ num ≤ 3999), and the loop iterates over a fixed set of 13 symbols, with a constant number of subtractions (at most 3999/1 = 3999, but practically much less).
**Space Complexity:** O(1). Only a fixed-size array and a string are used, regardless of input size.

### Approach 2: Hardcoded Digit Conversion

This approach processes each digit of the number separately (thousands, hundreds, tens, units) and converts each digit to its Roman numeral representation using hardcoded mappings for each place value.

## Solution Code

### Approach 2: Hardcoded Digit Conversion

```javascript
function intToRoman(num) {
  const thousands = ["", "M", "MM", "MMM"];
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const units = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return (
    thousands[Math.floor(num / 1000)] +
    hundreds[Math.floor((num % 1000) / 100)] +
    tens[Math.floor((num % 100) / 10)] +
    units[num % 10]
  );
}
```

- Time Complexity: O(1) - The operations are all constant time lookups and divisions.
- Space Complexity: O(1) - Uses fixed-size arrays for digit mappings.

## Dry Run Examples

### Example 1: 3749

1. Greedy Approach:

   - 3749 >= 1000: 'M', num = 2749
   - 2749 >= 1000: 'MM', num = 1749
   - 1749 >= 1000: 'MMM', num = 749
   - 749 >= 500: 'MMMD', num = 249
   - 249 >= 100: 'MMMDC', num = 149
   - 149 >= 100: 'MMMDCC', num = 49
   - 49 >= 40: 'MMMDCCXL', num = 9
   - 9 >= 9: 'MMMDCCXLIX', num = 0
   - Result: "MMMDCCXLIX"

2. Digit Conversion:
   - Thousands: 3749/1000 = 3 → 'MMM'
   - Hundreds: (3749%1000)/100 = 7 → 'DCC'
   - Tens: (3749%100)/10 = 4 → 'XL'
   - Units: 3749%10 = 9 → 'IX'
   - Combined: "MMM" + "DCC" + "XL" + "IX" = "MMMDCCXLIX"

### Example 2: 58

1. Greedy Approach:

   - 58 >= 50: 'L', num = 8
   - 8 >= 5: 'LV', num = 3
   - 3 >= 1: 'LVI', num = 2
   - 2 >= 1: 'LVII', num = 1
   - 1 >= 1: 'LVIII', num = 0
   - Result: "LVIII"

2. Digit Conversion:
   - Thousands: 0 → ''
   - Hundreds: 0 → ''
   - Tens: 5 → 'L'
   - Units: 8 → 'VIII'
   - Combined: "" + "" + "L" + "VIII" = "LVIII"

### Example 3: 1994

1. Greedy Approach:

   - 1994 >= 1000: 'M', num = 994
   - 994 >= 900: 'CM', num = 94
   - 94 >= 90: 'CMXC', num = 4
   - 4 >= 4: 'CMXCIV', num = 0
   - Result: "MCMXCIV"

2. Digit Conversion:
   - Thousands: 1 → 'M'
   - Hundreds: 9 → 'CM'
   - Tens: 9 → 'XC'
   - Units: 4 → 'IV'
   - Combined: "M" + "CM" + "XC" + "IV" = "MCMXCIV"

Both approaches correctly handle all cases, including edge cases with subtractive notation and maximum repetitions. The greedy approach is more flexible if the Roman numeral rules were to change, while the digit conversion approach might be slightly faster due to direct array lookups.
