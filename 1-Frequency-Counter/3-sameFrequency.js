// Frequency Counter - sameFrequency
// Write a function called sameFrequency. Given two positive integers,
// find out if the two numbers have the same frequency of digits.

// Your solution MUST have the following complexities: Time: O(N)

function sameFrequency(num1, num2) {
  const str1 = `${num1}`;
  const str2 = `${num2}`;

  if (str1.length !== str2.length) return false;

  const obj = {};

  for (const char of str1) {
    obj[char] = ++obj[char] || 1;
  }

  for (const char of str2) {
    if (!obj[char]) return false;
    obj[char]--;
  }

  return true;
}

console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true

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
function sameFrquency(str) {
  // making a storage Map to store character with frequency
  let freqCounter1 = new Map();
  // Looping through string and updating Map
  for (let item of str) {
    freqCounter1.set(item, (freqCounter1.get(item) || 0) + 1);
  }
  let freqCounter2 = new Map();

  for (let [, value] of freqCounter1.entries()) {
    freqCounter2.set(value, (freqCounter2.get(value) || 0) + 1);
  }
  if (freqCounter2.size === 1) return "Yes";
  else if (freqCounter2.size >= 3) return "No";
  else {
    const iter = freqCounter2.values();
    if (iter.next().value === 1 || iter.next().value === 1) {
      return "Yes";
    }
    return "No";
  }
}

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
