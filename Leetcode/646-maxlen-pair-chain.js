/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[1] - b[1]);
  let count = 0;

  let prev = -Infinity;

  for (let pair of pairs) {
    if (prev < pair[0]) {
      prev = pair[1];
      count++;
    }
  }
  return count;
};

findLongestChain([
  [1, 2],
  [7, 8],
  [4, 5],
]);
