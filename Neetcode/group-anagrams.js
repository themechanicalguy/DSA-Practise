// https://neetcode.io/problems/anagram-groups
/**
 * Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
 */
class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
        const res = {};
        for (let str of strs) {
            const arr = new Array(26).fill(0);
            for (let ch of str) {
                arr[ch.charCodeAt(0) - 'a'.charCodeAt(0)] ++;
            }
            const ana = arr.join();
            if (!res[ana]) {
                res[ana] = [];
            }
            res[ana].push(str)
        }
        return Object.values(res);
    }
}
