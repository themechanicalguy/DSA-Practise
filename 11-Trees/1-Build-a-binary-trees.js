//Create a binary tree using level order traversal. Assume -1 is null data.
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function buildTree() {
  data = prompt("Enter data to insert in Tree");
  //base case
  if (data == -1) return null;

  let root = new Node(data);

  root.left = buildTree();

  root.right = buildTree();

  return root;
}
