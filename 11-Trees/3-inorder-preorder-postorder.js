class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function inOrderTraversal(root) {
  //base case
  if (root === null) return null;
  //LCR
  inOrderTraversal(root.left);
  console.log(root.data + "  ");
  inOrderTraversal(root.right);
}

function preOrderTraversal(root) {
  if (root === null) return null;
  //CLR
  console.log(root.data);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
}

function postOrderTraversal(root) {
  if (root === null) return null;
  //LRC
  postOrderTraversal(root.left);
  postOrderTraversal(root.right);
  console.log(root.data);
}
