/**
 * @param {string} s
 * @return {boolean}
 */
let checkPalindrome = function (i, j, s) {
  while (i <= j) {
    if (s[i] !== s[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

var validPalindrome = function (s) {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] === s[j]) {
      i++;
      j--;
    } else {
      return checkPalindrome(i + 1, j, s) || checkPalindrome(i, j - 1, s);
    }
  }
  return true;
};
