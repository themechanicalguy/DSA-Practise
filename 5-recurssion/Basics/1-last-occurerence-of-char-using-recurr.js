// Given a string and a character. find the last occurence of the char

function lastOccurence(str, char) {
  // create ans variable
  let ans = -1;
  // create recurssive function
  getLastOccurence(str, char, 0, ans);
  return ans;
}

function getLastOccurence(str, char, i, ans) {
  //base case
  if (i > str.length) return;

  if (str[i] === char) {
    ans = i;
  }

  getLastOccurence(str, char, i + 1, ans);
}
