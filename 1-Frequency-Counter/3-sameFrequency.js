/**
 * Check if a string has all characters with same frequency with one variation allowed
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
/**
 * 1 - Given a string, check if its character has same frequency. 1 character can be exception
 * ex :
 * aabbcc - Yes -- Because all have same frequency
 * '' - No -- Edge case
 * ddccbab - yes - Because if we remove a ( 1 character them it is possible)
 * ffggyyykkkjjii - No - Because we need to remove more than 1 character to make all frequency equal
 * a - yes
 * aabbb - Yes - remove  1 character them it is possible
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
