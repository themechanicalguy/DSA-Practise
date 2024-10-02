// 02 October 2024
/// 1331. Rank Transform of an Array
// https://leetcode.com/problems/rank-transform-of-an-array/description/
// Diff: Easy

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    const rank = {};
    const dup = arr.map((val) => val).sort((a, b) => a-b);
    let count = 0;
    for (let i=0; i<dup.length; i++) {
        if (!rank[dup[i]]) {
            count++;
            rank[dup[i]] = count;
        }
    }

    return arr.map((ar) => rank[ar]);
};