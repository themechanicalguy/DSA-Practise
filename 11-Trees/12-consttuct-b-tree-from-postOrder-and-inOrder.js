//Given 2 Arrays of Inorder and PostOrder traversal. Construct a tree and print the PreOrder traversal.
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
function solve(inOrder, postOrder, preIndex, s, e) {
  //empty condition
  //Solve
}

function buildTree(inOrder, postOrder) {
  let n = inOrder.length;
  let preIndex = 0;
  const res = solve(inOrder, postOrder, n - 1, 0, n - 1);
}
