// Given a string and a character. find the last occurence of the char

function getLastOccurence(str, char, i, ans) {
  //base case
  if (i > str.length) return ans;
  if (str[i] == char) {
    ans.push(i);
  }
  getLastOccurence(str, char, i + 1, ans);
}
function lastOccurence(str, char) {
  let ans = [];
  getLastOccurence(str, char, 0, ans);
  return ans[ans.length - 1];
}

lastOccurence("adajaafferetatajilkillljjim", "m");

lastOccurence("adaj", "a");
