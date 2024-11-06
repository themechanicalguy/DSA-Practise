// 3011. Find if Array Can Be Sorted
// https://leetcode.com/problems/find-if-array-can-be-sorted/
// Diff: Medium

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canSortArray = function(nums) {
    const getTrueBitsCount = (num) => {
        let i = 1; 
        let count = 0;
        while (i<=num) {
            if (i & num) count++;
            i = i << 1;
        }
        return count;
    }
    const countArr = nums.map(val => [val, getTrueBitsCount(val)]);

    for (let i = countArr.length-1; i > 0; i--) {
        for (let j=0; j<i; j++ ){
            if (countArr[j][0] > countArr[j+1][0]) {
                if (countArr[j][1] !== countArr[j+1][1]) return false;
                const temp = countArr[j];
                countArr[j] =countArr[j+1];
                countArr[j+1] = temp;
            }
        }
    }
    return true;

};