// LC - 6
/*
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"

*/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function (s, numRows) {
  let res = [];
  let count = 0;
  let up = true;
  for (let i = 0; i < s.length; i++) {
    if (!res[count]) res[count] = [];
    res[count].push(s[i]);

    count = up ? count + 1 : count - 1;

    if (count + 1 == numRows) up = false;
    else if (count == 0) up = true;
  }
  let result = "";
  for (let i of res) {
    result += i.join("");
  }
  return result;
};
