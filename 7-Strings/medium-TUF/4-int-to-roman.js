// LC - 12 Integer to Roman
// Given an integer, convert it to a roman numeral.
// Input: num = 4
// Output: "IV"
// Input: num = 9
// Output: "IX"
// Input: num = 58
// Output: "LVIII"
// Explanation: L = 50, V= 5, III = 3.
// Input: num = 1994
// Output: "MCMXCIV"
// Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
/**
 * Intuition
 * The problem requires converting a decimal number to a Roman numeral following specific rules. The key insights are:
 * Roman numerals are constructed by combining letters from the highest value to the lowest.
 * There are special cases for subtractive notation (like IV for 4, IX for 9) that must be handled separately.
 * We can approach this problem either by:
     Using a greedy algorithm that subtracts the largest possible values at each step
     Creating a mapping of all possible values and their corresponding symbols, including the subtractive cases
 */

//  Approach 1: Greedy Algorithm with Ordered Values
function intToRoman(num) {
  // Create a list of value-symbol pairs in descending order
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
    // Append the symbol while we can subtract the value
    while (num >= value) {
      romanStr += symbol;
      num -= value;
    }
    // Early exit if we've processed the entire number
    if (num === 0) break;
  }
  return romanStr;
}
