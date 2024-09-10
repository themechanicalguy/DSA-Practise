/**
 * @param {string} digits
 * @return {string[]}
 */
function solve(ans, index, output, digits, charMap) {
  if (index >= digits.length) {
    ans.push(output);
    return;
  }
  let digit = +digits[index];
  let value = [...charMap.get(digit)];

  for (let i of value) {
    let ch = i;
    output += ch;
    solve(ans, index + 1, output, digits, charMap);
    output = output.substring(0, output.length - 1);
  }
}
const letterCombinations = function (digits) {
  let ans = [];
  let index = 0;
  let output = "";
  if (digits.length === 0) return ans;
  let charMap = new Map();
  charMap.set(2, "abc");
  charMap.set(3, "def");
  charMap.set(4, "ghi");
  charMap.set(5, "jkl");
  charMap.set(6, "mno");
  charMap.set(7, "pqrs");
  charMap.set(8, "tuv");
  charMap.set(9, "wxyz");
  solve(ans, index, output, digits, charMap);
  return ans;
};
