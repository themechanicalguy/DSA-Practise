// 3163. String Compression III
// https://leetcode.com/problems/string-compression-iii/
// Diff: Medium;

/**
 * @param {string} word
 * @return {string}
 */
var compressedString = function(word) {
    let ans = '';
    let count = 1;
    for (let i=1; i<=word.length; i++) {
        if (word[i] !== word[i-1] || count === 9) {
            ans += count+word[i-1];
            count = 0;
        }
        count++;
    }
    return ans;
};