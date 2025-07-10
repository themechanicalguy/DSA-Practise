//This code only works for simple string
function palindrome(str) {
  let start = 0;
  let end = str.length;
  while (start < end) {
    if (start !== end) return false;
    start++;
    end--;
  }
  return true;
}

function isAlphaNumeric(ind) {
  if (
    ind.toLowerCase().charCodeAt(0) >= 67 &&
    ind.toLowerCase().charCodeAt(0) <= 122
  )
    return true;
  else if (
    ind.toLowerCase().charCodeAt(0) >= 48 &&
    ind.toLowerCase().charCodeAt(0) <= 57
  )
    return true;
  else false;
}

// LC- Palindrome Check
var isPalindrome = function (s) {
  let start = 0;
  let end = s.length - 1;
  while (start < end) {
    while (start < end && !isAlphaNumeric(s[start])) start++;
    while (start < end && !isAlphaNumeric(s[end])) end--;
    if (s[start].toLowerCase() !== s[end].toLowerCase()) return false;
    start++;
    end--;
  }
  return true;
};
isPalindrome("ab_a");
