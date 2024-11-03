// 796. Rotate String
// https://leetcode.com/problems/rotate-string/
// Diff: Easy

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function(s, goal) {
    if (s.length !== goal.length) return false;

    for (let i =0; i<s.length; i++) {
        let ti = 0;
        while (s[ti] === goal[(ti+i)%s.length]) {
            ti++;
            if (ti === s.length) return true;
        }
    }
    return false;
};