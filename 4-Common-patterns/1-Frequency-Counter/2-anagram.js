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
  for (let i = 0; i < str1.length; i++) {
    let char1 = str1[i];
    freq1[char1] = (freq1[char1] || 0) + 1;
  }
  console.log(freq1);
  //   Checking for the same occurence of character in str2;
  for (let j = 1; j < str2.length; j++) {
    let char = str2[j];
    if (!freq1[char]) return false;

    freq1[char]--;
    if (freq1[char] < 0) return false; // if the freq of a paticular character goes less than 0 then the anagram is false
  }
  return true;
}

isAnagram([], []);
isAnagram("rat", "air");
isAnagram("abbc", "abcc");
