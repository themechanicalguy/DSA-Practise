/** * Max Continuous Series of 1s -leetcode premium You are given with an array of 1s and 0s.
 * And you are given with an integer M, which signifies number of flips allowed.
 * Find the position of zeros which when flipped will produce maximum continuous series of 1s.
 * For this problem, return the indices of maximum continuous series of 1s in order.
 * Example:Input :Array = {1 1 0 1 1 0 0 1 1 1 }M = 1;Output :[0, 1, 2, 3, 4]
 * If there are multiple possible solutions, return the sequence which has the minimum start index.  */

const arr = [0, 0, 1, 1, 1, 1, 0, 1, 1, 0];
const k = 10;

function maxConsec1(arr, k) {
  let value = k;
  let j = 0;
  let i = 0;

  while (value != 0 && i < arr.length) {
    if (arr[i] === 0) {
      value--;
    }
    i++;
  }

  let maxLength = i - j;
  while (i < arr.length) {
    if (arr[i] == 0) {
      while (arr[j] == 1) j++;
      j++;
    }
    i++;
    maxLength = Math.max(maxLength, i - j);
  }
  console.log(maxLength, 'maxLength');
}
maxConsec1(arr, k);
