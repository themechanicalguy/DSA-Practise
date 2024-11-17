//check whether Binary Tree is a sum tree or not -- different problem
// Convert Binary Tree into Sum Tree.

function convertIntoSumTree(root) {
  if (root === null) return 0;

  let left = convertIntoSumTree(root.left);

  let right = convertIntoSumTree(root.right);

  root.data = left + right + root.data;

  return root.data;
}
