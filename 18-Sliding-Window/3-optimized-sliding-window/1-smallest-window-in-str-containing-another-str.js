//https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1

// Given two strings. Find the smallest window in the first string consisting of all the characters of the second string.
// Example 1:
// Input:
// S = timetopractice
// P = toc
// Output: toprac
// Explanation: toprac is the smallest
// substring in which toc can be found.
// Example 2:
// Input:
// S = zoomlazapzo
// P = oza
// Output: apzo
// Explanation: apzo is the smallest
// substring in which oza can be found.

function minWindow(s1, s2) {
  if (s1.length < s2.length) return "";
  //Initialize Character Frequency Map
  let charCount = new Map();
  //Create a frequency map for all characters in s2, where each key represents a character and the value represents the number of times it appears in s2.

  for (let char of s2) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  //Initialize Two Pointers (left and right)
  //Use left to mark the start of the window and right to expand the window.
  //Keep track of the number of required characters using a count variable (number of unique characters in s2 that need to be matched).
  let left = 0,
    minLen = Infinity,
    minStart = 0,
    count = charCount.size;

  //Expand the Right Pointer (right) to Find a Valid Window
  //Move right across s1, updating the frequency count of characters found.
  for (let right = 0; right < s1.length; right++) {
    if (charCount.has(s1[right])) {
      charCount.set(s1[right], charCount.get(s1[right]) - 1);
      //If a required character count becomes 0, decrease count (indicating that character is fully matched).
      if (charCount.get(s1[right]) === 0) count--;
    }
    //Once all characters of s2 are present (count == 0), check if the current window is the smallest.
    while (count === 0) {
      //check if the current window is the smallest and update minLen and minStart accordingly.
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      //Shrink the Window from the Left
      //If the left character is a required character, update the frequency count.
      if (charCount.has(s1[left])) {
        //Increase the frequency of the character at the left pointer.
        charCount.set(s1[left], charCount.get(s1[left]) + 1);
        //If a character count becomes greater than 0, increase count (indicating that the character is no longer fully matched).
        if (charCount.get(s1[left]) > 0) count++;
      }
      //Move left forward while maintaining all required characters in the window.
      left++;
    }
  }
  //Return the smallest window from minStart to minStart + minLen.
  return minLen === Infinity ? "" : s1.substring(minStart, minStart + minLen);
}

minWindow("timetopractice", "toc");
