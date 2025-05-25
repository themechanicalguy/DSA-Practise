//LC-13 Roman to Integer
// Given a roman numeral, convert it to an integer.
// Input: s = "III"
// Output: 3
// Input: s = "IV"
// Output: 4
// Input: s = "IX"
// Output: 9
// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.

/**
 * Intuition for Solving the Problem
    * Roman numerals are a combination of symbols (I, V, X, L, C, D, M) representing specific values. 
    * The key to converting them to an integer lies in understanding their rules:
        **Default Rule (Additive): 
            Roman numerals are generally written from largest to smallest (left to right), and you add their values. 
            For example, "XII" = X (10) + I (1) + I (1) = 12.
        **Subtraction Rule (Special Cases): 
            When a smaller symbol precedes a larger one, you subtract the smaller value from the larger one. 
            There are six specific cases:
                IV = 5 - 1 = 4
                IX = 10 - 1 = 9
                XL = 50 - 10 = 40
                XC = 100 - 10 = 90
                CD = 500 - 100 = 400
                CM = 1000 - 100 = 900
        **Key Insight for Processing:
            To handle both addition and subtraction, we can process the string by comparing adjacent symbols.
            If the current symbol’s value is less than the next symbol’s value, it indicates a subtraction case (e.g., in "IV", I < V, so subtract I).
            Otherwise, it’s an addition case (e.g., in "VI", V ≥ I, so add V).
 */

//Approach 1: Left-to-Right Pass with Subtraction Handling
/**
 * Converts Roman numeral to integer using left-to-right pass with subtraction handling
 * @param {string} s - Roman numeral string
 * @return {number} - Converted integer
 */
function romanToInt(s) {
  // Create a map of Roman numeral values
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanValues[s[i]];
    const nextValue = romanValues[s[i + 1]];
    // If current value is less than next value, subtract current value
    if (nextValue && currentValue < nextValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }
  }

  return total;
}

//Approach 2: Right-to-Left Pass with Subtraction Handling
/**
 * Converts Roman numeral to integer using right-to-left pass
 * @param {string} s - Roman numeral string
 * @return {number} - Converted integer
 */
function romanToInt(s) {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = romanValues[s[s.length - 1]]; // Start with last character

  for (let i = s.length - 2; i >= 0; i--) {
    const currentValue = romanValues[s[i]];
    const nextValue = romanValues[s[i + 1]];

    // If current value is less than next value, subtract current value
    // Otherwise add it
    if (currentValue < nextValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }
  }

  return total;
}
