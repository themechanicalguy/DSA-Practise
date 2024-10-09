// 921. Minimum Add to Make Parentheses Valid
// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
// Diff: Medium

// My SOlution
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
  let oc = 0,
    cc = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') {
      oc++;
    } else if (oc > 0) {
      oc--;
    }
    if (s[s.length - i - 1] == ')') {
      cc++;
    } else if (cc > 0) cc--;
  }
  return oc + cc;
};

// Optimized Solution
var minAddToMakeValid = function (s) {
  let oc = 0,
    cc = 0;
  for (const c of s) {
    if (c == '(') {
      oc++;
    } else {
      if (oc == 0) cc++;
      else oc--;
    }
  }
  return oc + cc;
};
