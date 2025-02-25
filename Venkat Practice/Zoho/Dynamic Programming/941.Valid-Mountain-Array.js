// 941. Valid Mountain Array
// https://leetcode.com/problems/valid-mountain-array/description/

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    let i = 0;
    let foundPeak=false;
    for (;i<arr.length-1; i++) {
        if (arr[i] === arr[i+1]) return false;
        if (!foundPeak && arr[i] > arr[i+1]) {
            foundPeak = true;
        } else if (foundPeak && arr[i] < arr[i+1]) {
            return false;
        }
    }
    if (foundPeak && (arr[arr.length-1] < arr[arr.length-2]) && (arr[0] < arr[1])) return true;
    return false
};