//LC-151 Reverse Words in a String
// Given an input string s, reverse the order of the words.
// A word is defined as a sequence of non-space characters.
// The words in s will be separated by at least one space.
// Return a string of the words in reverse order concatenated by a single space.
// Note that s may contain leading or trailing spaces or multiple spaces between two words.
// The returned string should only have a single space separating the words.
// Do not include any extra spaces.
//
// Example 1:
// Input: s = "the sky is blue"
// Output: "blue is sky the"

//Approach 1: Using Built-in Functions

/**
 * Reverses the order of words in a string using a stack
 * @param {string} inputString - The input string to process
 * @return {string} The string with words in reverse order
 */
var reverseWords = function (s) {
  res = "";
  const seperatedStrs = s.trim().split(" ");
  for (let i = seperatedStrs.length - 1; i >= 0; i--) {
    if (seperatedStrs[i] !== "" && i !== 0) res += seperatedStrs[i] + " ";
    else if (seperatedStrs[i] !== "" && i === 0) res += seperatedStrs[i];
  }
  return res;
};

// Approach 2: Using Stack
/**
 * Reverses the order of words in a string using a stack
 * @param {string} inputString - The input string to process
 * @return {string} The string with words in reverse order
 */
function reverseWordsStack(inputString) {
  const wordStack = [];
  let currentWord = "";

  // Process each character and build words
  for (const char of inputString) {
    if (char !== " ") {
      currentWord += char;
    } else if (currentWord) {
      wordStack.push(currentWord);
      currentWord = "";
    }
  }

  // Push the last word if it exists
  if (currentWord) {
    wordStack.push(currentWord);
  }

  // Build the reversed string by popping from stack
  let reversedString = "";
  while (wordStack.length > 0) {
    reversedString += wordStack.pop();
    if (wordStack.length > 0) {
      reversedString += " ";
    }
  }

  return reversedString;
}

//Approach 3: Two Pointers (Optimized for Space)

/**
 * Reverses the order of words in a string using two pointers
 * @param {string} inputString - The input string to process
 * @return {string} The string with words in reverse order
 */
function reverseWordsTwoPointers(inputString) {
  let reversedResult = "";
  let end = inputString.length;

  // Process the string from end to beginning
  for (let start = inputString.length - 1; start >= 0; start--) {
    if (inputString[start] === " ") {
      end = start; // Move end to current space position
    } else if (start === 0 || inputString[start - 1] === " ") {
      // If we're at the start or previous char is space, we found a word
      if (reversedResult.length > 0) {
        reversedResult += " "; // Add space before next word
      }
      reversedResult += inputString.substring(start, end);
    }
  }

  return reversedResult;
}
