# Problem Patterns Solved Optimally with Recursion in DSA

Recursion is a powerful technique in data structures and algorithms that can solve many problems elegantly. Here are common problem patterns where recursion is particularly effective, along with identification techniques and JavaScript examples.

## 1. Divide and Conquer

**Identification**: Problems that can be broken down into smaller subproblems of the same type, with solutions that can be combined.

**Approach**:

1. Divide the problem into smaller subproblems
2. Solve each subproblem recursively
3. Combine the solutions

**Example**: Merge Sort

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); // [3, 9, 10, 27, 38, 43, 82]
```

## 2. Backtracking

**Identification**: Problems that require exploring all possible configurations (like permutations, combinations, or constraint satisfaction problems).

**Approach**:

1. Try a choice
2. Recurse to solve the problem with that choice
3. Undo the choice if it doesn't lead to a solution

**Example**: N-Queens Problem

```javascript
function solveNQueens(n) {
  const result = [];

  function backtrack(row, queens) {
    if (row === n) {
      result.push(
        queens.map((q) => ".".repeat(q) + "Q" + ".".repeat(n - q - 1))
      );
      return;
    }

    for (let col = 0; col < n; col++) {
      if (!queens.some((q, r) => q === col || Math.abs(q - col) === row - r)) {
        backtrack(row + 1, [...queens, col]);
      }
    }
  }

  backtrack(0, []);
  return result;
}

console.log(solveNQueens(4));
/*
[
 [".Q..", "...Q", "Q...", "..Q."],
 ["..Q.", "Q...", "...Q", ".Q.."]
]
*/
```

## 3. Tree/Graph Traversal

**Identification**: Problems involving hierarchical structures or networks where you need to visit all nodes.

**Approach**:

1. Visit the current node
2. Recursively visit all connected nodes (children or neighbors)

**Example**: Binary Tree Inorder Traversal

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
console.log(inorderTraversal(tree)); // [1, 3, 2]
```

## 4. Dynamic Programming (with Memoization)

**Identification**: Problems with overlapping subproblems and optimal substructure.

**Approach**:

1. Break down into overlapping subproblems
2. Store solutions to avoid recomputation
3. Combine solutions

**Example**: Fibonacci Sequence

```javascript
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;

  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10)); // 55
console.log(fibonacci(50)); // 12586269025
```

## 5. Recursive Enumeration

**Identification**: Problems requiring generation of all possible combinations or permutations.

**Approach**:

1. Make a choice
2. Recurse to generate all possibilities with that choice
3. Backtrack to explore other choices

**Example**: Subsets

```javascript
function subsets(nums) {
  const result = [];

  function backtrack(start, path) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));
/*
[
  [], [1], [1, 2], [1, 2, 3], [1, 3],
  [2], [2, 3], [3]
]
*/
```

## How to Identify Recursive Problems

1. **Self-similarity**: The problem can be defined in terms of smaller instances of itself.
2. **Base case**: There's a trivial case that can be solved directly.
3. **Recursive case**: The problem can be broken down into smaller subproblems.
4. **No side effects**: The solution to subproblems don't affect each other (unless managed properly like in backtracking).

## Tips for Recursive Problem Solving

1. Always define a base case first
2. Ensure each recursive call progresses toward the base case
3. Consider memoization for optimization
4. Draw the recursion tree to visualize the flow
5. Start with a brute-force recursive solution, then optimize

Recursion is particularly powerful when the problem has a natural recursive structure. With practice, you'll develop an intuition for when to apply recursive solutions.
