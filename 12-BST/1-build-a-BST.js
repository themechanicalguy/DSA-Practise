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

let root = new Node(50);
root = insertIntoBST(root, 30);
root = insertIntoBST(root, 20);
root = insertIntoBST(root, 40);
root = insertIntoBST(root, 70);
root = insertIntoBST(root, 60);
root = insertIntoBST(root, 80);

console.log(root);
