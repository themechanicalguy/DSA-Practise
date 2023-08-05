/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  // # G[i] := # of unique BST's that store values 1..i
  const G = new Array(n + 1).fill(0);
  G[0] = 1;
  G[1] = 1;

  for (let i = 2; i <= n; ++i)
    for (let j = 0; j < i; ++j) G[i] += G[j] * G[i - j - 1];

  return G[n];
};
console.log(numTrees(3));
console.log(numTrees(4));
console.log(numTrees(5));
console.log(numTrees(6));
console.log(numTrees(7));
console.log(numTrees(8));
