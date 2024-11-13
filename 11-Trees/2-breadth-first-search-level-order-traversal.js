// Level order traversal or Breadth First Search
// Breadth First Search algorithms explores all nodes at the present level before moving to nodes at the next depth level.
// It is typically implemented using a queue.

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function BFS(root) {
  //base case
  if (root === null) return;
  //create a queue;
  let queue = [];
  //push root to queue
  queue.push(root);
  while (queue.length > 0) {
    let temp = queue.shift();
    console.log(temp.data);
    if (temp.left) queue.push(node.left);
    if (temp.right) queue.push(node.right);
  }
}
