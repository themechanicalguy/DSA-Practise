// 2458. Height of Binary Tree After Subtree Removal Queries
// https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/
// Diff: hard

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
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function(root, queries) {

    // valToMaxHeight[val] := the maximum height without the node with `val`
    const valToMaxHeight = new Map();
    // valToHeight[val] := the height of the node with `val`
    const valToHeight = new Map();

    // maxHeight := the maximum height without the current node `root`
    function dfs(root, depth, maxHeight) {
        if (root == null)
        return;
        valToMaxHeight.set(root.val, maxHeight);
        dfs(root.left, depth + 1, Math.max(maxHeight, depth + height(root.right)));
        dfs(root.right, depth + 1, Math.max(maxHeight, depth + height(root.left)));
    }

    function height(root) {
        if (root == null)
            return 0;
        if (valToHeight.has(root.val))
            return valToHeight.get(root.val);
        const h = 1 + Math.max(height(root.left), height(root.right));
        valToHeight.set(root.val, h);
        return h;
    }

    const ans = new Array(queries.length);

    dfs(root, 0, 0);

    for (let i = 0; i < queries.length; ++i)
      ans[i] = valToMaxHeight.get(queries[i]);

    return ans;  
};
