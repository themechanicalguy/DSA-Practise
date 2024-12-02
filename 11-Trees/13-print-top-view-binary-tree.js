//Print nodes in Top View of Binary Tree
//Print nodes in Top View of Binary Tree

class Node {
  constructor(data) {
    this.data = data;
    this.left = this.right = null;
    this.hd = 0;
  }
}

const tr = {
  data: "10",
  right: {
    data: "50",
    right: {
      data: "90",
      right: {
        data: "100",
        right: null,
        left: null,
        hd: 0,
      },
      left: {
        data: "80",
        right: null,
        left: null,
        hd: 0,
      },
      hd: 0,
    },
    left: null,
    hd: 0,
  },
  left: {
    data: "20",
    right: {
      data: "40",
      right: {
        data: "70",
        right: null,
        left: null,
        hd: 0,
      },
      left: {
        data: "60",
        right: null,
        left: null,
        hd: 0,
      },
      hd: 0,
    },
    left: {
      data: "30",
      right: null,
      left: null,
      hd: 0,
    },
    hd: 0,
  },
  hd: 0,
};

function topView(root) {
  if (root === null) return;

  let queue = [];
  let m = new Map();
  let hd = 0;
  root.hd = hd;
  queue.push(root);

  while (queue.length !== 0) {
    currRoot = queue[0];
    hd = currRoot.hd;

    if (!m.has(hd)) {
      m.set(hd, currRoot.data);
    }

    if (currRoot.left) {
      currRoot.left.hd = hd - 1;
      queue.push(currRoot.left);
    }

    if (currRoot.right) {
      currRoot.right.hd = hd + 1;
      queue.push(currRoot.right);
    }

    queue.shift();
  }

  let arr = Array.from(m);
  arr.sort((a, b) => a - b);

  for (let [key, value] of arr.values()) {
    console.log(value + " ");
  }
}

topView(tr);
