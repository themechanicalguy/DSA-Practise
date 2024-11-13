//LC-110
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function height(root) {
  //base case
  if (root === null) return 0;

  //left subTree
  let lh = height(root.left);

  //right subTree
  let rh = height(root.right);

  let ans = Math.max(lh, rh) + 1;

  return ans;
}

function isBalanced(root) {
  if (root === null) return true;

  //1 case
  let leftHeight = height(root.left);
  let rightHeight = height(root.right);
  let diff = Math.abs(leftHeight - rightHeight) <= 1;

  let leftdiff = isBalanced(root.left);
  let rightDiff = isBalanced(root.right);

  if (diff && leftdiff && rightDiff) return true;

  return false;
}

let obj = {
  data: "30",
  left: {
    data: "40",
    left: {
      data: "50",
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    data: "20",
    left: null,
    right: null,
  },
};

isBalanced(obj);
