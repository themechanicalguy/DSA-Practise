// LC - 1155

/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  //base cases
  if (n === 0 && target !== 0) return 0;
  if (n === 0 && target === 0) return 1;
  if (n !== 0 && target === 0) return 0;
  let ans = 0;
  for (let i = 1; i <= k; i++) {
    ans = ans + numRollsToTarget(n - 1, k, target - i);
  }
  return ans;
};
