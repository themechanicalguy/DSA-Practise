// Given a string and a character. find the last occurence of the char

function getlastOccurence(str, i, char, ans) {
  if (i >= str.length) return ans;
  if (str[i] == char) ans = i;
  return getlastOccurence(str, i + 1, char, ans);
}

function lastOccurence(str, char) {
  let ans;
  let res = getlastOccurence(str, 0, char, ans);
  return res + 1;
}

lastOccurence("adajaafferetatajilkillljjim", "m");

lastOccurence("adajaafferetatajilkillljjim", "m");

lastOccurence("adaj", "a");
