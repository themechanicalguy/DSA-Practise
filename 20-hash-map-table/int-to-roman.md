# Roman Numeral Conversion: Intuition and Approaches

Given an integer, convert it to a Roman numeral.

Example 1:

- Input: num = 3749
- Output: "MMMDCCXLIX"
- Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
700 = DCC as 500 (D) + 100 (C) + 100 (C)
40 = XL as 10 (X) less of 50 (L)
9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places

Example 2:

- Input: num = 58
- Output: "LVIII"
- Explanation:
  50 = L
  8 = VIII

## Intuition

The problem requires converting a decimal number to a Roman numeral following specific rules. The key observations are:

1. Roman numerals are constructed by combining letters from the highest value to the lowest
2. There are special cases for subtractive notation (like IV for 4, IX for 9, etc.)
3. We can either handle these cases with conditionals or use a predefined mapping of values to symbols

## Approaches

### 1. Greedy Approach with Subtraction

This approach uses a list of value-symbol pairs in descending order. For each value, we repeatedly subtract it from the number and append the corresponding symbol until the number is reduced to zero.

```javascript
/**
 * Converts an integer to a Roman numeral using the greedy approach.
 * @param {number} num - The integer to convert (1 <= num <= 3999)
 * @return {string} - The Roman numeral representation
 */
function intToRoman(num) {
  const valueSymbols = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let romanStr = "";

  for (const [value, symbol] of valueSymbols) {
    while (num >= value) {
      romanStr += symbol;
      num -= value;
    }
    if (num === 0) break;
  }

  return romanStr;
}

// Time Complexity: O(1) - Since the loop runs for a fixed number of times (13 times)
// Space Complexity: O(1) - Fixed space for the valueSymbols array
```

### Approach 2: Direct Mapping with Place Values

This approach handles each digit of the number separately (thousands, hundreds, tens, units) and maps each to its Roman numeral representation using predefined patterns.

```javascript
/**
 * Converts an integer to a Roman numeral using place value mapping.
 * @param {number} num - The integer to convert (1 <= num <= 3999)
 * @return {string} - The Roman numeral representation
 */
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

// Time Complexity: O(1) - Constant time operations
// Space Complexity: O(1) - Fixed space for the mapping arrays
```

## Dry Run Examples

### Example 1: num = 3749

**Approach 1:**

1. 3749 >= 1000 → 'M', num = 2749
2. 2749 >= 1000 → 'MM', num = 1749
3. 1749 >= 1000 → 'MMM', num = 749
4. 749 >= 500 → 'MMMD', num = 249
5. 249 >= 100 → 'MMMDC', num = 149
6. 149 >= 100 → 'MMMDCC', num = 49
7. 49 >= 40 → 'MMMDCCXL', num = 9
8. 9 >= 9 → 'MMMDCCXLIX', num = 0
   Result: "MMMDCCXLIX"

**Approach 2:**

1. thousands[3] = 'MMM'
2. hundreds[7] = 'DCC'
3. tens[4] = 'XL'
4. units[9] = 'IX'
   Combined: "MMMDCCXLIX"

### Example 2: num = 58

**Approach 1:**

1. 58 >= 50 → 'L', num = 8
2. 8 >= 5 → 'LV', num = 3
3. 3 >= 1 → 'LVI', num = 2
4. 2 >= 1 → 'LVII', num = 1
5. 1 >= 1 → 'LVIII', num = 0
   Result: "LVIII"

**Approach 2:**

1. thousands[0] = ''
2. hundreds[0] = ''
3. tens[5] = 'L'
4. units[8] = 'VIII'
   Combined: "LVIII"

### Example 3: num = 1994

**Approach 1:**

1. 1994 >= 1000 → 'M', num = 994
2. 994 >= 900 → 'CM', num = 94
3. 94 >= 90 → 'CMXC', num = 4
4. 4 >= 4 → 'CMXCIV', num = 0
   Result: "MCMXCIV"

**Approach 2:**

1. thousands[1] = 'M'
2. hundreds[9] = 'CM'
3. tens[9] = 'XC'
4. units[4] = 'IV'
   Combined: "MCMXCIV"

Both approaches efficiently handle all cases, including edge cases like numbers with 4s and 9s in different places. The greedy approach is more flexible for extending to larger numbers, while the direct mapping approach is very efficient for the constrained problem space (1-3999).
