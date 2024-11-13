tr = {
  data: "20",
  left: {
    data: "30",
    left: {
      data: "50",
      left: null,
      right: {
        data: "60",
        left: null,
        right: null,
      },
    },
    right: {
      data: "40",
      left: null,
      right: null,
    },
  },
  right: {
    data: "100",
    left: null,
    right: null,
  },
};

//Create a binary tree using level order traversal. Assume -1 is null data.
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

console.log(height(tr)); //4
