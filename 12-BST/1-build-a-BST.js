class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function insertIntoBST(root, data) {
  if (root === null) {
    return new Node(data);
  }

  //duplicates not allowed
  if (root.data === data) return root;

  if (data < root.data) {
    root.left = insertIntoBST(root.left, data);
  } else if (data > root.data) {
    root.right = insertIntoBST(root.right, data);
  }

  return root;
}

function inOrderTraversal(root) {
  if (root === null) return;
  inOrderTraversal(root.left);
  console.log(root.data);
  inOrderTraversal(root.right);
}

let root = new Node(5);
root = insertIntoBST(root, 8);
root = insertIntoBST(root, 2);
root = insertIntoBST(root, 4);
root = insertIntoBST(root, 10);
root = insertIntoBST(root, 7);
root = insertIntoBST(root, 1);

console.log(root);
