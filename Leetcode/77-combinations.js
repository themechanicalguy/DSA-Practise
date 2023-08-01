// Author: Venkataramanan Balasingam @ venkatbala214@gmail.com
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const finalArray = [];
  const findCombinations = (combArr, current) => {
    if (combArr.length === k) {
      finalArray.push(combArr);
      return;
    }

    if (current == n) return;

    for (let i = current; i < n; i++) {
      findCombinations([...combArr, arr[i]], i + 1);
    }
  };
  findCombinations([], 0);
  return finalArray;
};
combine(4, 2);
