//Not working

function convertIntoSortedDLL(root, head) {
  //base case
  if (root === null) return;

  //right subtree into DLL
  convertIntoSortedDLL(root.right, head);

  //attach root node
  root.right = head;

  //check null and if not assign value to head
  if (head !== null) head.left = root;

  //update head
  head = root;

  convertIntoSortedDLL(root.left, head);
}

function printLinkedList(head) {
  let temp = head;

  while (temp !== null) {
    console.log(temp.data + " ");
    temp = temp.right;
  }
}

const BST = {
  data: 5,
  left: {
    data: 2,
    left: {
      data: 1,
      left: null,
      right: null,
    },
    right: {
      data: 4,
      left: null,
      right: null,
    },
  },
  right: {
    data: 8,
    left: {
      data: 7,
      left: null,
      right: null,
    },
    right: {
      data: 10,
      left: null,
      right: null,
    },
  },
};

const head = null;

const DLL = convertIntoSortedDLL(BST, head);
printLinkedList(head);

console.log(DLL);

//AlgoMonster approach

// Definition for a Node.
class Node {
  val: number;
  left: Node | null;
  right: Node | null;

  constructor(
    val: number,
    left: Node | null = null,
    right: Node | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Converts a binary search tree to a sorted circular doubly-linked list.
 * @param {Node | null} root - The root node of the binary search tree.
 * @returns {Node | null}
 */
function treeToDoublyList(root: Node | null): Node | null {
  if (!root) return root;

  let previous: Node | null = null;
  let head: Node | null = null;

  /**
   * Depth-first search (In-order traversal) to iterate over the tree and create the doubly linked list.
   * @param {Node | null} node - The current node being visited.
   */
  function inOrderTraversal(node: Node | null): void {
    if (!node) return;

    // Traverse the left subtree
    inOrderTraversal(node.left);

    // Link the current node with the previous node
    if (previous) {
      previous.right = node;
      node.left = previous;
    } else {
      // Set the head if this is the leftmost node
      head = node;
    }

    // Move the 'previous' pointer to the current node
    previous = node;

    // Traverse the right subtree
    inOrderTraversal(node.right);
  }

  // Start the in-order traversal
  inOrderTraversal(root);

  // Connect the head and tail to make the list circular
  if (head && previous) {
    previous.right = head;
    head.left = previous;
  }

  return head;
}
