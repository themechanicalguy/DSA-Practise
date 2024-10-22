// 2583. Kth Largest Sum in a Binary Tree
// https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/
// Diff: Medium

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
  const res = [];
  const _kthLargetLevelSum = (root, level) => {
    if (res.length <= level) res.push(0);
    res[level] += root.val;

    root?.left && _kthLargetLevelSum(root.left, level + 1);
    root?.right && _kthLargetLevelSum(root.right, level + 1);
  };
  _kthLargetLevelSum(root, 0);
  res.sort((a, b) => b - a);
  return res[k - 1] ?? -1;
};
