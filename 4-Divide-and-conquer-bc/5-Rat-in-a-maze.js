function isSafe(x, y, visited, m, n) {
  if (
    x >= 0 &&
    x < n &&
    y >= 0 &&
    y < n &&
    visited[x][y] === 0 &&
    m[x][y] === 1
  ) {
    return true;
  } else {
    return false;
  }
}

function solve(m, n, ans, x, y, visited, path) {
  //base case
  if (x === n - 1 && y === n - 1) {
    console.log(path, "path");
    if (path !== undefined) {
      ans.push(path);
    }
    return;
  }
  visited[x][y] = 1;
  //down
  let newX = x + 1;
  let newY = y;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "D ";
    solve(m, n, ans, newX, newY, visited, path);
    path.slice(0, -1);
  }

  //left
  newX = x;
  newY = y - 1;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "L ";
    solve(m, n, ans, newX, newY, visited, path);
    path.slice(0, -1);
  }

  //right
  newX = x;
  newY = y + 1;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "R ";
    solve(m, n, ans, newX, newY, visited, path);
    path.slice(0, -1);
  }

  //up
  newX = x - 1;
  newY = y;
  if (isSafe(newX, newY, visited, m, n)) {
    path += "U ";
    solve(m, n, ans, newX, newY, visited, path);
    path.slice(0, -1);
  }

  visited[x][y] = 0;
  return ans;
}

function findPath(m, n) {
  let ans = [];
  if (m[0][0] === 0) return ans;
  let srcX = 0;
  let srcY = 0;
  const visited = structuredClone(m);
  visited.forEach((item) => item.fill(0));
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
