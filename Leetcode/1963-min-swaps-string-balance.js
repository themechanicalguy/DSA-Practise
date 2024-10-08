// https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/
// 1963. Minimum Number of Swaps to Make the String Balanced
// Diff: 1963. Minimum Number of Swaps to Make the String Balanced

var minSwaps = function(s) {
    let l=0, r = s.length-1;
    let lbal=0, rbal=0;
    let count=0;

    while (l < r) {
        while (lbal>=0) {
            if (s[l++] == '[') {
                lbal++
            } else {
                lbal--;
            }
        }
        while (rbal>=0) {
            if (s[r--] == ']') {
                rbal++
            } else {
                rbal--;
            }
        }
        if (l-2<r) {
            count++
        }
        rbal=1;
        lbal=1;
    }
    return count;
};