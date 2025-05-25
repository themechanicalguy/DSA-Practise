function isSafe(x, y, visited, m, n) {
  return !!(
    x >= 0 &&
    x < n &&
    y >= 0 &&
    y < n &&
    visited[x][y] === 0 &&
    m[x][y] === 1
  );
}
/**
 *
 * @param {given matrix} m
 * @param {size of matrix} n
 * @param {path array} ans
 * @param {x axis index} x
 * @param {y axis index} y
 * @param {visited matrix} visited
 * @param {current path followed} path
 * @returns
 */
function solve(m, n, ans, x, y, visited, path) {
  //base case
  if (x === n - 1 && y === n - 1) {
    ans.push(path);
    return;
  }
  visited[x][y] = 1;

  //down
  let newX = x + 1;
  let newY = y;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "D ";
    solve(m, n, ans, newX, newY, visited, path);
  }

  //left
  newX = x;
  newY = y - 1;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "L ";
    solve(m, n, ans, newX, newY, visited, path);
  }

  //right
  newX = x;
  newY = y + 1;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "R ";
    solve(m, n, ans, newX, newY, visited, path);
  }

  //up
  newX = x - 1;
  newY = y;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "U ";
    solve(m, n, ans, newX, newY, visited, path);
  }

  visited[x][y] = 0;
  return ans;
}

function findPath(m, n) {
  // initialize an array to store result
  let ans = [];
  // if origin is 0 return ans(empty result)
  if (m[0][0] === 0) return ans;
  // Starting index to check path
  let srcX = 0;
  let srcY = 0;
  // Clone m matrix to create a visited array
  const visited = structuredClone(m);
  // initially fill the entire matrix with 0
  visited.forEach((item) => item.fill(0));
  // to store path
  let path = "";
  let res = solve(m, n, ans, srcX, srcY, visited, path);
  return res.sort();
}
findPath(
  [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1],
  ],
  4
);
