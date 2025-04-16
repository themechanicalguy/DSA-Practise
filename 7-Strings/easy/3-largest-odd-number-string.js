//LC 1903 Largest Odd Number in String
/* 
You are given a string num, representing a large integer. Return the largest-valued odd integer (as a string) that is a non-empty substring of num, 
or an empty string "" if no odd integer exists.
A substring is a contiguous sequence of characters within a string.

Example 1:

Input: num = "52"
Output: "5"
Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.

Example 2:
Input: num = "4206"
Output: ""
Explanation: There are no odd numbers in "4206".

Example 3:
Input: num = "35427"
Output: "35427"
Explanation: "35427" is already odd, so we return it.


*/

//Approach 1: Greedy Search from the End

/**
 * Finds the largest odd substring in a number string.
 * @param {string} num - The input number as a string
 * @return {string} - The largest odd substring or empty string
 */
function largestOddNumberFromEnd(num) {
  // Iterate from the end of the string towards the beginning
  for (let i = num.length - 1; i >= 0; i--) {
    // Check if the current digit is odd
    if (parseInt(num[i]) % 2 !== 0) {
      // Return the substring from start to current index (inclusive)
      return num.substring(0, i + 1);
    }
  }
  // If no odd digit found, return empty string
  return "";
}

//Approach 2: Generate All Substrings and Check
/**
 * Finds the largest odd substring by checking all possible substrings.
 * @param {string} num - The input number as a string
 * @return {string} - The largest odd substring or empty string
 */
function largestOddNumberBruteForce(num) {
  let largestOdd = "";

  // Generate all possible substrings
  for (let i = 0; i < num.length; i++) {
    for (let j = i + 1; j <= num.length; j++) {
      const currentSubstring = num.substring(i, j);
      // Check if the last digit is odd
      if (parseInt(currentSubstring.slice(-1)) % 2 !== 0) {
        // Update largestOdd if current is longer (and thus larger)
        if (currentSubstring.length > largestOdd.length) {
          largestOdd = currentSubstring;
        } else if (currentSubstring.length === largestOdd.length) {
          // If same length, compare numerically
          if (currentSubstring > largestOdd) {
            largestOdd = currentSubstring;
          }
        }
      }
    }
  }

  return largestOdd;
}

//Approach 3: Optimized with Early Termination
/**
 * Optimized approach to find largest odd substring.
 * @param {string} num - The input number as a string
 * @return {string} - The largest odd substring or empty string
 */
function largestOddNumberOptimized(num) {
  // If the entire number is odd, return it immediately
  if (parseInt(num.slice(-1)) % 2 !== 0) {
    return num;
  }

  let rightmostOddIndex = -1;

  // Find the rightmost odd digit
  for (let i = num.length - 1; i >= 0; i--) {
    if (parseInt(num[i]) % 2 !== 0) {
      rightmostOddIndex = i;
      break;
    }
  }

  // If found, return substring up to that index
  if (rightmostOddIndex !== -1) {
    return num.substring(0, rightmostOddIndex + 1);
  }

  return "";
}
