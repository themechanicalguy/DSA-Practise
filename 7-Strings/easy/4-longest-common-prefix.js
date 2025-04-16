//LC- 14 Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".
// Example 1:

// Input: strs = ["flower","flow","flight"]
// Output: "fl"

//Approach 1: Horizontal Scanning
/**
 * Finds the longest common prefix by comparing each string with the current prefix
 * @param {string[]} stringsArray - Array of strings to compare
 * @return {string} - Longest common prefix
 */
function longestCommonPrefixHorizontal(stringsArray) {
  if (stringsArray.length === 0) return "";

  // Start with the first string as the initial prefix
  let prefix = stringsArray[0];

  // Compare the current prefix with each subsequent string
  for (let i = 1; i < stringsArray.length; i++) {
    const currentString = stringsArray[i];
    let j = 0;

    // Find the matching characters between prefix and current string
    while (
      j < prefix.length &&
      j < currentString.length &&
      prefix[j] === currentString[j]
    ) {
      j++;
    }

    // Update the prefix to the common part
    prefix = prefix.substring(0, j);

    // If prefix becomes empty, no common prefix exists
    if (prefix === "") break;
  }

  return prefix;
}
//Approach 2: Vertical Scanning
/**
 * Finds the longest common prefix by comparing characters vertically (column by column)
 * @param {string[]} stringsArray - Array of strings to compare
 * @return {string} - Longest common prefix
 */
/**
 * Finds the longest common prefix among an array of strings using vertical scanning.
 * @param {string[]} strings - The array of strings to compare.
 * @return {string} - The longest common prefix, or an empty string if none exists.
 */
var longestCommonPrefix = function (strings) {
  // If the input array is empty, return an empty string immediately
  if (strings.length === 0) return "";

  // Iterate through each character of the first string
  for (let charIndex = 0; charIndex < strings[0].length; charIndex++) {
    // Get the current character from the first string
    const currentChar = strings[0][charIndex];

    // Compare this character with the same position in all other strings
    for (let stringIndex = 1; stringIndex < strings.length; stringIndex++) {
      // If we've reached the end of any string or characters don't match
      if (
        charIndex === strings[stringIndex].length ||
        strings[stringIndex][charIndex] !== currentChar
      ) {
        // Return the common prefix found so far
        return strings[0].substring(0, charIndex);
      }
    }
  }

  // If all characters matched in all strings, return the entire first string
  return strings[0];
};
