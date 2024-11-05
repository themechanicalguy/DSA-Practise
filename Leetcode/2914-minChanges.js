// 2914. Minimum Number of Changes to Make Binary String Beautiful
// https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/
// Diff: Medium

/**
 * @param {string} s
 * @return {number}
 */
var minChanges = function(s) {
    let flip = 0;
    for (let i=0; i<s.length; i+=2) {
        if (s[i] !== s[i+1]) flip++;
    }
    return flip;
};