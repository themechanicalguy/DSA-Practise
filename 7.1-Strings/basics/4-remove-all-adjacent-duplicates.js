/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
  let i = 0;
  let ans = [];
  while (i < s.length) {
    if (ans.length > 0) {
      let ansLen = ans.length;
      if (ansLen - 1 >= 0 && ans[ansLen - 1] === s[i]) {
        ans.pop();
      } else {
        ans.push(s[i]);
      }
    } else {
      ans.push(s[i]);
    }
    i++;
  }
  return ans.join("");
};
