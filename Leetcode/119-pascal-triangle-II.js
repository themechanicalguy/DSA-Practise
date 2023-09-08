/**
Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: rowIndex = 3
Output: [1,3,3,1]

Example 2:
Input: rowIndex = 0
Output: [1]

Example 3:
Input: rowIndex = 1
Output: [1,1]

Constraints:
0 <= rowIndex <= 33
 */
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
       let res = [1];
    for (let i=1; i<=rowIndex; i++) {
        const line = [];
        for (let j=0; j<=i; j++) {
            if (j === 0 || j===i) line.push(1) 
            else line.push(res[j-1]+res[j])
        }
        res = line;
    }
    return res;

}
