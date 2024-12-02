//Given 2 Arrays of Inorder and Preorder traversal. Construct a tree and print the Postorder traversal.
//- Questions is available in geeksForGeeks
class Node {
  constructor(data) {
    this.data = data;
    this.left = this.right = null;
  }
}

//function to find the index of an element
function searchValue(inorder, val, s, e) {
  for (let i = s; i <= e; i++) {
    if (inorder[i] === val) return i;
  }
  return -1;
}
//recurssive function to build the binary tree
function solve(inOrder, preOrder, preIndex, s, e) {
  //empty condition
  if (s > e) return null;

  //create the root node
  let root = new Node(preOrder[preIndex]);
  preIndex++;

  let index = searchValue(inOrder, root.data, s, e);

  //recurssively create the left  subttree
  root.left = solve(inOrder, preOrder, preIndex, s, index - 1);

  //recurssively create the right subttree
  root.right = solve(inOrder, preOrder, preIndex, index + 1, e);

  return root;
}

function printPostOrder(root) {
  if (root === null) return;
  printPostOrder(root.left);
  printPostOrder(root.right);
  console.log(root.data);
}

function buildTree(inOrder, preOrder) {
  let n = inOrder.length;
  let preIndex = 0;
  const res = solve(inOrder, preOrder, preIndex, s, e);
}
