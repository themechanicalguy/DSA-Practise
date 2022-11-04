//Given a string, check if it is palindrome or not.

function palindromeCheck(str, s, e) {
  if (s > e) return true;
  if (str[s] !== str[e]) return false;
  return palindromeCheck(str, s + 1, e - 1);
}

let str = "abba";
console.log(palindromeCheck(str, 0, str.length - 1));
