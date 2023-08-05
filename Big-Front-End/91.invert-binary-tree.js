// This is the type for the node
// type Node = null | {
//   value: number
//   left: Node
//   right: Node
// }

// Author: Venkataramanan
/**
 * @param {Node} node
 * @returns {Node}
 */
function invert(node) {
  // your code here
  if (node == null) return null;
  if (node.left !== null) {
    invert(node.left);
  }
  if (node.right !== null) {
    invert(node.right);
  }
  const temp = node.right;
  node.right = node.left;
  node.left = temp;
}

// done by JSER in DFS concept
function invertJSER(node) {
  if (node === null) return node;

  const stack = [node];

  while (stack.length > 0) {
    const node = stack.pop();
    [node.left, node.right] = [node.right, node.left];

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }
  }

  return node;
}
