/**
 * Check if a string has all characters with same frequency with one variation allowed
 */

/**
 * SOLUTION
 * 1 - Given a string, check if its character has same frequency. 1 character can be exception
 * ex :
 * aabbcc - Yes -- Because all have same frequency
 * '' - No -- Edge case
 * ddccbab - yes - Because if we remove a ( 1 character them it is possible)
 * ffggyyykkkjjii - No - Because we need to remove more than 1 character to make all frequency equal
 * a - yes
 * aabbb - Yes - remove  1 character them it is possible
 * 
 * Input : string str = "abbca"
Output : Yes
We can make it valid by removing "c"

Input : string str = "aabbcd"
Output : No
We need to remove at least two characters
to make it valid.

Input : string str = "abbccd"
Output : No
 */

// Approach 1

// JavaScript program to check if a string can be
// converted to a variation string

function checkForVariation(strr) {
  // Create a frequency map of characters in the string
  let freq = {};
  for (let i = 0; i < strr.length; i++) {
    if (freq[strr[i]]) {
      freq[strr[i]]++;
    } else {
      freq[strr[i]] = 1;
    }
  }

  // Convert these values to an array
  let valuelist = Object.values(freq);

  // Count frequencies again
  let ValueCounter = {};
  for (let i = 0; i < valuelist.length; i++) {
    if (ValueCounter[valuelist[i]]) {
      ValueCounter[valuelist[i]]++;
    } else {
      ValueCounter[valuelist[i]] = 1;
    }
  }

  if (Object.keys(ValueCounter).length == 1) {
    return true;
  } else if (
    Object.keys(ValueCounter).length == 2 &&
    Math.min(...Object.values(ValueCounter)) == 1
  ) {
    return true;
  }

  // If no conditions satisfied return false
  return false;
}

// Driver code
let string = "abcbc";

// passing string to checkForVariation Function
console.log(checkForVariation(string));

//Approach 2
function checkForVariation(str) {
  if (str == null || str.length == 0) {
    return true;
  }

  let map = new Map();

  // Run loop from 0 to length of string
  for (let i = 0; i < str.length; i++) {
    if (!map.has(str[i])) map.set(str[i], 0);
    map.set(str[i], map.get(str[i]) + 1);
  }
  console.log(map);

  // declaration of variables
  let first = true,
    second = true;
  let val1 = 0,
    val2 = 0;
  let countOfVal1 = 0,
    countOfVal2 = 0;

  for (let [key, value] of map.entries()) {
    console.log(key, value);
    let i = value; //1

    // if first is true than countOfVal1 increase
    if (first) {
      //TFF
      val1 = i; //1
      first = false;
      countOfVal1++; //1
      continue;
    } //FIRST -> FALSE

    if (i == val1) {
      //FFT
      countOfVal1++; //2
      continue;
    }

    // if second is true than countOfVal2 increase
    if (second) {
      //TF
      val2 = i; //2
      countOfVal2++; //1
      second = false;
      continue;
    } //second -> FALSE

    if (i == val2) {
      //T
      countOfVal2++; //2
      continue;
    }

    return false;
  }

  if (countOfVal1 > 1 && countOfVal2 > 1) {
    return false;
  } else {
    return true;
  }
}
checkForVariation("abcbcd");
