// 2641. Cousins in Binary Tree II
// https://leetcode.com/problems/cousins-in-binary-tree-ii/
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
 * @return {TreeNode}
 */
var replaceValueInTree = function(root) {
    const lvlSums = [];

    const _replaceValueinTree = (root, lvl) => {
        if (root === undefined || root === null) return;
        
        if (lvlSums.length === lvl) lvlSums.push(0);
        lvlSums[lvl] += (root.left?.val ?? 0) + (root.right?.val ?? 0);
        
        _replaceValueinTree(root.left, lvl+1);
        _replaceValueinTree(root.right, lvl+1);
        
    }

    const _replaceinTree = (root, lvl) => {
        if (!root) return;
        if (lvl === 0 || lvl === 1) {
            root.val = 0;
        } 
        if (lvl > 0 && lvl < lvlSums.length-1) {
            const sum = (root.left?.val ?? 0) + (root.right?.val ?? 0);
            if (root?.left) root.left.val = lvlSums[lvl] - sum;
            if (root?.right) root.right.val = lvlSums[lvl] - sum;
        }
        _replaceinTree(root.left, lvl+1);
        _replaceinTree(root.right, lvl+1);
    }

    _replaceValueinTree(root, 0);
    _replaceinTree(root, 0);
    return root;
};