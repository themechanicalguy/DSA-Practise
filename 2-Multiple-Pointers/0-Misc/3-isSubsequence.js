/**
 * Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some 
(can be none) of the characters without disturbing the relative positions of the 
remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false

 * 
 */

// Input: s = "abc", t = "ahcgdb"
// Naive Approach:
function subsequence(sub, str) {
  if (sub.length > str.length) return false;
  for (let i = 0; i < sub.length; i++) {
    let flag = 0;
    console.log(sub[i]);
    for (let j = 0; j < str.length; j++) {
      console.log(str[j]);
      if (sub[i] === str[j]) {
        flag = 1;
      }
    }
    if (flag === 0) return false;
  }
  return true;
}

// Refactored
function subSequence(sub, str) {
  if (sub.length > str.length) return false;
  let i = 0;
  // loop through str once and check for all char of sub in str
  for (let j = 0; j < str.length; j++) {
    if (str[j] === sub[i]) {
      i++;
    }
    if (i == sub.length) {
      return true;
    }
  }
  return false;
}
subSequence("abc", "ahbgdc");
