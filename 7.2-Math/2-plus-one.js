/** LC- 66
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] < 9) {
      arr[i]++;
      return arr;
    } else {
      arr[i] = 0;
    }
  }
  arr.push(0);
  arr[0] = 1;
  return arr;
};
