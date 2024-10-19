// 1545. Find Kth Bit in Nth Binary String
// https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/
// Diff: Medium

/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
 
var findKthBit = function(n, k) {
    if (n ==1) return '0';
    const midIndex = Math.pow(2, n - 1);

    if (k == midIndex) return '1';

    if (k < midIndex) return findKthBit(n-1, k);
    return findKthBit(n-1, midIndex*2-k) === '0' ? '1' : '0';
};