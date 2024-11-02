// 1957. Delete Characters to Make Fancy String
// Prob: https://leetcode.com/problems/delete-characters-to-make-fancy-string/
// Diff: Easy
/**
 * @param {string} s
 * @return {string}
 */
var makeFancyString = function(s) {
    let ans = '';

    for(i=-2; i<s.length-2; i++) {
        if (i>=0 && s[i] === s[i+1] && s[i] === s[i+2]) continue;
        ans += s[i+2];
    }
    return ans;
};