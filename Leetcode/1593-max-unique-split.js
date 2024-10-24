// 1593. Split a String Into the Max Number of Unique Substrings
// https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings
// Diff: Medium

/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function(s) {

    let ans = 0;
    function dfs(s, start, seen) {
        if (start == s.length) {
        ans = Math.max(ans, seen.size);
        return;
        }

        for (let i = start + 1; i <= s.length; ++i) {
        const cand = s.substring(start, i);
        if (seen.has(cand))
            continue;
        seen.add(cand);
        dfs(s, i, seen);
        seen.delete(cand);
        }
    }
    dfs(s, 0, new Set());

    return ans
};
