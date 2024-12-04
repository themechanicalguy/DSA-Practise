/**
 * Given two strings, write a function to determine if the second string is an anagram of first
 * An anagram is a word, phrase or name formed by rearranging the letters of another, such as Cinema, Iceman
 */

// Problem Solving Approach
// 1- Given 2 strings, return true if both the strings have same occurence of characters.
// 2 - Inputs that should go into the problem - 2 strings
// 3 - Outputs to come - boolean - True or False
// 4 - Can the output be determined from the input Or Do i have enought information to solve the problem
//      Problably Yes
// 5 - How to label the important Piece if data that are part of the problem?

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  let freq1 = {};
  for (let s of str1) {
    freq1[s] = (freq1[s] || 0) + 1;
  }

  //   Checking for the same occurence of characters present in freq1 with str2;
  for (let item of str2) {
    if (!freq1[item]) return false;
    // if repetation is there delete the character -- IMP Step
    else freq1[item]--;
  }
  return true;
}

isAnagram([], []);
isAnagram("rat", "air");
isAnagram("abbc", "abcc");
